import AudioSystem from '../AudioSystem';

export default class Delay {
    readonly delayEffect: DelayNode;
    readonly feedbackGain: GainNode;
    readonly outputGain: GainNode;
    private outputGainLevel: number;

    constructor(audioSystem: AudioSystem) {
        this.delayEffect = audioSystem.audioContext().createDelay();
        this.delayEffect.delayTime.value = .5;
        this.feedbackGain = audioSystem.audioContext().createGain();
        this.feedbackGain.gain.value = .5;
        this.feedbackGain.connect(this.delayEffect);

        this.outputGain = audioSystem.audioContext().createGain();
        this.outputGain.gain.value = this.outputGainLevel = .5;

        this.delayEffect.connect(this.feedbackGain);
        this.delayEffect.connect(this.outputGain);
    }

    setInput(inputNode: AudioNode): void {
        inputNode.connect(this.delayEffect);
    }

    setOutput(outputNode: AudioNode): void {
        this.outputGain.connect(outputNode);
    }

    setDelayTime(value: number): void {
        this.delayEffect.delayTime.value = value;
    }

    setDelayFeedback(value: number): void {
        this.feedbackGain.gain.value = value;
    }

    setDaylayOutput(value: number): void {
        this.outputGainLevel = value;
        this.outputGain.gain.value = value;
    }

    toggleOutput(value: boolean): void {
        if (value) {
            this.outputGain.gain.value = this.outputGainLevel;
        } else {
            this.outputGain.gain.value = 0;
        }

    }

    getToggleOutput(): boolean {
        return this.outputGain.gain.value !== 0;
    }
}