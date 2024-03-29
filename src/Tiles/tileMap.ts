import { ImageObject } from '../DataObjects/imageObject';
import { Rectangle } from '../DataObjects/rectangle';
import { Tile } from './tile';

export class TileMap {
    public wayPoints: any = [];

    public tileMatrix: Tile[][];

    public rows = window.gameConfig.tileMapRows;

    public cols = window.gameConfig.tileMapCols;

    public tileWidth = window.gameConfig.tileMapTileWidth;

    public tileHeight = window.gameConfig.tileMapTileHeight;

    public bounds: Rectangle;

    private tileImage: HTMLImageElement;

    private waterTileImageObject: ImageObject;

    private pathTileImageObject: ImageObject;

    constructor(tileImage: HTMLImageElement) {
        this.tileImage = tileImage;

        this.initTileMatrix();
        this.bounds = new Rectangle(0, 0, this.cols * this.tileWidth, this.rows * this.tileHeight);
    }

    private initTileMatrix(): void {
        // TODO:
        // Read matrix data from configurable file
        const matrix = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
        ];

        this.wayPoints = [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 2, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 4 },
            { x: 4, y: 4 },
            { x: 4, y: 3 },
            { x: 4, y: 2 },
            { x: 5, y: 2 },
            { x: 6, y: 2 },
            { x: 6, y: 3 },
            { x: 6, y: 4 },
            { x: 6, y: 5 },
            { x: 6, y: 6 },
            { x: 5, y: 6 },
            { x: 4, y: 6 },
            { x: 4, y: 7 },
            { x: 4, y: 8 },
            { x: 5, y: 8 },
            { x: 5, y: 9 },
            { x: 6, y: 9 },
            { x: 7, y: 9 },
            { x: 8, y: 9 },
            { x: 9, y: 9 }
        ];

        this.tileMatrix = [];
        for (let row = 0; row < this.rows; row += 1) {
            this.tileMatrix[row] = [];
            for (let col = 0; col < this.cols; col += 1) {
                const matrixValue = matrix[row][col];
                const tileImageObject = this.getTileImageObject(
                    matrixValue,
                    this.tileWidth * col,
                    this.tileHeight * row
                );

                // TODO:
                // Tile should provide underlying imageObject with coordinates and size values.
                // Abstract source rectangle values into "tilesSpriteSheet" configuration.
                const tileBounds = new Rectangle(
                    this.tileWidth * col,
                    this.tileHeight * row,
                    this.tileWidth,
                    this.tileHeight
                );
                // console.log('col:' + col + ' row:' + row)
                this.tileMatrix[row][col] = new Tile(tileBounds, tileImageObject);
            }
        }
    }

    private getTileImageObject(
        matrixValue: number,
        destinationX: number,
        destinationY: number
    ): ImageObject {
        const tileImageObject = new ImageObject();
        tileImageObject.image = this.tileImage;
        tileImageObject.x = destinationX;
        tileImageObject.y = destinationY;
        tileImageObject.width = this.tileWidth;
        tileImageObject.height = this.tileHeight;
        tileImageObject.swidth = 32;
        tileImageObject.sheight = 32;

        if (matrixValue === 0) {
            tileImageObject.sx = 0;
            tileImageObject.sy = 0;
        } else {
            tileImageObject.sx = 32;
            tileImageObject.sy = 0;
        }

        return tileImageObject;
    }

    public draw(): void {
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                this.tileMatrix[row][col].draw(col, row);
            }
        }
    }
}
