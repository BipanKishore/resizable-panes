import {IHiddenResizer, IResizableItem} from '../@types'
import {LEFT, RIGHT, DIRECTIONS, NONE, CHANGE} from '../constant'
import {ResizableModel} from '../models'
import {changePaneSize, restoreLimits, syncAxisSize} from '../models/pane'
import {setUISizesFn} from './panes'
import {findIndex, isItDown, isItUp, reverse} from './util'

export const setResizersLimits = (resizable: ResizableModel) => {
  const {direction, virtualOrderList, handleId} = resizable

  const virtualActionList = isItUp(direction) ? reverse(virtualOrderList) : virtualOrderList

  const handleIdIndex = findIndex(virtualActionList, handleId)

  virtualActionList.forEach((item, index) => {
    if (item.isHandle) {
      if (index <= handleIdIndex) {
        item.defaultMinSize = item.size
        item.defaultMaxSize = item.defaultSize
      }
      if (index > handleIdIndex) {
        item.defaultMinSize = virtualActionList[index - 1].defaultMinSize === 0 ? 0 : item.defaultSize
        item.defaultMaxSize = item.defaultSize
      }
    }
  })
}

// We increases the size of element in opposite direction than in the direction
export const fixPartialHiddenResizer = (resizable: ResizableModel) => {
  const {items} = resizable

  items.forEach(
    // eslint-disable-next-line complexity
    (item, index) => {
      let sizeChange = item.size
      if (item.isHandle && item.defaultSize !== sizeChange && sizeChange) {
        item.size = 0
        let virtualIndex
        const resizingOrder: IResizableItem[] = []

        if (items[index + 1].hiddenResizer === LEFT) {
          virtualIndex = index + 1
          const resizingOrderLeftOver = items.slice(0, virtualIndex).reverse()
          resizingOrder.push(...items.slice(virtualIndex + 1), ...resizingOrderLeftOver)
        } else if (items[index - 1].hiddenResizer === RIGHT) {
          virtualIndex = index - 1
          const resizingOrderLeftOver = items.slice(virtualIndex + 1)
          resizingOrder.push(...items.slice(0, virtualIndex).reverse(), ...resizingOrderLeftOver)
        }

        const visibleItems = resizingOrder.filter((item) => item.size)
        visibleItems.forEach(syncAxisSize)

        visibleItems.forEach((item) => {
          restoreLimits(item)
          // None is right for this
          sizeChange = changePaneSize(item, sizeChange, CHANGE.ADD, DIRECTIONS.NONE)
        })

        setUISizesFn(items, DIRECTIONS.NONE)
      }
    }
  )
}

// It fixes if two resizers face earch other
export const fixFacingHiddenResizersOrder = (items: IResizableItem[], direction: number) => {
  let prevItemHiddenResizerOrder: IHiddenResizer = NONE

  const fixFacingHiddenResizersOrderLogic = (item: IResizableItem) => {
    if (!item.isHandle) {
      if (prevItemHiddenResizerOrder !== NONE && item.hiddenResizer !== NONE) {
        item.hiddenResizer = prevItemHiddenResizerOrder
      }
      prevItemHiddenResizerOrder = item.hiddenResizer
    }
  }

  if (isItUp(direction)) {
    const upOrderList = [...items].reverse()
    upOrderList.forEach(fixFacingHiddenResizersOrderLogic)
  }

  if (isItDown(direction)) {
    items.forEach(fixFacingHiddenResizersOrderLogic)
  }
}
