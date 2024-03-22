import { IContextDetails, IKeyToBoolMap, IServiceRef } from '../@types';
import { PaneModel } from '../models/pane-model';
import { ResizerModel } from '../models/resizer-model';
export declare const restoreDefaultFn: ({ panesList, resizersList }: IServiceRef) => void;
export declare const visibilityOperationFn: (panesList: PaneModel[], actionList: number[], maxPaneSize: number) => void;
export declare const changeSizeInRatio: (panesList: PaneModel[], actionList: number[], sizeChange: number, maxPaneSize: number) => void;
export declare const setVisibilityFn: (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => void;
export declare const setResizersVisibility: (resizersList: ResizerModel[], visibility: boolean) => void;
