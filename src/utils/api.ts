import {IContextDetails, IKeyToBoolMap} from '../@types'
import {MINUS, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {
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
    panesList, resizersList
  } = contextDetails

  panesList.forEach((pane) => pane.syncToOldVisibilityModel())

  // console.log('Before  ', getList(panesList, 'size'), getSum(panesList, n => n.getSize()))

  const paneVisibilityList: number[] = []

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id]) // may not required
    const index = findIndex(panesList, id)

    if (visibility) {
      paneVisibilityList.push(index)
    }
    pane.setVisibility(visibility)
  }

  const lastVisibleIndex = [...paneVisibilityList].pop()

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    const visibility = Boolean(idMap[id])
    const index = findIndex(panesList, id)
    if (!resizersList[index]) {
      continue
    }
    if (i === lastVisibleIndex) {
      resizersList[index].setVisibility(false)
    } else {
      resizersList[index].setVisibility(visibility)
    }
  }

  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  visibilityOperationFn(panesList, paneVisibilityList, maxPaneSize)

  setUISizesOfAllElement(panesList, resizersList)
}

export const setResizersVisibility = (resizersList: ResizerModel[], visibility: boolean) => {
  for (const resizer of resizersList) {
    resizer.setVisibility(visibility)
  }
}
