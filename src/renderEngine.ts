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

    public renderText(text: string, x: number, y: number) {

        // TODO:
        // Manage font family, style, size and color
        this.context.fillStyle = 'red';
        this.context.font = '20px Calibri';

        this.context.fillText(text, x, y);
    }

    renderImageRect(image: HTMLImageElement, bounds: Rectangle) {
        this.renderImage(image, bounds.left, bounds.top, bounds.width, bounds.height);
    }

    renderImage(image: HTMLImageElement, x: number, y: number, width: number = null, height: number = null) {
        var w = width == null ? image.width : width;
        var h = height == null ? image.height : height;
        this.context.drawImage(image, x, y, w, h);
    }

    renderImageSource(image: HTMLImageElement, sourceRect: Rectangle, destRect: Rectangle) {        
        if (sourceRect.left < 0 || sourceRect.top < 0 || sourceRect.height <= 0 || sourceRect.height <= 0) { return; }        
        
        this.context.drawImage(
            image,
            sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height,
            destRect.left, destRect.top, destRect.width, destRect.height);           
    }
}