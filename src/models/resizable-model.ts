import {IResizableApi, IResizableEvent, IResizableItem, IResizablePaneProviderProps} from '../@types'
import {PaneModel} from './pane-model'

export class ResizableModel {
  // Need to clear on all operations
  isSetRatioMode = false
  newVisibilityModel = false
  isViewSizeChanged = false

  setSizeKey: string

  vertical: boolean

  direction: number
  axisCoordinate: number

  // Index of virtualOrderListm handleId Index
  index: number
  topAxis: number
  bottomAxis: number

  handleId: string

  items: IResizableItem[]
  virtualOrderList: IResizableItem[]
  decreasingItems: IResizableItem[]
  increasingItems: IResizableItem[]

  panesList: PaneModel[]
  resizersList: IResizableItem[]

  previousTouchEvent: any
  detectionDetails: [number, number, string][]
  onMouseDown: ([mouseCoordinate]: IResizableEvent, handleId: string) => void
  resizeOnMove: ([mouseCoordinate, movement]: IResizableEvent) => void
  onMouseUp: () => void

  api: IResizableApi
  registerItem: (api: any, id: string) => void
  registerContainer: any
  props: IResizablePaneProviderProps

  getPaneSizeStyle: (id: string) => any

  getContainerRect: () => any

  register (subModel: any) {
    Object.assign(this, subModel)
  }
}
