import { Rectangle } from '../DataObjects/rectangle';
import { Vector2 } from '../DataObjects/vector2';

export class Enemy {
    public position: Vector2;

    public size: Vector2;

    public active: boolean;

    public center: Vector2;

    public bounds: Rectangle;

    public futurePosition: Vector2;

    private enemyImage: HTMLImageElement;

    private originalWayPoints: any;

    private movementWayPoints: any;

    private wayPointReachedThreshold = 2;

    private movements: any;

    private velocity: Vector2;

    private direction: Vector2;

    private nextMovePoint: Vector2;

    private normalizedDirection: Vector2;

    private distanceFromNextWaypoint: number;

    private moveSpeed = 75;

    private hp = 0;

    private maxHp = 5;

    private hpBounds: Rectangle;

    private liveBounds: Rectangle;

    private topPadding = 10;

    private hpRemainingBarColor = 'red';

    private hpFullBarColor = 'green';

    private enemyName: string;

    private alive = false;

    constructor(enemyImage: HTMLImageElement) {
        this.enemyImage = enemyImage;
        this.originalWayPoints = window.tileMap.wayPoints;
        this.reset(0, 0);
    }

    public reset(moveSpeed: number, maxHp: number): void {
        this.active = false;
        this.alive = false;
        this.maxHp = maxHp;
        this.hp = this.maxHp;
        this.moveSpeed = moveSpeed;
        this.movementWayPoints = this.originalWayPoints.slice();
        this.movements = { left: false, right: false, up: false, down: false };
        this.position = Vector2.empty;
        this.futurePosition = Vector2.empty;
        this.size = new Vector2(48, 48);
        this.center = Vector2.empty;
        this.velocity = Vector2.empty;
        this.bounds = new Rectangle(0, 0, 0, 0);
        this.nextMovePoint = null;
        this.hpBounds = new Rectangle(
            this.bounds.left,
            this.bounds.top - this.topPadding,
            this.bounds.width,
            this.bounds.height
        );
        this.liveBounds = this.hpBounds.clone();
        this.enemyName = Math.random().toString();
    }

    public update(delta: number): void {
        if (!this.active) {
            return;
        }

        let onLastWaypoint = false;
        if (this.movementWayPoints.length <= 0) {
            onLastWaypoint = true;
        }

        if (!this.nextMovePoint) {
            const firstWayPoint = this.movementWayPoints.shift();
            const waypointBounds =
                window.tileMap.tileMatrix[firstWayPoint.y][firstWayPoint.x].bounds;
            this.nextMovePoint = new Vector2(
                waypointBounds.getCenterWidth,
                waypointBounds.getCenterHeight
            );
        }

        this.updateBounds();
        this.updateHpBounds();

        this.direction = this.nextMovePoint.subtract(this.center);
        this.distanceFromNextWaypoint = this.direction.magnitude();

        if (this.nextWaypointReached()) {
            if (onLastWaypoint) {
                this.nextMovePoint = null;
                this.active = false;
                // console.log(this.enemyName + ': end reached');
                window.dispatchEvent(new CustomEvent('enemyReachedEnd'));
                return;
            }
            const nextWayPoint = this.movementWayPoints.shift();
            const waypointBounds = window.tileMap.tileMatrix[nextWayPoint.y][nextWayPoint.x].bounds;
            this.nextMovePoint.x = waypointBounds.getCenterWidth;
            this.nextMovePoint.y = waypointBounds.getCenterHeight;
            this.direction = this.center.subtract(this.nextMovePoint);
        }

        this.normalizedDirection = this.direction.normalize();
        if (
            !Number.isNaN(this.normalizedDirection.x) &&
            !Number.isNaN(this.normalizedDirection.y)
        ) {
            this.velocity.x = this.normalizedDirection.x * (this.moveSpeed * delta);
            this.velocity.y = this.normalizedDirection.y * (this.moveSpeed * delta);
            this.setMoveDirection();
        }

        this.applyVelocity();
    }

    private nextWaypointReached(): boolean {
        return this.distanceFromNextWaypoint < this.wayPointReachedThreshold;
    }

    private updateBounds(): void {
        this.bounds.left = this.position.x;
        this.bounds.top = this.position.y;
        this.bounds.width = this.size.x;
        this.bounds.height = this.size.y;
        this.bounds.update();

        this.updateHpBounds();
        this.updateLifeBounds();

        this.center.x = this.bounds.getCenterWidth;
        this.center.y = this.bounds.getCenterHeight;

        this.futurePosition.x = this.center.x;
        this.futurePosition.y = this.center.y;

        this.futurePosition.x =
            this.center.x + this.velocity.x * window.gameConfig.enemyFuturePositionModifier;
        this.futurePosition.y =
            this.center.y + this.velocity.y * window.gameConfig.enemyFuturePositionModifier;
    }

    private updateHpBounds(): void {
        const percentageRemaining = (this.hp * 100) / this.maxHp;
        const percentageDiff = 100 - percentageRemaining;

        const percentageLive = (this.liveBounds.width * percentageDiff) / 100;
        this.hpBounds.width = this.liveBounds.width - percentageLive;

        this.hpBounds.left = this.bounds.left;
        this.hpBounds.top = this.bounds.top;
        this.hpBounds.height = this.bounds.height / this.topPadding;
        this.hpBounds.update();
    }

    private updateLifeBounds(): void {
        this.liveBounds.left = this.bounds.left;
        this.liveBounds.top = this.bounds.top;
        this.liveBounds.width = this.bounds.width;
        this.liveBounds.height = this.bounds.height / this.topPadding;
        this.liveBounds.update();
    }

    public draw(): void {
        if (!this.active) {
            return;
        }

        // TODO:
        // Implement animation class and call draw
        // Animation class to handle source rect updates.
        const sourceRectangle = new Rectangle(0, 0, 68, 80);

        window.renderEngine.renderImageSource(this.enemyImage, sourceRectangle, this.bounds);

        // TODO:
        // Introduce damage percentage bar
        this.drawRemainingHPBar();
        this.drawFullHPBar();
    }

    private drawRemainingHPBar(): void {
        // debugger;
        window.renderEngine.renderRect(this.liveBounds, this.hpRemainingBarColor, true);
    }

    private drawFullHPBar(): void {
        // debugger;
        window.renderEngine.renderRect(this.hpBounds, this.hpFullBarColor, true);
    }

    private setMoveDirection(): void {
        this.movements.left = this.velocity.x < 0;
        this.movements.right = this.velocity.x > 0;

        this.movements.up = this.velocity.y < 0;
        this.movements.down = this.velocity.y > 0;

        if (
            (this.movements.left || this.movements.right) &&
            (this.movements.up || this.movements.down)
        ) {
            // We detect if both horizontal and vertical movement is set.
            // As we can only play one animation per axis movement we should determine
            // what axis has the greater velocity value and use that as the direction.

            const horizontalValue = this.velocity.x < 0 ? this.velocity.x * -1 : this.velocity.x;

            const verticalValue = this.velocity.y < 0 ? this.velocity.y * -1 : this.velocity.y;

            if (horizontalValue > verticalValue) {
                this.movements.left = this.velocity.x < 0;
                this.movements.right = this.velocity.x > 0;
                this.movements.up = false;
                this.movements.down = false;
            } else {
                this.movements.up = this.velocity.y < 0;
                this.movements.down = this.velocity.y > 0;
                this.movements.left = false;
                this.movements.right = false;
            }
        }
    }

    private applyVelocity(): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    public hit(): void {
        if (this.active) {
            this.hp -= 1;
            // console.log(this.enemyName + ': hit ' + this.hp);

            if (this.hp <= 0) {
                this.active = false;
                // console.log(this.enemyName + ': killed');
                window.dispatchEvent(new CustomEvent('enemyKilled'));
            }
        }
    }
}
