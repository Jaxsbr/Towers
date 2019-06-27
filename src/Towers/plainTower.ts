import { BaseTower } from './baseTower';
import { GameScene } from '../Scenes/gameScene';
import { Tile } from '../Tiles/tile';

export class PlainTower extends BaseTower {  
  constructor(gameScene: GameScene, destinationTile: Tile, towerImage: HTMLImageElement) {
    super(gameScene, destinationTile, towerImage);
    super.shootRange = 1024;
  }

  public update(): void {
    super.update();
  }

  public draw(): void {
    super.draw();
  }
}