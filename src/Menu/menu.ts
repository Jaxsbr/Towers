import { GameScene, ImageKeyPair } from '../internal';

export class Menu {
    public stagedTowerImageWidth = 48;

    public stagedTowerImageHeight = 48;

    private imageDictionary: ImageKeyPair[];

    private gameScene: GameScene;

    private stagedTower: string;

    private menuHeight: number;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        window.addEventListener('plainTowerClicked', () => {
            this.towerClicked('plain');
        });
        window.addEventListener('slowTowerClicked', () => {
            this.towerClicked('slow');
        });
        this.menuHeight = document.getElementById('tower_menu').clientHeight;

        this.imageDictionary = [
            { key: 'plain', image: this.gameScene.game.assetManager.getImage('towerplain') },
            { key: 'slow', image: this.gameScene.game.assetManager.getImage('towerslow') }
        ];
    }

    public clearStagedTower(): void {
        this.stagedTower = '';
    }

    private towerClicked(type: string): void {
        this.stagedTower = type;
    }

    public draw(): void {
        if (!this.gameScene.mouseInfo || !this.stagedTower) {
            return;
        }

        const tX = this.gameScene.mouseInfo.x - this.stagedTowerImageWidth / 2;
        const tY = this.gameScene.mouseInfo.y - this.stagedTowerImageHeight / 2 - this.menuHeight;

        const { image } = this.imageDictionary.find(x => x.key == this.stagedTower);
        this.gameScene.renderEngine.renderImage(
            image,
            tX,
            tY,
            this.stagedTowerImageWidth,
            this.stagedTowerImageHeight
        );
    }
}
