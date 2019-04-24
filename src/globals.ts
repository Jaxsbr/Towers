import { RenderEngine } from "./renderEngine";

export namespace Globals {
    export const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    export const renderEngine = new RenderEngine(gameCanvas);
  }