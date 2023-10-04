import {IServiceRef} from '../@types'
import {MINUS, MINUS_ONE, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {setPaneList} from './development-util'
import {
  change1PixelToPanes, getMaxSizeSum, getMinSizeSum,
  getPanesSizeSum, getResizerSum, setUISizesFn, synPanesMaxToSize, synPanesMinToSize
} from './panes'

interface IGoingLogic {
  axisCoordinate: number,
  panesList: PaneModel[],
  activeIndex: number
}

export const goingDownLogic = (e: any, {axisCoordinate, panesList, activeIndex}: IGoingLogic) => {
  let sizeChange = e.mouseCoordinate - <number>axisCoordinate
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  }

  let sizeChangeUp = sizeChange

  for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
    sizeChangeUp = panesList[i].addSize(sizeChangeUp)
  }

  sizeChange -= sizeChangeUp

  for (let i = activeIndex + 1; i < panesList.length; i += 1) {
    sizeChange = panesList[i].removeSize(sizeChange)
  }
}

export const goingUpLogic = (e: any, {axisCoordinate, panesList, activeIndex}: IGoingLogic) => {
  let sizeChange = axisCoordinate - e.mouseCoordinate
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  }
  let sizeChangeUp = sizeChange

  for (let i = activeIndex + 1; i < panesList.length; i++) {
    sizeChangeUp = panesList[i].addSize(sizeChangeUp)
  }

  sizeChange -= sizeChangeUp

  for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
    sizeChange = panesList[i].removeSize(sizeChange)
  }
}

export const setCurrentMinMax = (serviceRefCurrent: IServiceRef, index?: number) => {
  const {panesList, activeIndex} = serviceRefCurrent
  const {maxPaneSize} = getMaxContainerSizes(serviceRefCurrent)
  const idx = <number>(index || activeIndex)
  const nextIdx = idx + 1
  const aMaxChangeUp = panesList[idx].getMinDiff()
  const bMaxChangeUp = panesList[nextIdx].getMaxDiff()

  setPaneList(panesList, ['minSize', 'maxSize'], null)

  minMaxLogicUp(panesList, aMaxChangeUp - bMaxChangeUp, idx, nextIdx, 0, maxPaneSize)

  // localConsole(getList(panesList, 'minSize'), 'minSize')
  // localConsole(getList(panesList, 'maxSize'), 'maxSize')
  // setPaneList(panesList, ['minSize', 'maxSize'], null)
  const aMaxChangeDown = panesList[nextIdx].getMinDiff()
  const bMaxChangeDown = panesList[idx].getMaxDiff()
  minMaxLogicDown(panesList, bMaxChangeDown - aMaxChangeDown, idx, nextIdx, 0, maxPaneSize)
  // paneConsole(panesList, 'minSize')
  // paneConsole(panesList, 'maxSize')
  // console.log('minSize ', getList(panesList, 'minSize'))
  // console.log('maxSize ', getList(panesList, 'maxSize'))
}

export const calculateAxes = (serviceRefCurrent: any) => {
  const {panesList, resizersList, activeIndex} = serviceRefCurrent

  const {maxTopAxis} = getMaxContainerSizes(serviceRefCurrent)
  const idx = activeIndex

  const resizerSizeHalf = Math.floor(resizersList[idx].getSize() / 2)
  const resizerAddon = getResizerSum(resizersList, 0, idx - 1) + resizerSizeHalf

  const bottomAxis = maxTopAxis + getMaxSizeSum(panesList, 0, idx) + resizerAddon
  const topAxis = maxTopAxis + getMinSizeSum(panesList, 0, idx) + resizerAddon
  // localConsole({
  //   resizerAddon,
  //   bottomAxis,
  //   topAxis
  // }, 'calculateAxes')
  return {
    bottomAxis,
    topAxis
  }
}

// eslint-disable-next-line complexity
export const minMaxLogicUp = (
  panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum = 0, maxPaneSize: number) => {
  // Failing for going up Reached Max
  const lastIndex = panesList.length - 1

  // keyConsole({aIndex, bIndex, value, sum}, 'newMinMaxLogicUpnewMinMaxLogicUp')
  let nextValue: number | undefined
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  switch (true) {
    // total 6 combination
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMinDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = panesList[nextAIndex].getMinDiff() - panesList[nextBIndex].getMaxDiff()
          break

        case value > 0:
          sum += panesList[bIndex].resetMax()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMaxDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          panesList[bIndex].maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += panesList[bIndex].resetMax()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMaxDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMinDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += panesList[bIndex].resetMax()
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          panesList[aIndex].minSize = maxPaneSize - sum
          return
      }
      break
      // ---------------------------------------------------------------------------------
      // @ts-ignore
    case aIndex === 0 && bIndex === lastIndex:
      // return for every case
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          panesList[bIndex].maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          return

        case value > 0:
          sum += panesList[bIndex].resetMax()
          // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
          panesList[aIndex].minSize = maxPaneSize - sum
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
  panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum = 0, maxPaneSize: number) => {
  const lastIndex = panesList.length - 1
  // keyConsole({aIndex, bIndex, value, sum})
  let nextValue: number | undefined
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  switch (true) {
    // total 6 combination
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMaxDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMax()
          sum += panesList[bIndex].resetMin()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = panesList[nextAIndex].getMaxDiff() - panesList[nextBIndex].getMinDiff()
          break

        case value > 0:
          sum += panesList[bIndex].resetMin()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMinDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          panesList[bIndex].minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[aIndex].resetMax()
          sum += panesList[bIndex].resetMin()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += panesList[bIndex].resetMin()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMinDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMaxDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMax()
          sum += panesList[bIndex].resetMin()
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += panesList[bIndex].resetMin()
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          panesList[aIndex].maxSize = maxPaneSize - sum
          return
      }
      break
      // ---------------------------------------------------------------------------------
      // @ts-ignore
    case aIndex === 0 && bIndex === lastIndex:
      // return for every case
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          panesList[bIndex].minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[bIndex].resetMin()
          sum += panesList[aIndex].resetMax()
          return

        case value > 0:
          sum += panesList[bIndex].resetMin()
          // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
          panesList[aIndex].maxSize = maxPaneSize - sum
          return
      }

      // ---------------------------------------------------------------------------------
    default:
      console.error('v---------------------------------------------------------------')
      break
  }

  minMaxLogicDown(panesList, <number>nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

export const visibilityOperation = (index: number, panesList: PaneModel[],
  sizeChange: number, visibility: boolean) => {
  const operationKey = visibility ? 'removeVisibilitySize' : 'addVisibilitySize'

  for (let i = index - 1; i > MINUS_ONE; i--) {
    sizeChange = panesList[i][operationKey](sizeChange)
  }

  for (let i = index + 1; i < panesList.length; i++) {
    sizeChange = panesList[i][operationKey](sizeChange)
  }
}

export const visibilityOperationHideResizer = (index: number, panesList: PaneModel[],
  sizeChange: number, visibility: boolean) => {
  const operationKey = visibility ? 'removeVisibilitySize' : 'addVisibilitySize'

  for (let i = index; i > MINUS_ONE; i--) {
    sizeChange = panesList[i][operationKey](sizeChange)
  }

  for (let i = index + 1; i < panesList.length; i++) {
    sizeChange = panesList[i][operationKey](sizeChange)
  }
}

export const getMaxContainerSizes = ({getContainerRect, vertical, panesList, resizersList} :any) => {
  const {top, height, left, width} = getContainerRect()
  const maxTopAxis = vertical ? left : top
  const maxPaneSize = (vertical ? width : height) - getResizerSum(resizersList, 0, panesList.length - 2)

  return {
    maxTopAxis,
    maxPaneSize
  }
}

export const registerContainer = (context: any) => (node: any) => {
  context.registerContainer({getContainerRect: () => node.getBoundingClientRect()})
}

export const toRatioModeFn = (panesList: PaneModel[], resizersList: ResizerModel[], containerSize: number) => {
  const maxRatioValue = getPanesSizeSum(panesList, 0, panesList.length - 1)
  panesList
    .forEach((pane: PaneModel) => {
      pane.toRatioMode(containerSize, maxRatioValue)
    })

  const sizeSum = getPanesSizeSum(panesList, 0, panesList.length - 1)
  const leftOverTotalSize = containerSize - sizeSum
  const changeOperation = leftOverTotalSize < 0 ? MINUS : PLUS
  change1PixelToPanes(panesList, Math.abs(leftOverTotalSize), changeOperation)
  setUISizesFn(panesList)
}
