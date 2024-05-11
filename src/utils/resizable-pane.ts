import {IResizableItem} from '../@types'
import {CHANGE} from '../constant'
import {PaneModel, ResizableModel} from '../models'
import {
  changePaneSize, getMaxDiff, getMinDiff,
  resetMax, resetMin, syncPaneSizeToRatioSize, toRatioModePane
} from '../models/pane'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getItemsSizeSum, getRatioSizeSum, getVisibleItems, setUISizesFn,
  synPanesMaxToSize, synPanesMinToSize
} from './panes'
import {filterEmpty, findIndex, isItUp, reverse} from './util'

export const movingLogic = (mouseCoordinate: number, {
  axisCoordinate,
  decreasingItems,
  increasingItems,
  direction
}: ResizableModel) => {
  let sizeChange: number
  let decreasingItemsLocal = decreasingItems
  let increasingItemsLocal = increasingItems
  if (isItUp(direction)) {
    sizeChange = axisCoordinate - mouseCoordinate
    decreasingItemsLocal = reverse(decreasingItems)
  } else {
    sizeChange = mouseCoordinate - axisCoordinate

    increasingItemsLocal = reverse(increasingItems)
  }

  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }

  let reverseSizeChange = sizeChange

  decreasingItemsLocal.forEach(item => {
    sizeChange = changePaneSize(item, sizeChange, CHANGE.REMOVE)
  })

  reverseSizeChange -= sizeChange

  increasingItemsLocal.forEach(item => {
    reverseSizeChange = changePaneSize(item, reverseSizeChange, CHANGE.ADD)
  })
}

// eslint-disable-next-line complexity
export const setVirtualOrderList = (resizable: ResizableModel) => {
  const {items, direction, handleId} = resizable

  const visibleItems = getVisibleItems(items)
  const handleIndex = findIndex(visibleItems, handleId)

  const decreasingItems: (IResizableItem | undefined)[] = []
  let increasingItems: (IResizableItem | undefined)[] = []
  let virtualOrderList: (IResizableItem)[]

  const logicForIncreasingList = (i: number, attachedIndex: number) => {
    const pane = visibleItems[i]
    // i - Pane
    // i + 1 - Resizer
    if (pane.size) {
      increasingItems[i] = pane
      increasingItems[i + attachedIndex] = visibleItems[i + attachedIndex] // it is pane
    } else {
      increasingItems[i] = visibleItems[i + attachedIndex]
      increasingItems[i + attachedIndex] = pane // it is pane
    }
  }

  if (isItUp(direction)) {
    for (let i = handleIndex - 1; i > -1; i -= 2) {
      decreasingItems.push(visibleItems[i], visibleItems[i - 1])
    }
    decreasingItems.reverse()

    increasingItems = [visibleItems[handleIndex]]

    for (let i = handleIndex + 1; i < visibleItems.length; i += 2) {
      logicForIncreasingList(i, 1)
    }

    virtualOrderList = [...decreasingItems, ...increasingItems]
  } else {
    increasingItems = [visibleItems[0]]

    for (let i = handleIndex - 1; i > 0; i -= 2) {
      logicForIncreasingList(i, -1)
    }

    increasingItems.push(visibleItems[handleIndex])

    for (let i = handleIndex + 1; i < visibleItems.length; i += 2) {
      decreasingItems.push(visibleItems[i], visibleItems[i + 1])
    }

    virtualOrderList = [...increasingItems, ...decreasingItems]
  }

  resizable.virtualOrderList = filterEmpty(virtualOrderList)
  resizable.increasingItems = filterEmpty(increasingItems)
  resizable.decreasingItems = filterEmpty(decreasingItems)

  resizable.index = findIndex(resizable.virtualOrderList, handleId)
}

export const setCurrentMinMax = (resizable: ResizableModel) => {
  const {containerSize} = getMaxContainerSizes(resizable)

  const {virtualOrderList, index} = resizable

  const nextIdx = index + 1
  const aMaxChangeUp = getMinDiff(virtualOrderList[index])
  const bMaxChangeUp = getMaxDiff(virtualOrderList[nextIdx])

  minMaxLogicUp(virtualOrderList, aMaxChangeUp - bMaxChangeUp, index, nextIdx, 0, containerSize)

  const aMaxChangeDown = getMinDiff(virtualOrderList[nextIdx])
  const bMaxChangeDown = getMaxDiff(virtualOrderList[index])
  minMaxLogicDown(virtualOrderList, bMaxChangeDown - aMaxChangeDown, index, nextIdx, 0, containerSize)
}

export const calculateAxes = (resizable: ResizableModel) => {
  const {items, index} = resizable
  const {maxTopAxis} = getMaxContainerSizes(resizable)
  const visibleItemsList = getVisibleItems(items)

  resizable.bottomAxis = maxTopAxis + getMaxSizeSum(visibleItemsList, 0, index - 1)
  resizable.topAxis = maxTopAxis + getMinSizeSum(visibleItemsList, 0, index - 1)
}

// aIndex will decrease and bIndex will increase
// eslint-disable-next-line complexity
export const minMaxLogicUp = (
  panesList: PaneModel[], value: number,
  aIndex: number, bIndex: number,
  sum: number, maxPaneSize: number) => {
  const lastIndex = panesList.length - 1

  let nextValue: number
  let nextAIndex = aIndex
  let nextBIndex = bIndex

  const paneA = panesList[aIndex]
  const paneB = panesList[bIndex]

  const toMinA = () => {
    sum += resetMin(paneA)
  }

  const toMaxB = () => {
    sum += resetMax(paneB)
  }

  switch (true) {
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          toMinA()
          nextAIndex = aIndex - 1
          nextValue = getMinDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          toMinA()
          toMaxB()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = getMinDiff(panesList[nextAIndex]) - getMaxDiff(panesList[nextBIndex])
          break

        case value > 0:
          toMaxB()
          nextBIndex = bIndex + 1
          nextValue = value - getMaxDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          toMinA()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          paneB.maxSize = maxPaneSize - sum
          return

        case value === 0:
          toMinA()
          toMaxB()
          synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          toMaxB()
          nextBIndex = bIndex + 1
          nextValue = value - getMaxDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          toMinA()
          nextAIndex = aIndex - 1
          nextValue = getMinDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          toMinA()
          toMaxB()
          synPanesMinToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          toMaxB()
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          paneA.minSize = maxPaneSize - sum
          return
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex === lastIndex:
      // return for every case
      switch (true) {
        case value < 0:
          toMinA()
          paneB.maxSize = maxPaneSize - sum
          return

        case value === 0:
          toMinA()
          toMaxB()
          return

        case value > 0:
          toMaxB()
          paneA.minSize = maxPaneSize - sum
          return
      }
  }

  minMaxLogicUp(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

// eslint-disable-next-line complexity
export const minMaxLogicDown = (
  panesList: PaneModel[], value: number,
  aIndex: number, bIndex: number, sum: number,
  maxPaneSize: number) => {
  const lastIndex = panesList.length - 1

  let nextValue: number
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  const paneA = panesList[aIndex]
  const paneB = panesList[bIndex]

  const toMaxA = () => {
    sum += resetMax(paneA)
  }

  const toMinB = () => {
    sum += resetMin(paneB)
  }

  switch (true) {
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          toMaxA()
          nextAIndex = aIndex - 1
          nextValue = getMaxDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          toMaxA()
          toMinB()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = getMaxDiff(panesList[nextAIndex]) - getMinDiff(panesList[nextBIndex])
          break

        case value > 0:
          toMinB()
          nextBIndex = bIndex + 1
          nextValue = value - getMinDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          toMaxA()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          paneB.minSize = maxPaneSize - sum
          return

        case value === 0:
          toMaxA()
          toMinB()
          synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          toMinB()
          nextBIndex = bIndex + 1
          nextValue = value - getMinDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          toMaxA()
          nextAIndex = aIndex - 1
          nextValue = getMaxDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          toMaxA()
          toMinB()
          synPanesMaxToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          toMinB()
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          paneA.maxSize = maxPaneSize - sum
          return
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex === lastIndex:
      // return for every case
      switch (true) {
        case value < 0:
          toMaxA()
          paneB.minSize = maxPaneSize - sum
          return

        case value === 0:
          toMinB()
          toMaxA()
          return

        case value > 0:
          toMinB()
          paneA.maxSize = maxPaneSize - sum
          return
      }
  }

  minMaxLogicDown(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

export const getMaxContainerSizes = ({getContainerRect, vertical, resizersList} :ResizableModel) => {
  const {top, height, left, width} = getContainerRect()
  const maxTopAxis = vertical ? left : top
  const containerSize = Math.round(vertical ? width : height)
  const resizersSize = getItemsSizeSum(resizersList)
  const maxPaneSize = containerSize - resizersSize

  return {
    containerSize,
    maxTopAxis,
    maxPaneSize
  }
}

export const toRatioModeAllPanes = (resizable: ResizableModel, isOnResize = false) => {
  const {panesList, items} = resizable
  const {maxPaneSize} = getMaxContainerSizes(resizable)

  const maxRatioValue = getRatioSizeSum(panesList)
  if (maxRatioValue < 0) {
    return
  }

  panesList
    .forEach((pane: PaneModel) => {
      syncPaneSizeToRatioSize(pane)
      toRatioModePane(pane, maxPaneSize, maxRatioValue, isOnResize)
    })

  const sizeSum = getItemsSizeSum(panesList)
  const leftOverTotalSize = maxPaneSize - sizeSum
  const changeOperation = leftOverTotalSize < 0 ? CHANGE.REMOVE : CHANGE.ADD
  change1PixelToPanes(panesList, Math.abs(leftOverTotalSize), changeOperation)

  setUISizesFn(items)
}

export const getChangeInViewSize = (resizable: ResizableModel) => {
  const {items} = resizable
  const {containerSize} = getMaxContainerSizes(resizable)
  const allItemsSum = getItemsSizeSum(items)
  return containerSize - allItemsSum
}
