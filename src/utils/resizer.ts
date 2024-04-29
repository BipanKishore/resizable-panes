import {IContextDetails, IHiddenResizer, IResizableItem} from '../@types'
import {LEFT, RIGHT, PLUS, DIRECTIONS, NONE} from '../constant'
import {ResizerModel} from '../models/resizer-model'
import {setUISizesFn} from './panes'
import {isItDown, isItUp} from './util'

export const setResizersLimits = (contextDetails: IContextDetails) => {
  const {virtualActiveIndex, direction, virtualOrderList, resizersList} = contextDetails

  resizersList.forEach((item) => {
    item.defaultMinSize = 0
    item.defaultMaxSize = item.defaultSize
  })

  // The bellow logic wont be required if we will put the virtualActiveIndex in increasing side
  const resizerHandle = virtualOrderList[virtualActiveIndex] as ResizerModel
  resizerHandle.defaultMinSize = resizerHandle.defaultSize
  resizerHandle.defaultMaxSize = resizerHandle.defaultSize

  if (isItUp(direction)) {
    virtualOrderList.forEach((item, index) => {
      if (item.isHandle) {
        if (index < virtualActiveIndex) {
          item.defaultMinSize = virtualOrderList[index - 1].defaultMinSize === 0 ? 0 : item.defaultSize
          item.defaultMaxSize = item.defaultSize
        }
        if (index > virtualActiveIndex) {
          item.defaultMinSize = item.size
          item.defaultMaxSize = item.defaultSize
        }
      }
    })
  } else {
    virtualOrderList.forEach((item, index) => {
      if (item.isHandle) {
        if (index < virtualActiveIndex) {
          item.defaultMinSize = item.size
          item.defaultMaxSize = item.defaultSize
        }
        if (index > virtualActiveIndex) {
          item.defaultMinSize = virtualOrderList[index - 1].defaultMinSize === 0 ? 0 : item.defaultSize
          item.defaultMaxSize = item.defaultSize
        }
      }
    })
  }
}

// We increases the size of element in opposite direction than in the direction
export const fixPartialHiddenResizer = (contextDetails: IContextDetails) => {
  const {items} = contextDetails

  let sizeChange = 0
  items.forEach(
    // eslint-disable-next-line complexity
    (item, index) => {
      if (item.isHandle && item.defaultSize !== item.size && item.size) {
        sizeChange = item.size
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
        visibleItems.forEach((item) => item.syncAxisSize())

        visibleItems.forEach((item) => {
          item.restoreLimits()
          // None is right for this
          sizeChange = item.changeSize(sizeChange, PLUS, DIRECTIONS.NONE)
        })

        setUISizesFn(items, item.partialHiddenDirection)
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
