import { GameScene } from "../Scenes/gameScene";
import { Projectile } from "./projectile";
import { Vector2 } from "../DataObjects/vector2";

export class ProjectileEngine {
    private gameScene: GameScene;
    private projectiles: Projectile[] = [];
    private poolSize: number = 100;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        for (var i = 0; i < this.poolSize; i++) {
            var projectile = new Projectile(this.gameScene);
            this.projectiles.push(projectile);
        }
    }

    public update(delta: number): void {
        this.projectiles.forEach((projectile) => {
            projectile.update(delta);
        });
    }

    public draw(): void {
        this.projectiles.forEach((projectile) => {
            projectile.draw();
        });
    }

    public activateProjectile(startPosition: Vector2, direction: Vector2, moveSpeed: number): void {
        for (var i = 0; i < this.projectiles.length; i++) {
            if (!this.projectiles[i].active) {
                //console.log('projectile activated');
                this.projectiles[i].reset(startPosition, direction, moveSpeed)
                break;
            }
        }
    }
}