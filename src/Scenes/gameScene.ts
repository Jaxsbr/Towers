import { SceneInterface } from "./scene.interface";
import { Game } from "../game";
import { SceneManager } from "./sceneManager";
import { RenderEngine } from "../renderEngine";
import { Tile } from "../Tiles/tile";
import { ImageObject } from "../DataObjects/imageObject";

export class GameScene implements SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    backgroundImage: HTMLImageElement;
    tileImage: HTMLImageElement;
    waterTile: Tile;
    pathTile: Tile;
    
    constructor(game: Game, sceneManager: SceneManager, renderEngine: RenderEngine) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.renderEngine = renderEngine;
    }

    init(): void {
        this.backgroundImage = this.game.assetManager.getImage('background');
        this.tileImage = this.game.assetManager.getImage('tiles');

        this.initTiles();
    }

    initTiles(): void {
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

        this.waterTile = new Tile(this, null, waterTileImageObject);
        this.pathTile = new Tile(this, null, pathTileImageObject);
    }

    update(delta: number): void {
    }

    render(): void {
        this.renderEngine.clearRect(this.game.screenBounds);
        this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);
        this.waterTile.draw();
        this.pathTile.draw();
    }

    mouseDown(): void {
    }

    mouseUp(): void {
    }

    mouseMove(x: number, y: number): void {
    }
    
    resize(): void {
    }    
}