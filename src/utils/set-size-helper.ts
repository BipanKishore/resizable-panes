import {ISetSizeBehaviour, IResizableItem, addAndRemoveType} from '../@types'
import {RATIO, LEFT, RIGHT, BUTTOM_FIRST, MINUS, DIRECTIONS, NONE, PLUS, TOP_FIRST} from '../constant'
import {ResizableModel} from '../models'
import {consoleIds} from './development-util'
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

  if (resizable.setSizeKey === id) {
    panesList.forEach((pane) => pane.restoreBeforeSetSize())
  } else {
    panesList.forEach((pane) => pane.storeForNewSetSizeKey())
    resizable.setSizeKey = id
  }

  const initialSizeSum = getPanesSizeSum(visiblePanes)

  const pane = visiblePanes[requestIndex]
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
  }

  let allowedChange: number
  let sizeChange: number
  pane.restoreLimits()
  const preSize = pane.size
  pane.changeSizeAndReturnRemaing(newSize)
  const acceptableNewSize = pane.size

  const getActionOnItem = (operation: addAndRemoveType, direction: number) => (item: IResizableItem) => {
    item.syncAxisSize()
    item.restoreLimits()
    sizeChange = item.changeSize(sizeChange, operation, direction)
  }

  if (behavior === RATIO) {
    console.log('RATIORATIORATIORATIORATIORATIORATIORATIORATIORATIORATIORATIO')

    const remainingVisiblePanes = [...visiblePanes]
    remainingVisiblePanes.splice(requestIndex, 1)

    const newMaxPaneSizeAllowd = initialSizeSum - pane.size - addOnSizeChange
    setSizesAfterVisibilityChange(remainingVisiblePanes, newMaxPaneSizeAllowd)

    const nowSizeSum = getPanesSizeSum(visiblePanes)
    allowedChange = newSize - (nowSizeSum - initialSizeSum + addOnSizeChange)
  } else if (behavior === BUTTOM_FIRST) {
    sizeChange = pane.size - preSize

    const firstInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
    const secondInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()

    if (sizeChange > 0) { // Need to reduce other
      firstInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.DOWN))
      secondInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.UP))

      const changeInView = getChangeInViewSize(resizable)
      allowedChange = newSize + changeInView - addOnSizeChange
    }
    if (sizeChange < 0) { // Need to increase other
      sizeChange = Math.abs(sizeChange)

      firstInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.DOWN))
      secondInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.UP))

      const changeInView = getChangeInViewSize(resizable)
      allowedChange = acceptableNewSize + changeInView
    }
  } else if (behavior === TOP_FIRST) {
    sizeChange = acceptableNewSize - preSize
    const secondInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
    const firstInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()

    if (sizeChange > 0) { // Need to reduce other
      firstInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.UP))
      secondInningItems.forEach(getActionOnItem(MINUS, DIRECTIONS.DOWN))

      const changeInView = getChangeInViewSize(resizable)
      allowedChange = newSize + changeInView - addOnSizeChange
    }

    if (sizeChange < 0) { // Need to increase other
      sizeChange = Math.abs(sizeChange)

      firstInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.UP))
      secondInningItems.forEach(getActionOnItem(PLUS, DIRECTIONS.DOWN))

      const changeInView = getChangeInViewSize(resizable)
      allowedChange = acceptableNewSize + changeInView
    }
  }

  if (!isSecondAttemp) {
    setSizeMethod(resizable, id, allowedChange, behavior, true)
  }

  pane.hiddenResizer = NONE
}
