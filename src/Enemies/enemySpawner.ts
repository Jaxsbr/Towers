import { Enemy } from './enemy';
import { GameScene } from '../Scenes/gameScene';

export class EnemySpawner {
  public enemies: Enemy[] = [];
  private gameScene: GameScene;
  private enemyImage: HTMLImageElement;

  constructor(gameScene: GameScene) {
    this.gameScene = gameScene;
    this.enemyImage = this.gameScene.game.assetManager.getImage('squid');
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

  public createEnemy(): void {
    var enemy = new Enemy(this.gameScene, this.enemyImage, this.gameScene.tileMap.wayPoints);
    enemy.active = true;

    this.enemies.push(enemy);
  }
}