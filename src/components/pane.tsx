import React, {useContext, Fragment} from 'react'
import {IPane} from '../@types'
import {joinClassName, toPx} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {Resizer} from './resizer'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'

export const Pane = (props: IPane) => {
  const context: any = useContext(ResizablePaneContext)

  const {resizer: parentResizer} = context.props
  const {
    className,
    children,
    size,
    resizer,
    id
  } = props

  const [setPaneRef]: any = useHookWithRefCallback((node: any) => {
    const setSize = (size: number) => {
      if (context.vertical) {
        node.style.width = toPx(size)
      } else {
        node.style.height = toPx(size)
      }
    }
    const onCloseFullSize = () => {
      node.classList.remove('full-page-class')
    }

    const onFullSize = () => {
      onCloseFullSize()
    }

    const onFullPage = () => {
      node.style.removeProperty('height')
      node.style.removeProperty('width')
      node.classList.add('full-page-class')
    }

    context.registerPaneAndResizer({
      setSize,
      onFullSize,
      onFullPage,
      onCloseFullSize
    }, id)
  })

  const classname = joinClassName({
    'overflow-hidden flex-shrink-0': true,
    // @ts-ignore
    [className]: className
  })

  const style = context.getPaneSizeStyle(id)
  // Need to add visibility check
  return (
    <Fragment>
      <div
        className={classname}
        key={id}
        ref={setPaneRef}
        style={style}
      >
        {children}
      </div>

      <Resizer id={id}>
        {resizer || parentResizer}
      </Resizer>
    </Fragment>
  )
}
