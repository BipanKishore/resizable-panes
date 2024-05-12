import {ISetSizeBehaviour, IResizableItem} from '../@types'
import {
  RATIO, BUTTOM_FIRST, TOP_FIRST,
  CHANGE
} from '../constant'
import {ResizableModel} from '../models'
import {
  changePaneSize, changePaneSizePlain, restoreLimits,
  restorePaneBeforeSetSize,
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
  const getActionOnItem = (operation: number) => (item: IResizableItem) => {
    syncAxisSize(item)
    restoreLimits(item)
    sizeChange = changePaneSize(item, sizeChange, operation)
  }

  const changeSizeOfFirstAndSecondInningsItems = () => {
    const orderList = [...firstInningItems, ...secondInningItems]
    let action = CHANGE.REMOVE

    if (sizeChange < 0) {
      sizeChange = Math.abs(sizeChange)
      action = CHANGE.ADD
    }
    orderList.forEach(getActionOnItem(action))
  }

  if (behavior === BUTTOM_FIRST) {
    firstInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
    secondInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()
    changeSizeOfFirstAndSecondInningsItems()
  } else if (behavior === TOP_FIRST) {
    firstInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()
    secondInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
    changeSizeOfFirstAndSecondInningsItems()
  }
}

// eslint-disable-next-line complexity
export const setSizeMethod = (
  resizable: ResizableModel, id: string, newSize: number,
  behavior: ISetSizeBehaviour = RATIO, isSecondAttemp = false) => {
  const {panesList, items} = resizable

  const visiblePanes = getVisibleItems(panesList)
  const visibleItems = getVisibleItems(items)

  const requestIndex = findIndex(visiblePanes, id)
  if (requestIndex === -1 || newSize < 0) {
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
  const sizeChange = acceptableNewSize - preSize

  if (!sizeChange) {
    return
  }
  const requestIndexInVisibleItems = findIndex(visibleItems, id)

  if (behavior === RATIO) {
    const remainingVisiblePanes = [...visiblePanes]
    remainingVisiblePanes.splice(requestIndex, 1)

    const newMaxPaneSizeAllowd = initialSizeSum - pane.size
    updateSizeInRatio(remainingVisiblePanes, newMaxPaneSizeAllowd, remainingVisiblePanes)
  }

  setSizeTopAndBottom(sizeChange, behavior, visibleItems, requestIndexInVisibleItems)

  if (!isSecondAttemp) {
    const changeInView = getChangeInViewSize(resizable)
    const allowedChange = acceptableNewSize + changeInView
    setSizeMethod(resizable, id, allowedChange, behavior, true)
  }
}
