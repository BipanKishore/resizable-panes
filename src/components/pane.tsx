import React, {useContext, Fragment} from 'react'
import {IPane} from '../@types'
import {getSetSize, joinClassName} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {Resizer} from './resizer'
import {useHookWithRefCallback} from '../hook/useHookWithRefCallback'

export const Pane = (props: IPane) => {
  const context: any = useContext(ResizablePaneContext)

  const {
    vertical, registerPane, getPaneSizeStyle,
    props: {
      resizer: parentResizer
    }
  } = context
  // const [destroy, setDestroy] = useState()

  const {
    className,
    children,
    resizer,
    id
    // removeNodeOnHide
  } = props

  const [setPaneRef]: any = useHookWithRefCallback((node: HTMLElement) => {
    const setSize = getSetSize(node, vertical)

    registerPane({
      setSize
    }, id)

    // const onCloseFullSize = () => {
    //   node.classList.remove('full-page-class')
    // }

    // const onFullSize = () => onCloseFullSize()

    // const onFullPage = () => {
    //   node.style.removeProperty('height')
    //   node.style.removeProperty('width')
    //   node.classList.add('full-page-class')
    // }

    // registerPane({
    //   setSize,
    //   onFullSize,
    //   onFullPage,
    //   onCloseFullSize
    // }, id)
  })

  const classname = joinClassName({
    'overflow-hidden flex-shrink-0': true,
    [className as string]: className
  })

  const style = getPaneSizeStyle(id)

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
