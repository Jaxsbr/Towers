import { GameScene } from "../Scenes/gameScene";

export class Menu {

    public stagedTowerImageWidth: number = 48;
    public stagedTowerImageHeight: number = 48;

    private plainTowerImage: HTMLImageElement;
    private slowTowerImage: HTMLImageElement;
    private gameScene: GameScene;
    private stagedTower: string;
    private mouseX: number = 0;
    private mouseY: number = 0;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        window.addEventListener('plainTowerClicked', () => { this.towerClicked("plain"); } );
        window.addEventListener('slowTowerClicked', () => { this.towerClicked("slow"); } );

        this.plainTowerImage = this.gameScene.game.assetManager.getImage("towerplain");
        this.slowTowerImage = this.gameScene.game.assetManager.getImage("towerslow");
    }

    public clearStagedTower(): void {
        this.stagedTower = '';
    }

    private towerClicked(type: string): void {       
        this.stagedTower = type;
        
    }

    public updateMouse(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
    }    

    public draw(): void {
        switch (this.stagedTower) {
            case 'plain':
                    this.gameScene.renderEngine.renderImage(this.plainTowerImage, this.mouseX, this.mouseY, this.stagedTowerImageWidth, this.stagedTowerImageHeight);
                break;
            case 'slow':
                    this.gameScene.renderEngine.renderImage(this.slowTowerImage, this.mouseX, this.mouseY, this.stagedTowerImageWidth, this.stagedTowerImageHeight);
                break;
            default:
                    
                break;
        }        
    }
}