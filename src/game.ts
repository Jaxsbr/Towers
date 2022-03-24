import { AssetManager } from './AssetLoading/assetManager';
import { GameTime } from './DataObjects/gameTime';
import { GameConfig } from './gameConfig';
import { RenderEngine } from './renderEngine';
import { SceneInterface } from './Scenes/scene.interface';
import { SceneManager } from './Scenes/sceneManager';
import { Scenes } from './Scenes/scenes.enum';
import { SoundEngine } from './soundEngine';

export class Game {
    public assetManager: AssetManager;

    public currentScene: SceneInterface;

    private running: boolean;

    constructor() {
        window.gameConfig = new GameConfig();
        window.renderEngine = new RenderEngine();
        window.assetManager = new AssetManager();
        window.assetManager.init();
        window.sceneManager = new SceneManager();
        window.sceneManager.toggleActiveScene(Scenes.loading);
        window.gameTime = new GameTime();
        window.mouseInfo = { x: 0, y: 0 };
        window.soundEffectQueue = [];
        window.soundEngine = new SoundEngine();

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
        Game.updateSoundEffectsQueue();

        requestAnimationFrame(() => this.loop());
    }

    static updateSoundEffectsQueue(): void {
        if (window.soundEffectQueue.length === 0) {
            return;
        }

        for (let index = 0; index < window.soundEffectQueue.length; index += 1) {
            const soundEffect = window.soundEffectQueue.pop();
            window.soundEngine.play(soundEffect);
        }
    }

    static mouseMove(event: any): void {
        window.mouseInfo = { x: event.x, y: event.y };
    }
}

window.addEventListener('load', () => {
    const game = new Game();
    game.start();
});
