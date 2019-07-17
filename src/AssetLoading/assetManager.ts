import { ImageAsset } from "./imageAsset";
import { MapAsset } from "./mapAsset";
import { Level } from '../Levels/level';

export class AssetManager {
    images: ImageAsset[] = [];
    maps: MapAsset[] = [];
    levelInfo: Level[] = [];
    totalAssets: number;
    loadedAssets: number;
    public loadCompleted: boolean;

    init(): void {
        this.loadCompleted = false;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.initAssets();
    }

    initAssets() {
        let imageAssets: string;
        let mapAssets: string;
        let request = new XMLHttpRequest();

        request.onload = event => {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                this.totalAssets = data.assetCount;
                imageAssets = data.imageAssets;
                mapAssets = data.mapAssets;
                
                this.initImages(imageAssets);
                this.initLevelInfo(data.levelInfoFile);
            }
        }
        request.open('get', './assets/assetManifest.json', true);
        request.send();
    }

    initImages(imageAssets: any) {  
        imageAssets.forEach(asset => {
            let image = new ImageAsset(this, asset.key, asset.src);
            this.images.push(image);
        });        

        this.images.forEach(img => {
            img.init();
        });
    }

    initMaps(mapAssets: any) {
        mapAssets.forEach(asset => {
            let map = new MapAsset(this, asset.key, asset.src);
            this.maps.push(map);
        });      

        this.maps.forEach(map => {
             map.init();
        });
    }

    initLevelInfo(levelInfoFile: string): void {
      if (!levelInfoFile) {
        console.error("no level info file provided");
        return;
      }

      let request = new XMLHttpRequest();

      request.onload = event => {
          if (request.status === 200) {
            let data = JSON.parse(request.responseText);            
            this.levelInfo = data;
            this.loadedAssets++;
          }
      }
      request.open('get', levelInfoFile, true);
      request.send();
    }

    update() {
        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {
            this.loadCompleted = true;
        }
    }

    getImage(key: string): HTMLImageElement {
        let image;
        for (let img of this.images) {
            if (img.key === key) {
                return img.image;
            }
        }
    }
}