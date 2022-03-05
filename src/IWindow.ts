import {
    AssetManager,
    EnemySpawner,
    GameTime,
    LevelManager,
    MouseInfo,
    ProjectileEngine,
    RenderEngine,
    SceneManager,
    TileMap
} from './internal';

declare global {
    interface Window {
        renderEngine: RenderEngine;
        assetManager: AssetManager;
        sceneManager: SceneManager;
        gameTime: GameTime;
        levelManager: LevelManager;
        tileMap: TileMap;
        enemySpawner: EnemySpawner;
        projectileEngine: ProjectileEngine;
        mouseInfo: MouseInfo;
    }
}
