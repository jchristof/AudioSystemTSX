import * as React from 'react';
import './SampleButton.css';

type Props = {
  clickFunction: (sampleName: string) => void;
  text?: string;
};
type State = {};

export default class SampleButton extends React.Component<Props, State> {
  
  render() {
    return (
      <button 
        className="SampleButton-button" 
        onClick={() => this.props.clickFunction('snare')}
      >
        {this.props.text}
      </button>
    );
  }
}