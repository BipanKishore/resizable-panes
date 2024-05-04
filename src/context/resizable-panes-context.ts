import {createContext} from 'react'
import {createMap, findById, findIndex} from '../utils/util'
import {
  DIRECTIONS, LEFT, MAX_SIZE, MIN_SIZE,
  NONE,
  RATIO, RIGHT, SIZE, VISIBILITY
} from '../constant'
import {
  createPaneModelListAndResizerModelList,
  getPanesAndResizers, getVisibilityState, emitIfChangeInPartialHiddenState, restoreDefaultFn, setDownMaxLimits,
  setUISizesFn, setUpMaxLimits, syncAxisSizesFn,
  getVisibleItems,
  getPanesSizeSum
} from '../utils/panes'
import {
  calculateAxes, setVirtualOrderList, movingLogic, setCurrentMinMax,
  toRatioModeFn,
  getIsViewSizeChanged
} from '../utils/resizable-pane'
import {getDirection, getSizeStyle, toArray} from '../utils/dom'
import {ResizeStorage} from '../utils/storage'
import {
  IKeyToBoolMap, IResizableContext
  , IResizableEvent, IResizableItem, IResizablePaneProviderProps
} from '../@types'
import {PaneModel, ResizableModel} from '../models'
import {consoleGetSize} from '../utils/development-util'
import {setSizesAfterVisibilityChange, setVisibilityFn} from '../utils/visibility-helper'
import {fixPartialHiddenResizer, setResizersLimits} from '../utils/resizer'

export const getResizableContext = (props: IResizablePaneProviderProps): IResizableContext => {
  const {
    vertical, children, unit,
    uniqueId, storageApi,
    zipping,
    onResizeStop, onChangeVisibility,
    onResize
  } = props

  const myChildren = toArray(children)

  // reference will never change for these items: storage,
  // panesList, PaneModels, resizersList, ResizerModels
  const storage = new ResizeStorage(uniqueId, storageApi, myChildren)
  const items = createPaneModelListAndResizerModelList(myChildren, props, storage)
  // const resizersList = createResizerModelList(myChildren, props, storage)
  // reference will never change for these items: storage, panesList, resizersList

  const {panesList, resizersList} = getPanesAndResizers(items)

  const resizable = new ResizableModel()
  resizable.register({
    vertical,
    items,
    panesList,
    resizersList
  })

  const syncAxisSizes = () => syncAxisSizesFn(items)

  const emitResize = () => {
    const resizeParams = getIdToSizeMap()
    onResize(resizeParams)
  }
  const emitResizeStop = () => {
    const resizeParams = getIdToSizeMap()
    onResizeStop(resizeParams)
  }

  const emitChangeVisibility = () => {
    const map = getVisibilityState(panesList)
    onChangeVisibility(map)
  }

  const registerItem = (api: any, id: string) => {
    findById(items, id)
      .register(api)
  }

  // const clearflagsOnNewView = (except: 'setSizeKey') => {
  //   resizable.newVisibilityModel = false
  //   panesList.forEach((item) => item.syncRatioSizeToSize())
  //   resizable.setSizeKey = null
  // }

  const registerContainer = (getContainerRect: any) => {
    resizable.getContainerRect = getContainerRect
    let visibilityMap = props.visibility
    if (storage.empty && unit === RATIO && !resizable.isSetRatioMode) {
      toRatioModeFn(resizable)
      resizable.isSetRatioMode = true
    } else {
      const {panes} = storage.getStorage()
      visibilityMap = createMap(panes, VISIBILITY)
    }
    setVisibility(visibilityMap)
  }

  const getIdToSizeMap = () => createMap(panesList, SIZE)

  const setMouseDownDetails = ({mouseCoordinate}: any, handleId: string) => {
    resizable.register({
      handleId,
      direction: DIRECTIONS.NONE,
      axisCoordinate: mouseCoordinate
    })
    syncAxisSizes()
  }

  const calculateAndSetHeight = (e: IResizableEvent) => {
    const {movement} = e
    if (resizable.isViewSizeChanged || !movement) {
      return
    }

    setDirection(e)
    const isAxisLimitReached = setAxisConfig(e)

    if (isAxisLimitReached) {
      movingLogic(e, resizable)
    }
    setUISizesFn(items, resizable.direction)
    resizable.newVisibilityModel = false
    panesList.forEach((item) => item.syncRatioSizeToSize())
    emitIfChangeInPartialHiddenState(panesList, emitChangeVisibility)
  }

  const setDirection = (e: IResizableEvent) => {
    const {direction} = resizable
    const currentDirection = getDirection(e)

    if (currentDirection !== direction) {
      resizable.direction = currentDirection
      directionChangeActions(e)
    }
  }

  const directionChangeActions = (e: IResizableEvent) => {
    resizable.axisCoordinate = e.mouseCoordinate

    setVirtualOrderList(resizable)
    if (zipping) {
      setResizersLimits(resizable)
    }

    syncAxisSizes()
    setCurrentMinMax(resizable)
    calculateAxes(resizable)
  }

  const setAxisConfig = (e: IResizableEvent) => {
    const {virtualActiveIndex, virtualOrderList, topAxis, bottomAxis} = resizable

    if (e.mouseCoordinate <= topAxis) {
      setUpMaxLimits(virtualOrderList, virtualActiveIndex)
      syncAxisSizes()
      resizable.axisCoordinate = topAxis
      return false
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(virtualOrderList, virtualActiveIndex)
      syncAxisSizes()
      resizable.axisCoordinate = bottomAxis
      return false
    }
    return true
  }

  const getPaneSizeStyle = (id: string) => {
    const size = findById(panesList, id)?.getSize()
    return getSizeStyle(vertical, size as number)
  }

  const reflectVisibilityChange = () => {
    setUISizesFn(items, DIRECTIONS.NONE)
    emitResizeStop()
    emitChangeVisibility()
    storage.setStorage(resizable)
  }

  // It is getting default empty Object param
  const setVisibility = (param: IKeyToBoolMap) => {
    const {
      newVisibilityModel
    } = resizable

    const currentVisibilityMap = createMap(panesList, VISIBILITY)

    const newMap = {
      ...currentVisibilityMap,
      ...param
    }

    if (!newVisibilityModel) {
      resizable.newVisibilityModel = true
      panesList.forEach((pane: PaneModel) => pane.setOldVisibilityModel())
    }

    setVisibilityFn(resizable, newMap)
    resizable.isViewSizeChanged = getIsViewSizeChanged(resizable)
    reflectVisibilityChange()
  }

  const onMoveEndFn = () => {
    fixPartialHiddenResizer(resizable)
    storage.setStorage(resizable)
    emitResizeStop()
    consoleGetSize(items)
  }

  const restoreDefault = () => {
    restoreDefaultFn(resizable)
    resizable.newVisibilityModel = false
    emitResizeStop()
    emitChangeVisibility()
  }

  const getState = () => createMap(panesList, SIZE, VISIBILITY, MIN_SIZE, MAX_SIZE)
  const getVisibilitiesMap = () => getVisibilityState(panesList)

  // eslint-disable-next-line complexity
  const setSize = (id: string, newSize: number, isSecondAttemp = false) => {
    if (!resizable.setSizeKey) {
      panesList.forEach((pane) => pane.storeForNewSetSizeKey())
    }

    if (resizable.setSizeKey === id) {
      panesList.forEach((pane) => pane.restoreBeforeSetSize())
    }

    resizable.setSizeKey = id

    const visiblePanes = getVisibleItems(panesList)
    const visibleItems = getVisibleItems(items)

    const requestIndex = findIndex(visiblePanes, id)

    if (requestIndex === -1 || newSize < 1) {
      return
    }

    const initialSizeSum = getPanesSizeSum(visiblePanes)

    const pane = visiblePanes[requestIndex]
    const requestIndexInItems = findIndex(visibleItems, id)

    let addOnSizeChange = 0
    let resizer: IResizableItem
    // setting hiddenResizer state to NONE in final State
    if (pane.hiddenResizer === LEFT) {
      resizer = visibleItems[requestIndexInItems - 1]
      resizer.setVisibility(true, false)
      addOnSizeChange = resizer.resizerSize
    } else if (pane.hiddenResizer === RIGHT) {
      resizer = visibleItems[requestIndexInItems + 1]
      resizer.setVisibility(true, false)
      addOnSizeChange = resizer.resizerSize
    }

    pane.restoreLimits()
    pane.setSizeNIsLimitReached(newSize)

    const remainingVisiblePanes = [...visiblePanes]
    remainingVisiblePanes.splice(requestIndex, 1)

    const newMaxPaneSizeAllowd = initialSizeSum - pane.size - addOnSizeChange
    setSizesAfterVisibilityChange(remainingVisiblePanes, newMaxPaneSizeAllowd)

    const nowSizeSum = getPanesSizeSum(visiblePanes)

    if (initialSizeSum === nowSizeSum + addOnSizeChange) {
      pane.hiddenResizer = NONE
      setUISizesFn(items, DIRECTIONS.NONE)
      resizable.newVisibilityModel = false
      panesList.forEach((item) => item.syncRatioSizeToSize())
      emitIfChangeInPartialHiddenState(panesList, emitChangeVisibility)
      consoleGetSize(items)
    } else {
      visibleItems.forEach((item) => item.setPreSize())
      resizer?.setVisibility(true, true)
      if (!isSecondAttemp) {
        const allowedChange = newSize - (nowSizeSum - initialSizeSum + addOnSizeChange)
        setSize(id, allowedChange, true)
      }
    }
  }

  const api = {
    restoreDefault,
    setVisibility,
    getSizesMap: getIdToSizeMap,
    getVisibilitiesMap,
    getState,
    setSize
  }

  return {
    emitResize,
    api,
    onMoveEndFn,
    registerItem,
    registerContainer,
    getIdToSizeMap,
    setMouseDownDetails,
    vertical,
    calculateAndSetHeight,
    props,
    resizable,
    storage,
    getPaneSizeStyle,
    setVisibility
  }
}

export const ResizablePaneContext = createContext({})
