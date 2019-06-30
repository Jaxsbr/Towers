import { Vector2 } from "../DataObjects/vector2";
import { Rectangle } from "../DataObjects/rectangle";
import { GameScene } from "../Scenes/gameScene";

export class Projectile {    
    public active: boolean;
    private gameScene: GameScene;
    private startPosition: Vector2;
    private direction: Vector2;
    private worldBounds: Rectangle;
    private inWorldBounds: boolean;
    private bounds: Rectangle;
    private moveSpeed: number = 20;
    private velocity: Vector2;
    private ttl: number;
    private ttlMax: number = 100;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;        
        this.worldBounds = this.gameScene.game.screenBounds;

        this.bounds = new Rectangle(0, 0, 25, 25);
        this.velocity = new Vector2(0, 0);
    }

    public update(delta: number): void {
        //this.updateInWorldBounds();
        this.updateTTL(delta);
        this.updateAlive();

        // TODO:        
        // Apply velocity in target direction
        this.velocity.x = this.moveSpeed * delta;
        this.velocity.y = this.moveSpeed * delta;

        this.bounds.left += this.velocity.x;
        this.bounds.top += this.velocity.y;
    }

    private updateTTL(delta: number): void {
        this.ttl += delta;
        if (this.ttl >= this.ttlMax) {
            this.ttl = 0;
            this.active = false;
        }
    }

    private updateInWorldBounds(): void {
        this.inWorldBounds = this.worldBounds.containsRect(this.bounds);
    }

    private updateAlive() {
        if (!this.active) { return; }

        if (!this.inWorldBounds) {
            this.active = false;
        }
    }

    public draw(): void {
        //if (!this.active) { return; }
console.log('render projectile');
//debugger;
        this.gameScene.renderEngine.renderRect(this.bounds, 'white', true);
    }

    public reset(startPosition: Vector2, direction: Vector2, moveSpeed: number): void {
        this.active = true;
        this.ttl = 0;
        this.startPosition = startPosition;
        this.direction = direction;
        this.moveSpeed = moveSpeed;

        this.bounds.left = this.startPosition.x;
        this.bounds.top = this.startPosition.y;
    }
}