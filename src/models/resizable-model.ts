import {IResizableItem} from '../@types'
import {PaneModel} from './pane-model'
import {ResizerModel} from './resizer-model'

export class ResizableModel {
  isSetRatioMode = false
  newVisibilityModel = false
  isViewSizeChanged = false

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
  resizersList: ResizerModel[]

  getContainerRect: () => any

  register (subModel: any) {
    Object.assign(this, subModel)
  }
}
