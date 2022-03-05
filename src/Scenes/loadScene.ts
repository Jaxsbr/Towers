import {
    AssetManager,
    Game,
    MouseInfo,
    Rectangle,
    RenderEngine,
    SceneInterface,
    SceneManager,
    Scenes
} from '../internal';

export class LoadScene implements SceneInterface {
    game: Game;

    sceneManager: SceneManager;

    renderEngine: RenderEngine;

    mouseInfo: MouseInfo;

    constructor(game: Game, sceneManager: SceneManager, renderEngine: RenderEngine) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.renderEngine = renderEngine;
    }

    init(): void {}

    update(delta: number): void {
        this.game.assetManager.update();
        if (this.game.assetManager.loadCompleted) {
            // TODO:
            // Implement an global enum for scenes.
            // Make game and load scene private in Game class.
            this.sceneManager.toggleActiveScene(Scenes.game);
        }
    }

    render(): void {
        this.renderEngine.renderRect(new Rectangle(0, 0, 800, 480), 'black', true);
    }

    mouseDown(): void {}

    mouseUp(): void {}

    mouseMove(x: number, y: number): void {}

    resize(): void {}
}
