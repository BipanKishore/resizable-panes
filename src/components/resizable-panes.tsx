import React, {useContext} from 'react'
import '../style.css'
import {IResizablePaneProviderProps} from '../@types'
import {getContainerClass} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'

export const ResizablePanes = (props: IResizablePaneProviderProps) => {
  const {children, className, unit, vertical, uniqueId} = props
  const {registerContainer}: any = useContext(ResizablePaneContext)
  const [containerRef]: any = useHookWithRefCallback(
    node => registerContainer({getContainerRect: () => node.getBoundingClientRect()})
  )

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
