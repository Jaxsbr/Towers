import { Rectangle } from "./DataObjects/rectangle";

export class RenderEngine {
    private context: CanvasRenderingContext2D;

    constructor() {
        const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.context = gameCanvas.getContext('2d');
    }

    public clearRect(rect: Rectangle) {
        if (rect) { 
            this.context.clearRect(
                rect.left, 
                rect.top, 
                rect.width, 
                rect.height);
        }
    }

    public renderRect(rect: Rectangle, color: string, fill:boolean) {
        if (fill) {
            this.context.fillStyle = color;
            this.context.fillRect(rect.left, rect.top, rect.width, rect.height);
        }
        else {
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.strokeRect(rect.left, rect.top, rect.width, rect.height);            
        }
    }

    public renderText(text: string, x: number, y: number, color: string, fontSize: number, fontFamily: string) {        
        this.context.fillStyle = color;
        this.context.font = fontSize + 'px ' + fontFamily;
        this.context.fillText(text, x, y);
    }

    public renderImageRect(image: HTMLImageElement, bounds: Rectangle) {
        this.renderImage(image, bounds.left, bounds.top, bounds.width, bounds.height);
    }

    public renderImage(image: HTMLImageElement, x: number, y: number, width: number = null, height: number = null) {
        var w = width == null ? image.width : width;
        var h = height == null ? image.height : height;
        this.context.drawImage(image, x, y, w, h);
    }

    public renderImageSource(image: HTMLImageElement, sourceRect: Rectangle, destRect: Rectangle) {
        if (sourceRect.left < 0 || sourceRect.top < 0 || sourceRect.height <= 0 || sourceRect.height <= 0) { return; }                
        this.context.drawImage(
            image,
            sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height,
            destRect.left, destRect.top, destRect.width, destRect.height);           
    }

    public renderRotatedImageSource(image: HTMLImageElement, sourceRect: Rectangle, destRect: Rectangle, rotation: number = 0) {
        this.context.save();
        this.context.translate(destRect.getCenterWidth, destRect.getCenterWidth);
        this.context.rotate((rotation - 90) * (Math.PI / 180));

        var rotatedDestRect = new Rectangle(
            -((destRect.width) / 2),
            -((destRect.height) / 2),
            destRect.width,
            destRect.height);

        this.renderImageSource(
            image,
            sourceRect,
            rotatedDestRect);

        this.context.restore();
    }
}