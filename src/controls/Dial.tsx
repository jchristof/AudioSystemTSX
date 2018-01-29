import * as React from 'react';
import './Dial.css';

type Props = {
};
type State = {};

export default class Dial extends React.Component<Props, State> {
  render() {
    return (
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
         <g transform="rotate(90, 50, 50)">
                <ellipse id="svg_2" cy="115" cx="462.5" stroke-width="1.5" stroke="#000" fill="#fff"/>
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
    );
  }
}
