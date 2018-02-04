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
    readonly channelGain: GainNode;

    audioBuffer: AudioBuffer;
    volume = .5;

    constructor(props: Props) {
        super(props);
        this.channelGain = props.audioSystem.audioContext().createGain();
        this.channelGain.gain.value = this.volume;
        this.channelGain.connect(this.props.audioSystem.channelInput());
      }

    render() {
        return (
            <div>
            <Dial id={this.props.sampleName} onValueChanged={(id, value) => this.setVolume(id, value)} dialSize={50} />
            
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

        this.channelGain.gain.value = this.volume;
        const bufferSource = this.props.audioSystem.bufferSource(this.audioBuffer);
        bufferSource.connect(this.channelGain);
        bufferSource.start();
    }

    private setVolume(id: string, value: number) {
        this.volume = value;
        console.log('volume changed: ' + value);
    }
}