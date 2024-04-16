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

export const setUISizesFn = (modelList: IResizableItem[], direction: number) => {
  modelList.forEach((pane: IResizableItem) => pane.setUISize(direction))
  console.log('>>>>>>>>>>>>>>>>>>size ', modelList.map((r) => r.getSize()))
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
  children.forEach(child =>
    items.push(
      new PaneModel(child.props, resizableProps, store),
      new ResizerModel(child.props, resizableProps, store)
    )
  )
  items.pop()
  return items
}

export const setResizersLimits = (contextDetails: IContextDetails) => {
  const {virtualActiveIndex, items, direction, virtualOrderList, resizersList} = contextDetails

  resizersList.forEach((item) => {
    item.defaultMinSize = 0
    item.defaultMaxSize = item.defaultSize
  })

  // The bellow logic wont be required if we will put the virtualActiveIndex in increasing side
  const resizerHandle = virtualOrderList[virtualActiveIndex] as ResizerModel
  resizerHandle.defaultMinSize = resizerHandle.defaultSize
  resizerHandle.defaultMaxSize = resizerHandle.defaultSize
  console.log('setResizersLimits')
  if (isItUp(direction)) {
    virtualOrderList.forEach((item, index) => {
      if (item.isHandle) {
        if (index < virtualActiveIndex) {
          item.defaultMinSize = virtualOrderList[index - 1].defaultMinSize === 0 ? 0 : item.defaultSize
          item.defaultMaxSize = item.defaultSize
        }
        if (index > virtualActiveIndex) {
          item.defaultMinSize = 0
          item.defaultMaxSize = item.defaultSize
        }
      }
    })
  } else {
    virtualOrderList.forEach((item, index) => {
      if (item.isHandle) {
        if (index < virtualActiveIndex) {
          item.defaultMinSize = 0
          item.defaultMaxSize = item.defaultSize
        }
        if (index > virtualActiveIndex) {
          item.defaultMinSize = virtualOrderList[index - 1].defaultMinSize === 0 ? 0 : item.defaultSize
          item.defaultMaxSize = item.defaultSize
        }
      }
    })
  }

  // if (isItUp(direction)) {
  //   for (let i = virtualActiveIndex - 2; i > -1; i -= 2) {
  //     const resizer = virtualOrderList[i]
  //     const pane = virtualOrderList[i - 1] as ResizerModel
  //     if (pane && resizer) {
  //       resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
  //       resizer.defaultMaxSize = resizer.visibility ? resizer.defaultMaxSize : 0
  //     }
  //   }

  //   for (let i = virtualActiveIndex + 2; i < virtualOrderList.length; i += 2) {
  //     const resizer = virtualOrderList[i]
  //     const pane = virtualOrderList[i + 1] as ResizerModel
  //     if (pane && resizer) {
  //       resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
  //       resizer.defaultMaxSize = resizer.visibility ? resizer.defaultMaxSize : 0
  //     }
  //   }
  // } else {
  //   for (let i = virtualActiveIndex - 2; i > -1; i -= 2) {
  //     const resizer = virtualOrderList[i]
  //     const pane = virtualOrderList[i - 1] as ResizerModel
  //     if (pane && resizer) {
  //       resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
  //       resizer.defaultMaxSize = resizer.visibility ? resizer.defaultMaxSize : 0
  //     }
  //   }

  //   for (let i = virtualActiveIndex + 2; i < virtualOrderList.length; i += 2) {
  //     const resizer = virtualOrderList[i]
  //     const pane = virtualOrderList[i + 1] as ResizerModel
  //     if (pane && resizer) {
  //       resizer.defaultMinSize = pane.defaultMinSize === 0 ? 0 : resizer.defaultSize
  //       resizer.defaultMaxSize = resizer.visibility ? resizer.defaultMaxSize : 0
  //     }
  //   }
  // }
  console.log('defaultMinSize ', getList(resizersList, 'defaultMinSize'))
  console.log('defaultMaxSize ', getList(resizersList, 'defaultMaxSize'))
}

// We increases the size of element in opposite direction than in the direction
export const fixPartialHiddenResizer = (contextDetails: IContextDetails) => {
  const {items} = contextDetails

  let sizeChange = 0
  items.forEach(
    (item, index) => {
      if (item.isHandle && item.defaultSize !== item.size && item.size) {
        sizeChange = item.size
        item.size = 0

        const resizingOrder: IResizableItem[] = []

        if (isItUp(item.partialHiddenDirection)) {
          const resizingOrderLeftOver = items.slice(0, index).reverse()
          resizingOrder.push(...items.slice(index + 1), ...resizingOrderLeftOver)
        } else {
          const resizingOrderLeftOver = items.slice(index + 1)
          resizingOrder.push(...items.slice(0, index).reverse(), ...resizingOrderLeftOver)
        }

        const visibleItems = resizingOrder.filter((item) => item.size)
        visibleItems.forEach((item) => item.syncAxisSize())

        visibleItems.forEach((item) => {
          item.restoreLimits()
          sizeChange = item.changeSize(sizeChange, PLUS)
        })

        setUISizesFn(items, item.partialHiddenDirection)
      }
    }
  )
}
