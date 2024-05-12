import React, {useContext} from 'react'
import '../style.css'
import {IResizablePaneProviderProps} from '../@types'
import {getContainerClass} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'
import {ResizableModel} from '../models'
import {getDetectionService} from '../services/detection-service'

export const ResizablePanes = (props: IResizablePaneProviderProps) => {
  const {children, className, unit, vertical, uniqueId} = props

  const resizable = useContext<ResizableModel>(ResizablePaneContext)
  const {registerContainer} = resizable

  const [startDetectionService, clearDetectionService] = getDetectionService(resizable)

  const [containerRef]: any = useHookWithRefCallback(
    node => {
      registerContainer(node)
      startDetectionService(node)
    },
    clearDetectionService
  )

  const classname = getContainerClass(vertical, className, unit)

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
