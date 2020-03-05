import { BaseTower } from './baseTower';
import { GameScene } from '../Scenes/gameScene';
import { Tile } from '../Tiles/tile';
import { Vector2 } from '../DataObjects/vector2';

export class PlainTower extends BaseTower {  
  private plainTowerShootSpeed: number = 250;
  private plainTowerShootRate: number = 0.7;
  private shootElapsed: number = 0;

  constructor(gameScene: GameScene, destinationTile: Tile, towerImage: HTMLImageElement) {
    super(gameScene, destinationTile, towerImage);
    this.gameScene = gameScene;
    super.shootRange = 128;
  }

  public update(delta: number): void {
    super.update(delta);

    this.updateShoot(delta);
  }

  private updateShoot(delta: number): void {
    this.shootElapsed += delta;
    if (this.targetInRange && this.shootElapsed >= this.plainTowerShootRate) {
      this.shootElapsed = 0;

      //console.log('shoot');

      var direction = this.target.center.subtract(this.center);
      var normalizedDirection = direction.normalize();

      this.gameScene.projectileEngine.activateProjectile(
          this.center,
          normalizedDirection, 
          this.plainTowerShootSpeed);      
    }
  }

  public draw(): void {
    super.draw();
  }
}