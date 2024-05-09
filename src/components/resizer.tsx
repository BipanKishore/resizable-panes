import React, {
  useState,
  useContext, useCallback,
  isValidElement, cloneElement, useRef,
  ReactElement
} from 'react'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {
  getResizableEvent,
  getSetResizerSize, joinClassName
} from '../utils/dom'
import {findIndex, getResizerId, noop} from '../utils/util'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {IResizer} from '../@types'

export const Resizer = (props: IResizer) => {
  const {
    children,
    id
  } = props

  const resizerId = getResizerId(id)

  const context: any = useContext(ResizablePaneContext)

  const {
    getIdToSizeMap, onMoveEndFn, resizable
  } = context
  const {panesList} = resizable

  const {vertical, uniqueId, resizerSize, detectionSize, resizerClass, activeResizerClass} = context.props

  const index = findIndex(panesList, id)
  const isNotLastIndex = index < (panesList.length - 1)
  const previousTouchEvent:any = useRef()

  const [isMouseDown, setIsMouseDown] = useState(false)

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, vertical, previousTouchEvent)
    context.calculateAndSetHeight(resizableEvent)
  }, [vertical, context])

  const onMoveEnd = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('touchmove', onMouseMove)

    onMoveEndFn()

    setIsMouseDown(false)
    document.removeEventListener('mouseup', onMoveEnd)
    document.removeEventListener('touchend', onMoveEnd)
  }, [uniqueId, onMouseMove, context, getIdToSizeMap])

  const onMouseDown = useCallback((e: any) => {
    setIsMouseDown(true)
    const resizableEvent = getResizableEvent(e, vertical, previousTouchEvent)
    context.setMouseDownDetails(resizableEvent, resizerId)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove, {passive: false})
    document.addEventListener('mouseup', onMoveEnd)
    document.addEventListener('touchend', onMoveEnd)
  }, [
    context,
    onMouseMove,
    vertical,
    resizerId,
    onMoveEnd
  ])

  const isValidCustomResizer = isValidElement(children)
  const onMouseDownElement = isValidCustomResizer ? noop : onMouseDown

  const onNewRef = (node: any) => {
    const setSize = getSetResizerSize(node, vertical, isValidCustomResizer, resizerSize, detectionSize)
    context.registerItem({
      setSize
    }, resizerId)
  }

  // Does not run for the last element
  const [setResizerRef]: any = useHookWithRefCallback(onNewRef)

  const className = joinClassName({
    [activeResizerClass]: isMouseDown,
    [resizerClass]: !isMouseDown,
    resizer: true,
    'resizer-horizontal': vertical,
    'resizer-vertical': !vertical
  }, children)

  let cloneChild: ReactElement
  if (isValidCustomResizer) {
    cloneChild = cloneElement(children as ReactElement, {
      ...children.props as object,
      onMouseDown,
      onTouchStartCapture: onMouseDown,
      isMouseDown,
      id: `${resizerId}`

    })
  }

  if (isNotLastIndex) {
    return (
      <div
        className={className}
        data-cy={resizerId}
        ref={setResizerRef}
        onMouseDown={onMouseDownElement}
        onTouchStartCapture={onMouseDownElement}
      >
        {cloneChild}
      </div>
    )
  }
  return null
}
