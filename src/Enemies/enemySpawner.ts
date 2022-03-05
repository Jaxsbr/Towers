import { Enemy, GameScene } from '../internal';

export class EnemySpawner {
    public enemies: Enemy[] = [];

    private gameScene: GameScene;

    private enemyImage: HTMLImageElement;

    private enemySpawnCount = 0;

    private enemySpawnCountMax: number;

    private enemySpawnRate: number;

    private enemySpawnElapsed = 0;

    private enemiesKilled = 0;

    private enemiesEscaped = 0;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        this.enemyImage = this.gameScene.game.assetManager.getImage('squid');
        this.setCurrentLevel();

        window.addEventListener('enemyKilled', () => {
            this.enemiesKilled++;
        });
        window.addEventListener('enemyReachedEnd', () => {
            this.enemiesEscaped++;
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
            this.enemySpawnCount++;
        }
    }

    private updateRoundCheck(): void {
        if (
            this.enemiesEscaped + this.enemiesKilled ==
            this.gameScene.levelManager.currentLevel.enemySpawnCountMax
        ) {
            this.enemiesKilled = 0;
            this.enemiesEscaped = 0;
            this.enemySpawnCount = 0;
            this.gameScene.levelManager.nextLevel();
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

        const enemy = new Enemy(this.gameScene, this.enemyImage, this.gameScene.tileMap.wayPoints);
        enemy.reset(
            this.gameScene.levelManager.currentLevel.enemyMoveSpeed,
            this.gameScene.levelManager.currentLevel.enemyMaxHp
        );
        enemy.active = true;
        this.enemies.push(enemy);
    }

    private setCurrentLevel(): void {
        this.enemySpawnCountMax = this.gameScene.levelManager.currentLevel.enemySpawnCountMax;
        this.enemySpawnRate = this.gameScene.levelManager.currentLevel.enemySpawnRate;
    }
}
