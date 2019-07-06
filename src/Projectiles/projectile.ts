import { Vector2 } from "../DataObjects/vector2";
import { Rectangle } from "../DataObjects/rectangle";
import { GameScene } from "../Scenes/gameScene";

export class Projectile {    
    public active: boolean = false;
    private gameScene: GameScene;
    private startPosition: Vector2;
    private direction: Vector2;
    private worldBounds: Rectangle;
    private inWorldBounds: boolean;
    public bounds: Rectangle;
    private moveSpeed: number = 0.5;
    private velocity: Vector2;
    private ttl: number  = 0;
    private ttlMax: number = 2;
    private projectileColor: string;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;        
        this.worldBounds = this.gameScene.game.screenBounds;

        this.bounds = new Rectangle(0, 0, 10, 10);
        this.velocity = new Vector2(0, 0);
        this.projectileColor = 'black';
    }

    public update(delta: number): void {
        this.updateTTL(delta);
        this.updateVelocity(delta);
    }

    private updateTTL(delta: number): void {
      if (!this.active) { return; }      
        this.ttl -= delta;
        if (this.ttl <= 0) {
            this.active = false;
        }
    }

    private updateVelocity(delta: number): void {
        if (!this.direction || !this.active) { return; }
        this.velocity.x = this.direction.x * (this.moveSpeed * delta);
        this.velocity.y = this.direction.y * (this.moveSpeed * delta);

        this.bounds.left += this.velocity.x;
        this.bounds.top += this.velocity.y;
    }

    public draw(): void {
        if (!this.active) { return; }
        this.gameScene.renderEngine.renderRect(this.bounds, this.projectileColor, true);
    }

    public reset(startPosition: Vector2, direction: Vector2, moveSpeed: number): void {        
        this.active = true;
        this.ttl = this.ttlMax;
        this.startPosition = startPosition;
        this.direction = direction;
        this.moveSpeed = moveSpeed;

        this.velocity.x = 0;
        this.velocity.y = 0;

        this.bounds.left = this.startPosition.x;
        this.bounds.top = this.startPosition.y;
        this.bounds.update();
    }
}