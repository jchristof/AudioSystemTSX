import AudioSystem from '../AudioSystem';

export default class AnalyzerModel {
    private readonly audioNode: AudioNode;
    private readonly analyserNode: AnalyserNode;
    private dataArray: Uint8Array;

    constructor(audiosystem: AudioSystem) {
        this.audioNode = audiosystem.channelInput();
        this.analyserNode = audiosystem.audioContext().createAnalyser();
        this.audioNode.connect(this.analyserNode);

        this.analyserNode.fftSize = 2048;
        let bufferArray = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferArray);
    }

    getBufferSize() {
        return this.analyserNode.frequencyBinCount;
    }

    getDataArray(): Uint8Array {
        this.analyserNode.getByteTimeDomainData(this.dataArray);
        return this.dataArray;
    }
}