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
        const tileEmpty =
            this.towers.filter(
                t =>
                    t.destinationTile.bounds.left === destinationTile.bounds.left &&
                    t.destinationTile.bounds.top === destinationTile.bounds.top
            ).length === 0;

        if (tileEmpty) {
            this.towers.push(new PlainTower(destinationTile, this.towerImage));
            console.log(
                `tileX:${destinationTile.bounds.left} tileY:${destinationTile.bounds.top} destTile:${destinationTile.bounds}`
            );
        }
    }
}
