import {ReactElement} from 'react'
import {IResizableItem, IResizablePaneProviderProps} from '../@types'
import {PaneModel, ResizableModel} from '../models'
import {ResizeStorage} from './storage'
import {CHANGE} from './constant'
import {
  getRatioSize,
  getSize, initializeSize, restorePane, setUISize, synMaxToSize,
  synMinToSize,
  syncAxisSize, updatSizeState
}
  from '../models/pane'

export const syncAxisSizesFn = (panesList: PaneModel[]) =>
  panesList.forEach(syncAxisSize)

export const setUISizesFn = (items: IResizableItem[]) => {
  items.forEach(setUISize)
}

export const getVisibleItems = (list: IResizableItem[]) => list.filter(item => item.visibility)

export function getSum <T> (list: T[], getNumber: (item:T) => number, start = 0, end = list.length - 1) {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += getNumber(list[i])
  }
  return sum
}

export const synPanesMaxToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, synMaxToSize, start, end)

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, synMinToSize, start, end)

export const getItemsSizeSum = (panesList: PaneModel[], start?: number, end?: number) =>
  getSum(panesList, getSize, start, end)

export const getRatioSizeSum = (panesList: PaneModel[]) =>
  getSum(panesList, getRatioSize)

export const getMaxSizeSum = (panesList: PaneModel[], start?: number, end?: number) =>
  getSum(panesList, (pane) => pane.maxSize, start, end)

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.minSize, start, end)

// Need to check for hidden element
export const restoreFn = (items: IResizableItem[]) => {
  items.forEach(restorePane)
  setUISizesFn(items)
}

// It is used when we rapidly move out of axis
export const setMaxLimits = (resizable: ResizableModel,
  firstInningMethod: any, secondInningMethod: any, direction: number) => {
  const {items, index} = resizable
  const visibleItems = getVisibleItems(items)

  for (let i = 0; i < visibleItems.length; i++) {
    if (i <= index) {
      firstInningMethod(visibleItems[i], direction)
    } else {
      secondInningMethod(visibleItems[i], direction)
    }
  }
}

export const updatSizeStateAllPanes = (panesList: PaneModel[]) => {
  panesList.forEach(updatSizeState)
}

const fixChangeCallBack = (pane: PaneModel, change: number, operation: number) => {
  const newSize = pane.size + (operation === CHANGE.ADD ? change : -change)
  initializeSize(pane, newSize)
}

export const change1PixelToPanes = (panesList: PaneModel[], sizeChange: number,
  operation: number) => {
  let count = 0
  const len = panesList.length
  let index: number

  while (sizeChange > 1) {
    index = count % len

    if (panesList[index].visibility) {
      fixChangeCallBack(panesList[index], 1, operation)
      --sizeChange
    }
    ++count
  }

  while (1) {
    index = count % len

    if (panesList[index].visibility) {
      fixChangeCallBack(panesList[index], sizeChange, operation)
      return
    }
    ++count
  }
}

export const getPanesAndResizers = (items: IResizableItem[]): [ panesList: IResizableItem[],
  resizersList: IResizableItem[]] => {
  const panesList = items.filter((item) => !item.isHandle)
  const resizersList = items.filter((item) => item.isHandle)
  return [
    panesList,
    resizersList
  ]
}

export const createPaneModelListAndResizerModelList = (
  children: ReactElement[],
  resizableProps: IResizablePaneProviderProps,
  store: ResizeStorage
): IResizableItem[] => {
  const items: IResizableItem[] = []
  children.forEach(child =>
    items.push(
      new PaneModel(child.props, resizableProps, store, false),
      new PaneModel(child.props, resizableProps, store, true)
    )
  )
  items.pop()
  return items
}
