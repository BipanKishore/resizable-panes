import {DIRECTIONS} from '../../constant'
import {PaneModel} from '../../models/pane-model'

export const localConsole = (obj: any, key : string) => {
  // console.log(key, obj)
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

export const consoleGetSize = (list: any[]) => {
  const sizes = list.map((i) => i.getSize())
  console.log('consoleGetSize', sizes)
}
