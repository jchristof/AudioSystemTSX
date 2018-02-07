import AudioSystem from '../AudioSystem';
import AudioLoader from '../AudioLoader';

export default class ConvolverReverb {
    private readonly convolver: ConvolverNode;
    private readonly gain: GainNode;

    constructor(audioSystem: AudioSystem, audioLoader: AudioLoader) {
        this.convolver = audioSystem.audioContext().createConvolver();
        this.gain = audioSystem.audioContext().createGain();
        this.gain.gain.value = .5;
        this.convolver.connect(this.gain);

        audioLoader.load('ccrmastairwell', 'impulse/CCRMAStairwell.wav')
            .then((buffer: AudioBuffer) => {
                this.convolver.buffer = buffer;
        });
    }

    setGain(value: number) {
        this.gain.gain.value = value;
    }

    setInput(inputNode: AudioNode): void {
        inputNode.connect(this.convolver);
    }

    setOutput(outputNode: AudioNode): void {
        this.gain.connect(outputNode);
    }
}