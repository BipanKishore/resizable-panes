import {IResizableItem} from '../@types'
import {LEFT, RIGHT} from '../constant'
import {consoleIds} from './development-util'

export const findNextVisibleResizer = (items : IResizableItem[], start: number) => {
  for (let i = start; i < items.length; i++) {
    const item = items[i]

    if (item.isHandle && item.visibility) {
      return item
    }
  }
}

export const findPrevVisibleResizer = (items : IResizableItem[], start: number) => {
  for (let i = start; i > -1; i--) {
    const item = items[i]

    if (item.isHandle && item.visibility) {
      return item
    }
  }
}

export const getPartialHiddenItems = (items : IResizableItem[]) => {
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

export const getFirstVisiblePaneIndexAndHideAllBeforeIt = (items: IResizableItem[]) => {
  const firstVisiblePaneIndex = items.findIndex((i) => !i.isHandle && i.visibility)

  for (let i = 1; i < firstVisiblePaneIndex; i += 2) {
    items[i].setVisibility(false)
  }

  return firstVisiblePaneIndex
}

export const setVisibilityOfLeftResizers = (items: IResizableItem[], start: number) => {
  for (let a = start + 2; a < items.length; a += 2) {
    const {visibility} = items[a]
    const inBetweenResizer = items[a - 1]
    inBetweenResizer?.setVisibility(visibility)
  }
}

export const getItemsVisibleAndNoPartialHidden = (items : IResizableItem[]) => {
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

export const findNextResizer = (items : IResizableItem[], start: number) => {
  for (let i = start + 1; i < items.length; i++) {
    const item = items[i]
    if (item.isHandle) {
      return i
    }
  }
}

export const getItemsByIndexes = (items : IResizableItem[], indexes: number[]) => {
  const itemsByIndexes = items.filter((_, i) => indexes.includes(i))

  consoleIds(itemsByIndexes)
  return itemsByIndexes
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
    } else {
      if (consecutiveResizers[set].length) {
        ++set
        consecutiveResizers[set] = []
      }
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
