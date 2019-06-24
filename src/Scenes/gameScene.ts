import { SceneInterface } from "./scene.interface";
import { Game } from "../game";
import { SceneManager } from "./sceneManager";
import { RenderEngine } from "../renderEngine";
import { Tile } from "../Tiles/tile";
import { ImageObject } from "../DataObjects/imageObject";
import { TileMap } from "../Tiles/tileMap";
import { EnemySpawner } from '../Enemies/enemySpawner';
import { BaseTower } from '../Towers/baseTower';

export class GameScene implements SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    backgroundImage: HTMLImageElement;
    enemyImage: HTMLImageElement;
    tileMap: TileMap;
    tileImage: HTMLImageElement;
    towerImage: HTMLImageElement;
    enemySpawner: EnemySpawner;

    tower1: BaseTower;
    
    constructor(game: Game, sceneManager: SceneManager, renderEngine: RenderEngine) {
      this.game = game;
      this.sceneManager = sceneManager;
      this.renderEngine = renderEngine;
    }

    init(): void {
      this.backgroundImage = this.game.assetManager.getImage('background');
      this.tileImage = this.game.assetManager.getImage('tiles');
      this.enemyImage = this.game.assetManager.getImage('squid');
      this.towerImage = this.game.assetManager.getImage('towerplain');

      this.tileMap = new TileMap(this, this.game.screenBounds, this.tileImage);
      this.enemySpawner = new EnemySpawner(this, this.enemyImage);

      var randomTile = this.tileMap.tileMatrix[1][1];
      this.tower1 = new BaseTower(this, randomTile, this.towerImage);
    }

    update(delta: number): void {
      this.enemySpawner.update();
      this.tower1.update();
    }

    render(): void {
      this.renderEngine.clearRect(this.game.screenBounds);
      this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);        
      this.tileMap.draw();
      this.enemySpawner.draw();
      this.tower1.draw();
    }

    mouseDown(): void {
    }

    mouseUp(): void {
    }

    mouseMove(x: number, y: number): void {
    }
    
    resize(): void {
    }    
}