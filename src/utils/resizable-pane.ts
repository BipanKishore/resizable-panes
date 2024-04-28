import {IContextDetails, IResizableEvent, IResizableItem} from '../@types'
import {DIRECTIONS, MINUS, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getPanesSizeSum, getResizerSum, setUISizesFn, synPanesMaxToSize, synPanesMinToSize
} from './panes'
import {findIndex, isItUp} from './util'

const reverse = <T>(list: T[]): T[] => [...list].reverse()
const filterEmpty = (list: any[]) => list.filter(_ => _)

export const movingLogic = (e: IResizableEvent, {
  axisCoordinate,
  decreasingItems,
  increasingItems,
  direction
}: IContextDetails) => {
  let sizeChange: number
  let decreasingItemsLocal = decreasingItems
  let increasingItemsLocal = increasingItems
  if (isItUp(direction)) {
    sizeChange = axisCoordinate - e.mouseCoordinate
    decreasingItemsLocal = reverse(decreasingItems)
  } else {
    sizeChange = e.mouseCoordinate - <number>axisCoordinate

    increasingItemsLocal = reverse(increasingItems)
  }

  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
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

const removeHidden = (list: IResizableItem[]) => list.filter(item => item.visibility)

// eslint-disable-next-line complexity
export const setVirtualOrderList = (serviceRefCurrent: IContextDetails | any) => {
  const {items, direction, handleId} = serviceRefCurrent

  const visibleItems = removeHidden(items)
  const visibleActiveIndex = findIndex(visibleItems, handleId)

  const decreasingItems: (IResizableItem | undefined)[] = []
  let increasingItems: (IResizableItem | undefined)[] = []
  let virtualOrderList: (IResizableItem | undefined)[]

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

  serviceRefCurrent.virtualOrderList = removeHidden(filterEmpty(virtualOrderList))
  serviceRefCurrent.increasingItems = removeHidden(filterEmpty(increasingItems))
  serviceRefCurrent.decreasingItems = removeHidden(filterEmpty(decreasingItems))

  serviceRefCurrent.virtualActiveIndex = findIndex(serviceRefCurrent.virtualOrderList, handleId)
}

export const setCurrentMinMax = (serviceRefCurrent: IContextDetails) => {
  const {containerSize} = getMaxContainerSizes(serviceRefCurrent)

  const {virtualOrderList, virtualActiveIndex} = serviceRefCurrent

  const nextIdx = virtualActiveIndex + 1
  const aMaxChangeUp = virtualOrderList[virtualActiveIndex].getMinDiff()
  const bMaxChangeUp = virtualOrderList[nextIdx].getMaxDiff()

  minMaxLogicUp(virtualOrderList, aMaxChangeUp - bMaxChangeUp, virtualActiveIndex, nextIdx, 0, containerSize)

  const aMaxChangeDown = virtualOrderList[nextIdx].getMinDiff()
  const bMaxChangeDown = virtualOrderList[virtualActiveIndex].getMaxDiff()
  minMaxLogicDown(virtualOrderList, bMaxChangeDown - aMaxChangeDown, virtualActiveIndex, nextIdx, 0, containerSize)
}

export const calculateAxes = (contextDetails: any) => {
  const {items, virtualActiveIndex} = contextDetails
  const {maxTopAxis} = getMaxContainerSizes(contextDetails)
  const visibleItemsList = items.filter((item : IResizableItem) => item.visibility)

  contextDetails.bottomAxis = maxTopAxis + getMaxSizeSum(visibleItemsList, 0, virtualActiveIndex - 1)
  contextDetails.topAxis = maxTopAxis + getMinSizeSum(visibleItemsList, 0, virtualActiveIndex - 1)
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
  // keyConsole({aIndex, bIndex, value, sum})
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

export const getMaxContainerSizes = ({getContainerRect, vertical, resizersList} :IContextDetails) => {
  const {top, height, left, width} = getContainerRect()
  const maxTopAxis = vertical ? left : top
  const containerSize = Math.round(vertical ? width : height)
  const resizersSize = getResizerSum(resizersList)
  const maxPaneSize = containerSize - resizersSize

  return {
    containerSize,
    maxTopAxis,
    maxPaneSize,
    resizersSize
  }
}

export const registerContainer = (context: any) => (node: any) => {
  context.registerContainer({getContainerRect: () => node.getBoundingClientRect()})
}

export const toRatioModeFn = (contextDetails: IContextDetails) => {
  const {panesList, items} = contextDetails
  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  const maxRatioValue = getPanesSizeSum(panesList)
  panesList
    .forEach((pane: PaneModel) =>
      pane.toRatioMode(maxPaneSize, maxRatioValue)
    )

  const sizeSum = getPanesSizeSum(panesList)
  const leftOverTotalSize = maxPaneSize - sizeSum
  const changeOperation = leftOverTotalSize < 0 ? MINUS : PLUS
  change1PixelToPanes(panesList, Math.abs(leftOverTotalSize), changeOperation)

  setUISizesFn(items, DIRECTIONS.DOWN)
}
