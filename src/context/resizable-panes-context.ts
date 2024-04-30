import {createContext} from 'react'
import {createMap, findById} from '../utils/util'
import {
  DIRECTIONS, MAX_SIZE, MIN_SIZE,
  RATIO, SIZE, VISIBILITY
} from '../constant'
import {
  createPaneModelListAndResizerModelList,
  getPanesAndResizers, restoreDefaultFn, setDownMaxLimits,
  setUISizesFn, setUpMaxLimits, syncAxisSizesFn
} from '../utils/panes'
import {
  calculateAxes, setVirtualOrderList, movingLogic, setCurrentMinMax,
  toRatioModeFn
} from '../utils/resizable-pane'
import {getDirection, getSizeStyle, toArray} from '../utils/dom'
import {ResizeStorage} from '../utils/storage'
import {
  IKeyToBoolMap, IResizableContext
  , IResizablePaneProviderProps
} from '../@types'
import {PaneModel, ResizableModel} from '../models'
import {consoleGetSize} from '../utils/development-util'
import {setVisibilityFn} from '../utils/visibility-helper'
import {fixPartialHiddenResizer, setResizersLimits} from '../utils/resizer'

export const getResizableContext = (props: IResizablePaneProviderProps): IResizableContext => {
  const {
    vertical, children, unit,
    uniqueId, storageApi,
    onResizeStop, onChangeVisibility
  } = props

  const myChildren = toArray(children)

  // reference will never change for these items: storage,
  // panesList, PaneModels, resizersList, ResizerModels
  const storage = new ResizeStorage(uniqueId, storageApi, myChildren)
  const items = createPaneModelListAndResizerModelList(myChildren, props, storage)
  // const resizersList = createResizerModelList(myChildren, props, storage)
  // reference will never change for these items: storage, panesList, resizersList

  const {panesList, resizersList} = getPanesAndResizers(items)

  const contextDetails = new ResizableModel()
  contextDetails.register({
    vertical,
    items,
    panesList,
    resizersList
  })

  const syncAxisSizes = () => syncAxisSizesFn(items)

  const registerItem = (api: any, id: string) => {
    findById(items, id)
      .register(api)
  }

  const registerContainer = ({getContainerRect}: any) => {
    contextDetails.getContainerRect = getContainerRect
    let visibilityMap = props.visibility
    if (storage.empty && unit === RATIO && !contextDetails.isSetRatioMode) {
      toRatioModeFn(contextDetails)
      contextDetails.isSetRatioMode = true
    } else {
      const {panes} = storage.getStorage()
      visibilityMap = createMap(panes, VISIBILITY)
    }
    setVisibility(visibilityMap)
  }

  const getIdToSizeMap = () => createMap(panesList, SIZE)

  const setMouseDownDetails = ({mouseCoordinate}: any, handleId: string) => {
    contextDetails.register({
      handleId,
      direction: DIRECTIONS.NONE,
      axisCoordinate: mouseCoordinate
    })
    syncAxisSizes()
  }

  const calculateAndSetHeight = (e: any) => {
    const {movement} = e
    if (movement) {
      setDirection(e)
      const isChangeRequired = setAxisConfig(e)

      if (isChangeRequired) {
        movingLogic(e, contextDetails)
      }
      contextDetails.newVisibilityModel = false
      setUISizesFn(items, contextDetails.direction)
      panesList.forEach((item) => item.syncRatioSizeToSize())
    }
  }

  const setDirection = (e: any) => {
    const {direction} = contextDetails
    const currentDirection = getDirection(e)

    if (currentDirection !== direction) {
      contextDetails.direction = currentDirection
      directionChangeActions(e)
    }
  }

  const directionChangeActions = (e: any) => {
    contextDetails.axisCoordinate = e.mouseCoordinate

    setVirtualOrderList(contextDetails)
    setResizersLimits(contextDetails)
    syncAxisSizes()
    setCurrentMinMax(contextDetails)
    calculateAxes(contextDetails)
  }

  const setAxisConfig = (e: any) => {
    const {virtualActiveIndex, virtualOrderList, topAxis, bottomAxis} = contextDetails

    if (e.mouseCoordinate <= topAxis) {
      setUpMaxLimits(virtualOrderList, virtualActiveIndex)
      syncAxisSizes()
      contextDetails.axisCoordinate = topAxis
      return false
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(virtualOrderList, virtualActiveIndex)
      syncAxisSizes()
      contextDetails.axisCoordinate = bottomAxis
      return false
    }
    return true
  }

  const getPaneSizeStyle = (id: string) => {
    const size = findById(panesList, id)?.getSize()
    return getSizeStyle(vertical, size as number)
  }

  // It is getting default empty Object param
  const setVisibility = (param: IKeyToBoolMap) => {
    // it can be removed with change in default props
    const oldVisibilityMap = createMap(panesList, VISIBILITY)

    const newMap = {
      ...oldVisibilityMap,
      ...param
    }

    const {
      newVisibilityModel
    } = contextDetails

    if (!newVisibilityModel) {
      contextDetails.newVisibilityModel = true
      panesList.forEach((pane: PaneModel) => pane.setOldVisibilityModel())
    }

    setVisibilityFn(contextDetails, newMap)
    const visibilityMap = createMap(panesList, VISIBILITY)

    // storage.setStorage(contextDetails)
    const sisesMap = getIdToSizeMap()
    if (onResizeStop) {
      onResizeStop(sisesMap)
    }
    if (onChangeVisibility) {
      onChangeVisibility(visibilityMap)
    }

    storage.setStorage(contextDetails)
  }

  const onMoveEndFn = () => {
    const resizeParams = getIdToSizeMap()
    if (onResizeStop) {
      onResizeStop(resizeParams)
    }

    fixPartialHiddenResizer(contextDetails)
    storage.setStorage(contextDetails)
    consoleGetSize(items)
  }

  const restoreDefault = () => restoreDefaultFn(contextDetails)
  const getState = () => createMap(panesList, SIZE, VISIBILITY, MIN_SIZE, MAX_SIZE)

  const getVisibilities = () => createMap(panesList, VISIBILITY)

  const api = {
    restoreDefault,
    setVisibility,
    getSizes: getIdToSizeMap,
    getVisibilities,
    getState
  }

  return {
    api,
    onMoveEndFn,
    registerItem,
    registerContainer,
    getIdToSizeMap,
    setMouseDownDetails,
    vertical,
    calculateAndSetHeight,
    props,
    contextDetails,
    storage,
    getPaneSizeStyle,
    setVisibility
  }
}

export const ResizablePaneContext = createContext({})
