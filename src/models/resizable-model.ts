import {IResizableItem} from '../@types'
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
  virtualActiveIndex: number
  topAxis: number
  bottomAxis: number

  handleId: string

  items: IResizableItem[]
  virtualOrderList: IResizableItem[]
  decreasingItems: IResizableItem[]
  increasingItems: IResizableItem[]

  panesList: PaneModel[]
  resizersList: IResizableItem[]

  getContainerRect: () => any

  register (subModel: any) {
    Object.assign(this, subModel)
  }
}
