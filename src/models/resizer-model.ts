import {IResizerApi, IStoreResizerModel} from '../@types'
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
  index: number
  visibilityChangedLast: boolean

  constructor (paneProps: any, resizerSize: number, store: ResizeStorage, index: number) {
    this.index = index
    this.id = `${RESIZER}-${paneProps.id}`
    this.isStorPresent = !store.empty
    this.resizerSize = resizerSize

    if (this.isStorPresent) {
      const storedResizer = store.getStoredResizer(this.id)
      this.visibility = storedResizer.visibility
      // this.preSize = storedResizer.preSize
      // this.size = storedResizer.size
    } else {
      this.visibility = false
      this.preSize = 0
      this.size = 0
    }
  }

  registerMe () {
    switch (true) {
      case !this.isRegistered:
        if (this.isStorPresent) {
          this.api.setVisibility(this.visibility)
        } else {
          this.visibility = this.api.visibility
        }
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
    return this.visibility ? this.size : 0
  }

  setVisibility (visibility: boolean) {
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
