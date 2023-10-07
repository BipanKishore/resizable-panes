import {ReactNode, isValidElement} from 'react'
import {IResizablePaneProviderProps, IResizablePanesProps, addAndRemoveType} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizeStorage} from './storage'
import {ResizerModel} from '../models/resizer-model'
import {PLUS} from '../constant'

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

export const synPanesMaxToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.synMaxToSize(), start, end)

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.synMinToSize(), start, end)

export const getPanesSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.getSize(), start, end)

export const getResizerSum = (resizersList: ResizerModel[], start: number, end: number) =>
  getSum(resizersList, (resizer) => resizer.getSize(), start, end)

export const getMaxSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.maxSize, start, end)

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) =>
  getSum(panesList, (pane) => pane.minSize, start, end)

export const setDownMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMaxSize()
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMinSize()
  }
}

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

export const createPaneModelList = (children: ReactNode[], props: IResizablePanesProps, store: ResizeStorage) => {
  const paneList: PaneModel[] = []
  for (const child of children) {
    if (isValidElement(child)) {
      paneList.push(
        new PaneModel(child.props, props, store)
      )
    }
  }
  return paneList
}

export const createResizerModelList = (children: ReactNode[],
  resizerSize: IResizablePaneProviderProps, store: ResizeStorage) => {
  const resizersList: ResizerModel[] = []
  for (const child of children) {
    if (isValidElement(child)) {
      resizersList.push(
        new ResizerModel(child.props, resizerSize, store)
      )
    }
  }
  return resizersList
}
