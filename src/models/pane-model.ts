import {IPaneNumericKeys, IStorePaneModel, keyOfPaneModel} from '../@types'
import {ZERO} from '../constant'
import {keyConsole} from '../utils/development-util'
import {ResizeStorage} from '../utils/storage'
import {ratioToNumber} from '../utils/util'

export class PaneModel {
  id: string
  // index
  pane: any
  size: number
  defaultSize: number
  minSize: number
  defaultMinSize: number
  maxSize: number
  defaultMaxSize: number
  storedSize: number

  vertical: boolean

  axisSize: number = 0
  visibility: boolean

  oldVisibleSize: number = 0
  oldVisibility: boolean = true
  oldStoredSize: number = 0

  // Development Variables

  constructor (paneProps: any, resizableProps: any, store: ResizeStorage) {
    const {
      id, minSize = ZERO, size, maxSize = Infinity
    } = paneProps

    const storedPane = store.getStoredPane(id)
    if (storedPane) {
      const {size, defaultMaxSize, defaultMinSize, visibility, storedSize} = storedPane
      keyConsole({size, defaultMaxSize, defaultMinSize, visibility, storedSize}, 'v--------- ' + typeof storedSize)
      this.initializeSizes(size, defaultMinSize, defaultMaxSize as number, storedSize, visibility)
    } else {
      this.initializeSizes(size, minSize, maxSize, size)
    }

    const {vertical} = resizableProps
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

  initializeSizes (size: number, minSize: number, maxSize: number, storedSize: number, visibility: boolean = true) {
    this.initializeSize(size)
    this.minSize = minSize
    this.maxSize = maxSize
    this.defaultMinSize = minSize
    this.defaultMaxSize = maxSize
    this.storedSize = storedSize
    this.visibility = visibility
  }

  getObj (...keys: keyOfPaneModel[]) {
    const obj: any = {}
    keys.forEach(key => {
      obj[key] = this[key as keyof this]
    })

    return obj
  }

  getStoreObj (): IStorePaneModel {
    return {
      id: this.id,
      size: this.size,
      defaultSize: this.defaultSize,
      defaultMinSize: this.defaultMinSize,
      defaultMaxSize: this.defaultMaxSize.toString(),
      visibility: this.visibility,
      storedSize: this.storedSize
    }
  }

  setSize (newSize: number) {
    if (this.visibility) {
      if (newSize >= this.minSize && newSize <= this.maxSize) {
        this.size = newSize
        return ZERO
      } else if (newSize > this.maxSize) {
        this.size = this.maxSize
      } else {
        this.size = this.minSize
      }
    }
    const left = Math.abs(this.size - newSize)
    return left
  }

  getSize () {
    if (this.visibility) {
      return this.size
    }
    return 0
  }

  setVisibilitySize (newSize: number) {
    if (this.visibility) {
      if (newSize >= this.defaultMinSize && newSize <= this.defaultMaxSize) {
        this.size = newSize
        return ZERO
      } else if (newSize > this.defaultMaxSize) {
        this.size = this.defaultMaxSize
      } else {
        this.size = this.defaultMinSize
      }
    }

    const left = Math.abs(this.size - newSize)
    return left
  }

  addVisibilitySize (sizeChange: number) {
    const newSize = this.size + sizeChange
    return this.setVisibilitySize(newSize)
  }

  removeVisibilitySize (sizeChange: number) {
    const newSize = this.size - sizeChange
    return this.setVisibilitySize(newSize)
  }

  setVisibility (visibility: boolean) {
    if (this.visibility === visibility) {
      return this.visibility ? this.size : this.storedSize
    }

    this.visibility = visibility
    if (visibility) {
      this.size = this.storedSize as number
      this.minSize = this.defaultMinSize
      this.maxSize = this.defaultMaxSize
      return this.size
    } else {
      this.storedSize = this.size
      this.size = 0
      this.minSize = 0
      this.maxSize = 0
      return this.storedSize
    }
  }

  addSize (sizeChange: number) {
    const newSize = this.axisSize + sizeChange
    return this.setSize(newSize)
  }

  removeSize (sizeChange: number) {
    const newSize = this.axisSize - sizeChange
    return this.setSize(newSize)
  }

  setFixSize (size: number) {
    this.size = size
  }

  setUISize () {
    if (this.pane) {
      this.pane.setSize(this.size)
      return this.size
    }
  }

  registerPaneRef (pane: any) {
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
    return this.axisSize
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
    }
    return ZERO
  }

  resetMin () {
    if (this.visibility) {
      this.minSize = this.defaultMinSize
      return this.minSize
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

  toRatioMode (containerSize: number, maxRatioValue: number) {
    if (this.visibility) {
      const size = ratioToNumber(containerSize, maxRatioValue, this.size)
      const minSize = ratioToNumber(containerSize, maxRatioValue, this.minSize)
      const maxSize = ratioToNumber(containerSize, maxRatioValue, this.maxSize)
      // Need to check if it is right
      this.initializeSizes(size, minSize, maxSize, size)
    }
  }

  fixChange (key: IPaneNumericKeys, change: number) {
    if (this.visibility) {
      this[key] = this[key] + change
    }
  }

  setOldVisibilityModel () {
    this.oldVisibleSize = this.size
    this.oldVisibility = this.visibility
    this.oldStoredSize = this.storedSize
  }

  syncToOldVisibilityModel () {
    this.size = this.oldVisibleSize
    this.visibility = this.oldVisibility
    this.storedSize = this.oldStoredSize
    // console.log('-------', this.size, this.visibility, this.storedSize)
  }
}