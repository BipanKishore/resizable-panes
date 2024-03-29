import {ReactElement} from 'react'
import {IResizablePaneProviderProps, IResizablePanesProps, addAndRemoveType} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizeStorage} from './storage'
import {ResizerModel} from '../models/resizer-model'
import {PLUS} from '../constant'
import {localConsole} from './development-util'

export const syncAxisSizesFn = (panesList: PaneModel[]) =>
  panesList.forEach(pane => pane.syncAxisSize())

export const setUISizesFn = (modelList: PaneModel[] | ResizerModel[]) =>
  modelList.forEach((pane: PaneModel | ResizerModel) => pane.setUISize())

export const setUISizesOfAllElement = (panesList: PaneModel[], resizersList: ResizerModel[]) => {
  setUISizesFn(panesList)
  setUISizesFn(resizersList)
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
export const getResizerSum = (resizersList: ResizerModel[], start: number, end: number) =>
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

export const createPaneModelList = (
  children: ReactElement[],
  props: IResizablePaneProviderProps,
  store: ResizeStorage) =>
  children.map(child => new PaneModel(child.props, props, store))

export const createResizerModelList = (
  children: ReactElement[],
  resizerSize: IResizablePaneProviderProps,
  store: ResizeStorage
) => {
  const resizersList: ResizerModel[] = children.map(child => new ResizerModel(child.props, resizerSize, store))
  resizersList.pop()
  return resizersList
}
