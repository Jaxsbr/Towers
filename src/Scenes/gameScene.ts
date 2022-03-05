import {
    EnemySpawner,
    LevelManager,
    Menu,
    ProjectileEngine,
    Rectangle,
    SceneInterface,
    TileMap,
    TowerManager
} from '../internal';

export class GameScene implements SceneInterface {
    backgroundImage: HTMLImageElement;

    tileImage: HTMLImageElement;

    towerManager: TowerManager;

    projectileEngine: ProjectileEngine;

    menu: Menu;

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
        this.towerManager.createTower(window.tileMap.tileMatrix[5][5]);
        this.towerManager.createTower(window.tileMap.tileMatrix[8][7]);

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
        window.renderEngine.renderImage(this.backgroundImage, 0, 0, 480, 480);
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
        this.towerManager.draw();
        window.projectileEngine.draw();
        this.menu.draw();
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

    mouseDown(): void {}

    mouseUp(): void {
        if (GameScene.isOverMouseMenu()) {
            return;
        }
        if (!GameScene.isOverGameBounds()) {
            return;
        }

        const x = Math.floor(window.mouseInfo.x / window.tileMap.tileWidth);
        const y = Math.floor(
            (window.mouseInfo.y - window.tileMap.tileHeight) / window.tileMap.tileHeight
        );
        const destinationTile = window.tileMap.tileMatrix[y][x];
        this.menu.clearStagedTower();
        this.towerManager.createTower(destinationTile);

        console.log(
            `tileX:${x} tileY:${y} destTile:${destinationTile.bounds} mouseX:${window.mouseInfo.x} mouseY:${window.mouseInfo.y}`
        );
    }

    mouseMove(x: number, y: number): void {}

    resize(): void {}
}
