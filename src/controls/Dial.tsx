import * as React from 'react';
import './Dial.css';

type Props = {
    id: string,
    dialSize: number,
    onValueChanged: (id: string, value: number) => void
};
type State = {
    angle: number;
};

export default class Dial extends React.Component<Props, State> {
    private readonly id: string;
    private readonly step = 5;
    private readonly minRotationAngle = -135;
    private readonly maxRotationAngle = 135;
    private readonly absRange = Math.abs(this.minRotationAngle) + Math.abs(this.maxRotationAngle);

    private readonly size: number;
    private readonly center: number;
    private readonly radius: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            angle: 0
        };

        this.id = props.id;
        this.size = props.dialSize * 2;
        this.center = props.dialSize;
        this.radius = props.dialSize;
      }

    onMouseWheel(event: React.WheelEvent<HTMLDivElement>): void {
        event.preventDefault();
        // capture the deltaY value here becase React will recycle the event before setState() executes    
        const deltaY = this.normalizeWheel(event).spinY * -this.step;

        this.setState((prevState: State, props: Props) => {
            const newAngle = Math.min(Math.max(prevState.angle - deltaY, this.minRotationAngle), this.maxRotationAngle);
            const normal = (newAngle + this.maxRotationAngle) / this.absRange;

            this.props.onValueChanged(this.id, normal);
            return { angle: newAngle };
        });
    }

    render() {
        return (
            <div onWheel={(e) => this.onMouseWheel(e)}>
                <svg width={this.size} height={this.size} xmlns="http://www.w3.org/2000/svg">
                    <g transform={`rotate(${this.state.angle}, ${this.size / 2}, ${this.size / 2})`}>
                            <circle
                                fill="#999999"
                                r={this.radius}
                                cy={this.center}
                                cx={this.center}
                            />
                            <circle
                                cy={this.center}
                                cx={this.center}
                                r={this.radius - 4}
                            />
                            <rect
                                y="4"
                                x={this.center}
                                height={this.radius / 2}
                                width="2"
                                fill="#ffffff" 
                            />
                    </g>
                </svg>
            </div>
        );
    }

    private normalizeWheel(event: any) {
        var PIXEL_STEP  = 10;
        var LINE_HEIGHT = 40;
        var PAGE_HEIGHT = 800;
        var sX = 0, sY = 0,       // spinX, spinY
            pX = 0, pY = 0;       // pixelX, pixelY
    
        // Legacy
        if ('detail'      in event) { sY = event.detail; }
        if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
        if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
        if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }
    
        // side scrolling on FF with DOMMouseScroll
        if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
            sX = sY;
            sY = 0;
        }
    
        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;
    
        if ('deltaY' in event) { pY = event.deltaY; }
        if ('deltaX' in event) { pX = event.deltaX; }
    
        if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode === 1) {          // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
        } else {                             // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
        }
        }
    
        // Fall-back if spin cannot be determined
        if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
        if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }
    
        return { spinX  : sX,
                spinY  : sY,
                pixelX : pX,
                pixelY : pY };
    }
}
