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
        let visibleInfo = false;
        let selectedTower: BaseTower = null;

        for (let i = 0; i < this.towers.length; i += 1) {
            const tower = this.towers[i];
            if (tower.destinationTile.bounds.containsRect(mouseRect)) {
                tower.setSelection(true);
                visibleInfo = true;
                selectedTower = tower;
            } else {
                tower.setSelection(false);
            }
        }

        TowerManager.setSelectionInfo(visibleInfo, selectedTower);
    }

    static setSelectionInfo(visible: boolean, selectedTower: BaseTower): void {
        const infoPane = document.getElementById('info_pane');

        if (visible) {
            infoPane.classList.remove('hidden');
        } else {
            infoPane.classList.add('hidden');
            return;
        }

        if (selectedTower) {
            const infoImg = document.getElementById('info_img') as HTMLImageElement;
            // TODO: Once more tower types are added, use type to find correct tower image.
            infoImg.src = window.assetManager.getImage('towerplain').src;

            // TODO: Once more tower types are added, use type to find correct tower text.
            const infoText = document.getElementById('info_text');
            infoText.innerText = 'Plain Tower';
        }
    }
}
