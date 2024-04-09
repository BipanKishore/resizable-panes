/* eslint-disable complexity */
import {
  IPaneNumericKeys, IResizablePaneProviderProps,
  IStoreResizableItemsModel, addAndRemoveType
} from '../@types'
import {DIRECTIONS, PLUS, ZERO} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {getObj, noop, ratioAndRoundOff} from '../utils/util'
import {ResizerModel} from './resizer-model'

export class PaneModel {
  isRegistered = true
  isHandle = false
  isPartiallyHidden: boolean = false
  partialHiddenDirection: number
  resizerSize: number

  attachedResizer: ResizerModel | undefined

  id: string
  // index
  api: any
  size: number
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

    if (size < minSize) {
      throw Error('Size can not be smaller than minSize for pane id ' + id)
    }

    if (size > maxSize) {
      throw Error('Size can not be greatter than maxSize for pane id ' + id)
    }

    if (minSize > maxSize) {
      throw Error('minSize can not be greatter than maxSize for pane id ' + id)
    }
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
    const t = getObj(this, 'id', 'size', 'defaultSize', 'defaultMinSize', 'visibility', 'storedSize')
    return {
      ...t,
      defaultMaxSize: this.defaultMaxSize.toString()
    }
  }

  getSize () {
    return this.isRegistered && this.visibility ? this.size : 0
  }

  setVisibilitySize (sizeChange: number, operation: addAndRemoveType) {
    const newSize = this.size + (operation === PLUS ? sizeChange : -sizeChange)
    this.restoreLimits()
    if (this.visibility) {
      if (newSize >= this.minSize && newSize <= this.maxSize) {
        this.size = newSize
        return ZERO
      } else if (newSize > this.maxSize) {
        this.size = this.maxSize
      } else {
        this.size = this.minSize
      }
      return newSize - this.size
    } else {
      return newSize
    }
  }

  setPartialHidden (direction: number) {
    if (this.isHandle) {
      const previousDirection = this.isPartiallyHidden
      this.isPartiallyHidden = this.size < this.defaultSize
      if (this.isPartiallyHidden) {
        if (previousDirection !== this.isPartiallyHidden) {
          this.partialHiddenDirection = direction
        }
      } else {
        this.partialHiddenDirection = DIRECTIONS.NONE
      }
    }
  }

  changeSize (sizeChange: number, operation: addAndRemoveType) {
    const newSize = this.axisSize + (operation === PLUS ? sizeChange : -sizeChange)
    if (this.visibility) {
      if (newSize >= this.minSize && newSize <= this.maxSize) {
        this.size = newSize
        return ZERO
      } else if (newSize > this.maxSize) {
        this.size = this.maxSize
      } else {
        this.size = this.minSize
      }
      return Math.abs(this.size - newSize)
    } else {
      return sizeChange
    }
  }

  setFixSize (size: number) {
    this.size = size
  }

  setUISize (direction: number) {
    if (this.api) {
      this.api.setSize(this.visibility ? this.size : 0)
      this.setPartialHidden(direction)
    }
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

  synSizeToMinSize () {
    if (this.visibility) {
      this.size = this.minSize
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

  setVisibilityHelper () {
    if (this.isHandle) {
      this.size = this.isPartiallyHidden
        ? 0
        : this.resizerSize ? this.resizerSize : this.api.getVisibleSize()
    }
  }

  setVisibility (visibility: boolean) {
    this.visibility = visibility
    if (visibility) {
      this.maxSize = this.defaultMaxSize
      this.minSize = this.defaultMinSize
      this.setVisibilityHelper()
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
