import {IContextDetails, IResizableEvent, IResizableItem} from '../@types'
import {DIRECTIONS, MINUS, MINUS_ONE, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {getList, localConsole, setPaneList} from './development-util'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getPanesSizeSum, getResizerSum, setResizersLimits, setUISizesFn, synPanesMaxToSize, synPanesMinToSize
} from './panes'
import {findIndex, isItUp} from './util'

const reverse = <T>(list: T[]): T[] => [...list].reverse()
const filterEmpty = (list: any[]) => list.filter(_ => _)

export const goingDownLogic = (e: IResizableEvent, {
  axisCoordinate,
  decreasingItems,
  increasingItems
}: IContextDetails) => {
  let sizeChange = e.mouseCoordinate - <number>axisCoordinate
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }

  let sizeChangeUp = sizeChange

  decreasingItems.forEach(item => {
    sizeChange = item.changeSize(sizeChange, MINUS)
  })

  sizeChangeUp -= sizeChange

  reverse(increasingItems).forEach(item => {
    sizeChangeUp = item.changeSize(sizeChangeUp, PLUS)
  })

  // ---------

  // for (let i = idx + 1; i > MINUS_ONE; i--) {
  //   sizeChangeUp = virtualOrderList[i].changeSize(sizeChangeUp, PLUS)
  // }

  // sizeChange -= sizeChangeUp

  // for (let i = idx + 2; i < virtualOrderList.length; i += 1) {
  //   sizeChange = virtualOrderList[i].changeSize(sizeChange, MINUS)
  // }
}

export const goingUpLogic = (e: IResizableEvent, {
  axisCoordinate,
  decreasingItems,
  increasingItems
}: IContextDetails) => {
  let sizeChange = axisCoordinate - e.mouseCoordinate
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  } else if (sizeChange === 0) {
    return
  }

  let sizeChangeUp = sizeChange

  reverse(decreasingItems).forEach(item => {
    sizeChange = item.changeSize(sizeChange, MINUS)
  })

  sizeChangeUp -= sizeChange

  increasingItems.forEach(item => {
    sizeChangeUp = item.changeSize(sizeChangeUp, PLUS)
  })

  // console.log('goingUpLogic', idx, getList(virtualOrderList, 'id'))
  // for (let i = idx + 2; i < virtualOrderList.length; i += 1) {
  //   sizeChangeUp = virtualOrderList[i].changeSize(sizeChangeUp, PLUS)
  // }

  // sizeChange -= sizeChangeUp

  // for (let i = idx; i > MINUS_ONE; i -= 1) {
  //   sizeChange = virtualOrderList[i].changeSize(sizeChange, MINUS)
  // }
}

const removeHidden = (list: IResizableItem[]) => list.filter(item => item.visibility)

// eslint-disable-next-line complexity
export const setVirtualOrderList = (serviceRefCurrent: IContextDetails | any) => {
  const {items, direction, handleId} = serviceRefCurrent

  const visibleItems = removeHidden(items)
  const visibleActiveIndex = findIndex(visibleItems, handleId)
  // console.log('visibleItems', getList(visibleItems, 'id'))

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
      if (pane.size) {
        increasingItems[i] = pane
        increasingItems[i + 1] = visibleItems[i + 1]
      } else {
        increasingItems[i] = visibleItems[i + 1]
        increasingItems[i + 1] = pane
      }
    }

    virtualOrderList = [...decreasingItems, ...increasingItems]
    console.log('UP <<<<<<<<<<<<<<<<<<<<<<<<<<')
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
    console.log('Down >>>>>>>>>>>>>>>>>>>>>')
  }

  serviceRefCurrent.virtualOrderList = removeHidden(filterEmpty(virtualOrderList))
  serviceRefCurrent.increasingItems = removeHidden(filterEmpty(increasingItems))
  serviceRefCurrent.decreasingItems = removeHidden(filterEmpty(decreasingItems))

  serviceRefCurrent.virtualActiveIndex = findIndex(serviceRefCurrent.virtualOrderList, handleId)

  console.log(
    'visibleActiveIndex', visibleActiveIndex,
    serviceRefCurrent.virtualActiveIndex
  )

  console.log('increasingItems', getList((serviceRefCurrent.increasingItems), 'id'))
  console.log('decreasingItems', getList(serviceRefCurrent.decreasingItems, 'id'))
  console.log('virtualOrderList', getList(serviceRefCurrent.virtualOrderList, 'id'))
}

export const setCurrentMinMax = (serviceRefCurrent: IContextDetails) => {
  // const {panesList, resizersList, activeIndex, items, direction} = serviceRefCurrent
  const {containerSize} = getMaxContainerSizes(serviceRefCurrent)

  const {virtualOrderList, virtualActiveIndex} = serviceRefCurrent

  const nextIdx = virtualActiveIndex + 1
  const aMaxChangeUp = virtualOrderList[virtualActiveIndex].getMinDiff()
  const bMaxChangeUp = virtualOrderList[nextIdx].getMaxDiff()
  setPaneList(virtualOrderList, ['minSize', 'maxSize'], null)

  minMaxLogicUp(virtualOrderList, aMaxChangeUp - bMaxChangeUp, virtualActiveIndex, nextIdx, 0, containerSize)

  const aMaxChangeDown = virtualOrderList[nextIdx].getMinDiff()
  const bMaxChangeDown = virtualOrderList[virtualActiveIndex].getMaxDiff()
  minMaxLogicDown(virtualOrderList, bMaxChangeDown - aMaxChangeDown, virtualActiveIndex, nextIdx, 0, containerSize)

  console.log('items ', getList(virtualOrderList, 'id'))
  console.log('minSize ', getList(virtualOrderList, 'minSize'))
  console.log('maxSize ', getList(virtualOrderList, 'maxSize'))
}
// virtualActiveIndex
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

  setUISizesFn(items, DIRECTIONS.DOWN)
}
