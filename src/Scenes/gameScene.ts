import { Rectangle } from '../DataObjects/rectangle';
import { EnemySpawner } from '../Enemies/enemySpawner';
import { LevelManager } from '../Levels/levelManager';
import { Menu } from '../Menu/menu';
import { ProjectileEngine } from '../Projectiles/projectileEngine';
import { Tile } from '../Tiles/tile';
import { TileMap } from '../Tiles/tileMap';
import { TowerManager } from '../Towers/towerManager';
import { SceneInterface } from './scene.interface';

export class GameScene implements SceneInterface {
    backgroundImage: HTMLImageElement;

    tileImage: HTMLImageElement;

    towerManager: TowerManager;

    projectileEngine: ProjectileEngine;

    menu: Menu;

    newTowerDestinationTile: Tile;

    // TODO: Abstract into a manager
    collisionCheckElapsed = 0;

    init(): void {
        this.backgroundImage = window.assetManager.getImage('background');
        this.tileImage = window.assetManager.getImage('tiles');
        window.levelManager = new LevelManager(window.assetManager.levelInfo);
        this.menu = new Menu();

        window.tileMap = new TileMap(this.tileImage);
        window.enemySpawner = new EnemySpawner();
        this.towerManager = new TowerManager();
        window.projectileEngine = new ProjectileEngine();

        // TODO: Remove, towers to be added with user input
        this.towerManager.createTower(window.tileMap.tileMatrix[3][3]);

        window.addEventListener('mousemove', e => {
            this.mouseMove(e.x, e.y);
        });
        window.addEventListener('mousedown', () => {
            this.mouseDown();
        });
        window.addEventListener('mouseup', () => {
            this.mouseUp();
        });
    }

    update(): void {
        const { delta } = window.gameTime;
        this.checkProjectileEnemyCollision(delta);

        this.towerManager.update();
        window.enemySpawner.update(delta);
        window.projectileEngine.update(delta);
        this.updateNewTowerDestinationTile();
    }

    isValidTowerStage(): boolean {
        if (GameScene.isOverMouseMenu()) {
            return false;
        }
        if (!GameScene.isOverGameBounds()) {
            return false;
        }
        if (!this.menu.hasStagedTower) {
            return false;
        }
        return true;
    }

    updateNewTowerDestinationTile(): void {
        if (!this.isValidTowerStage()) {
            return;
        }

        const x = Math.floor(window.mouseInfo.x / window.tileMap.tileWidth);
        const y = Math.floor(
            (window.mouseInfo.y - window.tileMap.tileHeight) / window.tileMap.tileHeight
        );

        if (x < 0 || y < 0) {
            return;
        }

        this.newTowerDestinationTile = window.tileMap.tileMatrix[y][x];
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
        window.enemySpawner.enemies.forEach(enemy => {
            window.projectileEngine.projectiles.forEach(projectile => {
                if (
                    projectile.active &&
                    enemy.active &&
                    enemy.bounds.containsRect(projectile.bounds)
                ) {
                    enemy.hit();
                    projectile.active = false;
                }
            });
        });
    }

    render(): void {
        window.renderEngine.clearRect(window.tileMap.bounds);
        window.tileMap.draw();

        // TODO:
        // Create abstraction into animated text rendering.
        window.renderEngine.renderText(
            window.levelManager.currentLevel.levelName,
            64,
            32,
            'red',
            32,
            'impact'
        );

        window.enemySpawner.draw();
        window.projectileEngine.draw();
        this.towerManager.draw();
        this.menu.draw();
        this.renderOccupiedTiles();
    }

    renderOccupiedTiles(): void {
        if (!this.isValidTowerStage()) {
            return;
        }

        const destBounds = this.newTowerDestinationTile
            ? this.newTowerDestinationTile.bounds
            : Rectangle.empty;

        if (!this.towerManager.isTileEmpty(destBounds)) {
            window.renderEngine.renderRect(destBounds, 'red', true);
        }
    }

    static isOverMouseMenu(): boolean {
        const menuBounds = GameScene.getElementBounds('tower_menu');
        return menuBounds.containsRect(new Rectangle(window.mouseInfo.x, window.mouseInfo.y, 1, 1));
    }

    static isOverGameBounds(): boolean {
        return window.tileMap.bounds.containsRect(
            new Rectangle(window.mouseInfo.x, window.mouseInfo.y, 1, 1)
        );
    }

    static getElementBounds(elementId: string): Rectangle {
        const element = document.getElementById(elementId);
        return new Rectangle(
            element.clientLeft,
            element.clientTop,
            element.clientWidth,
            element.clientHeight
        );
    }

    mouseDown(): void {
        if (this.menu.hasStagedTower) {
            return;
        }

        const mouseRect = new Rectangle(
            window.mouseInfo.x,
            window.mouseInfo.y - this.menu.menuHeight,
            1,
            1
        );
        this.towerManager.mouseDown(mouseRect);
    }

    mouseUp(): void {
        if (!this.isValidTowerStage()) {
            return;
        }

        if (this.towerManager.isTileEmpty(this.newTowerDestinationTile.bounds)) {
            this.menu.clearStagedTower();
            this.towerManager.createTower(this.newTowerDestinationTile);
        }
    }

    mouseMove(x: number, y: number): void {}

    resize(): void {}
}
