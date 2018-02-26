import AudioSystem from '../AudioSystem';

export default class SequencerTimer {
    private _tempo = 120.0;
    private current16thNote = 0;
    private futureTickTime: number;
    private secondsPerBeat = 60 / this.tempo;
    private timerWorker: any;

    private readonly audioSystem: AudioSystem;
    private timeoutHandle: number;
    private sequencing = false;

    pulse: (beat: number, tick: number) => void = (beat, tick) => { console.log('ticking default pulse'); };

    constructor(audioSystem: AudioSystem) {
        this.audioSystem = audioSystem;
        this.futureTickTime = audioSystem.audioContext().currentTime;

        this.timerWorker = new Worker('timerworker.js');
        this.installworker();
        this.timerWorker.postMessage('start');
        console.log(this.timeoutHandle);
    }

    public start(): void {
        console.log('start squencing');
        this.sequencing = true;
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

    public installworker() {
        this.timerWorker.onmessage = (e) => {
            if (e.data === 'tick') {
                console.log('tick!');
                this.scheduler();
            }
            else
                console.log('message: ' + e.data);
        };
        this.timerWorker.postMessage({'interval': 50});
    }

    private scheduler(): void {
        if (!this.sequencing)
            return;

        while (this.futureTickTime < this.audioSystem.audioContext().currentTime + 0.1) {
            this.futureTickTime += 0.25 * this.secondsPerBeat;
            this.pulse(this.current16thNote, this.futureTickTime);
            
            this.current16thNote++;
            if (this.current16thNote > 15)
                this.current16thNote = 0;
        }
    }
}