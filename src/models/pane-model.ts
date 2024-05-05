import {
  IHiddenResizer,
  IPane,
  IResizablePaneProviderProps,
  ISizeState,
  IStoreResizableItemsModel, UnitTypes, addAndRemoveType
} from '../@types'
import {
  DIRECTIONS, LEFT, MAX_SIZE_STATE, MIN_SIZE_STATE, NONE, NORMAL_SIZE_STATE, PLUS,
  RATIO, RIGHT, SIZE, VISIBILITY
} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {filterKeys, isItDown, isItUp, ratioAndRoundOff} from '../utils/util'
import {attachDefaultPaneProps, checkPaneModelErrors} from './utils'

export class PaneModel {
  isRegistered = true
  isHandle = false
  partialHiddenDirection = DIRECTIONS.NONE

  hiddenResizer: IHiddenResizer = NONE
  prevHiddenResizer: IHiddenResizer = NONE

  initialSetSize: number
  initialSetSizeResizer: IHiddenResizer

  resizerSize: number

  id: string
  api: any
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

  constructor (paneProps: IPane, resizableProps: IResizablePaneProviderProps, store: ResizeStorage) {
    this.props = attachDefaultPaneProps(paneProps)
    const {
      id, minSize, size, maxSize
    } = this.props

    const {visibility, vertical, minMaxUnit, unit} = resizableProps
    this.minMaxUnit = minMaxUnit

    if (unit !== RATIO) {
      checkPaneModelErrors(size, minSize, maxSize, id)
    }

    // // it can be removed with change in default props
    const show = visibility[id] !== undefined ? visibility[id] : true
    this.defaultVisibility = show

    const storedPane = store.getStoredPane(id)
    if (storedPane) {
      const {size, defaultMaxSize, defaultMinSize, defaultSize, visibility, storedSize, hiddenResizer} = storedPane
      this.hiddenResizer = hiddenResizer
      this.initializeSizes(size, defaultMinSize, defaultMaxSize as number, defaultSize, storedSize, visibility)
    } else {
      this.initializeSizes(size, minSize, maxSize, size, size, show)
    }

    this.id = id
    this.vertical = vertical as boolean
    this.syncRatioSizeToSize()
  }

  getRatioSize () {
    return this.isRegistered && this.visibility ? this.sizeRatio : 0
  }

  initializeSize (size: number) {
    this.size = size
    this.storedSize = size
  }

  initializeSizes (size: number, minSize: number, maxSize: number,
    defaultSize: number, storedSize: number, visibility: boolean) {
    // console.log(this.id, size, minSize, maxSize, visibility, this.storedSize)
    this.initializeSize(size)
    this.defaultSize = defaultSize
    this.minSize = minSize
    this.maxSize = maxSize
    this.defaultMinSize = minSize
    this.defaultMaxSize = maxSize
    this.storedSize = storedSize
    this.visibility = visibility
  }

  getStoreModel (): IStoreResizableItemsModel {
    const t = filterKeys(this, 'id', 'hiddenResizer', SIZE,
      'defaultSize', 'defaultMinSize', VISIBILITY, 'storedSize')
    return {
      ...t,
      defaultMaxSize: this.defaultMaxSize.toString()
    }
  }

  getSize () {
    return this.isRegistered && this.visibility ? this.size : 0
  }

  setSizeNIsLimitReached (newSize: number) {
    let size
    if (newSize > this.minSize && newSize < this.maxSize) {
      this.size = newSize
      return true
    } else if (newSize >= this.maxSize) {
      size = this.maxSize
    } else {
      size = this.minSize
    }
    this.size = size
    return false
  }

  // No visibility check required here, we are only using this method for visible panes
  setVisibilitySize (sizeChange: number, operation: addAndRemoveType) {
    const newSize = this.size + (operation === PLUS ? sizeChange : -sizeChange)
    this.restoreLimits()
    const remainingSize = this.setSizeNIsLimitReached(newSize)
    return remainingSize
  }

  setHiddenResizer (newSize: number, direction: number) {
    if (!this.isHandle) {
      if (newSize < 0) {
        if (isItUp(direction)) {
          this.hiddenResizer = LEFT
        }
        if (isItDown(direction)) {
          this.hiddenResizer = RIGHT
        }
      }
    }
  }

  setHiddenResizerWhileMovement (newSize: number, direction: number) {
    if (this.axisSize !== 0) {
      this.setHiddenResizer(newSize, direction)
    }
  }

  clearHiddenResizer () {
    if (this.size > 0) {
      this.hiddenResizer = 'none'
    }
  }

  changeSizeAndReturnRemaing (newSize: number) {
    if (newSize >= this.minSize && newSize <= this.maxSize) {
      this.size = newSize
    } else if (newSize > this.maxSize) {
      this.size = this.maxSize
    } else {
      this.size = this.minSize
    }
  }

  // eslint-disable-next-line complexity
  updatSizeState () {
    if (this.visibility) {
      const {size, props, id} = this
      let newSetSize : ISizeState
      if (size === this.defaultMaxSize) {
        newSetSize = MAX_SIZE_STATE
      } else if (size === this.defaultMinSize) {
        newSetSize = MIN_SIZE_STATE
      } else {
        newSetSize = NORMAL_SIZE_STATE
      }

      if (this.sizeState !== newSetSize) {
        if (newSetSize === NORMAL_SIZE_STATE) {
          this.api.node.classList.remove(props.minSizeClass, props.maxSizeClass)
          props.onNormalSize(id)
        }
        if (newSetSize === MIN_SIZE_STATE) {
          this.api.node.classList.remove(props.maxSizeClass)
          this.api.node.classList.add(props.minSizeClass)
          props.onMinSize(id, size)
        }
        if (newSetSize === MAX_SIZE_STATE) {
          this.api.node.classList.remove(props.minSizeClass)
          this.api.node.classList.add(props.maxSizeClass)
          props.onMaxSize(id, size)
        }
        this.sizeState = newSetSize
      }
    }
  }

  changeSize (sizeChange: number, operation: addAndRemoveType, direction: number) {
    const newSize = this.axisSize + (operation === PLUS ? sizeChange : -sizeChange)

    this.setHiddenResizerWhileMovement(newSize, direction)

    if (newSize >= this.minSize && newSize <= this.maxSize) {
      this.size = newSize
    } else if (newSize > this.maxSize) {
      this.size = this.maxSize
    } else {
      this.size = this.minSize
    }
    this.clearHiddenResizer()
    return Math.abs(this.size - newSize)
  }

  // Task will run this for only visible Items
  setUISize () {
    if (this.api) {
      this.api.setSize(this.visibility ? this.size : 0)
    }
    this.preSize = this.size
  }

  setPreSize () {
    this.size = this.preSize
  }

  register (pane: any) {
    this.api = pane
  }

  syncAxisSize () {
    this.axisSize = this.size
  }

  // updateDefaultMaxSizeForInfinity (containerSize: number, maxRatioValue: number, sizeToUse: number) {
  //   const storeSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, sizeToUse)
  // }

  restore () {
    this.size = this.defaultSize
    this.restoreLimits()
    this.visibility = this.defaultVisibility
    this.hiddenResizer = NONE
  }

  restoreLimits () {
    this.minSize = this.defaultMinSize
    this.maxSize = this.defaultMaxSize
  }

  // this method runs only for visible panes
  resetMax (reduce = 0) {
    this.maxSize = this.defaultMaxSize - reduce
    return this.maxSize
  }

  // this method runs only for visible panes
  resetMin () {
    this.minSize = this.defaultMinSize
    return this.minSize
  }

  synMaxToSize () {
    this.maxSize = this.size
    return this.size
  }

  synMinToSize () {
    this.minSize = this.size
    return this.size
  }

  // this method runs only for visible panes
  getMinDiff () {
    return this.size - this.defaultMinSize
  }

  getMaxDiff () {
    return this.defaultMaxSize - this.size
  }

  synSizeToMinSize (direction: number) {
    if (this.visibility) {
      this.size = this.minSize
      if (this.defaultMinSize === 0) {
        this.setHiddenResizer(-1, direction)
      }
    }
  }

  synSizeToMaxSize () {
    if (this.visibility) {
      this.size = this.maxSize
    }
  }

  // We never come here for the case of store
  toRatioMode (containerSize: number, maxRatioValue: number, isOnResize: boolean) {
    const {
      minSize, size, maxSize
    } = this.props

    // need optimization
    const [minSizeToUse, sizeToUse, maxSizeToUse] = isOnResize
      ? [this.minSizeRatio, this.size, this.maxSizeRatio]
      : [minSize, size, maxSize]

    const storeSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, sizeToUse)

    let minSizeCalculated, maxSizeCalculated
    if (this.minMaxUnit !== RATIO) {
      minSizeCalculated = this.defaultMinSize
      maxSizeCalculated = this.defaultMaxSize
    } else {
      minSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, minSizeToUse)
      maxSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, maxSizeToUse)
    }

    if (!isOnResize) {
      if (this.minMaxUnit !== RATIO) {
        checkPaneModelErrors(storeSizeCalculated, minSizeCalculated, maxSizeCalculated, this.id)
      } else {
        checkPaneModelErrors(size, minSize, maxSize, this.id)
      }
    }

    this.initializeSizes(storeSizeCalculated, minSizeCalculated,
      maxSizeCalculated, storeSizeCalculated, storeSizeCalculated, this.visibility)
  }

  setVisibilityHelper (isPartiallyHidden: boolean) {
    if (this.isHandle) {
      this.size = isPartiallyHidden ? 0 : this.resizerSize
    }
  }

  setVisibility (visibility: boolean, isPartiallyHidden = false) {
    this.visibility = visibility
    if (visibility) {
      this.maxSize = this.defaultMaxSize
      this.minSize = this.defaultMinSize
      this.setVisibilityHelper(isPartiallyHidden)
    } else {
      this.maxSize = 0
      this.minSize = 0
    }
    if (this.api && this.api.destroy) { this.api?.destroy(visibility) }
  }

  setOldVisibilityModel () {
    this.oldVisibleSize = this.size
    this.oldVisibility = this.visibility
  }

  syncToOldVisibilityModel () {
    this.size = this.oldVisibleSize
    this.visibility = this.oldVisibility
  }

  storeForNewSetSizeKey () {
    this.initialSetSize = this.size
    this.initialSetSizeResizer = this.hiddenResizer
  }

  restoreBeforeSetSize () {
    this.size = this.initialSetSize
    this.hiddenResizer = this.initialSetSizeResizer
  }

  syncSizeToRatioSize () {
    this.size = this.sizeRatio
    this.defaultMinSize = this.minSizeRatio
    this.defaultMaxSize = this.maxSizeRatio
  }

  syncRatioSizeToSize () {
    this.sizeRatio = this.size
    this.minSizeRatio = this.defaultMinSize
    this.maxSizeRatio = this.defaultMaxSize
  }
}
