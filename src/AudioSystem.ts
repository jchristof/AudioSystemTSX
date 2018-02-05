
import ConvolverReverb from './effects/ConvolverReverb';

export default class  AudioSystem {
    context: AudioContext;
    private oscillator: OscillatorNode;
    private gain: GainNode;
    
    constructor() {
        this.context = new ((window as any).AudioContext || (window as any).webkitAudioContext)() as AudioContext;
        this.oscillator = this.context.createOscillator();
        
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = 440;
        this.gain = this.context.createGain();
        this.oscillator.connect(this.gain);
        
        this.gain.connect(this.context.destination);
    }

    setConvolver(convolver: ConvolverReverb) {
        this.gain.disconnect(this.context.destination);
        convolver.setInput(this.gain);
        convolver.setOutput(this.context.destination);
    }

    audioContext(): AudioContext {
        return this.context;
    }

    channelInput(): AudioNode {
        return this.gain;
    }

    bufferSource(buffer: AudioBuffer): AudioBufferSourceNode {
        const bufferSource = this.context.createBufferSource();
        bufferSource.buffer = buffer;
        return bufferSource;
    }

    playback(buffer: AudioBuffer) {
        const bufferSource = this.context.createBufferSource();
        bufferSource.connect(this.context.destination);

        bufferSource.buffer = buffer;
        bufferSource.start();
    }

    run(): void {
        var now = (this.context as any).currentTime;
        this.gain.gain.setValueAtTime(1, now);
        this.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        this.oscillator.start(now);
        this.oscillator.stop(now + 0.5);
    }

    note(freq: number) {
        var oscillator = this.context.createOscillator();
        oscillator.frequency.value = freq;
        oscillator.connect(this.context.destination);
        var now = (this.context as any).currentTime;
        oscillator.frequency.value = freq;
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    }
}