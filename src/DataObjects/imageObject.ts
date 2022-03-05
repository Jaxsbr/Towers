import { Rectangle } from './rectangle';

export class ImageObject {
    public image: HTMLImageElement;

    public x: number;

    public y: number;

    public width: number;

    public height: number;

    public sx: number;

    public sy: number;

    public swidth: number;

    public sheight: number;

    private sourceRect: Rectangle = null;

    private destinationRect: Rectangle = null;

    public get sourceRectangle(): Rectangle {
        if (this.sourceRect == null) {
            this.sourceRect = new Rectangle(this.sx, this.sy, this.swidth, this.sheight);
        }

        return this.sourceRect;
    }

    public get destinationRectangle(): Rectangle {
        if (this.destinationRect == null) {
            this.destinationRect = new Rectangle(this.x, this.y, this.width, this.height);
        }

        return this.destinationRect;
    }
}
