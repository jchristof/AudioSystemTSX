import AudioSystem from '../AudioSystem';
import AudioLoader from '../AudioLoader';

export default class ConvolverReverb {
    readonly convolver: ConvolverNode;
    constructor(audioSystem: AudioSystem, audioLoader: AudioLoader) {
        this.convolver = audioSystem.audioContext().createConvolver();
        audioLoader.load('ccrmastairwell', 'impulse/CCRMAStairwell.wav')
            .then((buffer: AudioBuffer) => {
                this.convolver.buffer = buffer;
        });
    }

    setInput(inputNode: AudioNode): void {
        inputNode.connect(this.convolver);
    }

    setOutput(outputNode: AudioNode): void {
        this.convolver.connect(outputNode);
    }
}