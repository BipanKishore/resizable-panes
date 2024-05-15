import {
  UnitTypes,
  getContainerClass, getDetectionService, getResizable,
  getResizerId, getSetResizerSize, getSetSize
} from '../../resizable-core'
import {IResizableOptions} from './@types'

import {addClasses, attachDefaultOptions, getMouseDownOnResizer} from './utils'

const getResizablePanes = (options: IResizableOptions) => {
  const config = attachDefaultOptions(options) as any
  const resizable = getResizable(config)

  const {registerItem, registerContainer, api} = resizable

  config.panes.forEach(({id}, index) => {
    const node = document.getElementById(id)
    registerItem({
      setSize: getSetSize(node, true)
    }, id)

    addClasses(node, 'overflow-hidden flex-shrink-0')

    const resizerId = getResizerId(id)

    const rNode = document.getElementById(resizerId)

    if (index !== config.panes.length - 1) {
      registerItem({
        setSize: getSetResizerSize(rNode, true),
        setMouseDownFlag: getMouseDownOnResizer(rNode, resizerId, '', config.activeResizerClass)
      }, resizerId)
    }
  })

  const classname = getContainerClass(config.vertical, '', config.unit as UnitTypes)

  const [startDetectionService, clearDetectionService] = getDetectionService(resizable)

  const containerNode = document.getElementById(config.id)
  addClasses(containerNode, classname)
  registerContainer(containerNode)

  startDetectionService(containerNode)

  return [api, startDetectionService, clearDetectionService]
}

export default getResizablePanes
