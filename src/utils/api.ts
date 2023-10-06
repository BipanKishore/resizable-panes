import {IContextDetails, IKeyToBoolMap, IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {setUISizesFn} from './panes'
import {visibilityOperation, visibilityOperationHideResizer} from './resizable-pane'
import {findIndex} from './util'

// Need to check for hidden element
export const restoreDefaultFn = ({panesList, resizersList}: IServiceRef) => {
  panesList.forEach((pane) => pane.restore())
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList)
}

const getLastVisibleResizerIndexToHide = (panesList: boolean[]) => {
  const indexList: number[] = []
  for (let i = 0; i < panesList.length; i++) {
    if (panesList[i]) {
      indexList.push(i)
    }
  }
  return indexList.pop() as number
}

const mapToArrayOrder = (panesList:PaneModel[], idMap: IKeyToBoolMap) => {
  return panesList.map((pane) => Boolean(idMap[pane.id]))
}

// eslint-disable-next-line complexity
export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList
  } = contextDetails
  console.log('v----------------------setVisibilityFnsetVisibilityFnsetVisibilityFn ')
  panesList.forEach((pane) => pane.syncToOldVisibilityModel())
  resizersList.forEach(resizer => resizer.syncToOldVisibilityModel())

  const newVisibilityList: boolean[] = mapToArrayOrder(panesList, idMap)
  const lastVisibleIndex = getLastVisibleResizerIndexToHide(newVisibilityList)

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id])

    newVisibilityList.push(visibility)
    const index = findIndex(panesList, id)

    const sizeChange = pane.setVisibility(visibility) as number

    visibilityOperation(index, panesList, sizeChange, visibility)
  }

  for (let i = 0; i < panesList.length; i++) {
    if (i === lastVisibleIndex) {
      continue
    }
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id])
    const index = findIndex(panesList, id)

    const resizerSizeChange = resizersList[index].setVisibility(visibility)

    visibilityOperation(index, panesList, resizerSizeChange, visibility)
  }

  if (lastVisibleIndex !== undefined && resizersList[lastVisibleIndex].visibility) {
    const resizerSizeChange = resizersList[lastVisibleIndex].setVisibility(false)
    visibilityOperationHideResizer(lastVisibleIndex, panesList, resizerSizeChange, false)
  }

  console.log('v----------------------setUISizesFnsetUISizesFnsetUISizesFnsetUISizesFn ')
  setUISizesFn(panesList)
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) => {
  for (const resizer of resizersList) {
    resizer.setVisibility(visibility)
  }
}
