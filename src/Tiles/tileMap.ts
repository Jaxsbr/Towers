import { GameScene } from "../Scenes/gameScene";
import { Rectangle } from "../DataObjects/rectangle";
import { ImageObject } from "../DataObjects/imageObject";
import { Tile } from "./tile";

export class TileMap {
    private bounds: Rectangle;
    private gameScene: GameScene;
    private tileImage: HTMLImageElement;
    private waterTile: Tile
    private pathTile: Tile;

    constructor(gameScene: GameScene, bounds: Rectangle, tileImage: HTMLImageElement) {
        this.gameScene = gameScene;
        this.bounds = bounds;
        this.tileImage = tileImage;

        this.initTiles();
    }

    private initTiles(): void {
        // TODO:
        // Initialize a tile matrix

        var waterTileImageObject = new ImageObject();
        waterTileImageObject.image = this.tileImage;
        waterTileImageObject.x = 0;
        waterTileImageObject.y = 0;
        waterTileImageObject.width = 64;
        waterTileImageObject.height = 64;
        waterTileImageObject.sx = 0;
        waterTileImageObject.sy = 0;
        waterTileImageObject.swidth = 32;
        waterTileImageObject.sheight = 32;

        var pathTileImageObject = new ImageObject();
        pathTileImageObject.image = this.tileImage;
        pathTileImageObject.x = 64;
        pathTileImageObject.y = 64;
        pathTileImageObject.width = 64;
        pathTileImageObject.height = 64;
        pathTileImageObject.sx = 32;
        pathTileImageObject.sy = 0;
        pathTileImageObject.swidth = 32;
        pathTileImageObject.sheight = 32;

        this.waterTile = new Tile(this.gameScene, null, waterTileImageObject);
        this.pathTile = new Tile(this.gameScene, null, pathTileImageObject);
    }

    public draw(): void {
        // TODO:
        // Draw tile matrix

        this.waterTile.draw();
        this.pathTile.draw();
    }
}