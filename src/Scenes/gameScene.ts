import { SceneInterface } from "./scene.interface";
import { Game } from "../game";
import { SceneManager } from "./sceneManager";
import { RenderEngine } from "../renderEngine";

export class GameScene implements SceneInterface {
    game: Game;
    sceneManger: SceneManager;
    renderEngine: RenderEngine;
    backgroundImage: HTMLImageElement;
    
    constructor(game: Game, sceneManger: SceneManager, renderEngine: RenderEngine) {
        this.game = game;
        this.sceneManger = sceneManger;
        this.renderEngine = renderEngine;
    }

    init(): void {
        this.backgroundImage = this.game.assetManager.getImage('background');
    }

    update(delta: number): void {
    }

    render(): void {
        this.renderEngine.clearRect(this.game.screenBounds);
        this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);
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