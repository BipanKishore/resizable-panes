import {ReactElement} from 'react'
import {IContextDetails, IResizableItem, IResizablePaneProviderProps, addAndRemoveType} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizeStorage} from './storage'
import {ResizerModel} from '../models/resizer-model'
import {PLUS} from '../constant'
import {getList, localConsole} from './development-util'
import {isItUp} from './util'

export const syncAxisSizesFn = (panesList: PaneModel[]) =>
  panesList.forEach(pane => pane.syncAxisSize())

export const setUISizesFn = (modelList: IResizableItem[]) =>
  modelList.forEach((pane: IResizableItem) => pane.setUISize())

export const setUISizesOfAllElement = (items: IResizableItem[]) => {
  setUISizesFn(items)
}

export function getSum <T> (list: T[], getNumber: (item:T) => number, start = 0, end = list.length - 1) {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += getNumber(list[i])
  }
  return sum
}

// may not required
export const getSizeByIndexes = (panesList: PaneModel[], indexList: number[]) => {
  let sum = 0
  indexList.forEach((i) => {
    sum += panesList[i].getSize()
  })
  return sum
}

export const synPanesMaxToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.synMaxToSize(), start, end)

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.synMinToSize(), start, end)

export const getPanesSizeSum = (panesList: PaneModel[], start?: number, end?: number) =>
  getSum(panesList, pane => pane.getSize(), start, end)

// returns the visible resizer size
export const getResizerSum = (resizersList: ResizerModel[], start?: number, end?: number) =>
  getSum(resizersList, resizer => resizer.getSize(), start, end)

export const getMaxSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => {
    localConsole({
      maxSize: pane.maxSize,
      minL: pane.minSize
    }, pane.id)
    return pane.maxSize
  }, start, end)

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.minSize, start, end)

// It is used when we rapidly changes mouse movements
export const setDownMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMaxSize()
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMinSize()
  }
}

// It is used when we rapidly changes mouse movements
export const setUpMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMinSize()
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMaxSize()
  }
}

export const findIndexInChildrenbyId = (children: any, _id: string) =>
  children.findIndex(({props: {id}}: any) => id === _id)

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
  children.forEach((child) => {
    items.push(
      new PaneModel(child.props, resizableProps, store),
      new ResizerModel(child.props, resizableProps, store)
    )
  })
  items.pop()
  return items
}

// eslint-disable-next-line complexity
export const setResizersLimits = (contextDetails: IContextDetails) => {
  const {activeIndex, direction, items} = contextDetails

  if (isItUp(direction)) {
    for (let i = activeIndex; i > -1; i -= 2) {
      const pane = items[i]
      const resizer = items[i - 1] as ResizerModel
      if (pane && resizer) {
        resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
      }
    }

    const resizerHandle = items[activeIndex + 1] as ResizerModel
    resizerHandle.defaultMinSize = resizerHandle.defaultSize
    resizerHandle.defaultMaxSize = resizerHandle.defaultSize

    for (let i = activeIndex + 2; i < items.length; i += 2) {
      const pane = items[i]
      const resizer = items[i + 1] as ResizerModel
      if (pane && resizer) {
        resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
      }
    }
  } else {
    for (let i = activeIndex; i > -1; i -= 2) {
      const pane = items[i]
      const resizer = items[i - 1] as ResizerModel
      if (pane && resizer) {
        resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
      }
    }

    const resizerHandle = items[activeIndex + 1] as ResizerModel
    resizerHandle.defaultMinSize = resizerHandle.defaultSize
    resizerHandle.defaultMaxSize = resizerHandle.defaultSize
    // console.log('resizerHandle', resizerHandle)

    for (let i = activeIndex + 2; i < items.length; i += 2) {
      const pane = items[i]
      const resizer = items[i + 1] as ResizerModel
      if (pane && resizer) {
        resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
      }
    }
  }
  // console.log('defaultMinSize ', getList(resizersList, 'defaultMinSize'))
  // console.log('defaultMaxSize ', getList(resizersList, 'defaultMaxSize'))
}
