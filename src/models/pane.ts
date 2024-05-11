import {IResizerApi, ISizeState, IStoreResizableItemsModel} from '../@types'
import {
  CHANGE,
  DEFAULT_MAX_SIZE_KEY,
  DEFAULT_MIN_SIZE_KEY,
  MAX_SIZE_STATE, MIN_SIZE_STATE, NORMAL_SIZE_STATE,
  RATIO, SIZE, VISIBILITY
} from '../constant'
import {filterKeys, ratioAndRoundOff} from '../utils/util'
import {PaneModel} from './pane-model'
import {checkPaneModelErrors} from './utils'

export const changePaneSizePlain = (pane: PaneModel, newSize: number) => {
  const {minSize, maxSize} = pane
  let acceptedSize = pane.minSize
  if (newSize >= minSize && newSize <= maxSize) {
    acceptedSize = newSize
  } else if (newSize > maxSize) {
    acceptedSize = maxSize
  }
  pane.size = acceptedSize
  return acceptedSize
}

export const changePaneSize = (pane: PaneModel, sizeChange: number,
  operation: number) => {
  const {axisSize} = pane
  const newSize = axisSize + (operation === CHANGE.ADD ? sizeChange : -sizeChange)

  const acceptedSize = changePaneSizePlain(pane, newSize)
  return Math.abs(acceptedSize - newSize)
}

// No visibility check required here, we are only using this method for visible panes
export const setVisibilitySize = (pane: PaneModel, sizeChange: number,
  operation: number) => {
  const newSize = pane.size + (operation === CHANGE.ADD ? sizeChange : -sizeChange)
  restoreLimits(pane)
  const acceptedSize = changePaneSizePlain(pane, newSize)
  return acceptedSize === newSize
}

const setVisibilityHelper = (pane: PaneModel, isPartiallyHidden: boolean) => {
  if (pane.isHandle) {
    pane.size = isPartiallyHidden ? 0 : pane.resizerSize
  }
}

export const setPaneVisibility = (pane: PaneModel, visibility: boolean, isPartiallyHidden = false) => {
  if (pane) {
    pane.visibility = visibility
    if (visibility) {
      pane.maxSize = pane.defaultMaxSize
      pane.minSize = pane.defaultMinSize
      setVisibilityHelper(pane, isPartiallyHidden)
    } else {
      pane.maxSize = 0
      pane.minSize = 0
    }
    if (pane.api && pane.api.destroy) { pane.api.destroy(visibility) }
  }
}

export const setPaneOldVisibilityModel = (pane: PaneModel) => {
  pane.oldVisibleSize = pane.size
  pane.oldVisibility = pane.visibility
}

export const syncPaneToOldVisibilityModel = (pane: PaneModel) => {
  pane.size = pane.oldVisibleSize
  pane.visibility = pane.oldVisibility
}

export const storePaneForNewSetSizeKey = (pane: PaneModel) => {
  pane.initialSetSize = pane.size
}

export const restorePaneBeforeSetSize = (pane: PaneModel) => {
  pane.size = pane.initialSetSize
}

export const syncPaneSizeToRatioSize = (pane: PaneModel) => {
  pane.size = pane.sizeRatio
  pane.defaultMinSize = pane.minSizeRatio
  pane.defaultMaxSize = pane.maxSizeRatio
}

export const syncPaneRatioSizeToSize = (pane: PaneModel) => {
  pane.sizeRatio = pane.size
  pane.minSizeRatio = pane.defaultMinSize
  pane.maxSizeRatio = pane.defaultMaxSize
}

export const restorePane = (pane: PaneModel) => {
  pane.size = pane.defaultSize
  restoreLimits(pane)
  setPaneVisibility(pane, pane.defaultVisibility)
}

export const restoreLimits = (pane: PaneModel) => {
  pane.minSize = pane.defaultMinSize
  pane.maxSize = pane.defaultMaxSize
}

// pane method runs only for visible panes
export const resetMax = (pane: PaneModel) => {
  pane.maxSize = pane.defaultMaxSize
  return pane.maxSize
}

// pane method runs only for visible panes
export const resetMin = (pane: PaneModel) => {
  pane.minSize = pane.defaultMinSize
  return pane.minSize
}

export const synMaxToSize = (pane: PaneModel) => {
  pane.maxSize = pane.size
  return pane.size
}

export const synMinToSize = (pane: PaneModel) => {
  pane.minSize = pane.size
  return pane.size
}

// pane method runs only for visible panes
export const getMinDiff = (pane: PaneModel) => {
  return pane.size - pane.defaultMinSize
}

export const getMaxDiff = (pane: PaneModel) => {
  return pane.defaultMaxSize - pane.size
}

export const synSizeToMinSize = (pane: PaneModel) => {
  pane.size = pane.minSize
}

export const synSizeToMaxSize = (pane: PaneModel) => {
  pane.size = pane.maxSize
}

export const syncAxisSize = (pane: PaneModel) => {
  pane.axisSize = pane.size
}

// export const setPreSize = (pane: PaneModel) => {
//   pane.size = pane.preSize
// }

// Task will run  for only visible Items
export const setUISize = (pane: PaneModel) => {
  // if (pane.api) {
  pane.api.setSize(getSize(pane))

  // pane.preSize = pane.size
}

// eslint-disable-next-line complexity
export const updatSizeState = (pane: PaneModel) => {
  if (pane.visibility && !pane.isHandle) {
    const {size, id} = pane

    let newSetSize : ISizeState
    if (size === pane.defaultMaxSize) {
      newSetSize = MAX_SIZE_STATE
    } else if (size === pane.defaultMinSize) {
      newSetSize = MIN_SIZE_STATE
    } else {
      newSetSize = NORMAL_SIZE_STATE
    }

    if (pane.sizeState !== newSetSize) {
      pane.props[newSetSize](id, size)
      pane.sizeState = newSetSize
    }
  }
}

export const getStoreModel = (pane: PaneModel): IStoreResizableItemsModel => {
  const t = filterKeys(pane, 'id', SIZE,
    'defaultSize', DEFAULT_MIN_SIZE_KEY, VISIBILITY, 'storedSize')
  return {
    ...t,
    [DEFAULT_MAX_SIZE_KEY]: pane[DEFAULT_MAX_SIZE_KEY].toString()
  }
}

export const getSize = (pane: PaneModel) => {
  return pane.visibility ? pane.size : 0
}

export const getRatioSize = (pane: PaneModel) => {
  return pane.visibility ? pane.sizeRatio : 0
}

export const initializeSize = (pane: PaneModel, size: number) => {
  pane.size = size
  pane.storedSize = size
}

export const initializeSizes = (pane: PaneModel, size: number, minSize: number, maxSize: number,
  defaultSize: number, storedSize: number, visibility: boolean) => {
  initializeSize(pane, size)
  pane.defaultSize = defaultSize
  pane.minSize = minSize
  pane.maxSize = maxSize
  pane.defaultMinSize = minSize
  pane.defaultMaxSize = maxSize
  pane.storedSize = storedSize
  pane.visibility = visibility
}

// We never come here for the case of store
export const toRatioModePane = (
  pane: PaneModel, containerSize: number,
  maxRatioValue: number, isOnResize: boolean) => {
  const {
    minSize, size, maxSize
  } = pane.props

  // need optimization
  const [minSizeToUse, sizeToUse, maxSizeToUse] = isOnResize
    ? [pane.minSizeRatio, pane.size, pane.maxSizeRatio]
    : [minSize, size, maxSize]

  const storeSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, sizeToUse)

  let minSizeCalculated, maxSizeCalculated
  if (pane.minMaxUnit !== RATIO) {
    minSizeCalculated = pane.defaultMinSize
    maxSizeCalculated = pane.defaultMaxSize
  } else {
    minSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, minSizeToUse)
    maxSizeCalculated = ratioAndRoundOff(containerSize, maxRatioValue, maxSizeToUse)
  }

  if (!isOnResize) {
    if (pane.minMaxUnit !== RATIO) {
      checkPaneModelErrors(storeSizeCalculated, minSizeCalculated, maxSizeCalculated, pane.id)
    } else {
      checkPaneModelErrors(size, minSize, maxSize, pane.id)
    }
  }

  initializeSizes(pane, storeSizeCalculated, minSizeCalculated,
    maxSizeCalculated, storeSizeCalculated, storeSizeCalculated, pane.visibility)
}

export const registerResizableItem = (pane: PaneModel, api: IResizerApi) => {
  pane.api = api
  if (pane.isHandle) {
    const size = pane.resizerSize
    api.setSize(size)
    initializeSizes(pane, size, size, size, size, size, pane.visibility)
  }
}
