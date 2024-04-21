import {
  IHiddenResizer,
  IPaneNumericKeys, IResizablePaneProviderProps,
  IStoreResizableItemsModel, addAndRemoveType
} from '../@types'
import {DIRECTIONS, PLUS, ZERO} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {filterKeys, isItDown, isItUp, ratioAndRoundOff} from '../utils/util'
import {ResizerModel} from './resizer-model'
import {checkPaneModelErrors} from './utils'

export class PaneModel {
  isRegistered = true
  isHandle = false
  isPartiallyHidden: boolean = false
  partialHiddenDirection = DIRECTIONS.NONE
  hiddenResizer: IHiddenResizer = 'none'
  resizerSize: number

  id: string
  // index
  api: any
  size: number
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
  storedSize: number = 0

  vertical: boolean

  axisSize: number = 0
  visibility: boolean

  oldVisibleSize: number = 0
  oldVisibility: boolean = true
  // Development Variables

  constructor (paneProps: any, resizableProps: IResizablePaneProviderProps, store: ResizeStorage) {
    const {
      id, minSize = ZERO, size, maxSize = Infinity
    } = paneProps

    const {visibility = {}, vertical} = resizableProps
    const show = visibility[id] !== undefined ? visibility[id] : true

    const storedPane = store.getStoredPane(id)
    if (storedPane) {
      const {size, defaultMaxSize, defaultMinSize, visibility, storedSize} = storedPane
      this.initializeSizes(size, defaultMinSize, defaultMaxSize as number, storedSize, visibility)
    } else {
      const freshSize = show ? size : 0
      this.initializeSizes(freshSize, minSize, maxSize, size, show)
    }

    this.id = id
    this.vertical = vertical as boolean

    checkPaneModelErrors(size, minSize, maxSize, id)
  }

  initializeSize (size: number) {
    this.size = size
    this.defaultSize = size
    this.storedSize = size
  }

  initializeSizes (size: number, minSize: number, maxSize: number, storedSize: number, visibility: boolean) {
    // console.log(this.id, size, minSize, maxSize, visibility, this.storedSize)
    this.initializeSize(size)
    this.minSize = minSize
    this.maxSize = maxSize
    this.defaultMinSize = minSize
    this.defaultMaxSize = maxSize
    this.storedSize = storedSize
    this.visibility = visibility
  }

  getStoreModel (): IStoreResizableItemsModel {
    const t = filterKeys(this, 'id', 'size', 'defaultSize', 'defaultMinSize', 'visibility', 'storedSize')
    return {
      ...t,
      defaultMaxSize: this.defaultMaxSize.toString()
    }
  }

  getSize () {
    return this.isRegistered && this.visibility ? this.size : 0
  }

  // No visibility check required here, we are only using this method for visible panes
  setVisibilitySize (sizeChange: number, operation: addAndRemoveType) {
    // we are never reducing here
    const newSize = this.size + (operation === PLUS ? sizeChange : -sizeChange)
    this.restoreLimits()
    if (newSize >= this.minSize && newSize <= this.maxSize) {
      this.size = newSize
      return ZERO
    } else if (newSize > this.maxSize) {
      this.size = this.maxSize
    } else {
      this.size = this.minSize
    }
    return newSize - this.size
  }

  setHiddenResizer (newSize: number, direction: number) {
    if (!this.isHandle) {
      if (newSize < 0) {
        if (isItUp(direction)) {
          this.hiddenResizer = 'left'
        }
        if (isItDown(direction)) {
          this.hiddenResizer = 'right'
        }
      }
    }
  }

  setHiddenResizerWhileMovement (newSize: number, direction: number) {
    if (this.axisSize !== 0) {
      this.setHiddenResizer(newSize, direction)
    }
    // console.log('change-size-' + this.id, this.size, newSize, this.hiddenResizer)
  }

  clearHiddenResizer () {
    if (this.size > 0) {
      this.hiddenResizer = 'none'
    }
  }

  changeSize (sizeChange: number, operation: addAndRemoveType, direction: number) {
    const newSize = this.axisSize + (operation === PLUS ? sizeChange : -sizeChange)

    this.setHiddenResizerWhileMovement(newSize, direction)

    if (newSize >= this.minSize && newSize <= this.maxSize) {
      this.size = newSize
      this.clearHiddenResizer()
      return ZERO
    } else if (newSize > this.maxSize) {
      this.size = this.maxSize
    } else {
      this.size = this.minSize
    }
    this.clearHiddenResizer()
    return Math.abs(this.size - newSize)
  }

  setUISize (direction: number) {
    if (this.api) {
      console.log('setUISize', this.id, this.size)
      this.api.setSize(this.visibility ? this.size : 0)
    }
    this.preSize = this.size
  }

  register (pane: any) {
    if (this.api) {
      this.api = pane
      this.setUISize(DIRECTIONS.DOWN)
    }
    this.api = pane
  }

  synPreservedSize () {
    if (!this.storedSize) {
      this.storedSize = this.size
    }
  }

  synSizeToStored () {
    this.size = this.storedSize as number
    // this.storedSize = null
  }

  syncAxisSize () {
    this.axisSize = this.size
  }

  restore () {
    // Need to access both the values from props
    this.setVisibility(true)
    this.size = this.defaultSize
  }

  restoreLimits () {
    this.minSize = this.defaultMinSize
    this.maxSize = this.defaultMaxSize
  }

  resetMax (reduce = 0) {
    if (this.visibility) {
      this.maxSize = this.defaultMaxSize - reduce
      return this.maxSize
    } else {
      this.maxSize = 0
    }
    return ZERO
  }

  resetMin () {
    if (this.visibility) {
      this.minSize = this.defaultMinSize
      return this.minSize
    } else {
      this.minSize = 0
    }
    return ZERO
  }

  synMaxToSize () {
    this.maxSize = this.size
    return this.size
  }

  synMinToSize () {
    this.minSize = this.size
    return this.size
  }

  getMinDiff () {
    if (this.visibility) {
      return this.size - this.defaultMinSize
    }
    return ZERO
  }

  getMaxDiff () {
    if (this.visibility) {
      return this.defaultMaxSize - this.size
    } else {
      this.maxSize = 0
    }
    return ZERO
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
  toRatioMode (containerSize: number, maxRatioValue: number) {
    const storeSize = ratioAndRoundOff(containerSize, maxRatioValue, this.size)
    const minSize = ratioAndRoundOff(containerSize, maxRatioValue, this.minSize)
    const maxSize = ratioAndRoundOff(containerSize, maxRatioValue, this.maxSize)
    // Need to check if it is right
    const size = this.visibility ? storeSize : 0
    this.initializeSizes(size, minSize, maxSize, storeSize, this.visibility)
  }

  fixChange (key: IPaneNumericKeys, change: number) {
    if (this.visibility) {
      this[key] = this[key] + change
    }
  }

  setVisibilityHelper (isPartiallyHidden: boolean = false) {
    if (this.isHandle) {
      this.size = isPartiallyHidden
        ? 0
        : this.resizerSize ? this.resizerSize : this.api.getVisibleSize()
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
  }

  setOldVisibilityModel () {
    this.oldVisibleSize = this.size
    this.oldVisibility = this.visibility
  }

  syncToOldVisibilityModel () {
    this.size = this.oldVisibleSize
    this.visibility = this.oldVisibility
  }
}
