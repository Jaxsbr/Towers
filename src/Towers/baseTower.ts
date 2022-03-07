import { Rectangle } from '../DataObjects/rectangle';
import { Vector2 } from '../DataObjects/vector2';
import { Enemy } from '../Enemies/enemy';
import { Tile } from '../Tiles/tile';

export abstract class BaseTower {
    public shootRange = 20000;

    public targetInRange: boolean;

    public targetDirection: Vector2;

    public destinationTile: Tile;

    public target: Enemy;

    public center: Vector2;

    private rotation: number;

    private towerImage: HTMLImageElement;

    private selected: boolean;

    constructor(destinationTile: Tile, towerImage: HTMLImageElement) {
        this.destinationTile = destinationTile;
        this.towerImage = towerImage;

        this.center = Vector2.empty;
    }

    public update(): void {
        this.center.x = this.destinationTile.bounds.getCenterWidth;
        this.center.y = this.destinationTile.bounds.getCenterHeight;
        this.destinationTile.bounds.update();

        this.updateTarget();
        this.updateTargetInRange();
        this.updateRotation();

        // console.log('targetInRange: ' + this.targetInRange);
    }

    public draw(): void {
        this.drawRange();

        // TODO:
        // Implement animation class and call draw
        // Animation class to handle source rect updates.
        const sourceRectangle = new Rectangle(0, 0, 32, 32);

        window.renderEngine.renderRotatedImageSource(
            this.towerImage,
            sourceRectangle,
            this.destinationTile.bounds,
            this.rotation
        );

        this.drawSelection();
    }

    public setSelection(selected: boolean): void {
        this.selected = selected;
    }

    private drawRange(): void {
        window.renderEngine.renderEllipse(
            this.center.x,
            this.center.y,
            'red',
            0.5,
            this.shootRange,
            false
        );
    }

    private drawSelection(): void {
        // TODO:
        // Draw any overlay selection effects
    }

    private updateTargetInRange(): void {
        if (this.target != null && this.target.active) {
            this.targetDirection = this.center.subtract(this.target.center);
            // console.log('target direction  y: ' + this.targetDirection.x + ' y: ' + this.targetDirection.y);
            const distance = this.targetDirection.magnitude();
            if (distance <= this.shootRange) {
                // console.log('ranged');
                this.targetInRange = true;
                return;
            }
        }

        this.targetInRange = false;
    }

    private updateRotation(): void {
        // Rotate the tower towards it's current target or
        // rotate to default position if no target exist or if target not in range.
        if (this.targetInRange) {
            const xDistance = this.target.center.x - this.center.x;
            const yDistance = this.target.center.y - this.center.y;
            this.rotation = Math.atan2(yDistance, xDistance) * (180 / Math.PI) - 270;
        }
        // else {
        //     if (this.rotation > 0) {
        //         this.rotation = this.rotation - 0.01;
        //     } else {
        //         this.rotation = -90;
        //     }
        // }
        // this.rotation = this.rotation - 270;
    }

    private updateTarget(): void {
        let distance = 0;
        let closestDistance = 99999;
        let closestEnemy: Enemy;

        for (let e = 0; e < window.enemySpawner.enemies.length; e += 1) {
            const enemy = window.enemySpawner.enemies[e];
            distance = enemy.center.distance(this.center);

            if (distance < closestDistance || closestEnemy == null) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }

        this.target = closestEnemy;
    }
}
