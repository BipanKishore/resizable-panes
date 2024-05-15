import {
  IPane,
  IResizablePaneProviderProps,
  IResizerApi,
  ISizeState,
  UnitTypes
} from '../@types'
import {
  NORMAL_SIZE_STATE,
  RATIO
} from '../utils/constant'
import {ResizeStorage} from '../utils/storage'
import {getResizerId} from '../utils/util'
import {
  initializeSizes,
  syncPaneRatioSizeToSize
} from './pane'
import {attachDefaultPaneProps, checkPaneModelErrors} from './utils'

export class PaneModel {
  isHandle: boolean

  initialSetSize: number

  resizerSize: number
  detectionRadius: number

  id: string
  api: any | IResizerApi
  size: number
  sizeRatio: number
  minSizeRatio: number
  maxSizeRatio: number

  sizeState: ISizeState = NORMAL_SIZE_STATE

  minMaxUnit: UnitTypes

  preSize: number
  // get _size () {
  //   return this.size
  // }

  // set _size (val:number) {
  //   if (val === 63) {
  //     debugger
  //   }
  //   this.size = val
  // }

  defaultSize: number
  minSize: number
  defaultMinSize: number
  maxSize: number
  defaultMaxSize: number

  visibility: boolean
  defaultVisibility: boolean

  storedSize: number = 0

  vertical: boolean

  axisSize: number = 0

  oldVisibleSize: number = 0
  oldVisibility: boolean = true
  props:IPane
  // Development Variables

  // eslint-disable-next-line complexity
  constructor (
    paneProps: IPane,
    resizableProps: IResizablePaneProviderProps,
    store: ResizeStorage, isHandle: boolean) {
    this.props = attachDefaultPaneProps(paneProps, resizableProps)

    const {
      id, minSize, size, maxSize, resizerSize, detectionRadius
    } = this.props

    const {visibility, vertical, minMaxUnit, unit} = resizableProps

    this.minMaxUnit = minMaxUnit ?? unit

    if (unit !== RATIO) {
      checkPaneModelErrors(size, minSize, maxSize, id)
    }

    // // it can be removed with change in default props
    const show = visibility[id] ?? true
    this.defaultVisibility = show

    const storedPane = store.getStoredPane(id)
    if (storedPane) {
      const {size, defaultMaxSize, defaultMinSize, defaultSize, visibility, storedSize} = storedPane
      initializeSizes(this, size, defaultMinSize, defaultMaxSize as number, defaultSize, storedSize, visibility)
    } else {
      initializeSizes(this, size, minSize, maxSize, size, size, show)
    }

    this.id = id
    this.vertical = vertical
    syncPaneRatioSizeToSize(this)

    this.isHandle = isHandle
    if (isHandle) {
      this.id = getResizerId(id)
      this.resizerSize = resizerSize
      this.detectionRadius = detectionRadius
    }
  }
}
