import { Level } from '../Levels/level';
import { ImageAsset } from './imageAsset';

export class AssetManager {
    images: ImageAsset[] = [];

    levelInfo: Level[] = [];

    levelInfoLoaded: boolean;

    totalAssets: number;

    public loadedAssetCount: number;

    public loadCompleted: boolean;

    init(): void {
        this.levelInfoLoaded = false;
        this.loadCompleted = false;
        this.totalAssets = 0;
        this.initAssets();
    }

    initAssets(): void {
        const request = new XMLHttpRequest();
        request.onload = (): void => {
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                this.totalAssets = data.assetCount;
                this.initImages(data.imageAssets);
                this.initLevelInfo(data.levelInfoFile);
            }
        };
        request.open('get', './assets/assetManifest.json', true);
        request.send();
    }

    initImages(imageAssets: any): void {
        imageAssets.forEach(asset => {
            const image = new ImageAsset(asset.key, asset.src);
            this.images.push(image);
        });

        this.images.forEach(img => {
            img.init();
        });
    }

    initLevelInfo(levelInfoFile: string): void {
        if (!levelInfoFile) {
            console.error('no level info file provided');
            return;
        }

        const request = new XMLHttpRequest();

        request.onload = (): void => {
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                this.levelInfo = data;
                this.levelInfoLoaded = true;
            }
        };
        request.open('get', levelInfoFile, true);
        request.send();
    }

    update(): void {
        this.loadedAssetCount = this.images.filter(x => x.loaded).length;
        this.loadedAssetCount = this.levelInfoLoaded
            ? (this.loadedAssetCount += 1)
            : this.loadedAssetCount;

        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssetCount) {
            this.loadCompleted = true;
        }
    }

    getImage(key: string): HTMLImageElement {
        return this.images.filter(x => x.key === key).at(0).image;
    }
}
