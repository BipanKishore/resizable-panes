import {ISetSizeBehaviour, IResizableItem, IAddAndRemove} from '../@types'
import {
  RATIO, LEFT, RIGHT, BUTTOM_FIRST, DIRECTIONS, NONE, TOP_FIRST,
  CHANGE
} from '../constant'
import {ResizableModel} from '../models'
import {
  changePaneSize, changePaneSizePlain, restoreLimits,
  restorePaneBeforeSetSize,
  setPaneVisibility,
  storePaneForNewSetSizeKey, syncAxisSize
} from '../models/pane'
import {
  getVisibleItems, getItemsSizeSum
} from './panes'
import {getChangeInViewSize} from './resizable-pane'
import {findIndex} from './util'
import {updateSizeInRatio} from './visibility-helper'

export const setSizeTopAndBottom = (
  sizeChange: number,
  behavior: ISetSizeBehaviour,
  visibleItems: IResizableItem[],
  requestIndexInVisibleItems: number
) => {
  let firstInningItems : IResizableItem[]
  let secondInningItems: IResizableItem[]
  const getActionOnItem = (operation: IAddAndRemove, direction: number) => (item: IResizableItem) => {
    syncAxisSize(item)
    restoreLimits(item)
    sizeChange = changePaneSize(item, sizeChange, operation, direction)
  }

  const changeSizeOfFirstAndSecondInningsItems = (firstInningDirection: number, secondInningDirection: number) => {
    if (sizeChange > 0) { // Need to reduce other
      firstInningItems.forEach(getActionOnItem(CHANGE.REMOVE, firstInningDirection))
      secondInningItems.forEach(getActionOnItem(CHANGE.REMOVE, secondInningDirection))
    }

    if (sizeChange < 0) { // Need to increase other
      sizeChange = Math.abs(sizeChange)

      firstInningItems.forEach(getActionOnItem(CHANGE.ADD, firstInningDirection))
      secondInningItems.forEach(getActionOnItem(CHANGE.ADD, secondInningDirection))
    }
  }

  if (behavior === BUTTOM_FIRST) {
    firstInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
    secondInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()

    changeSizeOfFirstAndSecondInningsItems(DIRECTIONS.DOWN, DIRECTIONS.UP)
  } else if (behavior === TOP_FIRST) {
    firstInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()
    secondInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)

    changeSizeOfFirstAndSecondInningsItems(DIRECTIONS.UP, DIRECTIONS.DOWN)
  }
}

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
    panesList.forEach(restorePaneBeforeSetSize)
  } else {
    panesList.forEach(storePaneForNewSetSizeKey)
    resizable.setSizeKey = currentSetSizeKey
  }

  const initialSizeSum = getItemsSizeSum(visiblePanes)

  const pane = visiblePanes[requestIndex]
  restoreLimits(pane)
  const preSize = pane.size

  const acceptableNewSize = changePaneSizePlain(pane, newSize)
  let sizeChange = acceptableNewSize - preSize

  if (!sizeChange) {
    return
  }
  const requestIndexInVisibleItems = findIndex(visibleItems, id)

  let addOnSizeChange = 0
  let resizer: IResizableItem

  if (pane.hiddenResizer === LEFT) {
    resizer = visibleItems[requestIndexInVisibleItems - 1]
  } else if (pane.hiddenResizer === RIGHT) {
    resizer = visibleItems[requestIndexInVisibleItems + 1]
  }
  pane.hiddenResizer = NONE

  if (resizer) {
    setPaneVisibility(resizer, true, false)
    addOnSizeChange = resizer.resizerSize
    sizeChange += addOnSizeChange
  }

  if (behavior === RATIO) {
    const remainingVisiblePanes = [...visiblePanes]
    remainingVisiblePanes.splice(requestIndex, 1)

    const newMaxPaneSizeAllowd = initialSizeSum - pane.size - addOnSizeChange
    updateSizeInRatio(remainingVisiblePanes, newMaxPaneSizeAllowd, remainingVisiblePanes)
  }

  setSizeTopAndBottom(sizeChange, behavior, visibleItems, requestIndexInVisibleItems)

  if (!isSecondAttemp) {
    const changeInView = getChangeInViewSize(resizable)
    const allowedChange = newSize + changeInView
    setSizeMethod(resizable, id, allowedChange, behavior, true)
  }
}
