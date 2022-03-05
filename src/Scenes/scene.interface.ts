import { Game, SceneManager, RenderEngine, MouseInfo } from '../internal';

export interface SceneInterface {
    game: Game;
    sceneManager: SceneManager;
    renderEngine: RenderEngine;
    mouseInfo: MouseInfo;

    init(): void;
    update(delta: number): void;
    render(): void;
    mouseDown(): void;
    mouseUp(): void;
    mouseMove(x: number, y: number): void;
    resize(): void;
}