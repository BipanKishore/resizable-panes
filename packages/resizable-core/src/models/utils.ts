import {IPane, IResizablePaneProviderProps} from '../@types'
import {deleteUndefined, noop} from '../utils/util'

export const checkPaneModelErrors = (size: number, minSize: number, maxSize: number, id: string) => {
  if (size < minSize) {
    throw new Error(`Size(${size}) can not be smaller than minSize(${minSize}) for pane id ${id}`)
  }

  if (size > maxSize) {
    throw new Error(`Size(${size}) can not be greatter than maxSize(${maxSize}) for pane id ${id}`)
  }
}

export const attachDefaultPaneProps = (paneProps: IPane, resizableProps: IResizablePaneProviderProps) => {
  const propsWithNoUndefined = deleteUndefined({...paneProps})

  const {
    onMinSize = noop,
    onMaxSize = noop,
    onNormalSize = noop,

    resizerClass,
    activeResizerClass,
    resizerSize,
    detectionRadius
  } = resizableProps

  return {
    onMinSize,
    onMaxSize,
    onNormalSize,
    resizerSize,
    resizerClass,
    detectionRadius,
    activeResizerClass,
    minSize: 0,
    maxSize: Infinity,
    ...propsWithNoUndefined
  }
}
