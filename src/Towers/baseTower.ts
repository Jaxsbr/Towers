import { Tile } from "../Tiles/tile";
import { GameScene } from "../Scenes/gameScene";
import { Vector2 } from "../DataObjects/vector2";
import { Enemy } from "../Enemies/enemy";

export class BaseTower {
    private gameScene: GameScene
    private boundingTile: Tile;
    private detectionRange: 64;
    private shootRate: 0.5;
    private shootElapsed: 0;
    private center: Vector2;
    private target: Enemy;

    constructor(gameScene: GameScene, boundingTile: Tile) {
        this.gameScene = gameScene;
        this.boundingTile = boundingTile;

        this.center = new Vector2(0, 0);
    }

    public update(): void {
        this.center.x = this.boundingTile.bounds.getCenterWidth();
        this.center.y = this.boundingTile.bounds.getCenterHeight();

        this.updateTarget();
    }

    public draw(): void {
        
    }

    private updateTarget(): void {
        var distance = 0;
        var closestDistance = 99999;
        var closestEnemy: Enemy;

        for (var e = 0; e < this.gameScene.enemySpawner.enemies.length; e++) {
            var enemy = this.gameScene.enemySpawner.enemies[e];
            distance = enemy.center.distance(this.center);

            if (closestEnemy) {
                closestDistance = distance;
                closestEnemy = enemy;
                continue;
            }

            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        };

        this.target = closestEnemy;
    }
}