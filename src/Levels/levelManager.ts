import { Level } from '../internal';

export class LevelManager {
    private levelInfo: Level[];

    public currentLevel: Level;

    constructor(levelInfo: Level[]) {
        this.levelInfo = levelInfo;
        this.loadLevel();
    }

    private loadLevel(): void {
        if (this.currentLevel == null) {
            this.currentLevel = this.levelInfo[0];
        }
    }

    public nextLevel(): void {
        const index = this.currentLevel.levelIndex + 1;
        for (let l = 0; l < this.levelInfo.length; l++) {
            if (this.levelInfo[l].levelIndex == index) {
                this.currentLevel = this.levelInfo[l];
                return;
            }
        }

        // NOTE: If we get here, no more level exist
        // TODO:
        // Raise end of level notification
        // console.log("last level done")
    }
}
