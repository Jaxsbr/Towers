import { Rectangle } from './DataObjects/rectangle';

export class RenderEngine {
    private context: CanvasRenderingContext2D;

    constructor() {
        const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.context = gameCanvas.getContext('2d');
    }

    public clearRect(rect: Rectangle): void {
        if (rect) {
            this.context.clearRect(rect.left, rect.top, rect.width, rect.height);
        }
    }

    public renderRect(rect: Rectangle, color: string, fill: boolean): void {
        const originalFillStyle = this.context.fillStyle;
        const originalStrokeStyle = this.context.strokeStyle;

        if (fill) {
            this.context.fillStyle = color;
            this.context.fillRect(rect.left, rect.top, rect.width, rect.height);
        } else {
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.strokeRect(rect.left, rect.top, rect.width, rect.height);
        }

        this.context.fillStyle = originalFillStyle;
        this.context.strokeStyle = originalStrokeStyle;
    }

    public renderText(
        text: string,
        x: number,
        y: number,
        color: string,
        fontSize: number,
        fontFamily: string
    ): void {
        this.context.fillStyle = color;
        this.context.font = `${fontSize}px ${fontFamily}`;
        this.context.fillText(text, x, y);
    }

    public renderImageRect(image: HTMLImageElement, bounds: Rectangle): void {
        this.renderImage(image, bounds.left, bounds.top, bounds.width, bounds.height);
    }

    public renderImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number = null,
        height: number = null
    ): void {
        const w = width == null ? image.width : width;
        const h = height == null ? image.height : height;
        this.context.drawImage(image, x, y, w, h);
    }

    public renderImageSource(
        image: HTMLImageElement,
        sourceRect: Rectangle,
        destRect: Rectangle
    ): void {
        if (
            sourceRect.left < 0 ||
            sourceRect.top < 0 ||
            sourceRect.height <= 0 ||
            sourceRect.height <= 0
        ) {
            return;
        }
        this.context.drawImage(
            image,
            sourceRect.left,
            sourceRect.top,
            sourceRect.width,
            sourceRect.height,
            destRect.left,
            destRect.top,
            destRect.width,
            destRect.height
        );
    }

    public renderRotatedImageSource(
        image: HTMLImageElement,
        sourceRect: Rectangle,
        destRect: Rectangle,
        rotation = 0
    ): void {
        this.context.save();
        this.context.translate(destRect.getCenterWidth, destRect.getCenterHeight);
        this.context.rotate((rotation - 90) * (Math.PI / 180));

        const rotatedDestRect = new Rectangle(
            -(destRect.width / 2),
            -(destRect.height / 2),
            destRect.width,
            destRect.height
        );

        this.renderImageSource(image, sourceRect, rotatedDestRect);

        this.context.restore();
    }

    public renderEllipse(
        centerX: number,
        centerY: number,
        color: string,
        opacity: number,
        radius: number,
        fill: boolean
    ): void {
        this.context.save();
        this.context.globalAlpha = opacity;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.ellipse(centerX, centerY, radius, radius, Math.PI / 4, 0, 2 * Math.PI);

        if (fill) {
            this.context.fill();
        } else {
            this.context.stroke();
        }
        this.context.restore();
    }
}
