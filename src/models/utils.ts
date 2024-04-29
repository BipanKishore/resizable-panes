import {IPane} from '../@types'
import {deleteUndefined} from '../utils/util'

export const checkPaneModelErrors = (size: number, minSize: number, maxSize: number, id: string) => {
  if (size < minSize) {
    throw new Error(`Size(${size}) can not be smaller than minSize(${minSize}) for pane id ${id}`)
  }

  if (size > maxSize) {
    throw new Error(`Size(${size}) can not be greatter than maxSize(${maxSize}) for pane id ${id}`)
  }
}

export const attachDefaultPaneProps = (paneProps: IPane) => {
  const propsWithNoUndefined = deleteUndefined({...paneProps})
  return {
    minSize: 0,
    maxSize: Infinity,
    ...propsWithNoUndefined
  }
}
