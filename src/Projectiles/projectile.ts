import { GameScene, Rectangle, Vector2 } from '../internal';

export class Projectile {
    public active = false;

    private gameScene: GameScene;

    private startPosition: Vector2;

    private direction: Vector2;

    private worldBounds: Rectangle;

    private inWorldBounds: boolean;

    public bounds: Rectangle;

    private moveSpeed = 0.5;

    private velocity: Vector2;

    private ttl = 0;

    private ttlMax = 2;

    private projectileColor: string;

    private projectileImage: HTMLImageElement;

    private imageSourceRect: Rectangle;

    constructor(projectileImage: HTMLImageElement) {
        this.projectileImage = projectileImage;
        this.worldBounds = window.tileMap.bounds;

        this.bounds = new Rectangle(0, 0, 24, 24);
        this.velocity = new Vector2(0, 0);
        this.projectileColor = 'black';
        this.imageSourceRect = new Rectangle(0, 0, 32, 32);
    }

    public update(delta: number): void {
        this.bounds.update();
        this.updateTTL(delta);
        this.updateVelocity(delta);
    }

    private updateTTL(delta: number): void {
        if (!this.active) {
            return;
        }
        this.ttl -= delta;
        if (this.ttl <= 0) {
            this.active = false;
        }
    }

    private updateVelocity(delta: number): void {
        if (!this.direction || !this.active) {
            return;
        }
        this.velocity.x = this.direction.x * (this.moveSpeed * delta);
        this.velocity.y = this.direction.y * (this.moveSpeed * delta);

        this.bounds.left += this.velocity.x;
        this.bounds.top += this.velocity.y;
    }

    public draw(): void {
        if (!this.active) {
            return;
        }

        window.renderEngine.renderImageSource(
            this.projectileImage,
            this.imageSourceRect,
            this.bounds
        );

        // this.gameScene.renderEngine.renderRect(this.bounds, this.projectileColor, true);
    }

    public reset(startPosition: Vector2, direction: Vector2, moveSpeed: number): void {
        this.active = true;
        this.ttl = this.ttlMax;
        this.startPosition = startPosition;
        this.direction = direction;
        this.moveSpeed = moveSpeed;

        this.velocity.x = 0;
        this.velocity.y = 0;

        this.bounds.left = this.startPosition.x - this.bounds.width / 2;
        this.bounds.top = this.startPosition.y - this.bounds.height / 2;
        this.bounds.update();
    }
}
