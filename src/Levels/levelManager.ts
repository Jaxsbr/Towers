import { Level } from './level';

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
      return;
    }    
  }

  public nextLevel(): void {
    var index = this.currentLevel.levelIndex + 1;
    for (var l = 0; l < this.levelInfo.length; l++) {
      if(this.levelInfo[l].levelIndex == index) {
        this.currentLevel = this.levelInfo[l];
        return;
      }
    }

    // NOTE: If we get here, no more level exist
    // TODO:
    // Raise end of level notification
    //console.log("last level done")
  }
}
