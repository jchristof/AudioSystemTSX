import * as React from 'react';

import AudioLoader from '../AudioLoader';
import AudioSystem from '../AudioSystem';
import SampleButton from '../controls/SampleButton';
import Dial from '../controls/Dial';

type Props = {
    sampleName: string;
    audioSystem: AudioSystem;
    audioLoader: AudioLoader
};

type State = {

};

export default class SampleChannel extends React.Component<Props, State> {
    readonly bufferSource: AudioBufferSourceNode;
    audioBuffer: AudioBuffer;

    constructor(props: Props) {
        super(props);
      }

    render() {
        return (
            <div>
            <Dial id={this.props.sampleName} onValueChanged={this.setVolume} dialSize={50} />
            
            <SampleButton 
              clickFunction={
                  () => this.playBack()
                } 
              text={this.props.sampleName}
            />
          </div>
        );
    }

    private playBack(): void {
        if (this.audioBuffer == null) {
            this.audioBuffer = this.props.audioLoader.audio(this.props.sampleName);
        }
        const bufferSource = this.props.audioSystem.bufferSource(this.audioBuffer);
        bufferSource.connect(this.props.audioSystem.channelInput());
        bufferSource.start();
    }

    private setVolume(id: string, value: number) {
        console.log('volume changed: ' + value);
    }
}