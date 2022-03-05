import { GameScene } from './gameScene';
import { LoadScene } from './loadScene';
import { SceneInterface } from './scene.interface';
import { Scenes } from './scenes.enum';

export class SceneManager {
    private currentScene: SceneInterface;

    private loadScene: LoadScene;

    private gameScene: GameScene;

    constructor() {
        // TODO:
        // Inject depependencies, no initialization
        this.loadScene = new LoadScene();
        this.gameScene = new GameScene();
    }

    public toggleActiveScene(newScene: Scenes): void {
        if (newScene === Scenes.loading) {
            this.currentScene = this.loadScene;
        }

        if (newScene === Scenes.game) {
            this.currentScene = this.gameScene;
        }

        this.currentScene.init();
    }

    public update(): void {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    public render(): void {
        if (this.currentScene) {
            this.currentScene.render();
        }
    }
}
