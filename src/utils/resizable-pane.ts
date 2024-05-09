import {IResizableEvent, IResizableItem} from '../@types'
import {DIRECTIONS, MINUS, PLUS} from '../constant'
import {PaneModel, ResizableModel} from '../models'
import {
  changePaneSize, getMaxDiff, getMinDiff,
  resetMax, resetMin, syncPaneSizeToRatioSize, toRatioMode
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
    sizeChange = mouseCoordinate - <number>axisCoordinate

    increasingItemsLocal = reverse(increasingItems)
  }

  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }

  let reverseSizeChange = sizeChange

  decreasingItemsLocal.forEach(item => {
    sizeChange = changePaneSize(item, sizeChange, MINUS, direction)
  })

  reverseSizeChange -= sizeChange

  increasingItemsLocal.forEach(item => {
    reverseSizeChange = changePaneSize(item, reverseSizeChange, PLUS, direction)
  })
}

// eslint-disable-next-line complexity
export const setVirtualOrderList = (resizable: ResizableModel) => {
  const {items, direction, handleId} = resizable

  const visibleItems = getVisibleItems(items)
  const visibleActiveIndex = findIndex(visibleItems, handleId)

  const decreasingItems: (IResizableItem | undefined)[] = []
  let increasingItems: (IResizableItem | undefined)[] = []
  let virtualOrderList: (IResizableItem)[]

  if (isItUp(direction)) {
    for (let i = visibleActiveIndex - 1; i > -1; i -= 2) {
      decreasingItems.push(visibleItems[i], visibleItems[i - 1])
    }
    decreasingItems.reverse()

    increasingItems = [visibleItems[visibleActiveIndex]]

    for (let i = visibleActiveIndex + 1; i < visibleItems.length; i += 2) {
      const pane = visibleItems[i]
      // i - Pane
      // i + 1 - Resizer
      if (pane.size) {
        increasingItems[i] = pane
        increasingItems[i + 1] = visibleItems[i + 1] // it is pane
      } else {
        increasingItems[i] = visibleItems[i + 1]
        increasingItems[i + 1] = pane // it is pane
      }
    }

    virtualOrderList = [...decreasingItems, ...increasingItems]
  } else {
    increasingItems = [visibleItems[0]]

    for (let i = visibleActiveIndex - 1; i > 0; i -= 2) {
      const pane = visibleItems[i]
      if (pane.size) {
        increasingItems[i] = pane
        increasingItems[i - 1] = visibleItems[i - 1]
      } else {
        increasingItems[i] = visibleItems[i - 1]
        increasingItems[i - 1] = pane
      }
    }

    increasingItems.push(visibleItems[visibleActiveIndex])

    for (let i = visibleActiveIndex + 1; i < visibleItems.length; i += 2) {
      decreasingItems.push(visibleItems[i], visibleItems[i + 1])
    }

    virtualOrderList = [...increasingItems, ...decreasingItems]
  }

  resizable.virtualOrderList = filterEmpty(virtualOrderList)
  resizable.increasingItems = filterEmpty(increasingItems)
  resizable.decreasingItems = filterEmpty(decreasingItems)

  resizable.virtualActiveIndex = findIndex(resizable.virtualOrderList, handleId)
}

export const setCurrentMinMax = (resizable: ResizableModel) => {
  const {containerSize} = getMaxContainerSizes(resizable)

  const {virtualOrderList, virtualActiveIndex} = resizable

  const nextIdx = virtualActiveIndex + 1
  const aMaxChangeUp = getMinDiff(virtualOrderList[virtualActiveIndex])
  const bMaxChangeUp = getMaxDiff(virtualOrderList[nextIdx])

  minMaxLogicUp(virtualOrderList, aMaxChangeUp - bMaxChangeUp, virtualActiveIndex, nextIdx, 0, containerSize)

  const aMaxChangeDown = getMinDiff(virtualOrderList[nextIdx])
  const bMaxChangeDown = getMaxDiff(virtualOrderList[virtualActiveIndex])
  minMaxLogicDown(virtualOrderList, bMaxChangeDown - aMaxChangeDown, virtualActiveIndex, nextIdx, 0, containerSize)
}

export const calculateAxes = (resizable: ResizableModel) => {
  const {items, virtualActiveIndex} = resizable
  const {maxTopAxis} = getMaxContainerSizes(resizable)
  const visibleItemsList = getVisibleItems(items)

  resizable.bottomAxis = maxTopAxis + getMaxSizeSum(visibleItemsList, 0, virtualActiveIndex - 1)
  resizable.topAxis = maxTopAxis + getMinSizeSum(visibleItemsList, 0, virtualActiveIndex - 1)
}

// aIndex will decrease and bIndex will increase
// eslint-disable-next-line complexity
export const minMaxLogicUp = (
  panesList: PaneModel[], value: number,
  aIndex: number, bIndex: number,
  sum: number, maxPaneSize: number) => {
  // Failing for going up Reached Max
  const lastIndex = panesList.length - 1

  let nextValue: number | undefined
  let nextAIndex = aIndex
  let nextBIndex = bIndex

  const paneA = panesList[aIndex]
  const paneB = panesList[bIndex]

  switch (true) {
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += resetMin(paneA)
          nextAIndex = aIndex - 1
          nextValue = getMinDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          sum += resetMin(paneA)
          sum += resetMax(paneB)
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = getMinDiff(panesList[nextAIndex]) - getMaxDiff(panesList[nextBIndex])
          break

        case value > 0:
          sum += resetMax(paneB)
          nextBIndex = bIndex + 1
          nextValue = value - getMaxDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += resetMin(paneA)
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          paneB.maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += resetMin(paneA)
          sum += resetMax(paneB)
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += resetMax(paneB)
          nextBIndex = bIndex + 1
          nextValue = value - getMaxDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += resetMin(paneA)
          nextAIndex = aIndex - 1
          nextValue = getMinDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          sum += resetMin(paneA)
          sum += resetMax(paneB)
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += resetMax(paneB)
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
          sum += resetMin(paneA)
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          paneB.maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += resetMin(paneA)
          sum += resetMax(paneB)
          return

        case value > 0:
          sum += resetMax(paneB)
          // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
          paneA.minSize = maxPaneSize - sum
          return
      }
  }

  minMaxLogicUp(panesList, <number>nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

// eslint-disable-next-line complexity
export const minMaxLogicDown = (
  panesList: PaneModel[], value: number,
  aIndex: number, bIndex: number, sum: number,
  maxPaneSize: number) => {
  const lastIndex = panesList.length - 1
  let nextValue: number | undefined
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  const paneA = panesList[aIndex]
  const paneB = panesList[bIndex]
  switch (true) {
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += resetMax(paneA)
          nextAIndex = aIndex - 1
          nextValue = getMaxDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          sum += resetMax(paneA)
          sum += resetMin(paneB)
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = getMaxDiff(panesList[nextAIndex]) - getMinDiff(panesList[nextBIndex])
          break

        case value > 0:
          sum += resetMin(paneB)
          nextBIndex = bIndex + 1
          nextValue = value - getMinDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += resetMax(paneA)
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          paneB.minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += resetMax(paneA)
          sum += resetMin(paneB)
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += resetMin(paneB)
          nextBIndex = bIndex + 1
          nextValue = value - getMinDiff(panesList[nextBIndex])
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += resetMax(paneA)
          nextAIndex = aIndex - 1
          nextValue = getMaxDiff(panesList[nextAIndex]) + value
          break

        case value === 0:
          sum += resetMax(paneA)
          sum += resetMin(paneB)
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += resetMin(paneB)
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
          sum += resetMax(paneA)
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          paneB.minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += resetMin(paneB)
          sum += resetMax(paneA)
          return

        case value > 0:
          sum += resetMin(paneB)
          // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
          paneA.maxSize = maxPaneSize - sum
          return
      }
  }

  minMaxLogicDown(panesList, <number>nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
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
    maxPaneSize,
    resizersSize
  }
}

export const toRatioModeFn = (resizable: ResizableModel, isOnResize = false) => {
  const {panesList, items} = resizable
  const {maxPaneSize} = getMaxContainerSizes(resizable)

  const maxRatioValue = getRatioSizeSum(panesList)
  if (maxRatioValue < 0) {
    return
  }

  panesList
    .forEach((pane: PaneModel) => {
      syncPaneSizeToRatioSize(pane)
      toRatioMode(pane, maxPaneSize, maxRatioValue, isOnResize)
    })

  const sizeSum = getItemsSizeSum(panesList)
  const leftOverTotalSize = maxPaneSize - sizeSum
  const changeOperation = leftOverTotalSize < 0 ? MINUS : PLUS
  change1PixelToPanes(panesList, Math.abs(leftOverTotalSize), changeOperation)

  setUISizesFn(items, DIRECTIONS.DOWN)
}

export const getChangeInViewSize = (resizable: ResizableModel) => {
  const {items} = resizable
  const {containerSize} = getMaxContainerSizes(resizable)
  const allItemsSum = getItemsSizeSum(items)
  return containerSize - allItemsSum
}
