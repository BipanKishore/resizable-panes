import {ReactElement} from 'react'
import {IResizableItem, IResizablePaneProviderProps, IAddAndRemove} from '../@types'
import {PaneModel, ResizableModel} from '../models'
import {ResizeStorage} from './storage'
import {CHANGE, DIRECTIONS, HIDDEN, NONE, VISIBLE, ZIPPED} from '../constant'
import {fixFacingHiddenResizersOrder} from './resizer'
import {
  getRatioSize,
  getSize, initializeSize, restorePane, setUISize, synMaxToSize,
  synMinToSize,
  syncAxisSize, updatSizeState
}
  from '../models/pane'

export const syncAxisSizesFn = (panesList: PaneModel[]) =>
  panesList.forEach(syncAxisSize)

// It only checks if it is partially hiiden or not
export const emitIfChangeInPartialHiddenState = (items: PaneModel[], emitChangeVisibility: any) => {
  let changeInHiidenCount = 0
  items.forEach(item => {
    const {visibility, hiddenResizer, prevHiddenResizer} = item
    if (visibility) {
      const isHidden = hiddenResizer !== NONE
      const isPreviouslyHidden = prevHiddenResizer !== NONE
      if (isHidden !== isPreviouslyHidden) {
        ++changeInHiidenCount
      }
      item.prevHiddenResizer = hiddenResizer
    }
  })
  if (changeInHiidenCount) {
    emitChangeVisibility()
  }
}

export const setUISizesFn = (items: IResizableItem[], direction: number) => {
  items.forEach(setUISize)
  fixFacingHiddenResizersOrder(items, direction)
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
  setUISizesFn(items, DIRECTIONS.NONE)
}

// It is used when we rapidly move out of axis
export const setMaxLimits = (resizable: ResizableModel,
  firstInningMethod: any, secondInningMethod: any, direction: number) => {
  const {virtualOrderList, index} = resizable

  for (let i = 0; i < virtualOrderList.length; i++) {
    if (i <= index) {
      firstInningMethod(virtualOrderList[i], direction)
    } else {
      secondInningMethod(virtualOrderList[i], direction)
    }
  }
}

export const updatSizeStateAllPanes = (panesList: PaneModel[]) => {
  panesList.forEach(updatSizeState)
}

export const getItemsByIndexes = (items : IResizableItem[], indexes: number[]) => {
  const itemsByIndexes = items.filter((_, i) => indexes.includes(i))
  return itemsByIndexes
}

export const getVisibilityState = (panesList: PaneModel[]) => {
  const map = {}
  panesList.forEach(({id, hiddenResizer, visibility}) => {
    map[id] = visibility && hiddenResizer !== NONE ? ZIPPED : (visibility ? VISIBLE : HIDDEN)
  })
  return map
}

const fixChangeCallBack = (pane: PaneModel, change: number, operation: IAddAndRemove) => {
  const newSize = pane.size + (operation === CHANGE.ADD ? change : -change)
  initializeSize(pane, newSize)
}

export const change1PixelToPanes = (panesList: PaneModel[], sizeChange: number,
  operation: IAddAndRemove) => {
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
