import {ResizableModel} from '../models'
import {getSize} from '../models/pane'
import {addDOMEvent, getResizableEvent, removeDOMEvent} from '../utils/dom'
import {getVisibleItems} from '../utils/panes'

import throttle from 'lodash.throttle'
import {sortNumber} from '../utils/util'
import {EVENT_NAMES} from '../constant'

export const attachDetectionCoordinate = (resizable: ResizableModel) => {
  const {vertical, items, getContainerRect} = resizable

  const detectionRadius = 10
  const {left, top} = getContainerRect()

  let coordinatesSum = vertical ? left : top

  const visibleItems = getVisibleItems(items)
  const detectionCoordinate = []

  for (let i = 0; i < visibleItems.length - 1; i += 2) {
    const pane = visibleItems[i]
    if (!pane.isHandle) {
      const {defaultSize, id, resizerSize} = visibleItems[i + 1]
      const size = getSize(pane)
      const resizerX1 = coordinatesSum + size - detectionRadius + resizerSize
      const resizerX2 = coordinatesSum + size + defaultSize + detectionRadius + resizerSize
      coordinatesSum += size + defaultSize
      detectionCoordinate.push([resizerX1, resizerX2, id])
    }
  }

  resizable.detectionDetails = detectionCoordinate
}

const getMouseDownOnHandle = (
  resizable: ResizableModel,
  vertical: boolean,
  registerResizeEvent: any) => (e: any) => {
  const {detectionDetails: detectionCoordinate} = resizable

  const cursorCoordinate = vertical ? e.clientX : e.clientY

  const resizerClickedCoordinateList = []
  for (let i = 0; i < detectionCoordinate.length; i++) {
    const [x1, x2] = detectionCoordinate[i]
    const coordinates = Math.abs(((x1 + x2) / 2) - cursorCoordinate)
    resizerClickedCoordinateList.push(coordinates)
  }
  const copyForSort = sortNumber(resizerClickedCoordinateList)

  const closestCoordinate = copyForSort.pop()

  const closestIndex = resizerClickedCoordinateList.indexOf(closestCoordinate)
  const [x1, x2, handleId] = detectionCoordinate[closestIndex]
  if (closestCoordinate <= ((x2 - x1) / 2)) {
    resizable.previousTouchEvent = e
    const resizableEvent = getResizableEvent(e, vertical, {})
    resizable.onMouseDown(resizableEvent, handleId)
    registerResizeEvent()
  }
}

const onContainerMouseMove = (
  element: HTMLElement,
  resizable: ResizableModel,
  vertical: boolean,
  cursorStyle: string) => (e: any) => {
  const {detectionDetails} = resizable
  const cursorCoordinate = vertical ? e.clientX : e.clientY
  element.style.cursor = 'auto'
  for (let i = 0; i < detectionDetails.length; i++) {
    const [x1, x2] = detectionDetails[i]
    if (cursorCoordinate >= x1 && cursorCoordinate <= x2) {
      element.style.cursor = cursorStyle
    }
  }
}

const getResize = (resizable: ResizableModel, vertical: boolean) => (e: any) => {
  const resizableEvent = getResizableEvent(e, vertical, resizable.previousTouchEvent)
  resizable.resizeOnMove(resizableEvent)
}

export const detectionService = (containerNode: HTMLElement, resizable: ResizableModel) => {
  const {vertical} = resizable
  const cursorStyle = vertical ? 'col-resize' : 'row-resize'

  const onGlobalMouseMoveDebounce = throttle(onContainerMouseMove(containerNode, resizable, vertical, cursorStyle), 100)

  addDOMEvent(containerNode, onGlobalMouseMoveDebounce, EVENT_NAMES.mousemove)
  document.addEventListener(EVENT_NAMES.touchmove, onGlobalMouseMoveDebounce, {passive: false})

  const resize = getResize(resizable, vertical)

  const registerResizeEvent = () => {
    addDOMEvent(document, resize, EVENT_NAMES.mousemove)
    document.addEventListener(EVENT_NAMES.touchmove, resize, {passive: false})
  }

  const clearResizeEvent = () => {
    resizable.onMouseUp()
    removeDOMEvent(document, resize, EVENT_NAMES.mousemove, EVENT_NAMES.touchmove)
  }

  const onMouseDownOnHandle = getMouseDownOnHandle(resizable, vertical, registerResizeEvent)

  addDOMEvent(containerNode, onMouseDownOnHandle, EVENT_NAMES.mousedown, EVENT_NAMES.touchStartCapture)

  addDOMEvent(document, clearResizeEvent, EVENT_NAMES.mouseup, EVENT_NAMES.touchend)
}
