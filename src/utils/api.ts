import {IContextDetails, IKeyToBoolMap} from '../@types'
import {DIRECTIONS, MINUS, PLUS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {ResizerModel} from '../models/resizer-model'
import {
  change1PixelToPanes, getPanesSizeSum,
  getSizeByIndexes, setUISizesFn
} from './panes'
import {getMaxContainerSizes} from './resizable-pane'

// Need to check for hidden element
export const restoreDefaultFn = ({items}: any) => {
  items.forEach((pane: PaneModel) => pane.restore())
  setUISizesFn(items, DIRECTIONS.DOWN)
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

export const setVisibilityFn = (contextDetails: IContextDetails, idMap: IKeyToBoolMap) => {
  const {
    panesList, resizersList, items
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

  hideResizers(contextDetails)

  const {maxPaneSize} = getMaxContainerSizes(contextDetails)

  visibilityOperationFn(panesList, visiblePanesIndexes, maxPaneSize)

  setUISizesFn(items, DIRECTIONS.NONE)
}

// aIndex - PreviousIndex
// bIndex - NextIndex
// eslint-disable-next-line complexity
const hideSingleResizer = (
  contextDetails: IContextDetails, aIndex: number, bIndex: number, completeVisibilityList: any[]) => {
  const preResizer = completeVisibilityList[aIndex] as ResizerModel
  const nextResizer = completeVisibilityList[bIndex] as ResizerModel

  const runForNext = (visibilityNextResizer: boolean) => {
    if (visibilityNextResizer) {
      completeVisibilityList[bIndex].visibility = false
    } else {
      hideSingleResizer(contextDetails, aIndex, bIndex + 2, completeVisibilityList)
    }
  }

  const runForPre = (visibilityPreResizer: boolean) => {
    if (visibilityPreResizer) {
      completeVisibilityList[aIndex].visibility = false
    } else {
      hideSingleResizer(contextDetails, aIndex - 2, bIndex, completeVisibilityList)
    }
  }

  switch (true) {
    case Boolean(preResizer) && Boolean(nextResizer):

      switch (true) {
        case preResizer.isPartiallyHidden && nextResizer.isPartiallyHidden:
          if (preResizer.visibility) {
            completeVisibilityList[aIndex].visibility = false
          } else if (nextResizer.visibility) {
            completeVisibilityList[bIndex].visibility = false
          } else {
            hideSingleResizer(contextDetails, aIndex - 2, bIndex + 2, completeVisibilityList)
          }
          break

        case preResizer.isPartiallyHidden:
          runForPre(preResizer.visibility)
          break

        case nextResizer.isPartiallyHidden:
          runForNext(nextResizer.visibility)
          break

        default:
          if (preResizer.visibility) {
            completeVisibilityList[aIndex].visibility = false
          } else if (nextResizer.visibility) {
            completeVisibilityList[bIndex].visibility = false
          } else {
            hideSingleResizer(contextDetails, aIndex - 2, bIndex + 2, completeVisibilityList)
          }
      }

      break
    case Boolean(preResizer): // For Last two panes
      completeVisibilityList[aIndex].visibility = false
      break
    case Boolean(nextResizer): // For first two panes
      completeVisibilityList[bIndex].visibility = false
      break
  }
}

const hideResizers = (contextDetails: IContextDetails) => {
  const {items} = contextDetails

  const completeVisibilityList: any[] = items
    .map(({isPartiallyHidden}) => ({visibility: true, isPartiallyHidden}))

  for (let i = 0; i < items.length; i += 2) {
    const {visibility, id} = items[i]
    completeVisibilityList[i] = {visibility, id}

    if (!visibility) {
      hideSingleResizer(contextDetails, i - 1, i + 1, completeVisibilityList)
    }
  }

  for (let i = 0; i < items.length; i += 1) {
    const resizer = items[i]
    if (resizer.isHandle) {
      resizer.setVisibility(completeVisibilityList[i].visibility)
    }
  }

  console.log(
    'completeVisibilityList', completeVisibilityList
  )

  searchAndMakeVisiblePartialHiddenResizer(contextDetails)
}

// eslint-disable-next-line complexity
export const searchAndMakeVisiblePartialHiddenResizer = (contextDetails: IContextDetails) => {
  const {items} = contextDetails

  for (let i = 0; i < items.length; i++) {
    const resizer = items[i]
    if (resizer.isHandle) {
      if (resizer.isPartiallyHidden) {
        const aPane = items[i - 1]
        const bPane = items[i + 1]
        if (aPane.size && bPane.size) {
          console.log('searchPartialHiddenResizer', resizer.id)
          resizer.isPartiallyHidden = false
          resizer.size = resizer.defaultSize
        }
      }
    }
  }
}
