import {IKeyToBoolMap, IResizableItem} from '../@types'
import {DIRECTIONS, LEFT, MINUS, PLUS, RIGHT} from '../constant'
import {ResizablePanesModel, PaneModel} from '../models'
import {consoleGetSize} from './development-util'
import {change1PixelToPanes, getItemsByIndexes, getPanesSizeSum, getSizeByIndexes, setUISizesFn} from './panes'
import {getMaxContainerSizes} from './resizable-pane'

const findNextVisibleResizer = (items : IResizableItem[], start: number) => {
  for (let i = start; i < items.length; i++) {
    const item = items[i]

    if (item.isHandle && item.visibility) {
      return item
    }
  }
}

const findPrevVisibleResizer = (items : IResizableItem[], start: number) => {
  for (let i = start; i > -1; i--) {
    const item = items[i]

    if (item.isHandle && item.visibility) {
      return item
    }
  }
}

const getPartialHiddenItems = (items : IResizableItem[]) => {
  const partialHiddenItems: number[] = []

  items.forEach((item, i) => {
    if (!item.isHandle) {
      if (item.hiddenResizer === LEFT) {
        partialHiddenItems.push(i - 1, i)
      }

      if (item.hiddenResizer === RIGHT) {
        partialHiddenItems.push(i, i + 1)
      }
    }
  })

  return partialHiddenItems
}

const getFirstVisiblePaneIndexAndHideAllBeforeIt = (items: IResizableItem[]) => {
  const firstVisiblePaneIndex = items.findIndex((i) => !i.isHandle && i.visibility)

  for (let i = 1; i < firstVisiblePaneIndex; i += 2) {
    items[i].setVisibility(false)
  }

  return firstVisiblePaneIndex
}

const setVisibilityOfLeftResizers = (items: IResizableItem[], start: number) => {
  for (let a = start + 2; a < items.length; a += 2) {
    const {visibility} = items[a]
    const inBetweenResizer = items[a - 1]
    inBetweenResizer?.setVisibility(visibility)
  }
}

const getItemsVisibleAndNoPartialHidden = (items : IResizableItem[]) => {
  const partialHiddenItems = getPartialHiddenItems(items)
  const itemsVisibleAndNoPartialHidden = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (!partialHiddenItems.includes(i) && item.visibility) {
      itemsVisibleAndNoPartialHidden.push(i)
    }
  }

  findConsecutiveAdjacentResizer(items, itemsVisibleAndNoPartialHidden)

  return itemsVisibleAndNoPartialHidden
}

const findNextResizer = (items : IResizableItem[], start: number) => {
  for (let i = start + 1; i < items.length; i++) {
    const item = items[i]
    if (item.isHandle) {
      return i
    }
  }
}

export const findConsecutiveAdjacentResizer = (items : IResizableItem[], indexes: number[]) => {
  const itemsByIndexes = getItemsByIndexes(items, indexes)

  const consecutiveResizers : number[][] = [[]]
  let set = 0

  let nextI

  for (let i = 0; i < itemsByIndexes.length; i++) {
    nextI = findNextResizer(itemsByIndexes, i)
    if (i + 1 === nextI && itemsByIndexes[i].isHandle) {
      consecutiveResizers[set].push(i, nextI)
    } else if (consecutiveResizers[set].length) {
      ++set
      consecutiveResizers[set] = []
    }
  }

  consecutiveResizers.forEach((set) => {
    set.forEach((i, index) => {
      if (index) {
        itemsByIndexes[i].setVisibility(true, true)
      }
    })
  })

  return consecutiveResizers
}

export const setVisibilityOfResizers = (contextDetails: ResizablePanesModel) => {
  const {items} = contextDetails

  const firstVisiblePaneIndex = getFirstVisiblePaneIndexAndHideAllBeforeIt(items)

  // When we are hiding the resizer attached left to pane

  setVisibilityOfLeftResizers(items, firstVisiblePaneIndex)

  let r
  let oppoR
  // eslint-disable-next-line complexity
  items.forEach((item, i) => {
    if (!item.isHandle) {
      switch (true) {
        case item.visibility && item.hiddenResizer === LEFT:
          r = findPrevVisibleResizer(items, i - 1)
          oppoR = findNextVisibleResizer(items, i)
          if (oppoR) {
            r?.setVisibility(true, true)
          }
          break

        case item.visibility && item.hiddenResizer === RIGHT:
          r = findNextVisibleResizer(items, i + 1)
          oppoR = findPrevVisibleResizer(items, i)

          if (oppoR) {
            r?.setVisibility(true, true)
          }

          break
      }
    }
  })
  // need to change name
  getItemsVisibleAndNoPartialHidden(items)
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

export const changeSizeInRatio = (panesList: PaneModel[], actionList: number[],
  sizeChange: number, maxPaneSize: number) => {
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

export const setVisibilityFn = (contextDetails: ResizablePanesModel, idMap: IKeyToBoolMap) => {
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
