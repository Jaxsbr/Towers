import { ImageKeyPair } from '../Types/imageKeyPair';

export class Menu {
    public stagedTowerImageWidth = window.gameConfig.menuStagedTowerImageWidth;

    public stagedTowerImageHeight = window.gameConfig.menuStagedTowerImageHeight;

    private imageDictionary: ImageKeyPair[];

    private stagedTower: string;

    public menuHeight: number;

    public hasStagedTower = false;

    constructor() {
        window.addEventListener('plainTowerClicked', () => {
            this.towerClicked('plain');
        });
        window.addEventListener('slowTowerClicked', () => {
            this.towerClicked('slow');
        });
        this.menuHeight = document.getElementById('tower_menu').clientHeight;

        this.imageDictionary = [
            { key: 'plain', image: window.assetManager.getImage('towerplain') },
            { key: 'slow', image: window.assetManager.getImage('towerslow') }
        ];
    }

    public clearStagedTower(): void {
        this.stagedTower = '';
        this.hasStagedTower = false;
    }

    private towerClicked(type: string): void {
        this.stagedTower = type;
        this.hasStagedTower = true;
    }

    public draw(): void {
        if (!window.mouseInfo || !this.stagedTower) {
            return;
        }

        const tX = window.mouseInfo.x - this.stagedTowerImageWidth / 2;
        const tY = window.mouseInfo.y - this.stagedTowerImageHeight / 2 - this.menuHeight;

        const { image } = this.imageDictionary.find(x => x.key === this.stagedTower);
        window.renderEngine.renderImage(
            image,
            tX,
            tY,
            this.stagedTowerImageWidth,
            this.stagedTowerImageHeight
        );
    }
}
