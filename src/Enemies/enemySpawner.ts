import { Enemy } from './enemy';
import { GameScene } from '../Scenes/gameScene';

export class EnemySpawner {
  public enemies: Enemy[] = [];

  constructor(gameScene: GameScene, enemyImage: HTMLImageElement) {
    var enemy = new Enemy(gameScene, enemyImage, gameScene.tileMap.wayPoints);
    enemy.active = true;

    this.enemies.push(enemy);
  }

  public update(): void {
    this.enemies.forEach(enemy => {
      enemy.update();

      if (!enemy.active) {
        enemy.reset();
        enemy.active = true;
      }
    });    
  }

  public draw(): void {
    this.enemies.forEach(enemy => {
      enemy.draw();
    });
  }
}