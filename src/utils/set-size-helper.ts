import {ISetSizeBehaviour, IResizableItem, addAndRemoveType} from '../@types'
import {
  RATIO, LEFT, RIGHT, BUTTOM_FIRST,
  MINUS, DIRECTIONS, NONE, PLUS, TOP_FIRST
} from '../constant'
import {ResizableModel} from '../models'
import {
  getVisibleItems, getPanesSizeSum
} from './panes'
import {getChangeInViewSize} from './resizable-pane'
import {findIndex} from './util'
import {setSizesAfterVisibilityChange} from './visibility-helper'

// eslint-disable-next-line complexity
export const setSizeMethod = (resizable: ResizableModel, id: string, newSize: number,
  behavior: ISetSizeBehaviour = RATIO, isSecondAttemp = false) => {
  const {panesList, items} = resizable

  const visiblePanes = getVisibleItems(panesList)
  const visibleItems = getVisibleItems(items)

  const requestIndex = findIndex(visiblePanes, id)
  if (requestIndex === -1 || newSize < 1) {
    return
  }

  const currentSetSizeKey = `${id}-${behavior}`
  if (resizable.setSizeKey === currentSetSizeKey) {
    panesList.forEach((pane) => pane.restoreBeforeSetSize())
  } else {
    panesList.forEach((pane) => pane.storeForNewSetSizeKey())
    resizable.setSizeKey = currentSetSizeKey
  }

  const initialSizeSum = getPanesSizeSum(visiblePanes)

  const pane = visiblePanes[requestIndex]
  pane.restoreLimits()
  const preSize = pane.size
  pane.changeSizeAndReturnRemaing(newSize)

  const acceptableNewSize = pane.size
  let allowedChange: number // Task it has only two condition, It (can be calc) smaller or greater than container Size
  let sizeChange = acceptableNewSize - preSize

  if (!sizeChange) {
    return
  }
  const requestIndexInVisibleItems = findIndex(visibleItems, id)

  let addOnSizeChange = 0
  let resizer: IResizableItem
  // setting hiddenResizer state to NONE in final State
  if (pane.hiddenResizer === LEFT) {
    resizer = visibleItems[requestIndexInVisibleItems - 1]
  } else if (pane.hiddenResizer === RIGHT) {
    resizer = visibleItems[requestIndexInVisibleItems + 1]
  }

  if (resizer) {
    resizer.setVisibility(true, false)
    addOnSizeChange = resizer.resizerSize
    sizeChange += addOnSizeChange
  }
  pane.hiddenResizer = NONE

  const getActionOnItem = (operation: addAndRemoveType, direction: number) => (item: IResizableItem) => {
    item.syncAxisSize()
    item.restoreLimits()
    sizeChange = item.changeSize(sizeChange, operation, direction)
  }

  if (behavior === RATIO) {
    const remainingVisiblePanes = [...visiblePanes]
    remainingVisiblePanes.splice(requestIndex, 1)

    const newMaxPaneSizeAllowd = initialSizeSum - pane.size - addOnSizeChange
    setSizesAfterVisibilityChange(remainingVisiblePanes, newMaxPaneSizeAllowd)

    const nowSizeSum = getPanesSizeSum(visiblePanes)
    allowedChange = newSize - (nowSizeSum - initialSizeSum + addOnSizeChange)
  } else if (behavior === BUTTOM_FIRST) {
    const firstInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
    const secondInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()

    if (sizeChange > 0) { // Need to reduce other
      firstInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.DOWN))
      secondInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.UP))
    }
    if (sizeChange < 0) { // Need to increase other
      sizeChange = Math.abs(sizeChange)

      firstInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.DOWN))
      secondInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.UP))
    }
  } else if (behavior === TOP_FIRST) {
    const firstInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()
    const secondInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)

    if (sizeChange > 0) { // Need to reduce other
      firstInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.UP))
      secondInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.DOWN))
    }

    if (sizeChange < 0) { // Need to increase other
      sizeChange = Math.abs(sizeChange)

      firstInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.UP))
      secondInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.DOWN))
    }
  }
  const changeInView = getChangeInViewSize(resizable)
  allowedChange = newSize + changeInView
  if (!isSecondAttemp) {
    setSizeMethod(resizable, id, allowedChange, behavior, true)
  }
}
