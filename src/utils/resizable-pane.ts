import {IResizableEvent, IResizableItem} from '../@types'
import {DIRECTIONS, MINUS, PLUS} from '../constant'
import {PaneModel, ResizableModel} from '../models'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getRatioSizeSum, getPanesSizeSum, getVisibleItems, setUISizesFn,
  synPanesMaxToSize, synPanesMinToSize
} from './panes'
import {filterEmpty, findIndex, isItUp, reverse} from './util'

export const movingLogic = (e: IResizableEvent, {
  axisCoordinate,
  decreasingItems,
  increasingItems,
  direction
}: ResizableModel) => {
  let sizeChange = Math.abs(axisCoordinate - e.mouseCoordinate)
  let decreasingItemsLocal = decreasingItems
  let increasingItemsLocal = increasingItems
  if (isItUp(direction)) {
    decreasingItemsLocal = reverse(decreasingItems)
  } else {
    // sizeChange = e.mouseCoordinate - axisCoordinate
    increasingItemsLocal = reverse(increasingItems)
  }

  let reverseSizeChange = sizeChange

  decreasingItemsLocal.forEach(item => {
    sizeChange = item.changeSize(sizeChange, MINUS, direction)
  })

  reverseSizeChange -= sizeChange

  increasingItemsLocal.forEach(item => {
    reverseSizeChange = item.changeSize(reverseSizeChange, PLUS, direction)
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

  resizable.virtualOrderList = getVisibleItems(filterEmpty(virtualOrderList))
  resizable.increasingItems = getVisibleItems(filterEmpty(increasingItems))
  resizable.decreasingItems = getVisibleItems(filterEmpty(decreasingItems))

  resizable.virtualActiveIndex = findIndex(resizable.virtualOrderList, handleId)
}

export const setCurrentMinMax = (resizable: ResizableModel) => {
  const {containerSize} = getMaxContainerSizes(resizable)

  const {virtualOrderList, virtualActiveIndex} = resizable

  const nextIdx = virtualActiveIndex + 1
  const aMaxChangeUp = virtualOrderList[virtualActiveIndex].getMinDiff()
  const bMaxChangeUp = virtualOrderList[nextIdx].getMaxDiff()

  minMaxLogicUp(virtualOrderList, aMaxChangeUp - bMaxChangeUp, virtualActiveIndex, nextIdx, 0, containerSize)

  const aMaxChangeDown = virtualOrderList[nextIdx].getMinDiff()
  const bMaxChangeDown = virtualOrderList[virtualActiveIndex].getMaxDiff()
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
          sum += paneA.resetMin()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMinDiff() + value
          break

        case value === 0:
          sum += paneA.resetMin()
          sum += paneB.resetMax()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = panesList[nextAIndex].getMinDiff() - panesList[nextBIndex].getMaxDiff()
          break

        case value > 0:
          sum += paneB.resetMax()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMaxDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += paneA.resetMin()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          paneB.maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += paneA.resetMin()
          sum += paneB.resetMax()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += paneB.resetMax()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMaxDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += paneA.resetMin()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMinDiff() + value
          break

        case value === 0:
          sum += paneA.resetMin()
          sum += paneB.resetMax()
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += paneB.resetMax()
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
          sum += paneA.resetMin()
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          paneB.maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += paneA.resetMin()
          sum += paneB.resetMax()
          return

        case value > 0:
          sum += paneB.resetMax()
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
          sum += paneA.resetMax()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMaxDiff() + value
          break

        case value === 0:
          sum += paneA.resetMax()
          sum += paneB.resetMin()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = panesList[nextAIndex].getMaxDiff() - panesList[nextBIndex].getMinDiff()
          break

        case value > 0:
          sum += paneB.resetMin()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMinDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += paneA.resetMax()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          paneB.minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += paneA.resetMax()
          sum += paneB.resetMin()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += paneB.resetMin()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMinDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += paneA.resetMax()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMaxDiff() + value
          break

        case value === 0:
          sum += paneA.resetMax()
          sum += paneB.resetMin()
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += paneB.resetMin()
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
          sum += paneA.resetMax()
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          paneB.minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += paneB.resetMin()
          sum += paneA.resetMax()
          return

        case value > 0:
          sum += paneB.resetMin()
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
  const resizersSize = getPanesSizeSum(resizersList)
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
      pane.syncSizeToRatioSize()
      pane.toRatioMode(maxPaneSize, maxRatioValue, isOnResize)
    })

  const sizeSum = getPanesSizeSum(panesList)
  const leftOverTotalSize = maxPaneSize - sizeSum
  const changeOperation = leftOverTotalSize < 0 ? MINUS : PLUS
  change1PixelToPanes(panesList, Math.abs(leftOverTotalSize), changeOperation)

  setUISizesFn(items, DIRECTIONS.DOWN)
}

export const getChangeInViewSize = (resizable: ResizableModel) => {
  const {items} = resizable
  const {containerSize} = getMaxContainerSizes(resizable)
  const allItemsSum = getPanesSizeSum(items)
  console.log('containerSize', containerSize, 'allItemsSum', allItemsSum)
  return containerSize - allItemsSum
}

export const getIsViewSizeChanged = (resizable: ResizableModel) => {
  const {items} = resizable
  const {containerSize} = getMaxContainerSizes(resizable)
  const allItemsSum = getPanesSizeSum(items)
  return allItemsSum !== containerSize
}
