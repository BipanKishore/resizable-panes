import {
  IPane, IResizablePaneProviderProps,
  IResizerApi
} from '../@types'
import {RESIZER} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {PaneModel} from './pane-model'

export class ResizerModel extends PaneModel {
  api: IResizerApi
  resizerSize: number

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
    this.id = `${RESIZER}-${id}`

    const storedResizer = store.getStoredResizer(this.id)
    this.visibility = storedResizer ? storedResizer.visibility : show as boolean

    this.resizerSize = paneProps.resizerSize || resizerSize as number
  }

  registerMe () {
    switch (true) {
      case !this.isRegistered:
        this.setUISize()
        break
      case this.isRegistered:
        this.visibility = this.api.visibility
    }
    this.isRegistered = true
  }

  register (api: IResizerApi) {
    this.api = api
    if (this.visibility) {
      this.size = this.resizerSize ? this.resizerSize : api.getVisibleSize()
      this.defaultMaxSize = this.size
    } else {
      this.defaultMaxSize = this.resizerSize
      // this.resizerSize = api.getVisibleSize()
    }
    this.initializeSizes(this.size, 0, this.size as number, this.size, this.visibility)
    this.registerMe()
  }

  setVisibilityHelper = () => {
    if (this.visibility) {
      this.size = this.resizerSize ? this.resizerSize : this.api.getVisibleSize()
    }
  }
}
