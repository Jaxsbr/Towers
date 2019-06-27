import { Vector2 } from '../DataObjects/vector2';
import { GameScene } from '../Scenes/gameScene';
import { Rectangle } from '../DataObjects/rectangle';

export class Enemy {
  public position: Vector2;
  public size: Vector2;
  public active: boolean;
  public center: Vector2;
  private bounds: Rectangle;
  private gameScene: GameScene;
  private enemyImage: HTMLImageElement;
  private originalWayPoints: any;
  private movementWayPoints: any;
  private wayPointReachedThreshold: number = 0.5;
  private movements: any;
  private velocity: Vector2;
  private direction: Vector2;  
  private nextMovePoint: Vector2;
  private normalizedDirection: Vector2;  
  private distanceFromNextWaypoint: number;
  private moveSpeed: number = 200;

  constructor(gameScene: GameScene, enemyImage: HTMLImageElement, movementWayPoints: any) {
    this.gameScene = gameScene;
    this.enemyImage = enemyImage;
    this.originalWayPoints = movementWayPoints;
    this.reset();
  }

  public update(delta: number): void {
    console.log("enemy: " + delta);
    console.log("enemy coords: x:" + this.position.x + " y:" + this.position.y);
    if (!this.active) { return; }

    var onLastWaypoint = false;
    if (this.movementWayPoints.length <= 0) {
      onLastWaypoint = true;
    }

    if (!this.nextMovePoint) {
      var firstWayPoint = this.movementWayPoints.shift();
      var waypointBounds = this.gameScene.tileMap.tileMatrix[firstWayPoint.y][firstWayPoint.x].bounds;
      this.nextMovePoint = new Vector2(waypointBounds.getCenterWidth, waypointBounds.getCenterHeight);
    }

    this.updateBounds();

    this.direction = this.nextMovePoint.subtract(this.center);
    this.distanceFromNextWaypoint = this.direction.magnitude();

    if (this.nextWaypointReached()) {
      if (onLastWaypoint) {
        this.nextMovePoint = null;
        this.active = false;
        return;
      }
      else {
        var nextWayPoint = this.movementWayPoints.shift();
        var waypointBounds = this.gameScene.tileMap.tileMatrix[nextWayPoint.y][nextWayPoint.x].bounds;
        this.nextMovePoint.x = waypointBounds.getCenterWidth;
        this.nextMovePoint.y = waypointBounds.getCenterHeight;
        this.direction = this.center.subtract(this.nextMovePoint);
      }
    }

    this.normalizedDirection = this.direction.normalize();
    if (!isNaN(this.normalizedDirection.x) && !isNaN(this.normalizedDirection.y)) {
      this.velocity.x = this.normalizedDirection.x * (this.moveSpeed * delta);  
      this.velocity.y = this.normalizedDirection.y * (this.moveSpeed * delta);
      this.setMoveDirection();
    }

    this.applyVelocity();
  }

  public draw(): void {
    if (!this.active) { return; }

    // TODO:
    // Implement animation class and call draw
    // Animation class to handle source rect updates.
    var sourceRectangle = new Rectangle(0, 0, 68, 80);

    this.gameScene.renderEngine.renderImageSource(
      this.enemyImage,
      sourceRectangle,
      this.bounds);   
  }

  public reset(): void {
    this.active = false;
    this.movementWayPoints = this.originalWayPoints.slice();
    this.movements = { left: false, right: false, up: false, down: false };
    this.position = new Vector2(0, 0);
    this.size = new Vector2(48, 48);
    this.center = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.bounds = new Rectangle(0, 0, 0, 0);
  }

  private nextWaypointReached(): boolean {
    return this.distanceFromNextWaypoint < this.wayPointReachedThreshold;
  }

  private updateBounds(): void {
    this.bounds.left = this.position.x;
    this.bounds.top = this.position.y;
    this.bounds.width = this.size.x;
    this.bounds.height = this.size.y;
    this.bounds.update();

    this.center.x = this.bounds.getCenterWidth;
    this.center.y = this.bounds.getCenterHeight;
  }

  private setMoveDirection(): void {
    this.movements.left = this.velocity.x < 0;
    this.movements.right = this.velocity.x > 0;

    this.movements.up = this.velocity.y < 0;
    this.movements.down = this.velocity.y > 0;

    if (
      (this.movements.left || this.movements.right) &&
      (this.movements.up || this.movements.down)
    ) {
      // We detect if both horizontal and vertical movement is set.
      // As we can only play one animation per axis movement we should determine
      // what axis has the greater velocity value and use that as the direction.

      let horizontalValue =
        this.velocity.x < 0 ? this.velocity.x * -1 : this.velocity.x;

      let verticalValue =
        this.velocity.y < 0 ? this.velocity.y * -1 : this.velocity.y;

      if (horizontalValue > verticalValue) {
        this.movements.left = this.velocity.x < 0;
        this.movements.right = this.velocity.x > 0;
        this.movements.up = false;
        this.movements.down = false;
      } else {
        this.movements.up = this.velocity.y < 0;
        this.movements.down = this.velocity.y > 0;
        this.movements.left = false;
        this.movements.right = false;
      }
    }
  }

  private applyVelocity(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}