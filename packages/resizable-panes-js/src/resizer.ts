import {getSetResizerSize, findIndex, getResizerId, ResizableModel} from '../../resizable-core'
import {getMouseDownOnResizer, getElementById, addClasses} from './utils'

export const initializeResizer = (paneId: string, registerItem: any, options: ResizableModel) => {
  const {panesList, vertical} = options

  const index = findIndex(panesList, paneId)

  const {resizerClass, activeResizerClass} = panesList[index].props

  const resizerId = getResizerId(paneId)
  const node = getElementById(resizerId)
  const setSize = getSetResizerSize(node, vertical)
  addClasses(node, 'overflow-hidden')

  const setMouseDownFlag = getMouseDownOnResizer(node, resizerId, activeResizerClass, resizerClass)
  setMouseDownFlag(resizerId, false)
  registerItem({
    setSize,
    setMouseDownFlag
  }, resizerId)
}
