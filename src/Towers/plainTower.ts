import { BaseTower } from './baseTower';
import { GameScene } from '../Scenes/gameScene';
import { Tile } from '../Tiles/tile';
import { Vector2 } from '../DataObjects/vector2';

export class PlainTower extends BaseTower {  
  private plainTowerMoveSpeed: number = 20;

  constructor(gameScene: GameScene, destinationTile: Tile, towerImage: HTMLImageElement) {
    super(gameScene, destinationTile, towerImage);
    this.gameScene = gameScene;
    super.shootRange = 1024;
  }

  public update(delta: number): void {
    super.update(delta);

    this.updateShoot(delta);
  }

  private updateShoot(delta: number): void {
    this.shootElapsed += delta;
    if (this.targetInRange && this.shootElapsed >= this.shootRate) {
      this.shootElapsed = 0;
      //console.log('shoot');
      this.gameScene.projectileEngine.activateProjectile(
          new Vector2(this.destinationTile.bounds.left, this.destinationTile.bounds.right),
          this.targetDirection, 
          this.plainTowerMoveSpeed);      
    }
  }

  public draw(): void {
    super.draw();
  }
}