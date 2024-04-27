import React, {useEffect, useRef} from 'react'
import {ResizablePaneContext, getResizableContext} from '../context/resizable-panes-context'
import {ResizablePanes} from './resizable-panes'
import {addDefaultProps, noop} from '../utils/util'
// import {useResizableApi} from '../hook/use-resizable-api'
import {onResizeClearSizesMapFromStore} from '../utils/storage'
import {IResizablePaneProviderProps} from '../@types'
import {singletonService} from '../services/singleton-service'
import {RATIO} from '../constant'

const ResizablePaneProviderDefaultProps: any = {
  onResize: noop,
  onResizeStop: noop,
  onReady: noop,
  onChangeVisibility: noop,
  vertical: false,
  storageApi: undefined,
  unit: RATIO,
  resizer: undefined,
  resizerClass: '',
  resizerSize: 2,
  detectionSize: 5,
  visibility: {}
}

export const ResizablePaneProvider = (props: IResizablePaneProviderProps) => {
  const currentProps = addDefaultProps(props, ResizablePaneProviderDefaultProps) as IResizablePaneProviderProps
  const {uniqueId, visibility, storageApi, onReady} = currentProps

  const context = singletonService.getService(uniqueId, () => getResizableContext(currentProps))
  const {api} = context

  useEffect(() => {
    return () => {
      singletonService.clearService(uniqueId)
    }
  }, [uniqueId])

  const ref = useRef(true)

  useEffect(() => {
    onReady(api)
  }, [api])

  useEffect(() => {
    onResizeClearSizesMapFromStore(uniqueId, storageApi)
  }, [uniqueId, storageApi])

  useEffect(() => {
    if (ref.current === false) {
      context.setVisibility(visibility)
    } else {
      ref.current = false
    }
  }, [visibility, ref])

  return (
    <ResizablePaneContext.Provider value={context} >
      <ResizablePanes {...currentProps}/>
    </ResizablePaneContext.Provider>
  )
}
