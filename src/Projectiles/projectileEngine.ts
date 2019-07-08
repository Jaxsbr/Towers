import { GameScene } from "../Scenes/gameScene";
import { Projectile } from "./projectile";
import { Vector2 } from "../DataObjects/vector2";

export class ProjectileEngine {
    private gameScene: GameScene;
    public projectiles: Projectile[] = [];
    private projectileImage: HTMLImageElement;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;        

        this.projectileImage = this.gameScene.game.assetManager.getImage('projectile');
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
      var poolSufficient = false;
      for (var i = 0; i < this.projectiles.length; i++) {
          if (!this.projectiles[i].active) {
              this.projectiles[i].reset(startPosition, direction, moveSpeed)
              poolSufficient = true;
              //console.log('projectile reset');
              break;
          }
      }

      if (!poolSufficient) {
          this.expandProjectilePool(startPosition, direction, moveSpeed);
      }
    }

    private expandProjectilePool(startPosition: Vector2, direction: Vector2, moveSpeed: number): Projectile {
        var projectile = new Projectile(this.gameScene, this.projectileImage);
        this.projectiles.push(projectile);
        console.log('grow pool size: ' + this.projectiles.length);
        this.activateProjectile(startPosition, direction, moveSpeed); 
        return projectile;         
    }
}