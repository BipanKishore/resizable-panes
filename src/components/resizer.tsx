import React, {
  useState,
  useContext, useCallback,
  isValidElement, cloneElement, useRef
} from 'react'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {getResizableEvent, getSizeKey, joinClassName, toPx} from '../utils/dom'
import {findIndexInChildrenbyId} from '../utils/panes'
import {noop} from '../utils/util'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {IResizer} from '../@types'
import {useMountingConsole} from '../utils/development-util'

export const Resizer = (props: IResizer) => {
  const {
    children,
    id
  } = props
  useMountingConsole('Resizer---------------------' + id)

  const context: any = useContext(ResizablePaneContext)
  const {getIdToSizeMap, myChildren} = context

  const {vertical, storeKey, sessionStore} = context.props
  const index = findIndexInChildrenbyId(myChildren, id)
  const isNotLastIndex = index < (myChildren.length - 1)
  const previousTouchEvent:any = useRef()

  const [isVisibile, setVisibility] = useState(isNotLastIndex)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, vertical, previousTouchEvent)
    context.calculateAndSetHeight(resizableEvent)
    const resizeParams = getIdToSizeMap()
    context.props.onResize(resizeParams)
  }, [vertical, getIdToSizeMap, context])

  const onTouchMove = useCallback((e:any) => {
    e.preventDefault()
    onMouseMove(e)
  }, [onMouseMove])

  const onMoveEnd = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('touchmove', onTouchMove)

    const resizeParams = getIdToSizeMap()
    context.storage.setStorage(context)
    setIsMouseDown(false)
    context.props.onResizeStop(resizeParams)
    document.removeEventListener('mouseup', onMoveEnd)
    document.removeEventListener('touchend', onMoveEnd)
  }, [storeKey, sessionStore, onMouseMove, context, getIdToSizeMap])

  const onMouseDown = useCallback((e: any) => {
    setIsMouseDown(true)
    const resizableEvent = getResizableEvent(e, vertical, previousTouchEvent)
    context.setMouseDownDetails(resizableEvent, id)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove, {passive: false})
    document.addEventListener('mouseup', onMoveEnd)
    document.addEventListener('touchend', onMoveEnd)
  }, [
    context,
    onMouseMove,
    onTouchMove,
    vertical,
    id,
    onMoveEnd
  ])

  const getVisibleSize = (node: any) => {
    if (children) {
      const {height, width} = node.getBoundingClientRect()

      return vertical ? width : height
    }
    return 2
  }

  const onNewRef = (node: any) => {
    context.registerResizer({
      setVisibility: (visibility: boolean) => {
        console.log('setSize', visibility, id)

        node.style[getSizeKey(vertical)] = toPx(visibility ? 12 : 0)
      },
      getVisibleSize: () => getVisibleSize(node),
      visibility: isNotLastIndex
    }, id)
  }

  const onEmptyRef = (previousNode: any) => {
    context.registerResizer({
      setVisibility,
      getVisibleSize: () => getVisibleSize(previousNode),
      visibility: false
    }, id)
  }

  // Does not run for the last element
  const [setResizerRef]: any = useHookWithRefCallback(onNewRef, onEmptyRef)

  const className = joinClassName({
    resizer: true,
    'resizer-horizontal': vertical,
    'resizer-vertical': !vertical
  }, children)

  const isValidResizer = isValidElement(children)

  let cloneChild: React.ReactNode
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
        ref={setResizerRef} style={{
          overflow: 'hidden'
        }}
      >

        <div
          className={className}
          style={{
            height: '100%',
            width: '100%'
          }}
          onMouseDown={onMouseDownElement}
          onTouchStartCapture={onMouseDownElement}
        >
          {cloneChild}
        </div>

      </div>
    )
  }
}
