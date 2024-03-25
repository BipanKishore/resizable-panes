import {ReactNode, isValidElement} from 'react'
import {IContextDetails, IStoreModel, IStorePaneModel} from '../@types'
import {getResizerSum} from './panes'
import {findById} from './util'

export const onResizeClearSizesMapFromStore = (uniqueId: string, storageApi: any) => {
  window.addEventListener('resize', function () {
    if (storageApi) { storageApi.removeItem(uniqueId) }
  })
}

export class ResizeStorage {
  store: any = null
  uniqueId: string
  storageApi: any
  empty = false

  constructor (uniqueId: string, storageApi: any) {
    this.uniqueId = uniqueId
    this.storageApi = storageApi
    this.getStorage()
  }

  setStorage (contextDetails: IContextDetails, _containerSize?: number) {
    const {getContainerRect, panesList, vertical, resizersList} = contextDetails
    const {uniqueId, storageApi} = this
    const {width, height} = getContainerRect()

    // Need to make sure if we are using it containerSize
    const containerSize = _containerSize || (vertical ? width : height) -
    getResizerSum(resizersList, 0, resizersList.length - 1)

    const objectToSave = {
      panes: panesList.map(item => item.getStoreObj()),
      resizers: resizersList.map(item => item.getStoreModel()),
      containerSize
    }
    this.store = objectToSave

    if (storageApi) { storageApi.setItem(uniqueId, JSON.stringify(objectToSave)) }
  }

  getStorage (): IStoreModel {
    const {store, uniqueId, storageApi} = this
    if (store) {
      return store
    }

    let value: any
    if (storageApi) {
      value = storageApi.getItem(uniqueId)
      const parsedValue = JSON.parse(value, function (key, value) {
        if (key === 'defaultMaxSize') {
          return Number(value)
        }
        return value
      })

      if (toString.call(parsedValue) === '[object Object]') {
        this.store = parsedValue
        // console.log('parsedValueparsedValueparsedValue', parsedValue)
        return parsedValue
      }
    }
    this.empty = true
    return {
      panes: [],
      resizers: []
    } as IStoreModel
  }

  // Removed from Call
  getStoredPane (id: keyof IStorePaneModel): IStorePaneModel | null {
    const {panes} = this.getStorage()
    return findById(panes, id) ?? null
  }

  getStoredResizer (id: string) {
    const {resizers} = this.getStorage()
    return findById(resizers, id) ?? null
  }

  readPaneChange (children: ReactNode[], context: any) {
    const {panes, containerSize} = this.getStorage()
    if (!containerSize) {
      return
    }

    const {panesList} = context.contextDetails
    let isVisibilityChanged = false

    const visibleIds = children.filter((child: ReactNode) => isValidElement(child)).map((child: any) => child.props.id)

    panesList.forEach((pane: any) => {
      const visibility = visibleIds.includes(pane.id)
      if (pane.visibility !== visibility) {
        pane.visibility = visibility
        isVisibilityChanged = true
      }
      pane.size = findById(panes, pane.id).size
    })

    if (isVisibilityChanged) {
      // toRatioModeFn(panesList, containerSize)
      context.contextDetails.isSetRatioMode = true
    }
  }
}
