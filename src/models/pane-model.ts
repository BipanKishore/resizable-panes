/* eslint-disable complexity */
import {IPaneNumericKeys, IStorePaneModel, addAndRemoveType} from '../@types'
import {PLUS, ZERO} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {getObj, ratioAndRoundOff} from '../utils/util'

export class PaneModel {
  id: string
  // index
  pane: any
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

  constructor (paneProps: any, resizableProps: any, store: ResizeStorage) {
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
    this.vertical = vertical

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

  getStoreObj (): IStorePaneModel {
    const t = getObj(this, 'id', 'size', 'defaultSize', 'defaultMinSize', 'visibility', 'storedSize')
    return {
      ...t,
      defaultMaxSize: this.defaultMaxSize.toString()
    }
  }

  getSize () {
    if (this.visibility) {
      return this.size
    }
    return 0
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

  setUISize () {
    if (this.pane) {
      this.pane.setSize(this.visibility ? this.size : 0)
      // return not required
      return this.size
    }
  }

  registerRef (pane: any) {
    if (this.pane) {
      this.pane = pane
      this.setUISize()
    }
    this.pane = pane
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

  setVisibilityNew (visibility: boolean) {
    this.visibility = visibility
    if (visibility) {
      this.maxSize = this.defaultMaxSize
      this.minSize = this.defaultMinSize
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
