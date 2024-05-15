import {getElementById, addClasses} from './utils'
import {IResizableOptions} from './@types'
import {getContainerClass} from '../../resizable-core'

export const initializResizableContainer = (id: string, registerContainer: any, options: IResizableOptions) => {
  const {vertical, unit} = options

  const containerNode = getElementById(id)

  const classname = getContainerClass(vertical, '', unit)

  addClasses(containerNode, classname)
  registerContainer(containerNode)

  return containerNode
}
