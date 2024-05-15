import React, {useContext, Fragment, useState} from 'react'
import {IPane} from '../@types'
import {getSetSize, joinClassName, ResizableModel} from '../../../resizable-core'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {Resizer} from './resizer'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'

export const Pane = (props: IPane) => {
  const resizable = useContext<ResizableModel>(ResizablePaneContext)

  const [mountIt, setMountIt] = useState(true)

  const {
    vertical,
    registerItem,
    getPaneSizeStyle,
    props: {resizer: parentResizer, unmountOnHide: unmountOnHideGlobal}
  } = resizable

  const {className, children, resizer, id, unmountOnHide} = props

  const shouldDestroy = unmountOnHide ?? unmountOnHideGlobal

  const [setPaneRef]: any = useHookWithRefCallback((node: HTMLElement) => {
    const setSize = getSetSize(node, vertical)
    const destroy = (visibility: boolean) => {
      if (shouldDestroy) {
        setMountIt(visibility)
      }
    }

    registerItem(
      {
        node,
        destroy,
        setSize
      },
      id
    )
  })

  const classname = joinClassName({
    'overflow-hidden flex-shrink-0': true,
    [className]: className
  })

  const style = getPaneSizeStyle(id)

  return (
    <Fragment>
      <div
        className={classname}
        data-cy={id}
        ref={setPaneRef}
        style={style}
      >
        {mountIt && children}
      </div>
      <Resizer id={id}>{resizer || parentResizer}</Resizer>
    </Fragment>
  )
}
