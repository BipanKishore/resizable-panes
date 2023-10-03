import {IContextDetails, IKeyToBoolMap, IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {getPanesSizeSum, getResizerSum, setUISizesFn} from './panes'
import {visibilityOperation} from './resizable-pane'
import {findIndex} from './util'

export const toFullPageFn = (panesList: PaneModel[], paneId: string) => {
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.pane.onFullPage()
    }
  })
}

export const toFullSizeFn = (serviceRefCurrent: any, paneId: string) => {
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

export const closeFullSizeFn = ({panesList, resizersList}: IServiceRef) => {
  panesList.forEach((pane) => {
    pane.synSizeToStored()
    pane.pane.onCloseFullSize()
  })
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList)
}

export const restoreDefaultFn = ({panesList, resizersList}: IServiceRef) => {
  panesList.forEach((pane) => pane.restore())
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList)
}

const getVisibilityArray = (panesList: PaneModel[]) => {
  const indexList: number[] = []
  for (let i = 0; i < panesList.length; i++) {
    if (panesList[i].visibility) {
      indexList.push(i)
    }
  }
  return indexList
}

export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList
  } = contextDetails

  panesList.forEach((pane) => pane.syncToOldVisibilityModel())
  resizersList.forEach(resizer => resizer.syncToOldVisibilityModel())

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id])
    const index = findIndex(panesList, id)

    const sizeChange = pane.setVisibility(visibility) as number
    const resizerSizeChange = resizersList[index].setVisibility(visibility)

    visibilityOperation(index, panesList, sizeChange + resizerSizeChange, visibility)
  }

  const visibilityList = getVisibilityArray(panesList)

  const lastVisibleIndex = visibilityList.pop()
  if (lastVisibleIndex) {
    const resizerSizeChange = resizersList[lastVisibleIndex].setVisibility(false)
    visibilityOperation(lastVisibleIndex, panesList, resizerSizeChange, false)
  }

  setUISizesFn(panesList)
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) => {
  for (const resizer of resizersList) {
    resizer.setVisibility(visibility)
  }
}
