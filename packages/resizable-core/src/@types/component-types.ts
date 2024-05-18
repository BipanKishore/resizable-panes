import {MouseEventHandler, ReactElement, ReactNode} from 'react'
import {IKeyToBoolMap, IMapIdToSize} from './general-type'
import {PaneModel} from '../models'
import {
  UnitTypes,

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
  getVisibilities: () => IBoolMap;
  getSizes: () => INumberMap;
  getState: () => IGetState;
  setSize: (id: string, size: number, behavior?: ISetSizeBehaviour) => void;
  setSizeRatio:(id: string, ratio: number, behavior?: ISetSizeBehaviour) => void;
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
  storageApi?: any;
  resizer?: ReactElement;
  resizerSize?: number;
  visibility?: IKeyToBoolMap;
  unmountOnHide?: boolean;
  detectionRadius?: number

  children: ReactElement | ReactElement[];

  onResize?: onResizeType;
  onResizeStop?: onResizeType;
  onReady?: onReadyType;
  onChangeVisibility?: (map: IKeyToBoolMap) => void;
  onMinSize?: (id: string, minSize: number) => void,
  onMaxSize?: (id: string, maxSize: number) => void,
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

  detectionRadius?: number
  resizer?: ReactElement;
  resizerSize?: number;
  resizerClass?: string,
  activeResizerClass?: string,

  onMinSize?: (id: string, minSize: number) => void,
  onMaxSize?: (id: string, maxSize: number) => void,
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
  children?: ReactElement
}

export interface IStoreResizableItemsModel {
  id: string;
  visibility: boolean;
  size: number;
  defaultSize: number;
  defaultMinSize: number;
  defaultMaxSize: string | number;
  storedSize: number;
}

export interface IStoreModel {
  panes: IStoreResizableItemsModel[];
  resizers: IStoreResizableItemsModel[];
  containerSize?: number;
}
