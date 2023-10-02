import {ZERO} from '../constant'
import {ResizeStorage} from '../utils/storage'

export class ResizerModel {
  api: any
  visibility: boolean
  visibleSize : number = 0
  id: string
  isRegistered: boolean = false
  isStorPresent: boolean = false
  constructor (paneProps: any, resizableProps: any, store: ResizeStorage) {
    this.id = 'resizer-' + paneProps.id
    const storedResizer = store.getStoredResizer(this.id)
    if (storedResizer) {
      this.isStorPresent = true
      this.visibility = storedResizer.visibility
    }

    this.visibleSize = 0
  }

  register (api: any) {
    if (!this.isRegistered && this.isStorPresent) {
      api.setVisibility(this.visibility)
    }
    this.isRegistered = true
    this.api = api
    this.visibleSize = api.visibleSize
    this.visibility = api.visibility
  }

  setVisibility (visibility: boolean) {
    if (this.api) {
      this.api.setVisibility(visibility)
    }
    this.visibility = visibility
    return this.visibleSize
  }

  getSize () {
    if (this.api) {
      return this.api.getSize()
    }
    return 0
  }

  getStoreModel () {
    return {
      visibility: this.visibility
    }
  }
}
