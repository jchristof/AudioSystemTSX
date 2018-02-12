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

    constructor(props: Props) {
        super(props);
        this.state = {
            angle: 0
        };

        this.id = props.id;
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
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <g transform={`rotate(${this.state.angle}, 50, 50)`}>
                    <ellipse 
                        ry="46.36365" 
                        rx="46.27274" 
                        id="svg_4" 
                        cy="50" 
                        cx="50" 
                        strokeWidth="1.5" 
                        stroke="#000000" 
                        fill="#3a3a3a"
                    />
                    <ellipse 
                        ry="6.81818" 
                        rx="6.81818" 
                        id="svg_19" 
                        cy="17.18181" 
                        cx="50" 
                        strokeWidth="1.5" 
                        stroke="#000000" 
                        fill="#565656"
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
