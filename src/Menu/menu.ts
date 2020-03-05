import { GameScene } from "../Scenes/gameScene";

export class Menu {

    public stagedTowerImageWidth: number = 48;
    public stagedTowerImageHeight: number = 48;

    private plainTowerImage: HTMLImageElement;
    private slowTowerImage: HTMLImageElement;
    private gameScene: GameScene;
    private stagedTower: string;    

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

    public draw(): void {
        // TODO: Refactor this, code being duplicated here when only image changes        

        // TODO: Fix staged image render layout
        // Behavoir: The staged tower renders it's top/left on the mouse pointer. 
        //           On clicking, the tower can be placed on an adjacent tile to the expected tile.
        // Fix: Render the staged tower image's center over the mouse pointer.

        if (!this.gameScene.mouseInfo) { return; }
        
        const tX = this.gameScene.mouseInfo.x - (this.stagedTowerImageWidth / 2);
        const tY = this.gameScene.mouseInfo.y - (this.stagedTowerImageHeight);

        switch (this.stagedTower) {
            case 'plain':
                    this.gameScene.renderEngine.renderImage(this.plainTowerImage, tX, tY, this.stagedTowerImageWidth, this.stagedTowerImageHeight);
                break;
            case 'slow':
                    this.gameScene.renderEngine.renderImage(this.slowTowerImage, this.gameScene.mouseInfo.x, this.gameScene.mouseInfo.y, this.stagedTowerImageWidth, this.stagedTowerImageHeight);
                break;
            default:
                    
                break;
        }        
    }
}