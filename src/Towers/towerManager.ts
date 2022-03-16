import { Rectangle } from '../DataObjects/rectangle';
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

    public isTileEmpty(tileBounds: Rectangle): boolean {
        const tileEmpty =
            this.towers.filter(
                t =>
                    t.destinationTile.bounds.left === tileBounds.left &&
                    t.destinationTile.bounds.top === tileBounds.top
            ).length === 0;
        return tileEmpty;
    }

    public createTower(destinationTile: Tile): void {
        this.towers.push(new PlainTower(destinationTile, this.towerImage));
    }

    public mouseDown(mouseRect: Rectangle): void {
        this.selectTower(mouseRect);
    }

    private selectTower(mouseRect: Rectangle): void {
        for (let i = 0; i < this.towers.length; i += 1) {
            const tower = this.towers[i];
            if (tower.destinationTile.bounds.containsRect(mouseRect)) {
                tower.setSelection(true);
            } else {
                tower.setSelection(false);
            }
        }
    }
}
