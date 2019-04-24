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

    // renderText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {

    //     // TODO:
    //     // Manage font family, style, size and color
    //     context.fillStyle = 'red';
    //     context.font = '20px Calibri';

    //     context.fillText(text, x, y);
    // }

    // renderImageRect(context: CanvasRenderingContext2D, image: HTMLImageElement, bounds: Rectangle) {
    //     this.renderImage(context, image, bounds.x, bounds.y, bounds.width, bounds.height);
    // }

    // renderImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number = null, height: number = null) {
    //     var w = width == null ? image.width : width;
    //     var h = height == null ? image.height : height;
    //     context.drawImage(image, x, y, w, h);
    // }

    // renderImageSource(context: CanvasRenderingContext2D, image: HTMLImageElement, sourceRect: Rectangle, destRect: Rectangle) {        
    //     if (sourceRect.x < 0 || sourceRect.y < 0 || sourceRect.height <= 0 || sourceRect.height <= 0) { return; }        
        
    //     context.drawImage(
    //         image,
    //         sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
    //         destRect.x, destRect.y, destRect.width, destRect.height);           
    // }
}