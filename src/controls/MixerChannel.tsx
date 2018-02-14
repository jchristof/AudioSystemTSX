import * as React from 'react';
import ConvolverReverb from '../effects/ConvolverReverb';
import Dial from './Dial';

type Props = {
    convolver: ConvolverReverb;
};

type State = {

};

export default class MixerChannel extends React.Component<Props, State> {

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
                        dialSize={30}
                    />
            </div>
        );
    }
}