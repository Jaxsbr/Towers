import { AssetManager } from './AssetLoading/assetManager';
import { GameTime } from './DataObjects/gameTime';
import { EnemySpawner } from './Enemies/enemySpawner';
import { GameConfig } from './gameConfig';
import { LevelManager } from './Levels/levelManager';
import { ProjectileEngine } from './Projectiles/projectileEngine';
import { RenderEngine } from './renderEngine';
import { SceneManager } from './Scenes/sceneManager';
import { TileMap } from './Tiles/tileMap';
import { MouseInfo } from './Types/MouseInfo';

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
        gameConfig: GameConfig;
    }
}
