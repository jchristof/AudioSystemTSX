import * as React from 'react';
import ConvolverReverb from '../effects/ConvolverReverb';
// import AudioLoader from '../AudioLoader';
// import AudioSystem from '../AudioSystem';
import Dial from './Dial';

type Props = {
    convolver: ConvolverReverb;
};

type State = {

};

export default class MixerChannel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    onReverMixChanged(value: number) {
        this.props.convolver.setGain(value);
    }

    render() {
        return (
            <div>
                <b>reverb</b>
                    <br/>
                    <em>mix</em>
                    <Dial 
                        id={'time'} 
                        onValueChanged={(id, value) => { this.onReverMixChanged(value); }} 
                        dialSize={50}
                    />
            </div>
        );
    }
}