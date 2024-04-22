import {
  IPane, IResizablePaneProviderProps,
  IResizerApi
} from '../@types'
import {DIRECTIONS} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {getResizerId} from '../utils/util'
import {PaneModel} from './pane-model'

export class ResizerModel extends PaneModel {
  api: IResizerApi

  constructor (
    paneProps: IPane,
    resizableProps: IResizablePaneProviderProps,
    store: ResizeStorage) {
    super(paneProps, resizableProps, store)
    this.isRegistered = false
    this.isHandle = true

    const {id} = paneProps
    const {resizerSize, visibility = {}} = resizableProps
    const show = visibility[id] !== undefined ? visibility[id] : true
    this.id = getResizerId(id)

    const storedResizer = store.getStoredResizer(this.id)
    if (storedResizer) {
      this.visibility = storedResizer.visibility
      this.isPartiallyHidden = this.visibility ? !storedResizer.size : false
    } else {
      this.visibility = show as boolean
    }

    this.resizerSize = paneProps.resizerSize || resizerSize as number
  }

  registerMe () {
    switch (true) {
      case !this.isRegistered:
        if (this.isPartiallyHidden) {
          this.size = 0
        }
        this.setUISize(DIRECTIONS.DOWN)
        break
      case this.isRegistered:
        this.visibility = this.api.visibility
    }
    this.isRegistered = true
  }

  register (api: IResizerApi) {
    this.api = api
    if (this.visibility) {
      this.size = this.resizerSize
      this.defaultMaxSize = this.size
    } else {
      this.defaultMaxSize = this.resizerSize
      // this.resizerSize = api.getVisibleSize()
    }
    this.initializeSizes(this.size, 0, this.size as number, this.size, this.size, this.visibility)
    this.registerMe()
  }
}
