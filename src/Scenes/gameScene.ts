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

export class GameScene implements SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    backgroundImage: HTMLImageElement;
    tileMap: TileMap;
    tileImage: HTMLImageElement;
    enemySpawner: EnemySpawner;   
    towerManager: TowerManager;
    projectileEngine: ProjectileEngine;

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

      this.tileMap = new TileMap(this, this.game.screenBounds, this.tileImage);
      this.enemySpawner = new EnemySpawner(this);          
      this.towerManager = new TowerManager(this);
      this.projectileEngine = new ProjectileEngine(this);

      // TODO: Remove, towers to be added with user input      
      this.towerManager.createTower(this.tileMap.tileMatrix[3][3]);
      //this.towerManager.createTower(this.tileMap.tileMatrix[4][4]);
      this.towerManager.createTower(this.tileMap.tileMatrix[5][5]);

      // TODO: Remove, enemies to spawned per round from enemy spawner
      this.enemySpawner.createEnemy();
    }

    update(delta: number): void {
      this.checkProjectileEnemyCollision(delta);
      this.enemySpawner.update(delta);
      this.towerManager.update(delta);
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
            // TODO: Raise enemy hit event
            console.log('enemy hit');            
          }
        })
      })    

    }

    render(): void {
      this.renderEngine.clearRect(this.game.screenBounds);
      this.renderEngine.renderImage(this.backgroundImage, 0, 0, 480, 480);        
      this.tileMap.draw();
      this.enemySpawner.draw();
      this.towerManager.draw();
      this.projectileEngine.draw();
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