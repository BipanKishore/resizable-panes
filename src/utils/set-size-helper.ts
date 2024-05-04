import {ISetSizeBehaviour, IResizableItem} from '../@types'
import {RATIO, LEFT, RIGHT, BUTTOM_FIRST, MINUS, DIRECTIONS, NONE, PLUS, TOP_FIRST} from '../constant'
import {ResizableModel} from '../models'
import {consoleIds, consoleGetSize} from './development-util'
import {
  getVisibleItems, getPanesSizeSum, setUISizesFn,
  safeSetVisibility
} from './panes'
import {getChangeInViewSize} from './resizable-pane'
import {findIndex} from './util'
import {setSizesAfterVisibilityChange} from './visibility-helper'

// eslint-disable-next-line complexity
export const setSizeMethod = (resizable: ResizableModel,
  id: string, newSize: number, behavior: ISetSizeBehaviour = RATIO, isSecondAttemp = false) => {
  const {panesList, items} = resizable

  if (!resizable.setSizeKey) {
    panesList.forEach((pane) => pane.storeForNewSetSizeKey())
  }

  if (resizable.setSizeKey === id) {
    panesList.forEach((pane) => pane.restoreBeforeSetSize())
  }

  resizable.setSizeKey = id

  const visiblePanes = getVisibleItems(panesList)
  const visibleItems = getVisibleItems(items)

  const requestIndex = findIndex(visiblePanes, id)

  if (requestIndex === -1 || newSize < 1) {
    return
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

  pane.restoreLimits()
  if (behavior === RATIO) {
    console.log('RATIORATIORATIORATIORATIORATIORATIORATIORATIORATIORATIORATIO')
    pane.setSizeNIsLimitReached(newSize)

    const remainingVisiblePanes = [...visiblePanes]
    remainingVisiblePanes.splice(requestIndex, 1)

    const newMaxPaneSizeAllowd = initialSizeSum - pane.size - addOnSizeChange
    setSizesAfterVisibilityChange(remainingVisiblePanes, newMaxPaneSizeAllowd)

    const nowSizeSum = getPanesSizeSum(visiblePanes)

    if (initialSizeSum === nowSizeSum + addOnSizeChange) {
      pane.hiddenResizer = NONE
      setUISizesFn(items, DIRECTIONS.NONE)
      consoleGetSize(items)
    } else {
      visibleItems.forEach((item) => item.setPreSize())
      safeSetVisibility(resizer, true, true)
      if (!isSecondAttemp) {
        const allowedChange = newSize - (nowSizeSum - initialSizeSum + addOnSizeChange)
        setSizeMethod(resizable, id, allowedChange, behavior)
      }
    }
  } else if (behavior === BUTTOM_FIRST) {
    console.log('BUTTOM_FIRSTBUTTOM_FIRSTBUTTOM_FIRSTBUTTOM_FIRSTBUTTOM_FIRST')
    const preSize = pane.size
    pane.changeSizeAndReturnRemaing(newSize)
    const acceptableNewSize = pane.size
    let sizeChange = pane.size - preSize
    if (sizeChange > 0) { // Need to reduce other
      const virtualOrderedItems = visibleItems.slice(requestIndexInVisibleItems + 2)
      const remainingVirtualOrderedItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()

      consoleIds(virtualOrderedItems)
      consoleIds(remainingVirtualOrderedItems)

      virtualOrderedItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, MINUS, DIRECTIONS.DOWN)
      })

      remainingVirtualOrderedItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, MINUS, DIRECTIONS.UP)
      })

      const changeInView = getChangeInViewSize(resizable)

      if (changeInView !== 0) {
        visibleItems.forEach((item) => item.setPreSize())
        safeSetVisibility(resizer, true, true)

        if (!isSecondAttemp) {
          const allowedChange = newSize + changeInView - addOnSizeChange
          console.log('newSize', newSize, 'changeInView', changeInView, addOnSizeChange)
          setSizeMethod(resizable, id, allowedChange, behavior, true)
        }
      }
    }
    if (sizeChange < 0) { // Need to increase other
      const virtualOrderedItems = visibleItems.slice(requestIndexInVisibleItems + 2)
      const remainingVirtualOrderedItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()
      sizeChange = Math.abs(sizeChange)

      consoleIds(virtualOrderedItems)
      consoleIds(remainingVirtualOrderedItems)

      virtualOrderedItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, PLUS, DIRECTIONS.DOWN)
      })

      remainingVirtualOrderedItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, PLUS, DIRECTIONS.UP)
      })

      const changeInView = getChangeInViewSize(resizable)

      if (changeInView !== 0) {
        visibleItems.forEach((item) => item.setPreSize())
        safeSetVisibility(resizer, true, true)

        if (!isSecondAttemp) {
          const allowedChange = acceptableNewSize + changeInView
          console.log('newSize', newSize, 'changeInView', changeInView, addOnSizeChange)
          setSizeMethod(resizable, id, allowedChange, behavior, true)
        }
      }
    }

    setUISizesFn(items, DIRECTIONS.NONE)
    consoleGetSize(items)
  } else if (behavior === TOP_FIRST) {
    console.log('TOP_FIRSTTOP_FIRSTTOP_FIRSTTOP_FIRSTTOP_FIRSTTOP_FIRST')
    const preSize = pane.size
    pane.changeSizeAndReturnRemaing(newSize)
    const acceptableNewSize = pane.size
    let sizeChange = acceptableNewSize - preSize

    if (sizeChange > 0) { // Need to reduce other
      const secondInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
      const firstInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()

      consoleIds(secondInningItems)
      consoleIds(firstInningItems)

      firstInningItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, MINUS, DIRECTIONS.UP)
      })

      secondInningItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, MINUS, DIRECTIONS.DOWN)
      })

      const changeInView = getChangeInViewSize(resizable)

      if (changeInView !== 0) {
        visibleItems.forEach((item) => item.setPreSize())
        safeSetVisibility(resizer, true, true)

        if (!isSecondAttemp) {
          const allowedChange = newSize + changeInView - addOnSizeChange
          console.log('newSize', newSize, 'changeInView', changeInView, addOnSizeChange)
          setSizeMethod(resizable, id, allowedChange, behavior, true)
        }
      }
    }

    if (sizeChange < 0) { // Need to increase other
      const secondInningItems = visibleItems.slice(requestIndexInVisibleItems + 2)
      const firstInningItems = visibleItems.slice(0, requestIndexInVisibleItems - 1).reverse()
      sizeChange = Math.abs(sizeChange)

      consoleIds(secondInningItems)
      consoleIds(firstInningItems)

      firstInningItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, PLUS, DIRECTIONS.UP)
      })

      secondInningItems.forEach(item => {
        item.syncAxisSize()
        item.restoreLimits()
        sizeChange = item.changeSize(sizeChange, PLUS, DIRECTIONS.DOWN)
      })

      const changeInView = getChangeInViewSize(resizable)

      if (changeInView !== 0) {
        visibleItems.forEach((item) => item.setPreSize())
        safeSetVisibility(resizer, true, true)

        if (!isSecondAttemp) {
          const allowedChange = acceptableNewSize + changeInView
          console.log('newSize', newSize, 'changeInView', changeInView, addOnSizeChange)
          setSizeMethod(resizable, id, allowedChange, behavior, true)
        }
      }
    }

    setUISizesFn(items, DIRECTIONS.NONE)
    consoleGetSize(items)
  }
}
