import {IKeyToBoolMap, IResizableItem} from '../@types'
import {LEFT, MINUS, PLUS, RIGHT} from '../constant'
import {ResizableModel, PaneModel} from '../models'
import {consoleGetSize} from './development-util'
import {
  change1PixelToPanes, getItemsByIndexes,
  getPanesSizeSum, getVisibleItems
} from './panes'
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

export const setVisibilityOfResizers = (contextDetails: ResizableModel) => {
  const {items} = contextDetails

  const firstVisiblePaneIndex = getFirstVisiblePaneIndexAndHideAllBeforeIt(items)

  if (firstVisiblePaneIndex === -1) {
    setVisibilityOfLeftResizers(items, 0)
  }

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
// actionList it can be removed
export const setSizesAfterVisibilityChange = (
  allVisiblePanes: PaneModel[],
  maxPaneSize: number,
  actionVisibleList: PaneModel[] = allVisiblePanes
) => {
  const currentPanesSize = getPanesSizeSum(allVisiblePanes)
  const sizeChange = maxPaneSize - currentPanesSize

  console.log('setSizesAfterVisibilityChange', maxPaneSize, currentPanesSize, sizeChange)
  if (sizeChange === 0 || actionVisibleList.length === 0) {
    return
  }
  changeSizeInRatio(allVisiblePanes, actionVisibleList, sizeChange, maxPaneSize)
}

export const changeSizeInRatio = (allVisiblePanes: PaneModel[], actionVisibleList: PaneModel[],
  sizeChange: number, maxPaneSize: number) => {
  const operation = sizeChange > 0 ? PLUS : MINUS

  const sizeChangeAbsolute = Math.abs(sizeChange)

  if (sizeChangeAbsolute <= actionVisibleList.length) {
    change1PixelToPanes(actionVisibleList, sizeChangeAbsolute, operation)
    return
  }

  const ratioSum = getPanesSizeSum(actionVisibleList)

  const nextActionVisibleList: PaneModel[] = []
  actionVisibleList.forEach((pane) => {
    const size = pane.getSize()
    const newSize = Math.round(sizeChangeAbsolute * (size / ratioSum))

    const remainingSize = pane.setVisibilitySize(newSize, operation)
    if (remainingSize) {
      nextActionVisibleList.push(pane)
    }
  })

  setSizesAfterVisibilityChange(allVisiblePanes, maxPaneSize, nextActionVisibleList)
}

export const setVisibilityFn = (contextDetails: ResizableModel, idMap: IKeyToBoolMap) => {
  const {
    panesList, items
  } = contextDetails

  panesList.forEach((pane) => {
    pane.syncToOldVisibilityModel()
    const {id} = pane
    const visibility = idMap[id]
    pane.setVisibility(visibility)
  })

  setVisibilityOfResizers(contextDetails)

  const {maxPaneSize} = getMaxContainerSizes(contextDetails)
  const visiblePanes = getVisibleItems(panesList)
  setSizesAfterVisibilityChange(visiblePanes, maxPaneSize)

  consoleGetSize(items)
}
