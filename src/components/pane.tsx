import React, {useContext, Fragment, useEffect, useMemo} from 'react'
import {IPane} from '../@types'
import {getSizeKey, joinClassName, toPx} from '../utils/dom'
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

  const {
    className,
    children,
    resizer,
    id
  } = props

  const [setPaneRef]: any = useHookWithRefCallback((node: any) => {
    const setSize = (size: number) => {
      // console.log('setSize', size, id)
      node.style[getSizeKey(vertical)] = toPx(size)
    }

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

    registerPane({
      setSize
    }, id)
  })

  const classname = joinClassName({
    'overflow-hidden flex-shrink-0': true,
    [className as string]: className
  })

  const style = useMemo(() => getPaneSizeStyle(id), [])
  // console.log(id, style)

  return (
    <Fragment>
      <div
        className={classname}
        key={id}
        ref={setPaneRef}
        style={{...style}}
      >
        {children}
      </div>
      <Resizer id={id}>
        {resizer || parentResizer}
      </Resizer>
    </Fragment>
  )
}

Pane.defaultProps = {
  show: true
}
