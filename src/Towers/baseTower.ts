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

    private rotation = 0;

    private towerImage: HTMLImageElement;

    private selected: boolean;

    private southAngle = 180;

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

        window.renderEngine.renderText(
            `hasTarget: ${this.target ? 'yes' : 'no'}`,
            64,
            64,
            'red',
            32,
            'impact'
        );

        window.renderEngine.renderText(`rotation: ${this.rotation}`, 64, 96, 'red', 32, 'impact');
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
            const distance = this.targetDirection.magnitude();
            if (distance <= this.shootRange) {
                this.targetInRange = true;
                return;
            }
        }

        this.targetInRange = false;
    }

    private updateRotation(): void {
        // Rotate the tower towards it's current target or
        // rotate to default position if no target exist or if target not in range.

        // Apperantly rotaion can be negative value. e.g. -100
        // This depends on which direction the tower moves
        // e.g. start at 0 move clockwise results in positive value 0 to 360
        // e.g. start at 0 move counter clockwise results in negative value 0 to -360

        // The rotation value can also get greater than 360 of smaller that -360
        // thus we have to stop and reset rotation at these points

        if (!this.target) {
            //this.calculateRotation(new Vector2(0, -1));
            if (this.rotation < -180 && this.rotation > -360) {
                // Reset rotation by moving tower counter clockwise
                this.rotation -= 1.5;
            } else if (this.rotation > -180 && this.rotation < 0) {
                // Reset rotation by moving tower clockwise
                this.rotation += 1.5;
            }
            return;
        }

        if (this.targetInRange) {
            this.calculateRotation(
                new Vector2(
                    this.target.center.x - this.center.x,
                    this.target.center.y - this.center.y
                )
            );
        }
    }

    private calculateRotation(distance: Vector2): void {
        this.rotation = Math.atan2(distance.y, distance.x) * (180 / Math.PI) - 180;
    }

    private updateTarget(): void {
        let distance = 0;
        let closestDistance = 99999;
        let closestEnemy: Enemy;

        const livingEnemies = window.enemySpawner.enemies.filter(e => e.active);
        for (let e = 0; e < livingEnemies.length; e += 1) {
            const enemy = livingEnemies[e];
            distance = enemy.center.distance(this.center);

            if (distance < closestDistance || closestEnemy == null) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }

        this.target = closestEnemy;
    }
}
