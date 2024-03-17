import {
  IKeyToBoolMap,
  IPane, IResizablePaneProviderProps,
  IResizerApi, IStoreResizerModel
} from '../@types'
import {RESIZER} from '../constant'
import {ResizeStorage} from '../utils/storage'

export class ResizerModel {
  api: IResizerApi
  visibility: boolean
  id: string
  isRegistered: boolean = false
  isStorPresent: boolean
  oldVisibility: boolean

  resizerSize: number
  visibilityChangedLast: boolean

  visibilityMap: IKeyToBoolMap

  constructor (paneProps: IPane, resizableProps: IResizablePaneProviderProps, store: ResizeStorage) {
    const {id} = paneProps
    const {resizerSize, visibility = {}} = resizableProps
    this.visibilityMap = resizableProps.visibility as IKeyToBoolMap
    const show = visibility[id] !== undefined ? visibility[id] : true
    // console.log('show', show)
    this.id = `${RESIZER}-${id}`
    this.isStorPresent = !store.empty

    if (this.isStorPresent) {
      const storedResizer = store.getStoredResizer(this.id)
      if (storedResizer) {
        this.visibility = storedResizer.visibility
      }
    } else {
      this.visibility = show as boolean
    }

    this.resizerSize = paneProps.resizerSize || resizerSize as number
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
    if (!this.visibilityMap) {
      this.resizerSize = api.getVisibleSize()
    }
    this.registerMe()
  }

  getSize () {
    return this.isRegistered ? (this.visibility ? this.resizerSize : 0) : 0
  }

  setUISize () {
    if (this.api) {
      let uiSize = 0

      if (this.visibility) {
        if (this.resizerSize) {
          uiSize = this.resizerSize
        } else {
          uiSize = this.api.getVisibleSize()
        }
      }

      // console.log(this.id, uiSize, this.visibility)

      this.api.setSize(uiSize)
    }
  }

  setVisibilityNew (visibility: boolean) {
    if (!this.isRegistered) {
      return
    }
    this.visibility = visibility
  }

  setVisibilityNewOld1 (visibility: boolean) {
    if (!this.isRegistered) {
      return 0
    }

    const localVisibility = this.visibility
    this.visibility = visibility

    if (localVisibility === visibility) {
      return 0
    } else {
      if (visibility) {
        return this.resizerSize
      } else {
        return -this.resizerSize
      }
    }
  }

  getStoreModel (): IStoreResizerModel {
    return {
      id: this.id,
      visibility: this.visibility
    }
  }
}
