import { Enemy } from './enemy';
import { GameScene } from '../Scenes/gameScene';

export class EnemySpawner {
  private enemy1: Enemy;

  constructor(gameScene: GameScene, enemyImage: HTMLImageElement) {
    this.enemy1 = new Enemy(gameScene, enemyImage, gameScene.tileMap.wayPoints);
  }

  public update(): void {
    this.enemy1.update();
  }

  public draw(): void {
    this.enemy1.draw();
  }
}