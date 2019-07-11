import { Enemy } from './enemy';
import { GameScene } from '../Scenes/gameScene';

export class EnemySpawner {
  public enemies: Enemy[] = [];
  private gameScene: GameScene;
  private enemyImage: HTMLImageElement;

  private enemySpawnCount: number = 0;
  private enemySpawnCountMax: number;
  private enemySpawnRate: number;
  private enemySpawnElapsed: number = 0;

  constructor(gameScene: GameScene) {
    this.gameScene = gameScene;
    this.enemyImage = this.gameScene.game.assetManager.getImage('squid');
    this.enemySpawnCountMax = this.gameScene.currentLevel.enemySpawnCountMax;
    this.enemySpawnRate = this.gameScene.currentLevel.enemySpawnRate;
  }

  public update(delta: number): void {
    this.enemies.forEach(enemy => {
      enemy.update(delta);
    });    

    this.updateSpawner(delta);
    this.updateRoundCheck();
  }

  private updateSpawner(delta: number): void {    
    if (this.enemySpawnCount >= this.enemySpawnCountMax) { return; }
    this.enemySpawnElapsed += delta;
    if (this.enemySpawnElapsed >= this.enemySpawnRate) {
      this.enemySpawnElapsed = 0;      
      this.createEnemy();
      this.enemySpawnCount++;      
    }
  }

  private updateRoundCheck(): void {
    var enemiesDead = true;
    this.enemies.forEach((enemy) => {
      if (enemy.active) { enemiesDead = false; }
    })

    if (enemiesDead) {
      this.enemySpawnCount = 0;
    }
  }

  public draw(): void {
    this.enemies.forEach(enemy => {
      enemy.draw();
    });
  }

  public createEnemy(): void {
    var enemy = new Enemy(this.gameScene, this.enemyImage, this.gameScene.tileMap.wayPoints);
    enemy.active = true;

    this.enemies.push(enemy);
  }
}