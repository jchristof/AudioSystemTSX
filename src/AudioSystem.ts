
import ConvolverReverb from './effects/ConvolverReverb';

export default class  AudioSystem {
    context: AudioContext;
    private gain: GainNode;
    
    constructor() {
        this.context = new ((window as any).AudioContext || (window as any).webkitAudioContext)() as AudioContext;   
        this.gain = this.context.createGain();   
        this.gain.connect(this.context.destination);
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
        bufferSource.connect(this.context.destination);

        bufferSource.buffer = buffer;
        bufferSource.start();
    }

    note(freq: number) {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        gain.connect(this.gain);
        gain.gain.value = 1;
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
        // oscillator.stop(now + 1);
    }
}