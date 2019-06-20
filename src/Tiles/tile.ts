import { GameScene } from "../Scenes/gameScene";
import { Rectangle } from "../DataObjects/rectangle";
import { ImageObject } from "../DataObjects/imageObject";

export class Tile {
    public bounds: Rectangle;
    private gameScene: GameScene;
    private imageObject: ImageObject;

    constructor(gameScene: GameScene, bounds: Rectangle, imageObject: ImageObject) {
        this.gameScene = gameScene;
        this.bounds = bounds;
        this.imageObject = imageObject;
    }

    public draw(): void {
        this.gameScene.renderEngine.renderImageSource(
            this.imageObject.image,
            this.imageObject.sourceRectangle,
            this.imageObject.destinationRectangle);        
    }
}