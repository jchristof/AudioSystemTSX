import * as React from 'react';

type Props = {
  clickFunction: (sampleName: string) => void;
  text?: string;
};
type State = {};

export default class SampleButton extends React.Component<Props, State> {
  render() {
    return (
      <button onClick={() => this.props.clickFunction('snare')}>{this.props.text}</button>
    );
  }
}