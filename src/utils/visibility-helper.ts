import {IKeyToBoolMap, IResizableItem} from '../@types'
import {CHANGE, LEFT, NONE, RIGHT} from '../constant'
import {ResizableModel, PaneModel} from '../models'
import {getSize, setPaneVisibility, setVisibilitySize, syncPaneToOldVisibilityModel} from '../models/pane'
import {
  change1PixelToPanes, getItemsByIndexes,
  getItemsSizeSum, getVisibleItems
} from './panes'
import {getMaxContainerSizes} from './resizable-pane'

const findNextVisibleResizer = (items: IResizableItem[], start: number) => {
  for (let i = start; i < items.length; i++) {
    const item = items[i]

    if (item.isHandle && item.visibility) {
      return item
    }
  }
}

const findPrevVisibleResizer = (items: IResizableItem[], start: number) => {
  for (let i = start; i > -1; i--) {
    const item = items[i]

    if (item.isHandle && item.visibility) {
      return item
    }
  }
}

const getPartialHiddenItems = (items: IResizableItem[]) => {
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
    setPaneVisibility(items[i], false)
  }

  return firstVisiblePaneIndex
}

const setVisibilityOfLeftResizers = (items: IResizableItem[], start: number) => {
  for (let a = start + 2; a < items.length; a += 2) {
    const {visibility} = items[a]
    const inBetweenResizer = items[a - 1]
    setPaneVisibility(inBetweenResizer, visibility)
  }
}

const getItemsVisibleAndNoPartialHidden = (items: IResizableItem[]) => {
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

const findNextResizer = (items: IResizableItem[], start: number) => {
  for (let i = start + 1; i < items.length; i++) {
    const item = items[i]
    if (item.isHandle) {
      return i
    }
  }
}

export const findConsecutiveAdjacentResizer = (items: IResizableItem[], indexes: number[]) => {
  const itemsByIndexes = getItemsByIndexes(items, indexes)

  const consecutiveResizers: number[][] = [[]]
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
        setPaneVisibility(itemsByIndexes[i], true, true)
      }
    })
  })

  return consecutiveResizers
}

export const setVisibilityOfResizers = (resizable: ResizableModel) => {
  const {items} = resizable

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
            setPaneVisibility(r, true, true)
          }
          break

        case item.visibility && item.hiddenResizer === RIGHT:
          r = findNextVisibleResizer(items, i + 1)
          oppoR = findPrevVisibleResizer(items, i)

          if (oppoR) {
            setPaneVisibility(r, true, true)
          }

          break
      }
    }
  })
  // need to change name
  getItemsVisibleAndNoPartialHidden(items)
}
// actionList it can be removed
export const updateSizeInRatio = (
  allVisiblePanes: PaneModel[],
  maxPaneSize: number,
  actionVisibleList: PaneModel[]
) => {
  const currentPanesSize = getItemsSizeSum(allVisiblePanes)
  const sizeChange = maxPaneSize - currentPanesSize

  if (sizeChange === 0 || actionVisibleList.length === 0) {
    return
  }

  const operation = sizeChange > 0 ? CHANGE.ADD : CHANGE.REMOVE

  const sizeChangeAbsolute = Math.abs(sizeChange)

  if (sizeChangeAbsolute <= actionVisibleList.length) {
    change1PixelToPanes(actionVisibleList, sizeChangeAbsolute, operation)
    return
  }

  const ratioSum = getItemsSizeSum(actionVisibleList)

  const nextActionVisibleList: PaneModel[] = []
  actionVisibleList.forEach((pane) => {
    const size = getSize(pane)
    const newSize = Math.round(sizeChangeAbsolute * (size / ratioSum))

    const remainingSize = setVisibilitySize(pane, newSize, operation)
    if (remainingSize) {
      nextActionVisibleList.push(pane)
    }
  })

  updateSizeInRatio(allVisiblePanes, maxPaneSize, nextActionVisibleList)
}

export const getResizerIndex = (pane: PaneModel, index: number) => {
  const resizerIndex = index + pane.hiddenResizer === RIGHT ? 1 : -1
  return resizerIndex
}

// eslint-disable-next-line complexity
export const setVisibilityFn = (resizable: ResizableModel, idMap: IKeyToBoolMap) => {
  const {
    panesList, items, zipping
  } = resizable

  panesList.forEach((pane) => {
    syncPaneToOldVisibilityModel(pane)
    const {id} = pane
    setPaneVisibility(pane, idMap[id])
  })

  const visiblePanes = getVisibleItems(panesList)
  const currentPanesSize = getItemsSizeSum(visiblePanes)
  const visibleItems = getVisibleItems(items)
  if (currentPanesSize === 0) {
    visibleItems.forEach((pane, index) => {
      if (!pane.isHandle) {
        pane.size = 1
        setPaneVisibility(visibleItems[getResizerIndex(pane, index)], true)
        pane.hiddenResizer = NONE
      }
      // resizable.newVisibilityModel = true
    })
  }

  if (zipping) {
    setVisibilityOfResizers(resizable)
  } else {
    let first = -1
    for (let i = 0; i < items.length; i += 2) {
      const item = items[i]
      setPaneVisibility(items[i + 1], false)
      if (item.visibility) {
        if (first !== -1) {
          setPaneVisibility(items[i - 1], true)
        }
        first = i
      }
    }
  }

  const {maxPaneSize} = getMaxContainerSizes(resizable)

  updateSizeInRatio(visiblePanes, maxPaneSize, visiblePanes)
}
