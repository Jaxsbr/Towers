import { SceneInterface } from "./scene.interface";
import { Game } from "../game";
import { SceneManager } from "./sceneManager";
import { RenderEngine } from "../renderEngine";
import { Tile } from "../Tiles/tile";
import { ImageObject } from "../DataObjects/imageObject";
import { TileMap } from "../Tiles/tileMap";

export class GameScene implements SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    backgroundImage: HTMLImageElement;
    tileMap: TileMap;
    tileImage: HTMLImageElement;
    
    constructor(game: Game, sceneManager: SceneManager, renderEngine: RenderEngine) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.renderEngine = renderEngine;
    }

    init(): void {
        this.backgroundImage = this.game.assetManager.getImage('background');
        this.tileImage = this.game.assetManager.getImage('tiles');
        this.tileMap = new TileMap(this, this.game.screenBounds, this.tileImage);
    }

    update(delta: number): void {
    }

    render(): void {
        this.renderEngine.clearRect(this.game.screenBounds);
        this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);        
        this.tileMap.draw();
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