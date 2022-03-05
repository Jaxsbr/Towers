export class ImageAsset {
    public loaded: boolean;

    public image: HTMLImageElement;

    public key: string;

    src: string;

    constructor(key: string, src: string) {
        this.loaded = false;
        this.key = key;
        this.src = src;
    }

    init(): void {
        this.image = new Image();
        this.image.onload = (): void => {
            this.loaded = true;
        };
        this.image.src = this.src;
    }
}
