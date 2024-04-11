import React, {
  useState,
  useContext, useCallback,
  isValidElement, cloneElement, useRef
} from 'react'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {getResizableEvent, getSetSize, getSizeKey, joinClassName} from '../utils/dom'
import {findIndexInChildrenbyId} from '../utils/panes'
import {getResizerId, noop} from '../utils/util'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {IResizer} from '../@types'

export const Resizer = (props: IResizer) => {
  const {
    children,
    id
  } = props

  const context: any = useContext(ResizablePaneContext)
  const {getIdToSizeMap, myChildren, onMoveEndFn} = context

  const {vertical, uniqueId} = context.props
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

  const getVisibleSize = (node: any) => {
    if (children) {
      const rect = node.getBoundingClientRect()
      return rect[getSizeKey(vertical)]
    }
    return 2
  }

  const onNewRef = (node: any) => {
    // need to work for default resizer
    const setSize = getSetSize(node, vertical, true, children ? 0 : 12)

    context.registerResizer({
      getVisibleSize: () => getVisibleSize(node),
      setSize,
      visibility: isNotLastIndex
    }, id)
  }

  // Does not run for the last element
  const [setResizerRef]: any = useHookWithRefCallback(onNewRef)

  const className = joinClassName({
    resizer: true,
    'resizer-horizontal': vertical,
    'resizer-vertical': !vertical
  }, children)

  const isValidResizer = isValidElement(children)

  let cloneChild
  if (isValidResizer) {
    cloneChild = cloneElement(children, {
      ...children.props as object,
      // @ts-ignore
      onMouseDown,
      onTouchStartCapture: onMouseDown,
      isMouseDown

    })
  }

  const onMouseDownElement = isValidResizer ? noop : onMouseDown

  if (isNotLastIndex) {
    return (
      <div
        className={className}
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
