import React, {useContext} from 'react'
import '../style.css'
import {IResizablePanesProps} from '../@types'
import {getContainerClass} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {registerContainer} from '../utils/resizable-pane'

export const ResizablePanes = (props: IResizablePanesProps) => {
  const {children, className, unit} = props
  const context: any = useContext(ResizablePaneContext)
  const [containerRef]: any = useHookWithRefCallback(registerContainer(context))
  const classname = getContainerClass(context.vertical, className as string, unit)

  return (
    <div className={classname} ref={containerRef}>
      {children}
    </div>
  )
}
