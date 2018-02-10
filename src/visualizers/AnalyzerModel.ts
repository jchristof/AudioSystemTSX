
export default class AnalyzerModel {
    private dataArray: Uint8Array;

    constructor(private audioNode: AudioNode, private analyserNode: AnalyserNode, fftSize: number) {
        this.audioNode.connect(this.analyserNode);

        this.analyserNode.fftSize = fftSize;
        const bufferArraySize = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferArraySize);
        console.log(`analyser buffer size ${bufferArraySize}`);
    }

    getBufferSize() {
        return this.analyserNode.frequencyBinCount;
    }

    getDataArray(): Uint8Array {
        this.analyserNode.getByteTimeDomainData(this.dataArray);
        return this.dataArray;
    }
}