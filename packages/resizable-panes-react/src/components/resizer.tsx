import React, {
  useState,
  useContext, useCallback,
  isValidElement, cloneElement,
  ReactElement
} from 'react'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {
  ResizableModel,
  getSetResizerSize, joinClassName,
  findIndex, getResizerId
} from '../../../resizable-core'

import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {IResizer} from '../@types'

export const Resizer = (props: IResizer) => {
  const {children, id} = props
  const resizerId = getResizerId(id)

  const resizable = useContext<ResizableModel>(ResizablePaneContext)

  const {
    registerItem,
    panesList,
    vertical
  } = resizable

  const index = findIndex(panesList, id)
  const {resizerClass, activeResizerClass} = panesList[index].props

  const isNotLastIndex = index < (panesList.length - 1)

  const [isMouseDown, setIsMouseDown] = useState(false)

  const setMouseDownFlag = useCallback((id:string, isMouseDownFlag: boolean) => {
    if (resizerId === id) {
      setIsMouseDown(isMouseDownFlag)
    }
  }, [resizerId])

  const onNewRef = (node: any) => {
    const setSize = getSetResizerSize(node, vertical)
    registerItem({
      setSize,
      setMouseDownFlag
    }, resizerId)
  }

  // Does not run for the last element
  const [setResizerRef]: any = useHookWithRefCallback(onNewRef)

  const className = joinClassName({
    'overflow-hidden': true,
    [activeResizerClass]: isMouseDown,
    [resizerClass]: !isMouseDown
  })

  const isValidCustomResizer = isValidElement(children)
  let cloneChild: ReactElement
  if (isValidCustomResizer) {
    cloneChild = cloneElement(children as ReactElement, {
      ...children.props as object,
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
      >
        {cloneChild}
      </div>
    )
  }
  return null
}
