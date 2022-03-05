import { GameScene, ImageObject, Rectangle } from '../internal';

export class Tile {
    public bounds: Rectangle;

    private gameScene: GameScene;

    private imageObject: ImageObject;

    private fontSize = 12;

    constructor(gameScene: GameScene, bounds: Rectangle, imageObject: ImageObject) {
        this.gameScene = gameScene;
        this.bounds = bounds;
        this.imageObject = imageObject;
    }

    public draw(col: number, row: number): void {
        this.gameScene.renderEngine.renderImageSource(
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
