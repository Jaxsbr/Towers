import { Vector2 } from '../DataObjects/vector2';
import { GameScene } from '../Scenes/gameScene';
import { Rectangle } from '../DataObjects/rectangle';

export class Enemy {
  public position: Vector2;
  public size: Vector2;
  private bounds: Rectangle;
  private gameScene: GameScene;
  private enemyImage: HTMLImageElement;
  private movementWayPoints: any;
  private wayPointReachedThreshold: number = 0.5;
  private movements: any;
  private velocity: Vector2;
  private direction: Vector2;
  private center: Vector2;

  constructor(gameScene: GameScene, enemyImage: HTMLImageElement, movementWayPoints: any) {
    this.gameScene = gameScene;
    this.enemyImage = enemyImage;
    this.movementWayPoints = movementWayPoints;
    this.movements = { left: false, right: false, up: false, down: false };

    this.position = new Vector2(0, 0);
    this.size = new Vector2(48, 48);
    this.center = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.bounds = new Rectangle(0, 0, 0, 0);
  }

  public update(): void {
    this.bounds.left = this.position.x;
    this.bounds.top = this.position.y;
    this.bounds.width = this.size.x;
    this.bounds.height = this.size.y;
    this.bounds.update();

    this.center.x = this.bounds.getCenterWidth();
    this.center.y = this.bounds.getCenterHeight();

    this.setMoveDirection();
    this.applyVelocity();
  }

  public draw(): void {
    // TODO:
    // Implement animation class and call draw
    // Animation class to handle source rect updates.
    var sourceRectangle = new Rectangle(0, 0, 68, 80);

    this.gameScene.renderEngine.renderImageSource(
      this.enemyImage,
      sourceRectangle,
      this.bounds);   
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