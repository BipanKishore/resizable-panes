import {ReactElement} from 'react'
import {IResizableItem, IResizablePaneProviderProps, addAndRemoveType} from '../@types'
import {PaneModel, ResizerModel} from '../models'
import {ResizeStorage} from './storage'
import {DIRECTIONS, HIDDEN, NONE, PLUS, VISIBLE, ZIPPED} from '../constant'
import {fixFacingHiddenResizersOrder} from './resizer'

export const syncAxisSizesFn = (panesList: PaneModel[]) =>
  panesList.forEach(pane => pane.syncAxisSize())

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
  items.forEach((pane: IResizableItem) => pane.setUISize())
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
  getSum(panesList, (pane) => pane.synMaxToSize(), start, end)

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.synMinToSize(), start, end)

export const getPanesSizeSum = (panesList: PaneModel[], start?: number, end?: number) =>
  getSum(panesList, pane => pane.getSize(), start, end)

export const getRatioSizeSum = (panesList: PaneModel[]) =>
  getSum(panesList, pane => pane.getRatioSize())

// returns the visible resizer size
export const getResizerSum = (resizersList: ResizerModel[], start?: number, end?: number) =>
  getSum(resizersList, resizer => resizer.getSize(), start, end)

export const getMaxSizeSum = (panesList: PaneModel[], start?: number, end?: number) =>
  getSum(panesList, (pane) => pane.maxSize, start, end)

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.minSize, start, end)

// Need to check for hidden element
export const restoreFn = (items: IResizableItem[]) => {
  items.forEach(pane => pane.restore())
  setUISizesFn(items, DIRECTIONS.NONE)
}

// It is used when we rapidly changes mouse movements
export const setDownMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMaxSize()
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMinSize(DIRECTIONS.DOWN)
  }
}

// It is used when we rapidly changes mouse movements
export const setUpMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMinSize(DIRECTIONS.UP)
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMaxSize()
  }
}

export const safeSetVisibility = (item : IResizableItem, visibility: boolean, isPartiallyHidden?: boolean) => {
  if (item) {
    item.setVisibility(visibility, isPartiallyHidden)
  }
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

const fixChangeCallBack = (pane: PaneModel, change: number, operation: addAndRemoveType) => {
  const newSize = pane.size + (operation === PLUS ? change : -change)
  pane.initializeSize(newSize)
}

export const change1PixelToPanes = (panesList: PaneModel[], sizeChange: number,
  operation: addAndRemoveType) => {
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

export const getPanesAndResizers = (items: IResizableItem[]) => {
  const panesList = items.filter((item) => !item.isHandle)
  const resizersList = items.filter((item) => item.isHandle) as ResizerModel[]
  return {
    panesList,
    resizersList
  }
}

export const createPaneModelListAndResizerModelList = (
  children: ReactElement[],
  resizableProps: IResizablePaneProviderProps,
  store: ResizeStorage
): IResizableItem[] => {
  const items: IResizableItem[] = []
  children.forEach(child =>
    items.push(
      new PaneModel(child.props, resizableProps, store),
      new ResizerModel(child.props, resizableProps, store)
    )
  )
  items.pop()
  return items
}
