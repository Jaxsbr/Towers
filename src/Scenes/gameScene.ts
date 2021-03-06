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
import { ProjectileEngine } from "../Projectiles/projectileEngine";
import { Level } from "../Levels/level";
import { LevelManager } from '../Levels/levelManager';
import { Menu } from "../Menu/menu";
import { MouseInfo } from "../Types/MouseInfo";
import { Rectangle } from "../DataObjects/rectangle";

export class GameScene implements SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    mouseInfo: MouseInfo;
    backgroundImage: HTMLImageElement;
    tileMap: TileMap;
    tileImage: HTMLImageElement;
    enemySpawner: EnemySpawner;   
    towerManager: TowerManager;
    projectileEngine: ProjectileEngine;
    //currentLevel: Level;
    levelManager: LevelManager;
    menu: Menu;

    // TODO: Abstract into a manager
    collisionCheckElapsed: number = 0;
    
    constructor(game: Game, sceneManager: SceneManager, renderEngine: RenderEngine) {
      this.game = game;
      this.sceneManager = sceneManager;
      this.renderEngine = renderEngine;      
    }

    init(): void {
      this.backgroundImage = this.game.assetManager.getImage('background');
      this.tileImage = this.game.assetManager.getImage('tiles');      
      this.levelManager = new LevelManager(this.game.assetManager.levelInfo);      
      this.menu = new Menu(this);

      this.tileMap = new TileMap(this, this.game.screenBounds, this.tileImage);
      this.enemySpawner = new EnemySpawner(this);          
      this.towerManager = new TowerManager(this);
      this.projectileEngine = new ProjectileEngine(this);

      // TODO: Remove, towers to be added with user input      
      this.towerManager.createTower(this.tileMap.tileMatrix[3][3]);
      this.towerManager.createTower(this.tileMap.tileMatrix[5][5]);      
      this.towerManager.createTower(this.tileMap.tileMatrix[8][7]);      
    }

    update(delta: number): void {
      this.checkProjectileEnemyCollision(delta);
      
      this.towerManager.update(delta);
      this.enemySpawner.update(delta);
      this.projectileEngine.update(delta);      
    }

    // TODO: Abstract into a manager
    private checkProjectileEnemyCollision(delta: number): void {
      // TODO: Reduce the rate at which collision check is done
      //       This saves browser performance but is less accurate, 
      //       missing some collisions.
      this.collisionCheckElapsed += delta;
      if (this.collisionCheckElapsed <= 0.001) {
        return;
      }
      this.collisionCheckElapsed = 0;      
      this.enemySpawner.enemies.forEach((enemy) => {
        this.projectileEngine.projectiles.forEach((projectile) => {
          if (projectile.active && enemy.active && enemy.bounds.containsRect(projectile.bounds)) {
            enemy.hit();
            projectile.active = false;                                
          }
        })
      })    

    }

    render(): void {
      this.renderEngine.clearRect(this.game.screenBounds);
      this.renderEngine.renderImage(this.backgroundImage, 0, 0, 480, 480);        
      this.tileMap.draw();

      // TODO:
      // Create abstraction into animated text rendering.
      this.renderEngine.renderText(this.levelManager.currentLevel.levelName, 64, 32, 'red', 32, 'impact');

      this.enemySpawner.draw();
      this.towerManager.draw();
      this.projectileEngine.draw();
      this.menu.draw();
    }

    private isOverMouseMenu(): boolean {
      let menuBounds = this.getElementBounds("tower_menu");    
      return menuBounds.containsRect(new Rectangle(this.mouseInfo.x, this.mouseInfo.y, 1, 1));
    }
  
    private getElementBounds(elementId: string): Rectangle {
      let element = document.getElementById(elementId);
      return new Rectangle(element.clientLeft, element.clientTop, element.clientWidth, element.clientHeight);
    }

    mouseDown(): void {      
      
    }

    mouseUp() {       
      if (this.isOverMouseMenu()) {return;}
      
      let x = Math.floor(this.mouseInfo.x / this.tileMap.tileWidth);
      let y = Math.floor((this.mouseInfo.y - this.tileMap.tileHeight) / this.tileMap.tileHeight);
      let destinationTile = this.tileMap.tileMatrix[y][x];
      this.menu.clearStagedTower();
      this.towerManager.createTower(destinationTile);

      console.log(`tileX:${x} tileY:${y} destTile:${destinationTile.bounds} mouseX:${this.mouseInfo.x} mouseY:${this.mouseInfo.y}`)
    }

    mouseMove(x: number, y: number): void {
    }
    
    resize(): void {
    }    
}