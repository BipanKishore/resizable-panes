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
import {attachDetectionCoordinate} from '../services/detection-service'
import {addDOMEvent, removeDOMEvent} from '../utils/dom'

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
    resizerSize: 2,
    detectionRadius: 5,
    visibility: emptyObhect,
    unmountOnHide: true,

    ...propsWithNoUndefined
  }
}

export const ResizablePaneProvider = (props: IResizablePaneProviderProps) => {
  const currentProps = attachDefaultPaneProps(
    props
  ) as IResizablePaneProviderProps
  const {visibility, onReady, unit} = currentProps

  const resizableRef: any = useRef(getResizableContext(currentProps))

  const resizable = resizableRef.current
  const {api} = resizable

  useEffect(() => {
    const onResize = () => {
      if (unit === RATIO) {
        toRatioModeAllPanes(resizable, true)
        attachDetectionCoordinate(resizable)
      }
    }
    addDOMEvent(window, onResize, RESIZE_HTML_EVENT)

    return () => removeDOMEvent(window, onResize, RESIZE_HTML_EVENT)
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
