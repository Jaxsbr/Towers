import {
    AssetManager,
    GameTime,
    RenderEngine,
    SceneInterface,
    SceneManager,
    Scenes
} from './internal';

export class Game {
    public assetManager: AssetManager;

    public currentScene: SceneInterface;

    private running: boolean;

    constructor() {
        window.renderEngine = new RenderEngine();
        window.assetManager = new AssetManager();
        window.assetManager.init();
        window.sceneManager = new SceneManager();
        window.sceneManager.toggleActiveScene(Scenes.loading);
        window.gameTime = new GameTime();

        window.addEventListener('mousemove', e => {
            Game.mouseMove(e);
        });
    }

    public start(): void {
        if (this.running) {
            return;
        }

        this.running = true;
        this.loop();
    }

    private loop(): void {
        window.gameTime.update();

        if (window.sceneManager) {
            window.sceneManager.update();
            window.sceneManager.render();
        }

        requestAnimationFrame(() => this.loop());
    }

    static mouseMove(event: any): void {
        window.mouseInfo = { x: event.x, y: event.y };
    }
}

window.addEventListener('load', () => {
    const game = new Game();
    game.start();
});
