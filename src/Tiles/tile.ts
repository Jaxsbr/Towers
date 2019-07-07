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
        this.imageObject.destinationRectangle.update();
    }

    public draw(col: number, row: number): void {
        this.gameScene.renderEngine.renderImageSource(
            this.imageObject.image,
            this.imageObject.sourceRectangle,
            this.imageObject.destinationRectangle);       
            
        this.gameScene.renderEngine.renderText(
            col + '_' + row, 
            this.imageObject.destinationRectangle.left,
            this.imageObject.destinationRectangle.top + this.fontSize,
            'black',
            this.fontSize,
            'Calibri');
    }
}