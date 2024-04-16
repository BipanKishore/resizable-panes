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
