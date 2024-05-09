import {MouseEventHandler, ReactElement, ReactNode} from 'react'
import {IKeyToBoolMap, IMapIdToSize} from './general-type'
import {PaneModel, ResizableModel} from '../models'
import {ResizeStorage} from '../utils/storage'
import {
  UnitTypes,
  IHiddenResizer,
  IVisibilityState,
  ISetSizeBehaviour
} from './basic-types'

export type IResizableItem = PaneModel;

export interface IResizerApi {
  setSize: (size: number) => void;
}

export type onResizeType = (param: IMapIdToSize) => void;

export interface INumberMap {
  [key: string]: number;
}

export interface IBoolMap {
  [key: string]: boolean;
}

export interface IVisibilityMap {
  [key: string]: IVisibilityState;
}

export type IGetMaP = INumberMap | IBoolMap;

interface IGetStateItem {
  size: number;
  visibility: boolean;
  defaultMinSize: number;
  defaultMaxSize: number;
}

export interface IGetState {
  [key: string]: IGetStateItem;
}

export interface IResizableApi {
  restore: () => void;
  setVisibilities: (map: IKeyToBoolMap) => void;
  getVisibilities: () => IVisibilityMap;
  getSizes: () => INumberMap;
  getState: () => IGetState;
  setSize: (id: string, size: number, behavior?: ISetSizeBehaviour) => void;
}
export type onReadyType = (api: IResizableApi) => void;

export interface IVisibilityOtherOptions {
  accepted: boolean;
}

export interface IResizablePaneProviderProps {
  uniqueId: string;
  className?: string;
  resizerClass?: string;
  activeResizerClass?: string;
  vertical?: boolean;
  unit?: UnitTypes;
  minMaxUnit?: UnitTypes;
  onResize?: onResizeType;
  onResizeStop?: onResizeType;
  onReady?: onReadyType;
  onChangeVisibility?: (map: IKeyToBoolMap) => void;
  children: ReactNode | ReactNode[];
  storageApi?: any;
  resizer?: ReactNode;
  resizerSize?: number;
  visibility?: IKeyToBoolMap;
  unmountOnHide?: boolean;
  zipping?: boolean;
  onMinSize?: (id: string, minSize:number) => void,
  onMaxSize?: (id: string, maxSize:number) => void,
  onNormalSize?: (id: string) => void
}

export interface IPane {
  id: string;
  size: number;
  unmountOnHide?: boolean;
  className?: string;
  children?: ReactNode[] | ReactNode;
  maxSize?: number;
  minSize?: number;
  resizer?: ReactNode;
  resizerSize?: number;
  onMinSize?: (id: string, minSize:number) => void,
  onMaxSize?: (id: string, maxSize:number) => void,
  onNormalSize?: (id: string) => void
}

export interface IPaneRef {
  setSize: (size: number) => void;
}

export interface IResizer {
  id: string;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  node?: any;
  visibility?: boolean;
  children?: ReactElement;
}

export interface IStoreResizableItemsModel {
  id: string;
  visibility: boolean;
  size: number;
  defaultSize: number;
  defaultMinSize: number;
  defaultMaxSize: string | number;
  storedSize: number;
  hiddenResizer: IHiddenResizer;
}

export interface IStoreModel {
  panes: IStoreResizableItemsModel[];
  resizers: IStoreResizableItemsModel[];
  containerSize?: number;
}

export interface IResizableContext {
  api: any;
  emitResize: any;
  onMoveEndFn: any;
  registerItem: (api: any, id: string) => void;
  registerContainer: any;
  getIdToSizeMap: any;
  setMouseDownDetails: any;
  vertical: boolean | undefined;
  calculateAndSetHeight: any;
  props: IResizablePaneProviderProps;
  resizable: ResizableModel;
  getPaneSizeStyle: (id: string) => void;
  // setVisibility: (param: IKeyToBoolMap) => void;
}
