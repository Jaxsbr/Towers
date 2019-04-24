import { GameTime } from "./DataObjects/gameTime";
import { Rectangle } from "./DataObjects/rectangle";
import { RenderEngine } from "./renderEngine";

export class Game {  
  private running: boolean;
  private gameTime: GameTime;
  private renderEngine: RenderEngine;

  constructor() {        
    this.gameTime = new GameTime();
    this.renderEngine = new RenderEngine();
  }

  public start(): void {
    if (this.running) { return; }

    this.running = true;
    this.loop();
  }

  private loop(): void {
    this.gameTime.update();

    this.renderEngine.renderRect(new Rectangle(0, 0, 100, 100), 'red', true);

    requestAnimationFrame(() => this.loop());
  }
}

window.addEventListener('load', () => {               
  const game = new Game();
  game.start();
});
