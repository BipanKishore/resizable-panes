import {MouseEventHandler, ReactNode} from 'react'
import {IKeyToBoolMap, IMapIdToSize} from './general-type'
import {IResizableApi} from './use-resizable-panes-types'
import {PaneModel} from '../models/pane-model'
import {ResizeStorage} from '../utils/storage'
import {ResizerModel} from '../models/resizer-model'

export type IHiddenResizer = 'left' | 'right' | 'none'
export type IResizableItem = PaneModel | ResizerModel

export type onResizeType = (param: IMapIdToSize) => void
export type onReadyType = (api: IResizableApi) => void
export type UnitTypes = 'ratio' | 'pixel' | undefined

export type IGetMapApiParam = 'size' | 'visibility'

export interface INumberMap {
  [key: string]: number
}

export interface IBoolMap {
  [key: string]: boolean
}

export type IGetMaP = INumberMap | IBoolMap

interface IGetStateItem {
  size: number,
  visibility: boolean,
  defaultMinSize: number,
  defaultMaxSize: number
}

export interface IGetState {
  [key: string]: IGetStateItem
}

export interface IResizablePanesPropsBase {
  uniqueId: string,
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
}

export interface IPaneRef {
  setSize: (size: number) => void
}

export interface IResizer {
  id: string,
  onMouseDown?: MouseEventHandler<HTMLDivElement>,
  node?: any,
  visibility?: boolean,
  children?: ReactNode
}

export interface IStoreResizableItemsModel {
  id: string,
  visibility: boolean
  size: number,
  defaultSize: number,
  defaultMinSize: number,
  defaultMaxSize: string | number,
  storedSize: number
}

export interface IStoreModel {
  panes: IStoreResizableItemsModel[],
  resizers: IStoreResizableItemsModel[],
  containerSize?: number
}

export interface IContextDetails {
  items: IResizableItem[],
  panesList: PaneModel[],
  resizersList: ResizerModel[],
  isSetRatioMode: boolean,
  virtualActiveIndex: number,
  activeIndex: number,
  axisCoordinate: number,
  direction: number,
  getContainerRect: any,
  newVisibilityModel: boolean,
  vertical: boolean,
  virtualOrderList: IResizableItem[],
  decreasingItems: IResizableItem[],
  increasingItems: IResizableItem[]
}

export interface IResizableContext {
  onMoveEndFn: any,
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
  setVisibility: (param: IKeyToBoolMap) => void
}
