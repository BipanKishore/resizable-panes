import {ReactElement} from 'react'
import {IStoreModel, IStoreResizableItemsModel} from '../@types'
import {getPanesSizeSum} from './panes'
import {findById} from './util'
import {ResizableModel} from '../models'
import {DEFAULT_MAX_SIZE} from '../constant'

export class ResizeStorage {
  panesComponents: ReactElement[]
  store: any = null
  uniqueId: string
  storageApi: any
  empty = false

  constructor (uniqueId: string, storageApi: any, panesComponents: ReactElement[]) {
    this.uniqueId = uniqueId
    this.storageApi = storageApi
    this.panesComponents = panesComponents
    this.getStorage()
  }

  setStorage (resizable: ResizableModel, _containerSize?: number) {
    const {getContainerRect, panesList, vertical, resizersList} = resizable
    const {uniqueId, storageApi} = this
    const {width, height} = getContainerRect()

    // Need to make sure if we are using it containerSize
    const containerSize = _containerSize || (vertical ? width : height) -
    getPanesSizeSum(resizersList, 0, resizersList.length)

    const objectToSave = {
      panes: panesList.map(item => item.getStoreModel()),
      containerSize
    }
    this.store = objectToSave

    if (storageApi) { storageApi.setItem(uniqueId, JSON.stringify(objectToSave)) }
  }

  // eslint-disable-next-line complexity
  getStorage (): IStoreModel {
    const {store, uniqueId, storageApi} = this
    if (store) {
      return store
    }

    let value: any
    if (storageApi) {
      value = storageApi.getItem(uniqueId)
      const parsedValue: IStoreModel = JSON.parse(value, function (key, value) {
        if (key === DEFAULT_MAX_SIZE) {
          return Number(value)
        }
        return value
      })

      if (toString.call(parsedValue) === '[object Object]') {
        const {panes} = parsedValue

        if (panes) {
          const allSameIds = panes.every((pane, i) => this.panesComponents[i]?.props.id === pane.id)

          if (allSameIds && panes.length === this.panesComponents.length) {
            this.store = parsedValue
            return parsedValue
          } else {
            storageApi.removeItem(uniqueId)
          }
        } else {
          storageApi.removeItem(uniqueId)
        }
      }
    }
    this.empty = true
    return {
      panes: []
    } as IStoreModel
  }

  // Removed from Call
  getStoredPane (id: string): IStoreResizableItemsModel | null {
    const {panes} = this.getStorage()
    return findById(panes, id) ?? null
  }
}
