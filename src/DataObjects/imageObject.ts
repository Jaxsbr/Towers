import { Rectangle } from "./rectangle";

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

    private _sourceRectangle: Rectangle = null;
    private _destinationRectangle: Rectangle = null;

    public get sourceRectangle(): Rectangle {
        if (this._sourceRectangle == null) {
            this._sourceRectangle = new Rectangle(
                this.sx,
                this.sy,
                this.swidth,
                this.sheight);
        }

        return this._sourceRectangle;
    }

    public get destinationRectangle(): Rectangle {
        if (this._destinationRectangle == null) {
            this._destinationRectangle = new Rectangle(
                this.x,
                this.y,
                this.width,
                this.height);
        }

        return this._destinationRectangle;
    }
}