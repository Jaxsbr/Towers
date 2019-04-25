import { SceneInterface } from "./scene.interface";
import { Game } from "../game";

export class SceneManager {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    public toggleActiveScene(newScene: SceneInterface): void {
        if (newScene) {
            this.game.currentScene = newScene;            
            this.game.currentScene.init();
        }
        else {
            console.error('invalid scene passed');
        }
    }
}