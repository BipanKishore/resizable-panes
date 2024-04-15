import React, {useContext} from 'react'
// import '../style.css'
import {IResizablePanesProps} from '../@types'
import {getContainerClass} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {registerContainer} from '../utils/resizable-pane'

export const ResizablePanes = (props: IResizablePanesProps) => {
  const {children, className, unit, vertical, uniqueId} = props
  const context: any = useContext(ResizablePaneContext)
  const [containerRef]: any = useHookWithRefCallback(registerContainer(context))
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
