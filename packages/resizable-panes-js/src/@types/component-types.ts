import {IKeyToBoolMap, IMapIdToSize} from './general-type'
import {PaneModel} from '../../../resizable-core/src/models'
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

export interface IPane {
  id: string;
  size: number;

  maxSize?: number;
  minSize?: number;

  detectionRadius?: number

  resizerSize?: number;
  resizerClass?: string,
  activeResizerClass?: string,

  onMinSize?: (id: string, minSize: number) => void,
  onMaxSize?: (id: string, maxSize: number) => void,
  onNormalSize?: (id: string) => void
}

export interface IResizableOptions {
  uniqueId: string;

  resizerClass?: string;
  activeResizerClass?: string;
  vertical?: boolean;
  unit?: UnitTypes;
  minMaxUnit?: UnitTypes;
  storageApi?: any;
  resizerSize?: number;
  visibility?: IKeyToBoolMap;
  detectionRadius?: number;

  onResize?: onResizeType;
  onResizeStop?: onResizeType;

  onChangeVisibility?: (map: IKeyToBoolMap) => void;
  onMinSize?: (id: string, minSize: number) => void;
  onMaxSize?: (id: string, maxSize: number) => void;
  onNormalSize?: (id: string) => void;

  panes: IPane[]
}
