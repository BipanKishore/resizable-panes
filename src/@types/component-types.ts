import {MouseEventHandler, ReactNode} from 'react'
import {IKeyToBoolMap, IMapIdToSize} from './general-type'
import {IResizableApi} from './use-resizable-panes-types'
import {PaneModel} from '../models/pane-model'
import {ResizeStorage} from '../utils/storage'
import {ResizerModel} from '../models/resizer-model'

export type onResizeType = (param: IMapIdToSize) => void
export type onReadyType = (api: IResizableApi) => void
export type UnitTypes = 'ratio' | 'pixel' | undefined

export type IGetMapApiParam = 'size' | 'visibility'

export interface IGetMaP {
  [key: string]: number | boolean
}

export interface IResizablePanesPropsBase {
  className?: string,
  vertical?: boolean,
  unit?: UnitTypes,
  onResize?: onResizeType,
  onResizeStop?: onResizeType,
  onReady?: onReadyType,
  onChangeVisibility?: (map: IKeyToBoolMap) => unknown,
  children: ReactNode | ReactNode[],
}

export interface IResizablePaneProviderProps extends IResizablePanesPropsBase {
  uniqueId: string,
  storageApi?: any,
  resizer?: ReactNode,
  resizerSize?: number,
  visibility?: IKeyToBoolMap,
  vertical?: boolean

}

export interface IResizablePanesProps extends IResizablePanesPropsBase {
}

export interface IPane {
  id: string,
  size: number,
  className?: string,
  children?: ReactNode[] | ReactNode,
  maxSize?: number
  minSize?: number,
  resizer?: ReactNode,
  resizerSize?: number
  // destroyOnHide?: boolean
}

export interface IPaneRef {
  setSize: (size: number) => void,
  // onFullSize: () => void,
  // onFullPage: () => void,
  // onCloseFullSize: () => void,
}

export interface IResizer {
  id: string,
  onMouseDown?: MouseEventHandler<HTMLDivElement>,
  node?: any,
  visibility?: boolean,
  children?: ReactNode
}

export interface IStorePaneModel {
  id:string,
  size: number,
  defaultSize: number,
  defaultMinSize: number,
  defaultMaxSize: string | number,
  visibility: boolean,
  storedSize: number
}

export interface IStoreResizerModel {
  id: string,
  visibility: boolean
}

export interface IStoreModel {
  panesMap: {
    [keyof: string]: IStorePaneModel
  },
  resizerMap: {
    [key: string]: IStoreResizerModel
  }
  containerSize: number
}

// export interface IPreviousVisibilityModel {
//   id: string,
//   size: number,
//   visibility: boolean,
//   storedSize: number
// }

// export interface IPreviousVisibilityModelMap {
//   [key: string]: IPreviousVisibilityModel[]
// }

export interface IContextDetails {
  panesList: PaneModel[],
  resizersList: ResizerModel[],
  isSetRatioMode: boolean,
  activeIndex: number,
  axisCoordinate: number,
  prevDirection: string,
  getContainerRect: any,
  newVisibilityModel: boolean,
  vertical: boolean
}

export interface IResizableContext {
  setActiveIndex : (index: number) => void,
  registerPane: any,
  registerResizer: any,
  registerContainer: any,
  getIdToSizeMap: any,
  setMouseDownDetails: any,
  vertical: boolean | undefined,
  calculateAndSetHeight: any,
  props: IResizablePaneProviderProps,
  contextDetails: IContextDetails,
  myChildren: ReactNode[],
  storage: ResizeStorage,
  getPaneSizeStyle: (id: string) => void,
  setVisibility: any
}
