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
 
    render() {
        return (
            <div>
            <Dial id={this.props.sampleName} onValueChanged={this.setVolume} dialSize={50} />
            
            <SampleButton 
              clickFunction={
                  () => this.props.audioSystem.playback(this.props.audioLoader.audio(this.props.sampleName))
                } 
              text={this.props.sampleName}
            />
          </div>
        );
    }

    private setVolume(id: string, value: number) {
        console.log('volume changed: ' + value);
    }
}