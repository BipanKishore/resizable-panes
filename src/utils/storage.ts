import {ReactElement} from 'react'
import {IStoreModel, IStoreResizableItemsModel} from '../@types'
import {findById} from './util'
import {ResizableModel} from '../models'
import {getStoreModel} from '../models/pane'

export const setStorage = (uniqueId : string, storageApi: any, resizable: ResizableModel) => {
  const {panesList} = resizable

  const objectToSave = {
    panes: panesList.map(getStoreModel)
  }

  if (storageApi) { storageApi.setItem(uniqueId, JSON.stringify(objectToSave)) }
}

export class ResizeStorage {
  panesComponents: ReactElement[]
  store: any = null
  empty = false

  constructor (uniqueId: string, storageApi: any, panesComponents: ReactElement[]) {
    this.panesComponents = panesComponents
    this.getStorage(uniqueId, storageApi)
  }

  // eslint-disable-next-line complexity
  getStorage (uniqueId: string, storageApi: any): IStoreModel {
    const {store} = this
    if (store) {
      return store
    }

    let value: any
    if (storageApi) {
      value = storageApi.getItem(uniqueId)
      const parsedValue: IStoreModel = JSON.parse(value, function (key, value) {
        if (key === 'defaultMaxSize') {
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
    this.store = {
      panes: []
    } as IStoreModel
  }

  // Removed from Call
  getStoredPane (id: string): IStoreResizableItemsModel | null {
    const {panes} = this.store
    return findById(panes, id) ?? null
  }
}
