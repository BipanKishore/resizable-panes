import React, {useContext, useEffect} from 'react'
import '../style.css'
import {IResizablePanesProps} from '../@types'
import {getContainerClass} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'

export const ResizablePanes = (props: IResizablePanesProps) => {
  const {children, className, unit, vertical, uniqueId} = props
  const context: any = useContext(ResizablePaneContext)
  const {registerContainer, resizeObserverContainer} = context

  const [containerRef]: any = useHookWithRefCallback((node: HTMLElement) => {
    resizeObserverContainer.observe(node)
    registerContainer({
      getContainerRect: () => node.getBoundingClientRect()
    })
  })

  useEffect(() => {
    return () => {
      resizeObserverContainer.disconnect()
    }
  }, [])

  const classname = getContainerClass(vertical as boolean, className as string, unit)

  return (
    <div
      className={classname}
      data-cy={uniqueId}
      ref={containerRef}
    >
      {children}
    </div>
  )
}
