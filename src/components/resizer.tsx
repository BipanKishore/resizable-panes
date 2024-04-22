import React, {
  useState,
  useContext, useCallback,
  isValidElement, cloneElement, useRef,
  useMemo
} from 'react'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {
  generateResizerStyle, getResizableEvent,
  getSetSize, joinClassName
} from '../utils/dom'
import {findIndexInChildrenbyId} from '../utils/panes'
import {getResizerId, noop} from '../utils/util'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {IResizer} from '../@types'

export const Resizer = (props: IResizer) => {
  const {
    children,
    id
  } = props

  const resizerId = getResizerId(id)

  const context: any = useContext(ResizablePaneContext)
  const {getIdToSizeMap, myChildren, onMoveEndFn} = context

  const {vertical, uniqueId, resizerSize, detectionSize, resizerClass} = context.props

  const index = findIndexInChildrenbyId(myChildren, id)
  const isNotLastIndex = index < (myChildren.length - 1)
  const previousTouchEvent:any = useRef()

  const [isMouseDown, setIsMouseDown] = useState(false)

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, vertical, previousTouchEvent)
    context.calculateAndSetHeight(resizableEvent)
    const resizeParams = getIdToSizeMap()
    context.props.onResize(resizeParams)
  }, [vertical, getIdToSizeMap, context])

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
    context.setMouseDownDetails(resizableEvent, getResizerId(id))
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove, {passive: false})
    document.addEventListener('mouseup', onMoveEnd)
    document.addEventListener('touchend', onMoveEnd)
  }, [
    context,
    onMouseMove,
    vertical,
    id,
    onMoveEnd
  ])

  const isValidCustomResizer = isValidElement(children)
  const onMouseDownElement = isValidCustomResizer ? noop : onMouseDown

  const style = useMemo(
    () => isValidCustomResizer
      ? null
      : generateResizerStyle(resizerSize, detectionSize,
        vertical),
    [])

  const onNewRef = (node: any) => {
    // need to work for default resizer
    const setSize = getSetSize(node, vertical, true, style)
    context.registerResizer({
      setSize,
      visibility: isNotLastIndex
    }, id)
  }

  // Does not run for the last element
  const [setResizerRef]: any = useHookWithRefCallback(onNewRef)

  const className = joinClassName({
    [resizerClass]: true,
    resizer: true,
    'resizer-horizontal': vertical,
    'resizer-vertical': !vertical
  }, children)

  let cloneChild
  if (isValidCustomResizer) {
    cloneChild = cloneElement(children, {
      ...children.props as object,
      // @ts-ignore
      onMouseDown,
      onTouchStartCapture: onMouseDown,
      isMouseDown,
      id: `custom-${resizerId}`,
      name: id

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
