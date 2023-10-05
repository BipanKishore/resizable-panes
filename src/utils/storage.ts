import {ReactNode, isValidElement} from 'react'
import {IBooleanOrUndefined, IStoreModel, IStorePaneModel, IStringOrUndefined} from '../@types'
import {PaneModel} from '../models/pane-model'
import {getResizerSum} from './panes'
import {ResizerModel} from '../models/resizer-model'

const setItem = (storeKey: IStringOrUndefined = '', session: IBooleanOrUndefined, value: IStoreModel) => {
  const stringifyMap = JSON.stringify(value)
  if (session) {
    sessionStorage.setItem(storeKey, stringifyMap)
  } else {
    localStorage.setItem(storeKey, stringifyMap)
  }
}

export const onResizeClearSizesMapFromStore = (storeKey: string, session: boolean) => {
  window.addEventListener('resize', function () {
    if (session) {
      sessionStorage.removeItem(storeKey)
    } else {
      localStorage.removeItem(storeKey)
    }
  })
}

export class ResizeStorage {
  store: any = null
  storeKey: IStringOrUndefined
  sessionStore: IBooleanOrUndefined
  empty = false

  constructor (storeKey: IStringOrUndefined, sessionStore: IBooleanOrUndefined) {
    this.storeKey = storeKey
    this.sessionStore = sessionStore
    this.getStorage()
  }

  setStorage (context: any, _containerSize?: number) {
    const {getContainerRect, panesList, vertical, resizersList} = context.contextDetails
    const {storeKey, sessionStore} = this
    const {width, height} = getContainerRect()

    const containerSize = _containerSize || (vertical ? width : height) -
    getResizerSum(resizersList, 0, resizersList.length - 1)

    const objectToSave = {
      panesMap: panesList.reduce((acc: any, pane: PaneModel) => {
        acc[pane.id] = pane.getStoreObj()
        return acc
      }, {}),
      resizerMap: resizersList.reduce((acc: any, resizer: ResizerModel) => {
        acc[resizer.id] = resizer.getStoreModel()
        return acc
      }, {}),
      containerSize
    }
    this.store = objectToSave
    setItem(storeKey, sessionStore, objectToSave)
  }

  getStorage (): IStoreModel {
    const {store, storeKey, sessionStore} = this
    if (store) {
      return store
    }

    let value: any
    if (storeKey) {
      if (sessionStore) {
        value = sessionStorage.getItem(storeKey)
      } else {
        value = localStorage.getItem(storeKey)
      }
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
      panesMap: {},
      resizerMap: {}
    } as IStoreModel
  }

  // Removed from Call
  getStoredPane (id: keyof IStorePaneModel): IStorePaneModel | null {
    const {panesMap} = this.getStorage()
    return panesMap[id] ?? null
  }

  getStoredResizer (id: string) {
    const {resizerMap} = this.getStorage()
    return resizerMap[id] ?? null
  }

  readPaneChange (children: ReactNode[], context: any) {
    const {panesMap, containerSize} = this.getStorage()
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
      pane.size = panesMap[pane.id].size
    })

    if (isVisibilityChanged) {
      // toRatioModeFn(panesList, containerSize)
      context.contextDetails.isSetRatioMode = true
    }
  }
}
