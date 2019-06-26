import { SceneInterface } from "./scene.interface";
import { Game } from "../game";
import { SceneManager } from "./sceneManager";
import { RenderEngine } from "../renderEngine";
import { Tile } from "../Tiles/tile";
import { ImageObject } from "../DataObjects/imageObject";
import { TileMap } from "../Tiles/tileMap";
import { EnemySpawner } from '../Enemies/enemySpawner';
import { BaseTower } from '../Towers/baseTower';
import { TowerManager } from '../Towers/towerManager';

export class GameScene implements SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    backgroundImage: HTMLImageElement;
    tileMap: TileMap;
    tileImage: HTMLImageElement;
    enemySpawner: EnemySpawner;   
    towerManager: TowerManager; 
    
    constructor(game: Game, sceneManager: SceneManager, renderEngine: RenderEngine) {
      this.game = game;
      this.sceneManager = sceneManager;
      this.renderEngine = renderEngine;
    }

    init(): void {
      this.backgroundImage = this.game.assetManager.getImage('background');
      this.tileImage = this.game.assetManager.getImage('tiles');      

      this.tileMap = new TileMap(this, this.game.screenBounds, this.tileImage);
      this.enemySpawner = new EnemySpawner(this);          
      this.towerManager = new TowerManager(this);

      // TODO: Remove, towers to be added with user input
      this.towerManager.createTower(this.tileMap.tileMatrix[1][1]);

      // TODO: Remove, enemies to spawned per round from enemy spawner
      this.enemySpawner.createEnemy();
    }

    update(delta: number): void {
      this.enemySpawner.update();
      this.towerManager.update();
    }

    render(): void {
      this.renderEngine.clearRect(this.game.screenBounds);
      this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);        
      this.tileMap.draw();
      this.enemySpawner.draw();
      this.towerManager.draw();
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