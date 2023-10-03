import {IStoreResizerModel} from '../@types'
import {RESIZER} from '../constant'
import {ResizeStorage} from '../utils/storage'

export class ResizerModel {
  api: any
  visibility: boolean
  visibleSize : number = 0
  id: string
  isRegistered: boolean = false
  isStorPresent: boolean

  constructor (paneProps: any, resizableProps: any, store: ResizeStorage) {
    this.id = `${RESIZER}-${paneProps.id}`
    this.isStorPresent = !store.empty
    if (this.isStorPresent) {
      const storedResizer = store.getStoredResizer(this.id)
      this.visibility = storedResizer.visibility
    }

    this.visibleSize = 0
  }

  register (api: any) {
    if (!this.isRegistered) {
      if (this.isStorPresent) {
        api.setVisibility(this.visibility)
      } else {
        this.visibility = api.visibility
      }
    } else {
      this.visibility = api.visibility
    }

    this.visibleSize = api.visibleSize
    this.api = api
    this.isRegistered = true
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

  getStoreModel (): IStoreResizerModel {
    return {
      id: this.id,
      visibility: this.visibility
    }
  }
}
