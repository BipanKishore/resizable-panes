import {
  IPane, IResizablePaneProviderProps,
  IResizerApi
} from '../@types'
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
    const {resizerSize} = resizableProps
    this.id = getResizerId(id)

    this.resizerSize = paneProps.resizerSize || resizerSize as number
  }

  register (api: IResizerApi) {
    this.api = api
    const size = this.resizerSize
    api.setSize(this.resizerSize)
    this.initializeSizes(size, 0, size as number, size, size, this.visibility)
    this.isRegistered = true
  }
}
