import { IKeyToBoolMap, IPane, IResizablePaneProviderProps, IResizerApi, IStoreResizerModel } from '../@types';
import { ResizeStorage } from '../utils/storage';
export declare class ResizerModel {
    api: IResizerApi;
    visibility: boolean;
    id: string;
    isRegistered: boolean;
    isStorPresent: boolean;
    resizerSize: number;
    visibilityMap: IKeyToBoolMap;
    constructor(paneProps: IPane, resizableProps: IResizablePaneProviderProps, store: ResizeStorage);
    registerMe(): void;
    register(api: IResizerApi): void;
    getSize(): number;
    setUISize(): void;
    setVisibilityNew(visibility: boolean): void;
    getStoreModel: () => IStoreResizerModel;
}
