import {getSetResizerSize, findIndex, getResizerId} from '../../resizable-core'
import {getMouseDownOnResizer, getElementById} from './utils'
import {IResizableOptions} from './@types'

export const initializeResizer = (paneId: string, registerItem: any, options: IResizableOptions) => {
  const {panes, vertical} = options

  const index = findIndex(panes, paneId)

  const {resizerClass, activeResizerClass} = panes[index]

  const resizerId = getResizerId(paneId)
  const node = getElementById(resizerId)
  const setSize = getSetResizerSize(node, vertical)
  const setMouseDownFlag = getMouseDownOnResizer(node, resizerId, resizerClass, activeResizerClass)

  registerItem({
    setSize,
    setMouseDownFlag
  }, resizerId)
}
