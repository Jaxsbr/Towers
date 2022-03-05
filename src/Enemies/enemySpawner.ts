import { Enemy } from './enemy';

export class EnemySpawner {
    public enemies: Enemy[] = [];

    private enemyImage: HTMLImageElement;

    private enemySpawnCount = 0;

    private enemySpawnCountMax: number;

    private enemySpawnRate: number;

    private enemySpawnElapsed = 0;

    private enemiesKilled = 0;

    private enemiesEscaped = 0;

    constructor() {
        this.enemyImage = window.assetManager.getImage('squid');
        this.setCurrentLevel();

        window.addEventListener('enemyKilled', () => {
            this.enemiesKilled += 1;
        });
        window.addEventListener('enemyReachedEnd', () => {
            this.enemiesEscaped += 1;
        });
    }

    public update(delta: number): void {
        this.enemies.forEach(enemy => {
            enemy.update(delta);
        });

        this.updateSpawner(delta);
        this.updateRoundCheck();
    }

    private updateSpawner(delta: number): void {
        if (this.enemySpawnCount >= this.enemySpawnCountMax) {
            return;
        }
        this.enemySpawnElapsed += delta;
        if (this.enemySpawnElapsed >= this.enemySpawnRate) {
            this.enemySpawnElapsed = 0;
            this.createEnemy();
            this.enemySpawnCount += 1;
        }
    }

    private updateRoundCheck(): void {
        if (
            this.enemiesEscaped + this.enemiesKilled ===
            window.levelManager.currentLevel.enemySpawnCountMax
        ) {
            this.enemiesKilled = 0;
            this.enemiesEscaped = 0;
            this.enemySpawnCount = 0;
            window.levelManager.nextLevel();
            this.setCurrentLevel();
        }
    }

    public draw(): void {
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
    }

    public createEnemy(): void {
        // TODO:
        // Reset inactive enemies from pool instead of creating new ones
        // THIS IS A LEAK BTW
        // console.clear();
        // console.log("enemy in array count: " + this.enemies.length);

        const enemy = new Enemy(this.enemyImage);
        enemy.reset(
            window.levelManager.currentLevel.enemyMoveSpeed,
            window.levelManager.currentLevel.enemyMaxHp
        );
        enemy.active = true;
        this.enemies.push(enemy);
    }

    private setCurrentLevel(): void {
        this.enemySpawnCountMax = window.levelManager.currentLevel.enemySpawnCountMax;
        this.enemySpawnRate = window.levelManager.currentLevel.enemySpawnRate;
    }
}
