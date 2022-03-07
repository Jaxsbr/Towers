import { Vector2 } from '../DataObjects/vector2';
import { Tile } from '../Tiles/tile';
import { BaseTower } from './baseTower';

export class PlainTower extends BaseTower {
    private plainTowerShootSpeed = window.gameConfig.plainTowerShootSpeed;

    private plainTowerShootRate = window.gameConfig.plainTowerShootRate;

    private shootElapsed = 0;

    private accuracyEnabled = true;

    constructor(destinationTile: Tile, towerImage: HTMLImageElement) {
        super(destinationTile, towerImage);
        super.shootRange = window.gameConfig.plainTowerShootRange;
    }

    public update(): void {
        super.update();

        this.updateShoot();
    }

    private updateShoot(): void {
        const { delta } = window.gameTime;
        this.shootElapsed += delta;
        if (this.targetInRange && this.shootElapsed >= this.plainTowerShootRate) {
            this.shootElapsed = 0;
            let direction = Vector2.empty;

            if (this.accuracyEnabled) {
                direction = this.target.futurePosition.subtract(this.center);
            } else {
                direction = this.target.center.subtract(this.center);
            }

            const normalizedDirection = direction.normalize();
            window.projectileEngine.activateProjectile(
                this.center,
                normalizedDirection,
                this.plainTowerShootSpeed
            );
        }
    }

    public draw(): void {
        super.draw();
    }
}
