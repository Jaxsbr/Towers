import { ImageObject } from '../DataObjects/imageObject';
import { Rectangle } from '../DataObjects/rectangle';

export class Tile {
    public bounds: Rectangle;

    private imageObject: ImageObject;

    private fontSize = 12;

    constructor(bounds: Rectangle, imageObject: ImageObject) {
        this.bounds = bounds;
        this.imageObject = imageObject;
    }

    public draw(col: number, row: number): void {
        window.renderEngine.renderImageSource(
            this.imageObject.image,
            this.imageObject.sourceRectangle,
            this.imageObject.destinationRectangle
        );

        // this.gameScene.renderEngine.renderText(
        //     col + '_' + row,
        //     this.bounds.left,
        //     this.bounds.top + this.fontSize,
        //     'black',
        //     this.fontSize,
        //     'Calibri');
    }
}
