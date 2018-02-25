import AudioSystem from './AudioSystem';

export default class Sequencer {
    private tempo = 120.0;
    private current16thNote = 1;
    private futureTickTime: number;
    private secondsPerBeat = 60 / this.tempo;

    private readonly audioSystem: AudioSystem;
    private timeoutHandle: number;

    constructor(audioSystem: AudioSystem) {
        this.audioSystem = audioSystem;
        this.futureTickTime = audioSystem.audioContext().currentTime;
        console.log(this.timeoutHandle);
    }

    public start(): void {
        console.log('start squencing');
    }

    private scheduler(): void {
        while (this.futureTickTime < this.audioSystem.audioContext().currentTime + 0.1) {
            this.futureTickTime += 0.25 * this.secondsPerBeat;
            this.playOsc(this.futureTickTime);
            this.current16thNote++;
            if (this.current16thNote > 16)
                this.current16thNote = 1;
        }
        this.timeoutHandle = window.setTimeout(() => this.scheduler(),  50.0);
    }

    private playOsc(time: number): void {
        var osc = this.audioSystem.audioContext().createOscillator();
        osc.connect(this.audioSystem.audioContext().destination);
        osc.start(time);
        osc.stop(time + 0.1);
    }
}