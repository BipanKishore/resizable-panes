import {IPane, IResizerApi, IStoreResizerModel} from '../@types'
import {RESIZER} from '../constant'
import {ResizeStorage} from '../utils/storage'

export class ResizerModel {
  api: IResizerApi
  visibility: boolean
  id: string
  isRegistered: boolean = false
  isStorPresent: boolean
  oldVisibility: boolean

  size: number
  preSize: number // previousVisible
  resizerSize: number
  visibilityChangedLast: boolean

  constructor (paneProps: IPane, resizerSize: number, store: ResizeStorage) {
    const {id} = paneProps
    const show = true
    this.id = `${RESIZER}-${id}`
    this.isStorPresent = !store.empty
    this.resizerSize = paneProps.resizerSize || resizerSize

    if (this.isStorPresent) {
      const storedResizer = store.getStoredResizer(this.id)
      this.visibility = storedResizer.visibility
      // this.preSize = storedResizer.preSize
      // this.size = storedResizer.size
    } else {
      this.visibility = show as boolean
      this.preSize = 0
      this.size = 0
    }
  }

  registerMe () {
    switch (true) {
      case !this.isRegistered:
        this.api.setVisibility(this.visibility)
        break
      case this.isRegistered:
        this.visibility = this.api.visibility
    }
    this.isRegistered = true
  }

  // This method never runs for last Element
  register (api: IResizerApi) {
    this.api = api
    this.registerMe()
    this.size = api.visibility ? api.getVisibleSize() : 0
  }

  getSize () {
    return !this.isRegistered ? (this.visibility ? this.size : 0) : 0
  }

  setVisibility (visibility: boolean) {
    if (!this.isRegistered) {
      return 0
    }
    const localVisibility = this.visibility
    this.visibility = visibility

    if (localVisibility !== visibility) {
      if (this.api) {
        this.api.setVisibility(visibility)
      }
      return this.resizerSize
    }
    return 0
  }

  getStoreModel (): IStoreResizerModel {
    return {
      id: this.id,
      visibility: this.visibility
    }
  }

  setOldVisibilityModel () {
    this.oldVisibility = this.visibility
  }

  syncToOldVisibilityModel () {
    this.setVisibility(this.oldVisibility)
    // this.visibility = this.oldVisibility
  }
}
