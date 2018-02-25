import AudioSystem from './AudioSystem';
import SequencerTimer from './sequencer/SequencerTimer';

export default class Sequencer {

    private readonly audioSystem: AudioSystem;
    private readonly sequencerTimer: SequencerTimer;

    constructor(audioSystem: AudioSystem) {
        this.audioSystem = audioSystem;
        this.sequencerTimer = new SequencerTimer(audioSystem);
    }

    public start(): void {
        console.log('start squencing');
        this.sequencerTimer.pulse = (beat, time) => { this.playOsc(time); };
        this.sequencerTimer.start();
    }

    private playOsc(time: number): void {
        var osc = this.audioSystem.audioContext().createOscillator();
        osc.connect(this.audioSystem.audioContext().destination);
        osc.start(time);
        osc.stop(time + 0.1);
    }
}