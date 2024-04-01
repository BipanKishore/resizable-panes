import {IContextDetails, IKeyToBoolMap} from '../@types'
import {MINUS, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {getList} from './development-util'
import {
  attachResizersToPaneModels,
  change1PixelToPanes, getPanesSizeSum,
  getSizeByIndexes, setUISizesFn, setUISizesOfAllElement
} from './panes'
import {getMaxContainerSizes} from './resizable-pane'
import {findIndex} from './util'

// Need to check for hidden element
export const restoreDefaultFn = ({panesList, resizersList}: any) => {
  panesList.forEach((pane: PaneModel) => pane.restore())
  setResizersVisibility(resizersList, true)
  setUISizesFn(panesList)
}

export const visibilityOperationFn = (
  panesList: PaneModel[],
  actionList: number[],
  maxPaneSize: number
) => {
  const currentPanesSize = getPanesSizeSum(panesList)
  const sizeChange = maxPaneSize - currentPanesSize

  if (sizeChange === 0 || actionList.length === 0) {
    return
  }

  changeSizeInRatio(panesList, actionList, sizeChange, maxPaneSize)
}

// eslint-disable-next-line max-len
export const changeSizeInRatio = (panesList: PaneModel[], actionList: number[], sizeChange: number, maxPaneSize: number) => {
  const operation = sizeChange > 0 ? PLUS : MINUS

  const sizeChangeAbsolute = Math.abs(sizeChange)

  if (sizeChangeAbsolute <= actionList.length) {
    change1PixelToPanes(panesList, sizeChangeAbsolute, operation)
    return
  }

  const ratioSum = getSizeByIndexes(panesList, actionList)

  const nextActionList: number[] = []
  actionList.forEach((i) => {
    const size = panesList[i].getSize()
    const newSize = Math.round(sizeChangeAbsolute * (size / ratioSum))

    const remainingSize = panesList[i].setVisibilitySize(newSize, operation)
    if (remainingSize === 0) {
      nextActionList.push(i)
    }
  })

  visibilityOperationFn(panesList, nextActionList, maxPaneSize)
}

// eslint-disable-next-line complexity
export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList, items
  } = contextDetails

  const paneVisibilityList: number[] = []

  panesList.forEach((pane, i) => {
    pane.syncToOldVisibilityModel()
    const {id} = pane
    const visibility = Boolean(idMap[id]) // may not required
    if (visibility) {
      paneVisibilityList.push(i)
    }
    pane.setVisibility(visibility)
  })

  const lastVisibleIndex = [...paneVisibilityList].pop()
  attachResizersToPaneModels(contextDetails)

  console.log('attachedResizer ', getList(panesList, 'attachedResizer'))

  const attachedResizerList = getList(panesList, 'attachedResizer').filter(i => i)

  for (let i = 0; i < panesList.length - 1; i++) {
    const pane = panesList[i]
    const {id, attachedResizer} = pane
    const visibility = Boolean(idMap[id])

    const resizer = attachedResizer || (attachedResizerList.includes(resizersList[i]) ? null : resizersList[i])

    if (resizer) {
      resizer.setVisibility(i === lastVisibleIndex ? false : visibility)
    }
  }
  console.log('attachedResizer ', getList(panesList, 'attachedResizer'))

  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  visibilityOperationFn(panesList, paneVisibilityList, maxPaneSize)

  setUISizesOfAllElement(items)
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) =>
  resizersList.forEach(resizer => resizer.setVisibility(visibility))
