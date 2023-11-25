import {IContextDetails, IKeyToBoolMap, IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {getList} from './development-util'
import {getSizeByIndexes, getSum, setUISizesFn, setUISizesOfAllElement} from './panes'
import {getMaxContainerSizes} from './resizable-pane'
import {findIndex} from './util'

// Need to check for hidden element
export const restoreDefaultFn = ({panesList, resizersList}: IServiceRef) => {
  panesList.forEach((pane) => pane.restore())
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList)
}

export const visibilityOperationFn = (panesList: PaneModel[],
  sizeChange: number, sizeChangeSumResizers: number,
  paneVisibilityList: number[], maxPaneSize: number
) => {
  const ratioSum = getSizeByIndexes(panesList, paneVisibilityList)

  const nextActionList: number[] = []
  let totalRemainingSize = 0
  paneVisibilityList.forEach((i) => {
    const size = panesList[i].getSize()
    const newSize = maxPaneSize * (size / ratioSum)
    const remainingSize = panesList[i].setVisibilitySize(newSize)
    if (remainingSize === 0) {
      nextActionList.push(i)
    }
    totalRemainingSize += remainingSize
  })

  // const newSum = getSizeByIndexes(panesList, paneVisibilityList)
  // totalRemainingSize += maxPaneSize - newSum
  // console.log('After Ratio set', newSum, maxPaneSize, maxPaneSize - newSum)

  changeSizeInRatio(panesList, nextActionList, totalRemainingSize)
}

export const changeSizeInRatio = (panesList: PaneModel[], actionList: number[], sizeChange: number) => {
  if (sizeChange === 0 || actionList.length === 0) {
    return
  }
  const operationKey = sizeChange > 0 ? 'addVisibilitySize' : 'removeVisibilitySize'
  // console.log('v-- changeSizeInRatio', actionList, sizeChange, operationKey)

  const ratioSum = getSizeByIndexes(panesList, actionList)

  let totalRemainingSize = 0
  const nextActionList: number[] = []
  actionList.forEach((i) => {
    const size = panesList[i].getSize()
    const newSize = Math.abs(sizeChange * (size / ratioSum))
    const remainingSize = panesList[i][operationKey](newSize)
    if (remainingSize === 0) {
      nextActionList.push(i)
    }
    totalRemainingSize += remainingSize
    // console.log('v-- remainingSize', remainingSize)
  })

  // console.log('v--- nextActionListnextActionList', nextActionList)
  changeSizeInRatio(panesList, nextActionList, totalRemainingSize)
}

// eslint-disable-next-line complexity
export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList
  } = contextDetails

  panesList.forEach((pane) => pane.syncToOldVisibilityModel())

  // console.log('Before  ', getList(panesList, 'size'), getSum(panesList, n => n.getSize()))

  let sizeChangeSum = 0
  const paneVisibilityList: number[] = []

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id])
    const index = findIndex(panesList, id)

    if (visibility) {
      paneVisibilityList.push(index)
    }

    const sizeChange = pane.setVisibilityNew(visibility)
    sizeChangeSum += sizeChange
  }

  let sizeChangeSumResizers = 0

  const lastVisibleIndex = [...paneVisibilityList].pop()

  for (let i = 0; i < panesList.length; i++) {
    if (i === lastVisibleIndex) {
      continue
    }
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id])
    const index = findIndex(panesList, id)

    sizeChangeSumResizers += resizersList[index].setVisibilityNew(visibility)
  }

  if (lastVisibleIndex !== undefined && resizersList[lastVisibleIndex].visibility) {
    sizeChangeSumResizers += resizersList[lastVisibleIndex].setVisibilityNew(false)
  }

  const {containerSize, resizersSize} = getMaxContainerSizes(contextDetails)
  const maxPaneSize = containerSize - resizersSize

  // console.log('v-- maxPaneSize', maxPaneSize, resizersSize)

  visibilityOperationFn(panesList, sizeChangeSum, sizeChangeSumResizers, paneVisibilityList, maxPaneSize)

  setUISizesOfAllElement(panesList, resizersList)
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) => {
  for (const resizer of resizersList) {
    resizer.setVisibilityNew(visibility)
  }
}
