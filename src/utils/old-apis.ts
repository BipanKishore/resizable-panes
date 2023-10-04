import {IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'
import {setResizersVisibility} from './api'
import {getPanesSizeSum, getResizerSum, setUISizesFn} from './panes'

const toFullPageFn = (panesList: PaneModel[], paneId: string) => {
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.pane.onFullPage()
    }
  })
}

const toFullSizeFn = (serviceRefCurrent: any, paneId: string) => {
  const {panesList, resizersList} = serviceRefCurrent
  const containerSize = getPanesSizeSum(panesList, 0, panesList.length - 1) +
    getResizerSum(resizersList, 0, resizersList.length - 1)
  panesList.forEach((pane: any) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.size = containerSize
      pane.pane.onFullSize()
    } else {
      pane.size = 0
    }
  })
  setResizersVisibility(resizersList, false)
  setUISizesFn(serviceRefCurrent.panesList)
}

const closeFullSizeFn = ({panesList, resizersList}: IServiceRef) => {
  panesList.forEach((pane) => {
    pane.synSizeToStored()
    pane.pane.onCloseFullSize()
  })
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList)
}
