export default class  AudioSystem {
    private oscillator;
    private context: AudioContext;
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

    run() {
        var now = (this.context as any).currentTime;
        this.gain.gain.setValueAtTime(1, now);
        this.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        this.oscillator.start(now);
        this.oscillator.stop(now + 0.5);
    }
}