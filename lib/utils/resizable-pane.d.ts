import { IContextDetails, IMovingLogicParams, IResizableEvent } from '../@types';
import { PaneModel } from '../models/pane-model';
export declare const goingDownLogic: (e: IResizableEvent, { axisCoordinate, panesList, activeIndex }: IMovingLogicParams) => void;
export declare const goingUpLogic: (e: any, { axisCoordinate, panesList, activeIndex }: IMovingLogicParams) => void;
export declare const getVisiblePaneModelsAndActiveIndex: (panesList: PaneModel[], _activeIndex: number) => {
    visiblePanesList: PaneModel[];
    activeIndex: number;
};
export declare const setCurrentMinMax: (serviceRefCurrent: IContextDetails, index?: number) => void;
export declare const calculateAxes: (serviceRefCurrent: any) => {
    bottomAxis: any;
    topAxis: any;
};
export declare const minMaxLogicUp: (panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum: number, maxPaneSize: number) => void;
export declare const minMaxLogicDown: (panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum: number, maxPaneSize: number) => void;
export declare const getMaxContainerSizes: ({ getContainerRect, vertical, panesList, resizersList }: IContextDetails) => {
    containerSize: number;
    maxTopAxis: any;
    maxPaneSize: number;
    resizersSize: number;
};
export declare const registerContainer: (context: any) => (node: any) => void;
export declare const toRatioModeFn: (contextDetails: IContextDetails) => void;
