import { BaseTower, GameScene, Tile, Vector2 } from '../internal';

export class PlainTower extends BaseTower {
    private plainTowerShootSpeed = 250;

    private plainTowerShootRate = 0.7;

    private shootElapsed = 0;

    constructor(gameScene: GameScene, destinationTile: Tile, towerImage: HTMLImageElement) {
        super(gameScene, destinationTile, towerImage);
        this.gameScene = gameScene;
        super.shootRange = 128;
    }

    public update(delta: number): void {
        super.update(delta);

        this.updateShoot(delta);
    }

    private updateShoot(delta: number): void {
        this.shootElapsed += delta;
        if (this.targetInRange && this.shootElapsed >= this.plainTowerShootRate) {
            this.shootElapsed = 0;

            // console.log('shoot');

            const direction = this.target.center.subtract(this.center);
            const normalizedDirection = direction.normalize();

            this.gameScene.projectileEngine.activateProjectile(
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
