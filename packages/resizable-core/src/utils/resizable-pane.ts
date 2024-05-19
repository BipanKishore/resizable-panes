import {IClearFlagsParam, IResizableItem} from '../@types'
import {CHANGE, RATIO, SET_SIZE, VISIBILITY} from './constant'
import {PaneModel, ResizableModel} from '../models'
import {
  changePaneSize, getMaxDiff, getMinDiff,
  resetMax, resetMin, syncPaneRatioSizeToSize, syncPaneSizeToRatioSize, toRatioModePane
} from '../models/pane'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getItemsSizeSum, getRatioSizeSum, getVisibleItems, setUISizesFn,
  synPanesMaxToSize, synPanesMinToSize
} from './panes'
import {findIndex, isItUp, reverse} from './util'

export const movingLogic = (mouseCoordinate: number, resizable: ResizableModel) => {
  let sizeChange: number

  const {items, direction, index, axisCoordinate} = resizable

  const visibleItems = getVisibleItems(items)

  let decreasingItems: IResizableItem[]
  let increasingItems: IResizableItem []

  const firstHalf = reverse(visibleItems.slice(0, index + 1))
  const secondHalf = visibleItems.slice(index + 1)

  if (isItUp(direction)) {
    sizeChange = axisCoordinate - mouseCoordinate
    increasingItems = secondHalf
    decreasingItems = firstHalf
  } else {
    sizeChange = mouseCoordinate - axisCoordinate
    increasingItems = firstHalf
    decreasingItems = secondHalf
  }

  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }

  let reverseSizeChange = sizeChange

  decreasingItems.forEach(item => {
    sizeChange = changePaneSize(item, sizeChange, CHANGE.REMOVE)
  })

  reverseSizeChange -= sizeChange

  increasingItems.forEach(item => {
    reverseSizeChange = changePaneSize(item, reverseSizeChange, CHANGE.ADD)
  })
}

export const getHandleIndex = (items: IResizableItem[], handleId: string) => {
  const visibleItems = getVisibleItems(items)
  const handleIndex = findIndex(visibleItems, handleId)
  return handleIndex
}

export const setCurrentMinMax = (resizable: ResizableModel) => {
  const {containerSize} = getMaxContainerSizes(resizable)

  const {items, index} = resizable
  const visibleItems = getVisibleItems(items)

  const nextIdx = index + 1
  const aMaxChangeUp = getMinDiff(visibleItems[index])
  const bMaxChangeUp = getMaxDiff(visibleItems[nextIdx])

  minMaxLogicUp(visibleItems, aMaxChangeUp - bMaxChangeUp, index, nextIdx, 0, containerSize)

  const aMaxChangeDown = getMinDiff(visibleItems[nextIdx])
  const bMaxChangeDown = getMaxDiff(visibleItems[index])
  minMaxLogicDown(visibleItems, bMaxChangeDown - aMaxChangeDown, index, nextIdx, 0, containerSize)
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

export const clearflagsOnNewView = (resizable: ResizableModel, except?: IClearFlagsParam) => {
  const {panesList} = resizable
  if (except !== RATIO) {
    panesList.forEach(syncPaneRatioSizeToSize)
  }
  if (except !== VISIBILITY) {
    resizable.newVisibilityModel = false
  }
  if (except !== SET_SIZE) {
    resizable.setSizeKey = null
  }
}
