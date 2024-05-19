import {DIRECTIONS} from '../constant'
import {ResizableModel, PaneModel} from '../../models'
import {getSize} from '../../models/pane'

export const localConsole = (obj: any, key : string) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export const getList = (panesList: PaneModel[] | any[], key: string): unknown[] => {
  return panesList.map((pane: any) => pane?.[key])
}

export const setPaneList = (panesList: PaneModel[], keys: string[], value: any) => {
  panesList.forEach((pane: any) => keys.forEach((key: string) => (pane[key] = value)))
}
export const directionToText = (d:number) => {
  switch (d) {
    case DIRECTIONS.UP:
      return 'UP'
    case DIRECTIONS.DOWN:
      return 'DOWN'
    case DIRECTIONS.NONE:
      return 'NONE'
  }
}

export const consoleIds = (list: any[]) => {
  const ids = getList(list, 'id')
  console.log('consoleIds', ids)
}

export const consoleMinAndMaxSize = (list: any[]) => {
  const minSize = getList(list, 'minSize')
  const maxSize = getList(list, 'maxSize')
  console.log('consoleMinSize', minSize)
  console.log('consoleMaxSize', maxSize)
}

export const consoleDefaultMinAndDefaultMaxSize = (list: any[]) => {
  const defaultMinSize = getList(list, 'defaultMinSize')
  const defaultMaxSize = getList(list, 'defaultMaxSize')
  console.log('defaultMinSize', defaultMinSize)
  console.log('defaultMaxSize', defaultMaxSize)
}

export const consoleGetSize = (list: any[]) => {
  let sum = 0
  const sizes = list.map((i) => {
    sum += getSize(i)
    return getSize(i)
  })
  console.log('consoleGetSize', sizes, sum)
}

export const consoleResizerLimitCrossedUp = () => {
  console.log('setUpMaxLimits setUpMaxLimits')
}

export const consoleResizerLimitCrossedDown = () => {
  console.error('setDownMaxLimits setDownMaxLimits')
}
