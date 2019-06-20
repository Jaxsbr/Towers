import { Enemy } from './enemy';
import { GameScene } from '../Scenes/gameScene';

export class EnemySpawner {
  private enemy1: Enemy;

  constructor(gameScene: GameScene, enemyImage: HTMLImageElement) {
    this.enemy1 = new Enemy(gameScene, enemyImage, gameScene.tileMap.wayPoints);
    this.enemy1.active = true;
  }

  public update(): void {
    this.enemy1.update();
  }

  public draw(): void {
    this.enemy1.draw();
  }
}