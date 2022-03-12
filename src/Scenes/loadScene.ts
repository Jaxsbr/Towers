import { Rectangle } from '../DataObjects/rectangle';
import { SceneInterface } from './scene.interface';
import { Scenes } from './scenes.enum';

export class LoadScene implements SceneInterface {
    private loadScreenRect: Rectangle;

    private loadingText: string;

    constructor() {
        this.loadScreenRect = window.gameConfig.loadScreenRect;
    }

    init(): void {}

    update(): void {
        this.loadingText = `${window.assetManager.loadedAssetCount}/${window.assetManager.totalAssets}`;
        window.assetManager.update();
        if (window.assetManager.loadCompleted) {
            window.sceneManager.toggleActiveScene(Scenes.game);
        }
    }

    render(): void {
        window.renderEngine.renderText(this.loadingText, 0, 0, 'blue', 30, 'impact');
        window.renderEngine.renderRect(this.loadScreenRect, 'black', true);
    }

    mouseDown(): void {}

    mouseUp(): void {}

    mouseMove(x: number, y: number): void {}

    resize(): void {}
}
