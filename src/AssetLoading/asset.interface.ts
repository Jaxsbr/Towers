import { AssetManager } from "./assetManager";

export interface AssetInterface {
    assetManager: AssetManager;
    key: string;
    src: string;
    init(): void;    
}