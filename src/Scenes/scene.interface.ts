import { Game } from "../game";
import { SceneManager } from "./sceneManager";
import { RenderEngine } from "../renderEngine";
import { MouseInfo } from "../Types/MouseInfo";

export interface SceneInterface {
    game: Game
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