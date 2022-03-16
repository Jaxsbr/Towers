export class Rectangle {
    public left: number;

    public top: number;

    public bottom: number;

    public right: number;

    public width: number;

    public height: number;

    constructor(left: number, top: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;

        this.update();
    }

    private updateRight(): void {
        this.right = this.left + this.width;
    }

    private updateBottom(): void {
        this.bottom = this.top + this.height;
    }

    public update(): void {
        this.updateRight();
        this.updateBottom();
    }

    public intersectRect(rectangle: Rectangle): boolean {
        return !(
            rectangle.left > this.right ||
            rectangle.right < this.left ||
            rectangle.top > this.bottom ||
            rectangle.bottom < this.top
        );
    }

    public containsRect(rectangle: Rectangle): boolean {
        return (
            this.left <= rectangle.left &&
            rectangle.right <= this.right &&
            this.top <= rectangle.top &&
            rectangle.bottom <= this.bottom
        );
    }

    public get getCenterWidth(): number {
        this.updateRight();
        return this.right - this.width / 2;
    }

    public get getCenterHeight(): number {
        this.updateBottom();
        return this.bottom - this.height / 2;
    }

    public clone(): Rectangle {
        return new Rectangle(this.left, this.top, this.width, this.height);
    }

    public equals(rect: Rectangle): boolean {
        return (
            this.left === rect.left &&
            this.top === rect.top &&
            this.width === rect.width &&
            this.height === rect.height
        );
    }

    public toString(): string {
        return `x:${this.left} y: ${this.top} w: ${this.width} h:${this.height}`;
    }

    static get empty(): Rectangle {
        return new Rectangle(0, 0, 0, 0);
    }
}
