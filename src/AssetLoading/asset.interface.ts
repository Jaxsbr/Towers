import { AssetManager } from '../internal';

export interface AssetInterface {
    assetManager: AssetManager;
    key: string;
    src: string;
    init(): void;
}
