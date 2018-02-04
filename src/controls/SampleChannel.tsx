import * as React from 'react';

import AudioLoader from '../AudioLoader';
import AudioSystem from '../AudioSystem';
import SampleButton from '../controls/SampleButton';
import Dial from '../controls/Dial';
import Delay from '../effects/Delay';

import '../controls/SampleChannel.css';

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
    readonly delay: Delay;

    audioBuffer: AudioBuffer;
    volume = .5;

    constructor(props: Props) {
        super(props);
        this.channelGain = props.audioSystem.audioContext().createGain();
        this.channelGain.gain.value = this.volume;
        this.channelGain.connect(this.props.audioSystem.channelInput());

        this.delay = new Delay(props.audioSystem);
        this.delay.setOutput(this.channelGain); 
      }

    render() {
        return (
            <div>
                <div className="SampleChannel-border">
                    <b>delay</b>
                    <br/>
                    <em>time</em>
                    <Dial 
                        id={'time'} 
                        onValueChanged={(id, value) => this.delay.setDelayTime(value)} 
                        dialSize={50}
                    />
                    <em>feedback</em>
                    <Dial 
                        id={'feedback'} 
                        onValueChanged={(id, value) => this.delay.setDelayFeedback(value)} 
                        dialSize={50}
                    />
                    <em>output</em>
                    <Dial 
                        id={'output'} 
                        onValueChanged={(id, value) => this.delay.setDaylayOutput(value)} 
                        dialSize={50}
                    />
                    <input 
                        type="checkbox"
                        defaultChecked={true}
                        onChange={(event: any) => this.delay.toggleOutput(event.currentTarget.checked)}
                    />
                </div>

                <div className="SampleChannel-border">
                    <b>output volume</b>
                    <Dial 
                        id={this.props.sampleName} 
                        onValueChanged={(id, value) => this.setVolume(id, value)} 
                        dialSize={50}
                    />
                </div>
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
        this.delay.setInput(bufferSource);
        bufferSource.start();
    }

    private setVolume(id: string, value: number) {
        this.volume = value;
        console.log('volume changed: ' + value);
    }
}