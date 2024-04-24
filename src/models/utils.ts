import {IPane} from '../@types'

export const checkPaneModelErrors = (size: number, minSize: number, maxSize: number, id: string) => {
  if (size < minSize) {
    throw new Error('Size can not be smaller than minSize for pane id ' + id)
  }

  if (size > maxSize) {
    throw new Error('Size can not be greatter than maxSize for pane id ' + id)
  }
}

export const attachDefaultPaneProps = (paneProps: IPane) => ({
  minSize: 0,
  maxSize: Infinity,
  ...paneProps
})
