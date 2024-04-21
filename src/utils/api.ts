/* eslint-disable complexity */
import {IContextDetails, IKeyToBoolMap} from '../@types'
import {DIRECTIONS, MINUS, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {consoleGetSize} from './development-util'
import {
  change1PixelToPanes, getPanesSizeSum,
  getSizeByIndexes, setUISizesFn
} from './panes'
import {getMaxContainerSizes} from './resizable-pane'
import {
  findNextVisibleResizer, findPrevVisibleResizer, getFirstVisiblePaneIndexAndHideAllBeforeIt,
  getItemsVisibleAndNoPartialHidden, setVisibilityOfLeftResizers
} from './visibilit'

// Need to check for hidden element
export const restoreDefaultFn = ({items}: any) => {
  items.forEach((pane: PaneModel) => pane.restore())
  setUISizesFn(items, DIRECTIONS.DOWN)
}

const setSizesAfterVisibilityChange = (
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

  setSizesAfterVisibilityChange(panesList, nextActionList, maxPaneSize)
}

export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, items
  } = contextDetails

  const visiblePanesIndexes: number[] = []

  panesList.forEach((pane, i) => {
    pane.syncToOldVisibilityModel()
    const {id} = pane
    const visibility = idMap[id]
    if (visibility) {
      visiblePanesIndexes.push(i)
    }
    pane.setVisibility(visibility)
  })

  setVisibilityOfResizers(contextDetails)

  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  setSizesAfterVisibilityChange(panesList, visiblePanesIndexes, maxPaneSize)

  setUISizesFn(items, DIRECTIONS.NONE)
  consoleGetSize(items)
}

export const setVisibilityOfResizers = (contextDetails: IContextDetails) => {
  const {items} = contextDetails

  const firstVisiblePaneIndex = getFirstVisiblePaneIndexAndHideAllBeforeIt(items)

  // When we are hiding the pane with attached left ,it is working fine

  setVisibilityOfLeftResizers(items, firstVisiblePaneIndex)

  let r
  let nextR
  let oppoR
  items.forEach((item, i) => {
    if (!item.isHandle) {
      switch (true) {
        case item.visibility && item.hiddenResizer === 'left':
          r = findPrevVisibleResizer(items, i - 1)
          oppoR = findNextVisibleResizer(items, i)
          console.log('power ', item.id, item.hiddenResizer, i - 1, r?.id, oppoR?.id)
          if (oppoR) {
            r?.setVisibility(true, true)
          }
          break

        case item.visibility && item.hiddenResizer === 'right':
          r = findNextVisibleResizer(items, i + 1)
          oppoR = findPrevVisibleResizer(items, i)
          console.log('power ', item.id, item.hiddenResizer, i + 1, r?.id, oppoR?.id)

          if (oppoR) {
            r?.setVisibility(true, true)
          }

          break
      }
    }
  })

  const itemsVisibleAndNoPartialHidden = getItemsVisibleAndNoPartialHidden(items)
}
