import {IContextDetails, IResizableEvent, IResizableItem} from '../@types'
import {DIRECTIONS, MINUS, MINUS_ONE, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {getList, localConsole, setPaneList} from './development-util'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getPanesSizeSum, getResizerSum, setResizersLimits, setUISizesOfAllElement, synPanesMaxToSize, synPanesMinToSize
} from './panes'
import {isItUp} from './util'

// eslint-disable-next-line complexity
export const goingDownLogic = (e: IResizableEvent, {axisCoordinate, panesList, activeIndex, items}: any) => {
  let sizeChange = e.mouseCoordinate - <number>axisCoordinate
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }

  let sizeChangeUp = sizeChange

  for (let i = activeIndex; i > MINUS_ONE; i -= 2) {
    const resizer = items[i - 1]
    if (resizer) {
      sizeChangeUp = resizer.changeSize(sizeChangeUp, PLUS)
    }
    sizeChangeUp = items[i].changeSize(sizeChangeUp, PLUS)
  }

  sizeChange -= sizeChangeUp

  for (let i = activeIndex + 1; i < items.length; i += 1) {
    sizeChange = items[i].changeSize(sizeChange, MINUS)
  }
}

// eslint-disable-next-line complexity
export const goingUpLogic = (e: IResizableEvent, {axisCoordinate, panesList, activeIndex, items}: any) => {
  let sizeChange = axisCoordinate - e.mouseCoordinate
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }
  let sizeChangeUp = sizeChange

  for (let i = activeIndex + 2; i < items.length; i += 2) {
    const resizer = items[i + 1]
    if (resizer) {
      sizeChangeUp = resizer.changeSize(sizeChangeUp, PLUS)
    }
    sizeChangeUp = items[i].changeSize(sizeChangeUp, PLUS)
  }

  sizeChange -= sizeChangeUp

  for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
    sizeChange = items[i].changeSize(sizeChange, MINUS)
  }
}

export const getVisiblePaneModelsAndActiveIndex = (panesList: PaneModel[], _activeIndex: number) => {
  const visiblePanesList = panesList.filter(item => item.visibility)
  const activePane = panesList[_activeIndex]
  const activeIndex = visiblePanesList.indexOf(activePane)

  return {
    visiblePanesList,
    activeIndex
  }
}

// eslint-disable-next-line complexity
const getVirtualOrderList = (items: IResizableItem[], direction: number, idx: number) => {
  if (isItUp(direction)) {
    const virtualUpList: IResizableItem[] = items.slice(0, idx + 2)
    for (let i = idx + 2; i < items.length; i += 2) {
      const resizer = items[i + 1]
      if (resizer) {
        virtualUpList.push(resizer)
      }
      virtualUpList.push(items[i])
    }
    console.log('virtualUpList', virtualUpList.slice(0, idx + 2), virtualUpList.slice(idx + 2, items.length))
    return virtualUpList
  }

  const virtualDownList: IResizableItem[] = items.slice(idx + 1, items.length)

  for (let i = idx; i > -1; i -= 2) {
    const resizer = items[i - 1]
    if (resizer) {
      virtualDownList.unshift(resizer)
    }
    virtualDownList.unshift(items[i])
  }
  console.log('virtualDownList', virtualDownList.slice(0, idx + 1),
    virtualDownList.slice(idx + 1, items.length))
  return virtualDownList
}

export const setCurrentMinMax = (serviceRefCurrent: IContextDetails) => {
  const {resizersList, activeIndex, items, direction} = serviceRefCurrent
  const {containerSize} = getMaxContainerSizes(serviceRefCurrent)
  const _idx = <number>(activeIndex)

  const {visiblePanesList, activeIndex: idx} = getVisiblePaneModelsAndActiveIndex(items, _idx)
  const virtualOrderList = getVirtualOrderList(visiblePanesList, direction, idx)

  console.log('defaultMinSize ', getList(resizersList, 'defaultMinSize'))
  console.log('defaultMaxSize ', getList(resizersList, 'defaultMaxSize'))

  const nextIdx = idx + 1
  const aMaxChangeUp = virtualOrderList[idx].getMinDiff()
  const bMaxChangeUp = virtualOrderList[nextIdx].getMaxDiff()
  setPaneList(virtualOrderList, ['minSize', 'maxSize'], null)

  minMaxLogicUp(virtualOrderList, aMaxChangeUp - bMaxChangeUp, idx, nextIdx, 0, containerSize)

  // console.log('minSize ', getList(virtualOrderList, 'minSize'))
  // console.log('maxSize ', getList(virtualOrderList, 'maxSize'))
  const aMaxChangeDown = virtualOrderList[nextIdx].getMinDiff()
  const bMaxChangeDown = virtualOrderList[idx].getMaxDiff()
  minMaxLogicDown(virtualOrderList, bMaxChangeDown - aMaxChangeDown, idx, nextIdx, 0, containerSize)
  // paneConsole(virtualOrderList, 'minSize')
  // paneConsole(virtualOrderList, 'maxSize')
  console.log('minSize ', getList(virtualOrderList, 'minSize'))
  console.log('maxSize ', getList(virtualOrderList, 'maxSize'))
}

export const calculateAxes = (contextDetails: any) => {
  const {items, activeIndex} = contextDetails
  const {maxTopAxis} = getMaxContainerSizes(contextDetails)
  setResizersLimits(contextDetails)

  const {visiblePanesList, activeIndex: idx} = getVisiblePaneModelsAndActiveIndex(items, activeIndex)

  const bottomAxis = maxTopAxis + getMaxSizeSum(visiblePanesList, 0, idx)
  const topAxis = maxTopAxis + getMinSizeSum(visiblePanesList, 0, idx)

  localConsole({
    idx,
    maxTopAxis,
    bottomAxis,
    topAxis
  }, 'calculateAxes')

  contextDetails.bottomAxis = bottomAxis
  contextDetails.topAxis = topAxis
}

// eslint-disable-next-line complexity
export const minMaxLogicUp = (
  panesList: PaneModel[], value: number,
  aIndex: number, bIndex: number,
  sum = 0, maxPaneSize: number) => {
  // Failing for going up Reached Max
  const lastIndex = panesList.length - 1

  // keyConsole({aIndex, bIndex, value, sum}, 'newMinMaxLogicUpnewMinMaxLogicUp')
  let nextValue: number | undefined
  let nextAIndex = aIndex
  let nextBIndex = bIndex

  const paneA = panesList[aIndex]
  const paneB = panesList[bIndex]

  switch (true) {
    // total 6 combination
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
      // @ts-ignore
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

      // ---------------------------------------------------------------------------------
    default:
      console.error('v---------------------------------------------------------------')
      break
  }
  // paneConsole('minSize')
  // paneConsole('maxSize')
  minMaxLogicUp(panesList, <number>nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

// eslint-disable-next-line complexity
export const minMaxLogicDown = (
  panesList: PaneModel[], value: number,
  aIndex: number, bIndex: number, sum = 0,
  maxPaneSize: number) => {
  const lastIndex = panesList.length - 1
  // keyConsole({aIndex, bIndex, value, sum})
  let nextValue: number | undefined
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  const paneA = panesList[aIndex]
  const paneB = panesList[bIndex]
  switch (true) {
    // total 6 combination
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
      // @ts-ignore
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

      // ---------------------------------------------------------------------------------
    default:
      console.error('v---------------------------------------------------------------')
      break
  }

  minMaxLogicDown(panesList, <number>nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

export const getMaxContainerSizes = ({getContainerRect, vertical, panesList, resizersList} :IContextDetails) => {
  const {top, height, left, width} = getContainerRect()
  const maxTopAxis = vertical ? left : top
  const containerSize = Math.round(vertical ? width : height)
  const resizersSize = getResizerSum(resizersList)
  const maxPaneSize = containerSize - resizersSize

  // localConsole({containerSize}, 'containerSize')
  // localConsole({maxTopAxis}, 'maxTopAxis')
  // localConsole({maxPaneSize}, 'maxPaneSize')
  // localConsole({resizersSize}, 'resizersSize total')
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

// getMaxContainerSizes need to use this
// export const toRatioModeFn = (panesList: PaneModel[], resizersList: ResizerModel[], containerSize: number) => {
export const toRatioModeFn = (contextDetails: IContextDetails) => {
  const {panesList, items} = contextDetails
  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  // add for last no visible pane also
  // const resizerSum = getSum(resizersList, (resizer) => resizer.resizerSize)
  // console.log('v-- toRatioModeFn', resizerSum, containerSize, maxPaneSize)

  const maxRatioValue = getPanesSizeSum(panesList)
  panesList
    .forEach((pane: PaneModel) =>
      pane.toRatioMode(maxPaneSize, maxRatioValue)
    )

  const sizeSum = getPanesSizeSum(panesList)
  const leftOverTotalSize = maxPaneSize - sizeSum
  const changeOperation = leftOverTotalSize < 0 ? MINUS : PLUS
  change1PixelToPanes(panesList, Math.abs(leftOverTotalSize), changeOperation)

  setUISizesOfAllElement(items)
}
