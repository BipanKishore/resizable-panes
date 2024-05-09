import React, {useEffect, useRef} from 'react'
import {
  ResizablePaneContext,
  getResizableContext
} from '../context/resizable-panes-context'
import {ResizablePanes} from './resizable-panes'
import {deleteUndefined, noop} from '../utils/util'
import {IResizablePaneProviderProps} from '../@types'
import {RATIO, RESIZE_HTML_EVENT} from '../constant'
import {toRatioModeAllPanes} from '../utils/resizable-pane'

const emptyObhect = {}

export const attachDefaultPaneProps = (
  attachedProps: IResizablePaneProviderProps
) => {
  const propsWithNoUndefined = deleteUndefined({...attachedProps})
  return {
    onResize: noop,
    onResizeStop: noop,
    onReady: noop,
    onChangeVisibility: noop,
    vertical: false,
    unit: RATIO,
    resizerClass: '',
    activeResizerClass: '',
    resizerSize: 2,
    detectionSize: 5,
    visibility: emptyObhect,
    minMaxUnit: RATIO,
    unmountOnHide: true,
    zipping: true,
    ...propsWithNoUndefined
  }
}

export const ResizablePaneProvider = (props: IResizablePaneProviderProps) => {
  const currentProps = attachDefaultPaneProps(
    props
  ) as IResizablePaneProviderProps
  const {visibility, onReady, unit} = currentProps

  const resizableRef: any = useRef(getResizableContext(currentProps))

  const {api, resizable} = resizableRef.current

  useEffect(() => {
    const onResize = () => {
      if (unit === RATIO) {
        toRatioModeAllPanes(resizable, true)
      }
    }
    window.addEventListener(RESIZE_HTML_EVENT, onResize)

    return () => window.removeEventListener(RESIZE_HTML_EVENT, onResize)
  }, [unit, resizable])

  const ref = useRef(true)
  useEffect(() => {
    onReady(api)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  useEffect(() => {
    if (ref.current === false) {
      resizableRef.current.api.setVisibilities(visibility)
    } else {
      ref.current = false
    }
  }, [visibility, ref])

  return (
    <ResizablePaneContext.Provider value={resizableRef.current}>
      <ResizablePanes {...currentProps} />
    </ResizablePaneContext.Provider>
  )
}
