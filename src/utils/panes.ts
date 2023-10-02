import {ReactNode, isValidElement} from 'react'
import {IPaneNumericKeys, IResizablePanesProps, addAndRemoveType} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizeStorage} from './storage'
import {ResizerModel} from '../models/resizer-model'

export const syncAxisSizesFn = (panesList: PaneModel[]) => {
  panesList.forEach(pane => pane.syncAxisSize())
}

export const setUISizesFn = (panesList: PaneModel[]) => {
  panesList.forEach(pane => pane.setUISize())
}

export const synPanesMaxToSize = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMaxToSize()
  }
  return sum
}

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMinToSize()
  }
  return sum
}

export const getPanesSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].getSize()
  }
  return sum
}

export const getResizerSum = (resizersList: any[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += resizersList[i].getSize()
  }
  return sum
}

export const getMaxSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].maxSize
  }
  return sum
}

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].minSize
  }
  return sum
}

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

export const findIndexInChildrenbyId = (children: any, _id: string) => {
  return children.findIndex(({props: {id}}: any) => id === _id)
}

const fixChangeCallBack = (pane: PaneModel, change: number,
  operation: addAndRemoveType) => {
  const newSize = pane.size + (operation === '+' ? change : -change)
  pane.initializeSize(newSize)
}

export const change1PixelToPanes = (panesList: PaneModel[], sizeChange: number,
  operation: addAndRemoveType, ...keys: IPaneNumericKeys[]) => {
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

export const createResizerModelList = (children: ReactNode[], props: IResizablePanesProps, store: ResizeStorage) => {
  const resizersList: ResizerModel[] = []
  for (const child of children) {
    if (isValidElement(child)) {
      resizersList.push(
        new ResizerModel(child.props, props, store)
      )
    }
  }
  return resizersList
}