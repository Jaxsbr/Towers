import { Rectangle } from './DataObjects/rectangle';
import { Vector2 } from './DataObjects/vector2';

export class GameConfig {
    public canvasWidth = 480;

    public canvasHeight = 480;

    public backgroundBounds = new Rectangle(0, 0, this.canvasWidth, this.canvasHeight);

    public loadScreenRect = new Rectangle(0, 0, this.canvasWidth, this.canvasHeight);

    public tileMapRows = 10;

    public tileMapCols = 10;

    public tileMapTileWidth = 48;

    public tileMapTileHeight = 48;

    public plainTowerShootSpeed = 250;

    public plainTowerShootRate = 0.7;

    public plainTowerShootRange = 150;

    public enemyFuturePositionModifier = 20;

    public menuStagedTowerImageWidth = 48;

    public menuStagedTowerImageHeight = 48;

    public enemySize = new Vector2(48, 48);
}
