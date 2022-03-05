import { Game, GameScene, LoadScene, RenderEngine, SceneInterface, Scenes } from '../internal';

export class SceneManager {
    game: Game;

    private loadScene: LoadScene;

    private gameScene: GameScene;

    private renderEngine: RenderEngine;

    constructor(game: Game, renderEngine: RenderEngine) {
        this.game = game;
        this.renderEngine = renderEngine;

        // TODO:
        // Inject depependencies, no initialization
        this.loadScene = new LoadScene(this.game, this, this.renderEngine);
        this.gameScene = new GameScene(this.game, this, this.renderEngine);
    }

    public toggleActiveScene(newScene: Scenes): void {
        switch (+newScene) {
            case Scenes.loading:
                this.game.currentScene = this.loadScene;
                break;
            case Scenes.game:
                this.game.currentScene = this.gameScene;
                break;
        }
        this.game.currentScene.init();
    }
}
