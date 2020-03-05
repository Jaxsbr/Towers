import { GameScene } from "../Scenes/gameScene";
import { Rectangle } from "../DataObjects/rectangle";
import { ImageObject } from "../DataObjects/imageObject";

export class Tile {
    public bounds: Rectangle;
    private gameScene: GameScene;
    private imageObject: ImageObject;
    private fontSize: number = 12;

    constructor(gameScene: GameScene, bounds: Rectangle, imageObject: ImageObject) {
        this.gameScene = gameScene;
        this.bounds = bounds;
        this.imageObject = imageObject;
    }

    public draw(col: number, row: number): void {
        this.gameScene.renderEngine.renderImageSource(
            this.imageObject.image,
            this.imageObject.sourceRectangle,
            this.imageObject.destinationRectangle);       
            

        // this.gameScene.renderEngine.renderText(
        //     col + '_' + row, 
        //     this.bounds.left,
        //     this.bounds.top + this.fontSize,
        //     'black',
        //     this.fontSize,
        //     'Calibri');
    }
}