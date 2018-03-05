import * as React from 'react';

import Dial from '../controls/Dial';
import Sequencer from './Sequencer';

type Props = {
    sequencer: Sequencer
};

type State = {

};

export default class SequencerControl extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    
    setTempo(value: number): void {
        this.props.sequencer.timer.tempo = (value * 100) + 20;
    }

    render() {
        return (
            <div className="SampleChannel-border">
            <b>sequencer</b>
            <br/>
            <em>tempo</em>
            <Dial 
                id={'tempo'} 
                onValueChanged={(id, value) => this.setTempo(value)} 
                dialSize={30}
            />
            <em>metronome</em>
            <br/>
            <input 
                type="checkbox"
                defaultChecked={false}
                onChange={(event: any) => this.props.sequencer.metronomeAudible = event.currentTarget.checked}
            />
            </div>
        );
    }
}