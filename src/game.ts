import { GameTime } from "./DataObjects/gameTime";
import { Rectangle } from "./DataObjects/rectangle";
import { RenderEngine } from "./renderEngine";
import { AssetManager } from "./AssetLoading/assetManager";
import { SceneManager } from "./Scenes/sceneManager";
import { LoadScene } from "./Scenes/loadScene";
import { GameScene } from "./Scenes/gameScene";
import { SceneInterface } from "./Scenes/scene.interface";
import { Scenes } from "./Scenes/scenes.enum";

export class Game {  
  public assetManager: AssetManager;
  public currentScene: SceneInterface;    
  public screenBounds: Rectangle;

  private running: boolean;
  private gameTime: GameTime;
  private renderEngine: RenderEngine;
  private sceneManager: SceneManager;

  constructor() {     
    this.screenBounds = new Rectangle(0, 0, 800, 480);   
    this.gameTime = new GameTime();
    this.renderEngine = new RenderEngine();    
    this.assetManager = new AssetManager();
    this.assetManager.init();
    this.initSceneManager();

    window.addEventListener('mousemove', (e) => { this.mouseMove(e); } );
    window.addEventListener('mousedown', () => { this.mouseDown(); } );
    window.addEventListener('mouseup', () => { this.mouseUp(); } );
  }

  public start(): void {
    if (this.running) { return; }

    this.running = true;
    this.loop();
  }

  private initSceneManager(): void {
    this.sceneManager = new SceneManager(this, this.renderEngine);    
    this.sceneManager.toggleActiveScene(Scenes.loading);
  }

  private loop(): void {
    this.gameTime.update();

    if (this.currentScene) {
      this.currentScene.update(this.gameTime.delta);
      this.currentScene.render();
    }

    requestAnimationFrame(() => this.loop());
    //setInterval(this.loop.bind(this), 1);
  }  

  private mouseMove(event: any): void {
    this.currentScene.mouseMove(event.x, event.y);
  }

  private mouseDown(): void {
    console.log('mousedown');
    this.currentScene.mouseDown();
  }

  private mouseUp(): void {
    console.log('mouseup');
    this.currentScene.mouseUp();
  }
}

window.addEventListener('load', () => {               
  const game = new Game();
  game.start();
});


