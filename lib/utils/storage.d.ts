import { ReactNode } from 'react';
import { IContextDetails, IStoreModel, IStorePaneModel } from '../@types';
export declare const onResizeClearSizesMapFromStore: (uniqueId: string, storageApi: any) => void;
export declare class ResizeStorage {
    store: any;
    uniqueId: string;
    storageApi: any;
    empty: boolean;
    constructor(uniqueId: string, storageApi: any);
    setStorage(contextDetails: IContextDetails, _containerSize?: number): void;
    getStorage(): IStoreModel;
    getStoredPane(id: keyof IStorePaneModel): IStorePaneModel | null;
    getStoredResizer(id: string): import("../@types").IStoreResizerModel;
    readPaneChange(children: ReactNode[], context: any): void;
}
