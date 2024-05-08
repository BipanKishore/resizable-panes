import {createContext} from 'react'
import {createMap, findById} from '../utils/util'
import {
  DIRECTIONS,
  DEFAULT_MAX_SIZE,
  DEFAULT_MIN_SIZE,
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
  setDownMaxLimits,
  setUISizesFn,
  setUpMaxLimits,
  syncAxisSizesFn,
  updatSizeStateAllPanes
} from '../utils/panes'
import {
  calculateAxes,
  setVirtualOrderList,
  movingLogic,
  setCurrentMinMax,
  toRatioModeFn,
  getIsViewSizeChanged
} from '../utils/resizable-pane'
import {getDirection, getSizeStyle, toArray} from '../utils/dom'
import {ResizeStorage} from '../utils/storage'
import {
  IClearFlagsParam,
  IKeyToBoolMap,
  IResizableContext,
  IResizableEvent,
  IResizablePaneProviderProps,
  ISetSizeBehaviour
} from '../@types'
import {PaneModel, ResizableModel} from '../models'
import {consoleGetSize} from '../utils/development-util'
import {setVisibilityFn} from '../utils/visibility-helper'
import {fixPartialHiddenResizer, setResizersLimits} from '../utils/resizer'
import {setSizeMethod} from '../utils/set-size-helper'

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

  const {panesList, resizersList} = getPanesAndResizers(items)

  const resizable = new ResizableModel()
  resizable.register({
    vertical,
    items,
    panesList,
    resizersList
  })

  const syncAxisSizes = () => syncAxisSizesFn(items)
  const updateSizeStates = () => updatSizeStateAllPanes(panesList)

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
    findById(items, id).register(api)
  }

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
    setVisibilities(visibilityMap)
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

  const clearflagsOnNewView = (except: IClearFlagsParam = '') => {
    if (except !== RATIO) {
      panesList.forEach((item) => item.syncRatioSizeToSize())
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
    updateSizeStates()
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
    onNewView()
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
    const {virtualActiveIndex, virtualOrderList, topAxis, bottomAxis} =
      resizable

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
    const size = findById(panesList, id).getSize()
    return getSizeStyle(vertical, size as number)
  }

  const reflectVisibilityChange = () => {
    setUISizesFn(items, DIRECTIONS.NONE)
    emitResizeStop()
    emitChangeVisibility()
    storage.setStorage(resizable)
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

  const restore = () => {
    restoreFn(resizable.items)
    onNewView()
    storage.setStorage(resizable)
    emitResizeStop()
    emitChangeVisibility()
  }

  const getState = () =>
    createMap(panesList, SIZE, VISIBILITY, DEFAULT_MIN_SIZE, DEFAULT_MAX_SIZE)
  const getVisibilities = () => getVisibilityState(panesList)

  const setSize = (
    id: string,
    newSize: number,
    behavior?: ISetSizeBehaviour
  ) => {
    setSizeMethod(resizable, id, newSize, behavior)

    setUISizesFn(items, DIRECTIONS.NONE)
    consoleGetSize(items)
    emitIfChangeInPartialHiddenState(panesList, emitChangeVisibility)
    emitResizeStop()
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
    getPaneSizeStyle
  }
}

export const ResizablePaneContext = createContext({})
