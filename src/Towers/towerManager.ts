import { BaseTower, GameScene, PlainTower, Tile } from '../internal';

export class TowerManager {
    public towers: BaseTower[] = [];

    private gameScene: GameScene;

    private towerImage: HTMLImageElement;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        this.towerImage = this.gameScene.game.assetManager.getImage('towerplain');
    }

    public update(delta: number): void {
        this.towers.forEach(tower => {
            tower.update(delta);
        });
    }

    public draw(): void {
        this.towers.forEach(tower => {
            tower.draw();
        });
    }

    public createTower(destinationTile: Tile): void {
        this.towers.push(new PlainTower(this.gameScene, destinationTile, this.towerImage));
    }
}
