import { Tile } from '../Tiles/tile';
import { BaseTower } from './baseTower';
import { PlainTower } from './plainTower';

export class TowerManager {
    public towers: BaseTower[] = [];

    private towerImage: HTMLImageElement;

    constructor() {
        this.towerImage = window.assetManager.getImage('towerplain');
    }

    public update(): void {
        this.towers.forEach(tower => {
            tower.update();
        });
    }

    public draw(): void {
        this.towers.forEach(tower => {
            tower.draw();
        });
    }

    public createTower(destinationTile: Tile): void {
        this.towers.push(new PlainTower(destinationTile, this.towerImage));
    }
}
