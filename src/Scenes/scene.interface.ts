export interface SceneInterface {
    init(): void;
    update(): void;
    render(): void;
    mouseDown(): void;
    mouseUp(): void;
    mouseMove(x: number, y: number): void;
    resize(): void;
}
