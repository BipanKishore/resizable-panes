import {IContextDetails, IKeyToBoolMap, IResizableItem} from '../@types'
import {DIRECTIONS, MINUS, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {getList} from './development-util'
import {
  attachResizersToPaneModels,
  change1PixelToPanes, getPanesSizeSum,
  getSizeByIndexes, setUISizesFn
} from './panes'
import {getMaxContainerSizes} from './resizable-pane'
import {findIndex, getResizerId, isItDown, isItUp} from './util'

// Need to check for hidden element
export const restoreDefaultFn = ({panesList, resizersList}: any) => {
  panesList.forEach((pane: PaneModel) => pane.restore())
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList, DIRECTIONS.DOWN)
}

export const visibilityOperationFn = (
  panesList: PaneModel[],
  actionList: number[],
  maxPaneSize: number
) => {
  const currentPanesSize = getPanesSizeSum(panesList)
  const sizeChange = maxPaneSize - currentPanesSize

  if (sizeChange === 0 || actionList.length === 0) {
    return
  }

  changeSizeInRatio(panesList, actionList, sizeChange, maxPaneSize)
}

// eslint-disable-next-line max-len
export const changeSizeInRatio = (panesList: PaneModel[], actionList: number[], sizeChange: number, maxPaneSize: number) => {
  const operation = sizeChange > 0 ? PLUS : MINUS

  const sizeChangeAbsolute = Math.abs(sizeChange)

  if (sizeChangeAbsolute <= actionList.length) {
    change1PixelToPanes(panesList, sizeChangeAbsolute, operation)
    return
  }

  const ratioSum = getSizeByIndexes(panesList, actionList)

  const nextActionList: number[] = []
  actionList.forEach((i) => {
    const size = panesList[i].getSize()
    const newSize = Math.round(sizeChangeAbsolute * (size / ratioSum))

    const remainingSize = panesList[i].setVisibilitySize(newSize, operation)
    if (remainingSize === 0) {
      nextActionList.push(i)
    }
  })

  visibilityOperationFn(panesList, nextActionList, maxPaneSize)
}

export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList, items
  } = contextDetails

  const paneVisibilityList: number[] = []

  panesList.forEach((pane, i) => {
    pane.syncToOldVisibilityModel()
    const {id} = pane
    const visibility = idMap[id]
    if (visibility) {
      paneVisibilityList.push(i)
    }
    pane.setVisibility(visibility)
  })

  const lastVisibleIndex = [...paneVisibilityList].pop()
  // attachResizersToPaneModels(contextDetails)

  // console.log('attachedResizer ', getList(panesList, 'attachedResizer'))

  const attachedResizerList = getList(panesList, 'attachedResizer').filter(i => i)

  hideResizers(contextDetails)
  // console.log('attachedResizer ', getList(panesList, 'attachedResizer'))

  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  visibilityOperationFn(panesList, paneVisibilityList, maxPaneSize)

  setUISizesFn(items, DIRECTIONS.NONE)
}

export const findLeftVisibleAdjasentResizer = (items: IResizableItem[], id: string) => {
  const itemIndex = findIndex(items, id)

  const RIGHT = 1
  const LEFT = 2

  const find = (index: number, direction: number): any => {
    const resizer = items[index + (direction === RIGHT ? 1 : -1)] as ResizerModel
    if (resizer) {
      if (resizer.visibility) {
        return resizer
      } else {
        return find(index + (direction === RIGHT ? 2 : -2), direction)
      }
    }
  }

  const leftResizer = find(itemIndex, LEFT)
  const rightResizer = find(itemIndex, RIGHT)
  return {
    leftResizer,
    rightResizer
  }
}

// eslint-disable-next-line complexity
const hideSingleResizer = (contextDetails: IContextDetails, index: number, completeVisibilityList: any[]) => {
  const {items} = contextDetails

  const preIndex = index - 1
  const nextIndex = index + 1

  const preResizer = items[preIndex] as ResizerModel
  const nextResizer = items[nextIndex] as ResizerModel

  switch (true) {
    case Boolean(preResizer) && Boolean(nextResizer):

      switch (true) {
        case isItUp(preResizer.partialHiddenDirection):
          completeVisibilityList[preIndex] = {visibility: false}
          completeVisibilityList[nextIndex] = {visibility: true}
          break
        case isItDown(nextResizer.partialHiddenDirection):
          completeVisibilityList[preIndex] = {visibility: true}
          completeVisibilityList[nextIndex] = {visibility: false}
          break
        default:
          completeVisibilityList[preIndex] = {visibility: true}
          completeVisibilityList[nextIndex] = {visibility: false}
      }

      break
    case Boolean(preResizer): // For Last two panes
      completeVisibilityList[preIndex] = {visibility: false}
      break
    case Boolean(nextResizer): // For first two panes
      completeVisibilityList[nextIndex] = {visibility: false}
      break
  }
}

// eslint-disable-next-line complexity
const showSingleResizer = (contextDetails: IContextDetails, index: number, completeVisibilityList: any[]) => {
  const {items} = contextDetails

  const preIndex = index - 1
  const nextIndex = index + 1

  const preResizer = items[preIndex] as ResizerModel
  const nextResizer = items[nextIndex] as ResizerModel

  switch (true) {
    case Boolean(preResizer) && Boolean(nextResizer):

      switch (true) {
        case isItUp(preResizer.partialHiddenDirection):
          completeVisibilityList[preIndex] = {visibility: true}
          // completeVisibilityList[nextIndex] = {visibility: false}
          break
        case isItDown(nextResizer.partialHiddenDirection):
          // completeVisibilityList[preIndex] = {visibility: false}
          completeVisibilityList[nextIndex] = {visibility: true}
          break
        default:
          // completeVisibilityList[preIndex] = {visibility: false}
          completeVisibilityList[nextIndex] = {visibility: true}
      }

      break
    case Boolean(preResizer): // For Last two panes
      completeVisibilityList[preIndex] = {visibility: true}
      break
    case Boolean(nextResizer): // For first two panes
      completeVisibilityList[nextIndex] = {visibility: true}
      break
  }
}

const hideResizers = (contextDetails: IContextDetails) => {
  const {items} = contextDetails

  const completeVisibilityList : any[] = []

  for (let i = 0; i < items.length; i += 2) {
    const {visibility, id} = items[i]
    completeVisibilityList[i] = {visibility, id}

    if (visibility) {
      showSingleResizer(contextDetails, i, completeVisibilityList)
    } else {
      hideSingleResizer(contextDetails, i, completeVisibilityList)
    }
  }

  console.log(
    'completeVisibilityList', completeVisibilityList
  )
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) =>
  resizersList.forEach(resizer => resizer.setVisibility(visibility))
