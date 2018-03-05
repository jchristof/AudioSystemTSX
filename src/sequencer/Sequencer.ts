import AudioSystem from '../AudioSystem';
import SequencerTimer from '../sequencer/SequencerTimer';

export default class Sequencer {

    private readonly audioSystem: AudioSystem;
    private readonly sequencerTimer: SequencerTimer;
    private _metronomeAudible = false;

    constructor(audioSystem: AudioSystem) {
        this.audioSystem = audioSystem;
        this.sequencerTimer = new SequencerTimer(audioSystem);
    }

    get timer(): SequencerTimer {
        return this.sequencerTimer;
    }

    set metronomeAudible(audible: boolean) {
        this._metronomeAudible = audible;
    }

    public start(): void {
        console.log('start squencing');
        this.sequencerTimer.pulse = (beat, time) => { 
            this.playOsc(beat, time); 
        };
        this.sequencerTimer.start();
    }

    private playOsc(beat: number, time: number): void {
        if (!this._metronomeAudible)
            return;

        var osc = this.audioSystem.audioContext().createOscillator();
        var gain = this.audioSystem.audioContext().createGain();
        gain.gain.value = beat ? .05 : .1;
        
        osc.connect(gain);
        gain.connect(this.audioSystem.audioContext().destination);

        osc.start(time);
        osc.stop(time + 0.1);
    }
}