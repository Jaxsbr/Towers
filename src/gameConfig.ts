import { Rectangle } from './DataObjects/rectangle';

export class GameConfig {
    public canvasWidth = 960;

    public canvasHeight = 960;

    public backgroundBounds = new Rectangle(0, 0, this.canvasWidth, this.canvasHeight);

    public tileMapRows = 10;

    public tileMapCols = 10;

    public tileMapTileWidth = 96;

    public tileMapTileHeight = 96;

    public plainTowerShootSpeed = 250;

    public plainTowerShootRate = 0.7;

    public plainTowerShootRange = 150;

    public enemyFuturePositionModifier = 20;
}
