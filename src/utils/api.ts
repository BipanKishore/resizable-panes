import {IContextDetails, IKeyToBoolMap, IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {getList} from './development-util'
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

// eslint-disable-next-line complexity
export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList
  } = contextDetails

  panesList.forEach((pane) => pane.syncToOldVisibilityModel())

  console.log('Before----------------------------------', getList(panesList, 'size'),
    getPanesSizeSum(panesList, 0, panesList.length - 1))
  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id, visibility: currentVisibility} = pane
    const visibility = Boolean(idMap[id])
    const index = findIndex(panesList, id)

    const sizeChange = pane.setVisibility(visibility)
    const resizerSizeChange = resizersList[index].setVisibility(visibility)

    // console.log('vresizerSizeChange----------------- ', sizeChange + resizerSizeChange, visibility)
    if (visibility !== currentVisibility) {
      // console.log('vresizerSizeChange----------------- ', sizeChange + resizerSizeChange, visibility)
      visibilityOperation(index, panesList, sizeChange + resizerSizeChange, visibility)
      // console.log(getList(panesList, 'size'))
    }
  }
  console.log('After----------------------------------', getList(panesList, 'size'),
    getPanesSizeSum(panesList, 0, panesList.length - 1))

  const visibilityList = getVisibilityArray(panesList)
  const lastVisibleIndex = visibilityList.pop() as number
  const resizer = resizersList[lastVisibleIndex]

  if (resizer && resizer.visibility) {
    let sizeChange = resizer.setVisibility(false)
    for (let i = lastVisibleIndex; i > -1; i--) {
      sizeChange = panesList[i].addVisibilitySize(sizeChange)
    }
  }
  console.log('After 2----------------------------------', getList(panesList, 'size'),
    getPanesSizeSum(panesList, 0, panesList.length - 1))
  setUISizesFn(panesList)
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) => {
  for (const resizer of resizersList) {
    resizer.setVisibility(visibility)
  }
}
