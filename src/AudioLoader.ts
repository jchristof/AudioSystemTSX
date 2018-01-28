export default class AudioLoader {
    private context: AudioContext;
    private audioMap: Map<string, AudioBufferSourceNode>;

    constructor() {
        this.context = new ((window as any).AudioContext || (window as any).webkitAudioContext)() as AudioContext;
        this.audioMap = new Map();
    }

    audio(name: string): AudioBuffer {
        return this.audioMap[name];
    }

    async load(name: string, source: string) {
        const response = await fetch(source);
        const buffer = await response.arrayBuffer();
        this.audioMap[name] = await this.decode(buffer);
    }

    private decode(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
        return new Promise((resolve, reject) => {
            try {
                this.context.decodeAudioData(arrayBuffer, (audiobuffer: AudioBuffer) => {
                    resolve(audiobuffer);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}