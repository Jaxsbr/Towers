import { BaseTower, Tile } from '../internal';

export class PlainTower extends BaseTower {
    private plainTowerShootSpeed = 250;

    private plainTowerShootRate = 0.7;

    private shootElapsed = 0;

    constructor(destinationTile: Tile, towerImage: HTMLImageElement) {
        super(destinationTile, towerImage);
        super.shootRange = 128;
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

            // console.log('shoot');

            const direction = this.target.center.subtract(this.center);
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
