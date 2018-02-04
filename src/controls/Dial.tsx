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
    private id: string;

    constructor(props: Props) {
        super(props);
        this.state = {
            angle: 0
        };

        this.id = props.id;
      }

    onMouseWheel(event: React.WheelEvent<HTMLDivElement>): void {
        const deltaY = event.deltaY / 100;
        
        this.setState((prevState: State, props: Props) => {
            this.props.onValueChanged(this.id, prevState.angle + deltaY);
            return { angle: prevState.angle + deltaY };
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
                    stroke-width="1.5" 
                    stroke="#000000" 
                    fill="#3a3a3a"
                />
                <ellipse 
                    ry="6.81818" 
                    rx="6.81818" 
                    id="svg_19" 
                    cy="17.18181" 
                    cx="50" 
                    stroke-width="1.5" 
                    stroke="#000000" 
                    fill="#565656"
                />
        </g>
        </svg>
        </div>
    );
  }
}
