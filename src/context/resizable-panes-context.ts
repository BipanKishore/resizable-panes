import {createContext} from 'react'
import {createMap, findById} from '../utils/util'
import {
  DIRECTIONS,
  DEFAULT_MAX_SIZE_KEY,
  DEFAULT_MIN_SIZE_KEY,
  RATIO,
  SET_SIZE,
  SIZE,
  VISIBILITY
} from '../constant'
import {
  createPaneModelListAndResizerModelList,
  getPanesAndResizers,
  getVisibilityState,
  emitIfChangeInPartialHiddenState,
  restoreFn,
  setUISizesFn,
  syncAxisSizesFn,
  updatSizeStateAllPanes,
  setMaxLimits
} from '../utils/panes'
import {
  calculateAxes,
  setVirtualOrderList,
  movingLogic,
  setCurrentMinMax,
  toRatioModeAllPanes,
  getChangeInViewSize
} from '../utils/resizable-pane'
import {getDirection, getSizeStyle, toArray} from '../utils/dom'
import {ResizeStorage, setStorage} from '../utils/storage'
import {
  IClearFlagsParam,
  IKeyToBoolMap,
  IResizableContext,
  IResizableEvent,
  IResizablePaneProviderProps,
  ISetSizeBehaviour
} from '../@types'
import {ResizableModel} from '../models'
import {setVisibilityFn} from '../utils/visibility-helper'
import {fixPartialHiddenResizer, setResizersLimits} from '../utils/resizer'
import {setSizeMethod} from '../utils/set-size-helper'
import {
  getSize, registerResizableItem, setPaneOldVisibilityModel,
  synSizeToMaxSize, synSizeToMinSize, syncPaneRatioSizeToSize
} from '../models/pane'

export const getResizableContext = (
  props: IResizablePaneProviderProps
): IResizableContext => {
  const {
    vertical,
    children,
    unit,
    uniqueId,
    storageApi,
    zipping,
    onResizeStop,
    onChangeVisibility,
    onResize
  } = props

  const myChildren = toArray(children)

  // reference will never change for these items: storage,
  // panesList, PaneModels, resizersList, ResizerModels
  const storage = new ResizeStorage(uniqueId, storageApi, myChildren)
  const items = createPaneModelListAndResizerModelList(
    myChildren,
    props,
    storage
  )
  // const resizersList = createResizerModelList(myChildren, props, storage)
  // reference will never change for these items: storage, panesList, resizersList

  const [panesList, resizersList] = getPanesAndResizers(items)

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
  const emitResizeStopAndStore = () => {
    const resizeParams = getIdToSizeMap()
    onResizeStop(resizeParams)
    setStorage(uniqueId, storageApi, resizable)
  }

  const emitChangeVisibility = () => {
    const map = getVisibilityState(panesList)
    onChangeVisibility(map)
  }

  const registerItem = (api: any, id: string) => {
    registerResizableItem(findById(items, id), api)
  }

  const registerContainer = (getContainerRect: any) => {
    resizable.getContainerRect = getContainerRect
    let visibilityMap = props.visibility
    if (storage.empty && unit === RATIO && !resizable.isSetRatioMode) {
      toRatioModeAllPanes(resizable)
      resizable.isSetRatioMode = true
    } else {
      const {panes} = storage.getStorage(uniqueId, storageApi)
      visibilityMap = createMap(panes, VISIBILITY)
    }
    setVisibilities(visibilityMap)
  }

  const getIdToSizeMap = () => createMap(panesList, SIZE)

  const setMouseDownDetails = ([mouseCoordinate]: IResizableEvent, handleId: string) => {
    resizable.register({
      handleId,
      direction: DIRECTIONS.NONE,
      axisCoordinate: mouseCoordinate
    })
    syncAxisSizes()
  }

  const clearflagsOnNewView = (except: IClearFlagsParam = '') => {
    if (except !== RATIO) {
      panesList.forEach(syncPaneRatioSizeToSize)
    }
    if (except !== VISIBILITY) {
      resizable.newVisibilityModel = false
    }
    if (except !== SET_SIZE) {
      resizable.setSizeKey = null
    }
  }

  const onNewView = (except: IClearFlagsParam = '') => {
    clearflagsOnNewView(except)
    updatSizeStateAllPanes(panesList)
  }

  const calculateAndSetHeight = ([mouseCoordinate, movement]: IResizableEvent) => {
    if (resizable.isViewSizeChanged || !movement) {
      return
    }

    setDirection(mouseCoordinate, movement)
    const isAxisLimitReached = setAxisConfig(mouseCoordinate)

    if (isAxisLimitReached) {
      movingLogic(mouseCoordinate, resizable)
    }
    setUISizesFn(items, resizable.direction)
    onNewView()
    emitIfChangeInPartialHiddenState(panesList, emitChangeVisibility)
    emitResize()
  }

  const setDirection = (mouseCoordinate: number, movement: number) => {
    const {direction} = resizable
    const currentDirection = getDirection(movement)

    if (currentDirection !== direction) {
      resizable.direction = currentDirection
      directionChangeActions(mouseCoordinate)
    }
  }

  const directionChangeActions = (mouseCoordinate: number) => {
    resizable.axisCoordinate = mouseCoordinate

    setVirtualOrderList(resizable)
    if (zipping) {
      setResizersLimits(resizable)
    }

    syncAxisSizes()
    setCurrentMinMax(resizable)
    calculateAxes(resizable)
  }

  const setAxisConfig = (mouseCoordinate: number) => {
    const {topAxis, bottomAxis} = resizable

    if (mouseCoordinate <= topAxis) {
      setMaxLimits(resizable, synSizeToMinSize, synSizeToMaxSize, DIRECTIONS.UP)
      syncAxisSizes()
      resizable.axisCoordinate = topAxis
      return false
    } else if (mouseCoordinate >= bottomAxis) {
      setMaxLimits(resizable, synSizeToMaxSize, synSizeToMinSize, DIRECTIONS.DOWN)
      syncAxisSizes()
      resizable.axisCoordinate = bottomAxis
      return false
    }
    return true
  }

  const getPaneSizeStyle = (id: string) => {
    const size = getSize(findById(panesList, id))
    return getSizeStyle(vertical, size)
  }

  const reflectVisibilityChange = () => {
    setUISizesFn(items, DIRECTIONS.NONE)
    emitResizeStopAndStore()
    emitChangeVisibility()
    onNewView(VISIBILITY)
  }

  // It is getting default empty Object param
  const setVisibilities = (param: IKeyToBoolMap) => {
    const {newVisibilityModel} = resizable

    const currentVisibilityMap = createMap(panesList, VISIBILITY)

    const newMap = {
      ...currentVisibilityMap,
      ...param
    }

    if (!newVisibilityModel) {
      resizable.newVisibilityModel = true
      panesList.forEach(setPaneOldVisibilityModel)
    }

    setVisibilityFn(resizable, newMap)
    const changeInViewSize = getChangeInViewSize(resizable)
    resizable.isViewSizeChanged = !!changeInViewSize
    reflectVisibilityChange()
  }

  const onMoveEndFn = () => {
    fixPartialHiddenResizer(resizable)
    emitResizeStopAndStore()
  }

  const restore = () => {
    restoreFn(resizable.items)
    onNewView()
    emitResizeStopAndStore()
    emitChangeVisibility()
  }

  const getState = () =>
    createMap(panesList, SIZE, VISIBILITY, DEFAULT_MIN_SIZE_KEY, DEFAULT_MAX_SIZE_KEY)
  const getVisibilities = () => getVisibilityState(panesList)

  const setSize = (
    id: string,
    newSize: number,
    behavior?: ISetSizeBehaviour
  ) => {
    setSizeMethod(resizable, id, newSize, behavior)

    setUISizesFn(items, DIRECTIONS.NONE)
    emitIfChangeInPartialHiddenState(panesList, emitChangeVisibility)
    emitResizeStopAndStore()
    onNewView(SET_SIZE)
  }

  const api = {
    restore,
    setVisibilities,
    getSizes: getIdToSizeMap,
    getVisibilities,
    getState,
    setSize
  }

  return {
    api,
    onMoveEndFn,
    registerItem,
    registerContainer,
    setMouseDownDetails,
    vertical,
    calculateAndSetHeight,
    props,
    resizable,
    getPaneSizeStyle
  }
}

export const ResizablePaneContext = createContext({})
