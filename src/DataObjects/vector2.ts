export class Vector2 {
    public x: number;
    public y: number;        

    constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
    }

    public subtract(vector2: Vector2): Vector2 {
      return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }

    public distance(vector2: Vector2): number {
      var x = (this.x - vector2.x) * (this.x - vector2.x);
      var y = (this.y - vector2.y) * (this.y - vector2.y);
      return Math.sqrt(x + y);
    }

    public magnitude(): number {      
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2 {      
      let distance = Math.sqrt(this.x * this.x + this.y * this.y);

      var normalX = this.x / distance;
      var normalY = this.y / distance;

      return new Vector2(
        isNaN(normalX) ? 0 : normalX, 
        isNaN(normalY) ? 0 : normalY);
    }
}