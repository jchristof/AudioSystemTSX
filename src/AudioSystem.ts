
import ConvolverReverb from './effects/ConvolverReverb';

export default class  AudioSystem {
    context: AudioContext;
    private gain: GainNode;
    private mixCompressor: DynamicsCompressorNode;
    
    constructor() {
        this.context = new ((window as any).AudioContext || (window as any).webkitAudioContext)() as AudioContext;   
        this.gain = this.context.createGain();   
        this.gain.gain.value = 0.5;
        this.mixCompressor = this.context.createDynamicsCompressor();

        this.mixCompressor.knee.setValueAtTime(40, this.context.currentTime);
        this.mixCompressor.ratio.setValueAtTime(20, this.context.currentTime);
        this.mixCompressor.attack.setValueAtTime(0, this.context.currentTime);
        this.mixCompressor.release.setValueAtTime(0.25, this.context.currentTime);

        this.gain.connect(this.mixCompressor);
        this.mixCompressor.connect(this.context.destination);
    }

    setConvolver(convolver: ConvolverReverb) {
        // this.gain.disconnect(this.context.destination);
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
        bufferSource.connect(this.gain);

        bufferSource.buffer = buffer;
        bufferSource.start();
    }

    note(freq: number) {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        gain.connect(this.gain);
        gain.gain.value = .75;
        oscillator.frequency.value = freq;
        oscillator.connect(gain);
        const now = (this.context as any).currentTime;

        gain.gain.setTargetAtTime(0, now, .5);
        
        oscillator.frequency.value = freq;
        oscillator.start(now);
        window.setTimeout(
            () => {
                gain.disconnect();
                oscillator.disconnect();
                oscillator.stop();
            }, 
            6000);
    }
}