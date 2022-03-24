import { Rectangle } from '../DataObjects/rectangle';
import { SceneInterface } from './scene.interface';
import { Scenes } from './scenes.enum';

export class LoadScene implements SceneInterface {
    private loadScreenRect: Rectangle;

    private loadingText: string;

    private towerMenu: HTMLElement;

    constructor() {
        this.loadScreenRect = window.gameConfig.loadScreenRect;
    }

    init(): void {
        this.towerMenu = document.getElementById('tower_menu');
        window.addEventListener('mousedown', () => {
            this.mouseDown();
        });
    }

    update(): void {
        if (window.assetManager.loadCompleted) {
            this.loadingText = 'Tap To Play';
        } else {
            this.loadingText = `Loading ${window.assetManager.loadedAssetCount}/${window.assetManager.totalAssets}`;
        }

        window.assetManager.update();
    }

    render(): void {
        window.renderEngine.renderRect(this.loadScreenRect, 'black', true);
        window.renderEngine.renderText(this.loadingText, 50, 100, 'yellow', 30, 'impact');
    }

    mouseDown(): void {
        if (window.assetManager.loadCompleted) {
            this.towerMenu.classList.remove('collapsed');
            window.removeEventListener('mousedown', () => {
                this.mouseDown();
            });
            window.sceneManager.toggleActiveScene(Scenes.game);
        }
    }

    mouseUp(): void {}

    mouseMove(x: number, y: number): void {}

    resize(): void {}
}
