import AudioSystem from '../AudioSystem';

export default class SequencerTimer {
    private _tempo = 120.0;
    private current16thNote = 0;
    private futureTickTime: number;
    private secondsPerBeat = 60 / this.tempo;

    private readonly audioSystem: AudioSystem;
    private timeoutHandle: number;
    private sequencing = false;

    pulse: (beat: number, tick: number) => void = (beat, tick) => { console.log('ticking default pulse'); };

    constructor(audioSystem: AudioSystem) {
        this.audioSystem = audioSystem;
        this.futureTickTime = audioSystem.audioContext().currentTime;
        console.log(this.timeoutHandle);
    }

    public start(): void {
        console.log('start squencing');
        this.sequencing = true;
        this.scheduler();
    }

    public stop(): void {
        this.sequencing = false;
    }

    public set tempo(tempo: number) {
        this._tempo = tempo;
        this.secondsPerBeat = 60 / this.tempo;
    }

    public get tempo(): number {
        return this._tempo;
    }

    private scheduler(): void {
        while (this.futureTickTime < this.audioSystem.audioContext().currentTime + 0.1) {
            this.futureTickTime += 0.25 * this.secondsPerBeat;
            this.pulse(this.current16thNote, this.futureTickTime);
            
            this.current16thNote++;
            if (this.current16thNote > 15)
                this.current16thNote = 0;
        }

        if (this.sequencing)
            this.timeoutHandle = window.setTimeout(() => this.scheduler(),  50.0);
    }
}