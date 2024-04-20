// const fixHiddenResizersOrder = (contextDetails: IContextDetails) => {
//   const {items} = contextDetails

import {IResizableItem} from '../@types'
import {consoleIds} from './development-util'

//   for (let i = 0; i < items.length - 2; i++) {
//     const aItem = items[i]
//     const bItem = items[i + 2]
//     if (!aItem.isHandle) {
//       if (aItem.hiddenResizer === 'right' && bItem.hiddenResizer === 'left') {
//         const leftOfA = items[i - 1]
//         const rightOfB = items[i + 3]

//         switch (true) {
//           case leftOfA && rightOfB:
//         }
//       }
//     }
//   }
// }

// export const setVisibilityOfResizers = (contextDetails: IContextDetails, visiblePanesIndexes1: number[]) => {
//   const {items, panesList, resizersList} = contextDetails

//   const partialHiddenIndexes: number[] = []

//   let lastPartialVisiblePaneIndex = -1

//   items.forEach((item, i) => {
//     const {isHandle, hiddenResizer, visibility} = item
//     let resizerIndex
//     if (!isHandle) {
//       if (hiddenResizer === 'left') {
//         resizerIndex = i - 1
//         partialHiddenIndexes.push(i - 1, i)
//         if (visibility) {
//           lastPartialVisiblePaneIndex = i
//         }
//       } else if (hiddenResizer === 'right') {
//         resizerIndex = i + 1
//         partialHiddenIndexes.push(i, i + 1)
//         if (visibility) {
//           lastPartialVisiblePaneIndex = i
//         }
//       }
//       items[resizerIndex]?.setVisibility(visibility, true)
//     }
//   })

//   lastPartialVisiblePaneIndex = lastPartialVisiblePaneIndex / 2

//   const noPartialHiddenItems = items.filter((_, i) => !partialHiddenIndexes.includes(i))

//   console.log('noPartialHiddenItems', noPartialHiddenItems.map((i) => i.id))

//   const panesListNoPartialHiddenLocal = noPartialHiddenItems.filter(p => !p.isHandle)
//   const resizersListLocal = noPartialHiddenItems.filter(p => p.isHandle)
//   const visiblePanesIndexes: number[] = []

//   panesListNoPartialHiddenLocal.forEach((pane, i) => {
//     if (pane.visibility) {
//       visiblePanesIndexes.push(i)
//     }
//   })

//   const visiblePanesIndexesClone = [...visiblePanesIndexes]

//   const lastVisibleIndex = visiblePanesIndexesClone.pop()
//   const secondLastVisibleIndex = visiblePanesIndexesClone.pop()
//   const secondLastId = panesListNoPartialHiddenLocal[secondLastVisibleIndex].id
//   const lastId = panesListNoPartialHiddenLocal[lastVisibleIndex].id

//   const isNoNoPartialHiddenBitweenLastTwo = findIndex(panesList, lastId) + 1 ===
//     findIndex(panesList, secondLastId)

//   console.log('isNoNoPartialHiddenBitweenLastTwo', isNoNoPartialHiddenBitweenLastTwo,
//     secondLastId,
//     findIndex(panesList, secondLastId),
//     lastId,
//     findIndex(panesList, lastId))

//   console.log('visiblePanesIndexes1', visiblePanesIndexes1)
//   const last = visiblePanesIndexes1.pop()
//   const first = visiblePanesIndexes1.shift()
//   console.log('resizersList', first, last)

//   const beforeFinalVisibilityList = noPartialHiddenItems.filter((item) => item.visibility)

//   console.log('beforeFinalVisibilityList', beforeFinalVisibilityList.map((i) => i.id))

//   const firstItem = items[0]
//   const inBetweenResizer = items[1]
//   const secondItem = items[2]

//   const oneMoreLogicRequired = first !== 0 && secondItem.hiddenResizer === 'left'

//   for (let i = oneMoreLogicRequired ? 1 : 0; i < panesListNoPartialHiddenLocal.length; i++) {
//     const pane = panesListNoPartialHiddenLocal[i]
//     const {visibility} = pane
//     console.log('resizersListLocal', pane.id, i, resizersListLocal[i]?.id, visibility, lastVisibleIndex)

//     resizersListLocal[i]?.setVisibility(visibility)
//   }

//   resizersList[last]?.setVisibility(false)

//   console.log('+++++++++++++++++', firstItem.size, secondItem.hiddenResizer)

//   // if (!oneMoreLogicRequired) {
//   //   return
//   // }
//   // if (firstItem.size === 0 && secondItem.hiddenResizer !== 'none') {
//   //   switch (true) {
//   //     case firstItem.visibility && secondItem.visibility:
//   //       break
//   //     case firstItem.visibility:
//   //       inBetweenResizer.setVisibility(true)
//   //       break
//   //     case secondItem.visibility:
//   //       inBetweenResizer.setVisibility(false, true)
//   //       break
//   //     default :
//   //       inBetweenResizer.setVisibility(false)
//   //       items[3].setVisibility(false)
//   //   }
//   // }

//   // const firstVisibleIndex = items.findIndex((item) => item.visibility && !item.isHandle)
//   // console.log('firstVisibleIndex', firstVisibleIndex)
//   // for (let a = 1; a < firstVisibleIndex; a++) {
//   //   if (items[a].isHandle) {
//   //     console.log('items', items[a].id, a, false)
//   //     items[a]?.setVisibility(false)
//   //   }
//   // }

//   // const firstResizerId = resizersListLocal[0].id

//   // const firstResizerIdIndex = findIndex(items, firstResizerId)

//   // console.log('--------------------', resizersListLocal[0].id, firstResizerIdIndex)

//   // let found = false
//   // for (let i = 0; i < firstResizerIdIndex; i++) {
//   //   const item = items[i]
//   //   if (!item.isHandle && item.visibility && item.hiddenResizer !== 'none') {
//   //     found = true
//   //   }
//   // }

//   // if (found === true) {
//   //   items[firstResizerIdIndex]?.setVisibility(true)
//   //   items[firstResizerIdIndex - 2]?.setVisibility(false)
//   // } else {
//   //   items[firstResizerIdIndex]?.setVisibility(false)
//   // }
//   //
// }

// export const setVisibilityOfResizers = (contextDetails: IContextDetails) => {
//   const {items, resizersList} = contextDetails

//   const visiblePanesIndexes1: number[] = []
//   const partialHiddenResizersIndexes: number[] = []

//   const firstVisiblePaneIndex = items.findIndex((i) => !i.isHandle && i.visibility)

//   for (let i = 1; i < firstVisiblePaneIndex; i += 2) {
//     items[i].setVisibility(false)
//   }

//   console.log('visiblePanesIndexes1', visiblePanesIndexes1)

//   const preHR = 'none'
//   let preV = true
//   // When we are hiding the pane with attached left ,it is working fine

//   for (let a = firstVisiblePaneIndex + 2; a < items.length; a += 2) {
//     const firstItem = items[a]
//     const {visibility, size, hiddenResizer, id} = firstItem
//     const inBetweenResizer = items[a - 1]

//     const pH = visibility && size === 0 && hiddenResizer === 'left'
//     const pHR = visibility && size !== 0 && hiddenResizer === 'left'

//     console.log('=======', inBetweenResizer.id, id, 'visibility', visibility, size, hiddenResizer, preV)
//     if (pHR && preV) {
//       inBetweenResizer?.setVisibility(visibility, true)
//     } else if (pH) {
//       inBetweenResizer?.setVisibility(visibility, true)
//     } else {
//       inBetweenResizer?.setVisibility(visibility)
//     }

//     preV = visibility
//   }

//   const visibleItems = items.forEach((i) => i.visibility)
// }

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
      if (item.hiddenResizer === 'left') {
        partialHiddenItems.push(i - 1, i)
      }

      if (item.hiddenResizer === 'right') {
        partialHiddenItems.push(i, i + 1)
      }
    }
  })

  console.log('getPartialHiddenItems', partialHiddenItems)
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
  console.log('itemsVisibleAndNoPartialHidden', partialHiddenItems)

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
  console.log('consecutiveResizers', consecutiveResizers)

  consecutiveResizers.forEach((set) => {
    set.forEach((i, index) => {
      if (index) {
        itemsByIndexes[i].setVisibility(true, true)
      }
    })
  })

  return consecutiveResizers
}
