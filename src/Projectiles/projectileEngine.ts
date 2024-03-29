import { Vector2 } from '../DataObjects/vector2';
import { Projectile } from './projectile';

export class ProjectileEngine {
    public projectiles: Projectile[] = [];

    private projectileImage: HTMLImageElement;

    constructor() {
        this.projectileImage = window.assetManager.getImage('projectile');
    }

    public update(delta: number): void {
        this.projectiles.forEach(projectile => {
            projectile.update(delta);
        });
    }

    public draw(): void {
        this.projectiles.forEach(projectile => {
            projectile.draw();
        });
    }

    public activateProjectile(startPosition: Vector2, direction: Vector2, moveSpeed: number): void {
        let poolSufficient = false;
        for (let i = 0; i < this.projectiles.length; i += 1) {
            if (!this.projectiles[i].active) {
                this.projectiles[i].reset(startPosition, direction, moveSpeed);
                poolSufficient = true;
                // console.log('projectile reset');
                break;
            }
        }

        if (!poolSufficient) {
            this.expandProjectilePool(startPosition, direction, moveSpeed);
        }
    }

    private expandProjectilePool(
        startPosition: Vector2,
        direction: Vector2,
        moveSpeed: number
    ): Projectile {
        const projectile = new Projectile(this.projectileImage);
        this.projectiles.push(projectile);
        // console.log('grow pool size: ' + this.projectiles.length);
        this.activateProjectile(startPosition, direction, moveSpeed);
        return projectile;
    }
}
