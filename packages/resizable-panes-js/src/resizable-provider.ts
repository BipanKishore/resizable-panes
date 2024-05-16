import {
  IResizableApi,
  RATIO,
  RESIZE_HTML_EVENT,
  addDOMEvent,
  attachDetectionCoordinate,
  clearflagsOnNewView,
  getDetectionService, getResizable,
  removeDOMEvent,
  toRatioModeAllPanes
} from '../../resizable-core'
import {IResizableOptions} from './@types'
import {initializPane} from './pane'
import {initializResizableContainer} from './resizable-container'
import {initializeResizer} from './resizer'

import {attachDefaultOptions} from './utils'

export type IGetResizablePanes = [resizableApi: IResizableApi, refreshResizable: () => void, clearResizable: () => void]

export const getResizablePanes = (options: IResizableOptions):IGetResizablePanes => {
  const optionsWithDefaults = attachDefaultOptions(options) as any
  const {panes, uniqueId, unit} = optionsWithDefaults

  const resizable = getResizable(optionsWithDefaults)

  const {registerItem, registerContainer, api} = resizable

  panes.forEach(({id}, index: number) => {
    initializPane(id, registerItem, optionsWithDefaults)
    if (index !== panes.length - 1) {
      initializeResizer(id, registerItem, resizable)
    }
  })

  const onResize = () => {
    if (unit === RATIO) {
      toRatioModeAllPanes(resizable, true)
      attachDetectionCoordinate(resizable)
      clearflagsOnNewView(resizable)
    }
  }

  addDOMEvent(window, onResize, RESIZE_HTML_EVENT)

  const containerNode = initializResizableContainer(uniqueId, registerContainer, optionsWithDefaults)

  const [startDetectionService, clearDetectionService] = getDetectionService(resizable)
  const refreshResizable = () => {
    clearDetectionService(containerNode)
    startDetectionService(containerNode)
  }
  const clearResizable = () => {
    clearDetectionService(containerNode)
    removeDOMEvent(window, onResize, RESIZE_HTML_EVENT)
  }

  refreshResizable()

  // api.setVisibilities(visibility)
  console.log('Vimal')
  setTimeout(() => api.setVisibilities({P1: true}), 2000)

  return [api, refreshResizable, clearResizable]
}
