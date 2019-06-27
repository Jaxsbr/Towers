import { Tile } from "../Tiles/tile";
import { GameScene } from "../Scenes/gameScene";
import { Vector2 } from "../DataObjects/vector2";
import { Enemy } from "../Enemies/enemy";
import { Rectangle } from '../DataObjects/rectangle';

export abstract class BaseTower {
    public shootRange: number = 128;
    private gameScene: GameScene
    private destinationTile: Tile;    
    private shootRate: number = 0.5;
    private shootElapsed: number = 0;
    private center: Vector2;
    private rotation: number;
    private target: Enemy;
    private targetInRange: boolean;
    private towerImage: HTMLImageElement;

    constructor(gameScene: GameScene, destinationTile: Tile, towerImage: HTMLImageElement) {
        this.gameScene = gameScene;
        this.destinationTile = destinationTile;
        this.towerImage = towerImage;

        this.center = new Vector2(0, 0);
    }

    public update(): void {
        this.center.x = this.destinationTile.bounds.getCenterWidth;
        this.center.y = this.destinationTile.bounds.getCenterHeight;

        this.updateTarget();
        this.updateTargetInRange();
        this.updateRotation();        

        //console.log('targetInRange: ' + this.targetInRange);
    }

    public draw(): void {
        // TODO:
        // Implement animation class and call draw
        // Animation class to handle source rect updates.
        var sourceRectangle = new Rectangle(0, 0, 32, 32);

        this.gameScene.renderEngine.renderRotatedImageSource(
            this.towerImage,
            sourceRectangle,
            this.destinationTile.bounds,
            this.rotation);
    }

    private updateTargetInRange(): void {
        if (this.target !== null && this.target.active) {            
          let targetDirection = this.center.subtract(this.target.center);
          let distance = targetDirection.magnitude();          
          if (distance <= this.shootRange) {
            console.log('ranged');
            this.targetInRange = true;
            return;
          }      
        }
    
        this.targetInRange = false;
    }

    private updateRotation(): void {
        // Rotate the tower towards it's current target or
        // rotate to default position if no target exist or if target not in range.
        if (this.targetInRange) {
            var xDistance = this.target.center.x - this.center.x;
            var yDistance = this.target.center.y - this.center.y;
            this.rotation = (Math.atan2(yDistance, xDistance) * (180 / Math.PI)) - 270;
        } 
        // else {
        //     if (this.rotation > 0) {
        //         this.rotation = this.rotation - 0.01;
        //     } else {
        //         this.rotation = -90;
        //     }
        // }        
        // this.rotation = this.rotation - 270;
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