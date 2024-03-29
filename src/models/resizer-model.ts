import {
  IKeyToBoolMap,
  IPane, IResizablePaneProviderProps,
  IResizerApi
} from '../@types'
import {RESIZER} from '../constant'
import {ResizeStorage} from '../utils/storage'
import {PaneModel} from './pane-model'

export class ResizerModel extends PaneModel {
  api: IResizerApi
  resizerSize: number

  initialVisibility: IKeyToBoolMap

  constructor (
    paneProps: IPane,
    resizableProps: IResizablePaneProviderProps,
    store: ResizeStorage, panesList: PaneModel[]) {
    super(paneProps, resizableProps, store)
    this.isRegistered = true
    this.isHandle = true

    const {id} = paneProps
    const {resizerSize, visibility = {}} = resizableProps
    this.initialVisibility = resizableProps.visibility as IKeyToBoolMap
    this.id = `${RESIZER}-${id}`

    const storedResizer = store.getStoredResizer(this.id)
    const show = visibility[id] !== undefined ? visibility[id] : true
    this.visibility = storedResizer ? storedResizer.visibility : show as boolean

    this.size = paneProps.resizerSize || resizerSize as number
    this.resizerSize = this.size
  }

  registerMe () {
    switch (true) {
      case !this.isRegistered:
        // this.api.setVisibility(this.visibility)
        this.setUISize()
        break
      case this.isRegistered:
        this.visibility = this.api.visibility
    }
    this.isRegistered = true
  }

  // This method never runs for last Element
  register (api: IResizerApi) {
    this.api = api
    if (!this.initialVisibility) {
      this.size = api.getVisibleSize()
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
