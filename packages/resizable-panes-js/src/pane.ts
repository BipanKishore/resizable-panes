import {getElementById, addClasses} from './utils'
import {IResizableOptions} from './@types'
import {getSetSize} from '../../resizable-core'

export const initializPane = (paneId: string, registerItem: any, options: IResizableOptions) => {
  const {vertical} = options

  const node = getElementById(paneId)

  addClasses(node, 'overflow-hidden flex-shrink-0')

  registerItem({
    setSize: getSetSize(node, vertical)
  }, paneId)
}
