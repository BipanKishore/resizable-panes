import React, {useEffect, useRef} from 'react'

import {
  ResizablePaneContext
} from '../context/resizable-panes-context'

import {
  getResizable,
  deleteUndefined, noop,
  RATIO, RESIZE_HTML_EVENT,
  clearflagsOnNewView, toRatioModeAllPanes,
  attachDetectionCoordinate,
  addDOMEvent, removeDOMEvent
} from '../../../resizable-core'

import {ResizablePanes} from './resizable-panes'

import {IResizablePaneProviderProps} from '../@types'

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
    detectionRadius: 6,
    visibility: emptyObhect,
    unmountOnHide: true,

    ...propsWithNoUndefined
  }
}

export const ResizablePaneProvider = (props: IResizablePaneProviderProps) => {
  const currentProps = attachDefaultPaneProps(props)

  const {onReady, unit} = currentProps

  const resizableRef: any = useRef(getResizable(currentProps))

  const resizable = resizableRef.current
  const {api} = resizable

  useEffect(() => {
    const onResize = () => {
      if (unit === RATIO) {
        toRatioModeAllPanes(resizable, true)
        attachDetectionCoordinate(resizable)
        clearflagsOnNewView(resizable)
      }
    }
    addDOMEvent(window, onResize, RESIZE_HTML_EVENT)

    return () => removeDOMEvent(window, onResize, RESIZE_HTML_EVENT)
  }, [unit, resizable])

  useEffect(() => {
    onReady(api)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <ResizablePaneContext.Provider value={resizable}>
      <ResizablePanes {...currentProps} />
    </ResizablePaneContext.Provider>
  )
}
