import {IServiceRef} from '../@types/use-resizable-panes-types'
import {PaneModel} from '../models/pane-model'
import {getMaxContainerSizes} from './resizable-pane'
import {useEffect} from 'react'

export const keyConsole = (obj: any = {}, add = 'v--') => {
  const keys = Object.keys(obj)
  const str = keys.reduce((p, v) => p + ' ' + v + ': ' + obj[v], add)
  // console.log(str)
}

export const localConsole = (obj: any = {}, key : string) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export const minMaxTotal = (serviceRefCurrent: IServiceRef) => {
  const {panesList} = serviceRefCurrent

  const {maxPaneSize} = getMaxContainerSizes(serviceRefCurrent)
  let sum = 0
  panesList
    .forEach(({minSize, maxSize}) => {
      maxSize = Number.isFinite(maxSize) ? maxSize : 0
      sum += ((maxSize || 0) + (minSize || 0))
    })

  // const paneSizeTotal = sum
  const paneSizeTotal = sum / 2
  console.warn('SIZE SUM', sum, paneSizeTotal, 'max allowd', maxPaneSize)
  if ((Math.trunc(maxPaneSize) !== Math.trunc(sum) && Math.trunc(maxPaneSize) !== Math.trunc(paneSizeTotal))) {
    throw new Error(`Max Pane sum total: ${maxPaneSize} = ${sum} or ${maxPaneSize} = ${paneSizeTotal}`)
  }
}

export const getList = (panesList: PaneModel[], key: string): unknown[] => {
  return panesList.map((pane: any) => pane[key])
}

export const paneConsole = (panesList: PaneModel[], key: string) => {
  // console.log('v-- ' + key, getList(panesList, key))
}

export const setPaneList = (panesList: PaneModel[], keys: string[] = [], value: any = null) => {
  panesList.forEach((pane: any) => keys.forEach((key: string) => (pane[key] = value)))
  // keys.forEach((key) => paneConsole(panesList, key))
}

export const sizesConsole = (panesList: PaneModel[]) => {
  const t = panesList.map((pane) => {
    return pane.getObj('size', 'minSize', 'maxSize', 'defaultMinSize', 'defaultMaxSize')
  })

  localConsole(t, 'sizesConsole')
}

export const useMountingConsole = (name: string) => {
  console.log(`rerender -> ${name}`)
  useEffect(() => {
    console.error(`v-----  Mountttttttiinnnnnng -> ${name}`)
    return () => console.error(`v----- Uuuuuuuuuunmountiiiiiiiiiiinnnnnnnngggggg ->${name}`)
  }, [])
}
