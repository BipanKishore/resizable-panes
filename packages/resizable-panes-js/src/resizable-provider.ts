import {
  IResizableApi,
  getDetectionService, getResizable
} from '../../resizable-core'
import {IResizableOptions} from './@types'
import {initializPane} from './pane'
import {initializResizableContainer} from './resizable-container'
import {initializeResizer} from './resizer'

import {attachDefaultOptions} from './utils'

export const getResizablePanes = (options: IResizableOptions): [IResizableApi, () => void, () => void] => {
  const optionsWithDefaults = attachDefaultOptions(options) as any
  const {panes, id} = optionsWithDefaults

  const resizable = getResizable(optionsWithDefaults)

  const {registerItem, registerContainer, api} = resizable

  panes.forEach(({id}, index: number) => {
    initializPane(id, registerItem, optionsWithDefaults)
    if (index !== panes.length - 1) {
      initializeResizer(id, registerItem, optionsWithDefaults)
    }
  })

  const containerNode = initializResizableContainer(id, registerContainer, optionsWithDefaults)

  const [startDetectionService, clearDetectionService] = getDetectionService(resizable)
  const startResizable = () => startDetectionService(containerNode)
  const clearResizable = () => clearDetectionService(containerNode)

  startResizable()

  return [api, startResizable, clearResizable]
}
