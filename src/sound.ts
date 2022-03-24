export class Sound {
    private audio: any;

    private active: boolean;

    private loaded: boolean;

    constructor() {
        this.active = false;
        this.loaded = false;
        this.audio = new Audio();
        this.audio.addEventListener('loadeddata', () => {
            this.loaded = true;
        });
        this.audio.addEventListener('ended', () => {
            this.active = false;
        });
    }

    public reset(url: string, playbackRate: number, loop: boolean): void {
        this.pause();
        this.loaded = false;
        this.audio.playbackRate = playbackRate;
        this.audio.loop = loop;
        this.audio.src = url;
    }

    public play(): void {
        this.audio.play();
        this.active = true;
    }

    public pause(): void {
        this.audio.pause();
        this.active = false;
    }

    public isActive(): boolean {
        return this.active;
    }

    public isLoaded(): boolean {
        return this.loaded;
    }
}
