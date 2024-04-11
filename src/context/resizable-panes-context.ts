import {createContext} from 'react'
import {INoop, createMap, findById} from '../utils/util'
import {DIRECTIONS, RATIO, SIZE, VISIBILITY, ZERO} from '../constant'
import {
  createPaneModelListAndResizerModelList,
  findIndexInChildrenbyId, afterMathOfResizerOverlapping, getPanesAndResizers, setDownMaxLimits,
  setResizersLimits,
  setUISizesFn, setUpMaxLimits, syncAxisSizesFn, attachResizersToPaneModels
} from '../utils/panes'
import {
  calculateAxes, setVirtualOrderList, goingDownLogic, goingUpLogic, setCurrentMinMax,
  toRatioModeFn
} from '../utils/resizable-pane'
import {getDirection, getSizeStyle, toArray} from '../utils/dom'
import {ResizeStorage} from '../utils/storage'
import {IKeyToBoolMap, IResizableContext, IResizablePaneProviderProps} from '../@types'
import {PaneModel} from '../models/pane-model'
import {setVisibilityFn} from '../utils/api'

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

  const contextDetails: any = {
    vertical,
    items,
    panesList,
    resizersList,
    isSetRatioMode: false,
    newVisibilityModel: false
  }

  // attachResizersToPaneModels(contextDetails)

  const syncAxisSizes = () => syncAxisSizesFn(items)

  const setActiveIndex = (index: number) => {
    // Pane Index before resizer
    contextDetails.activeIndex = index
  }

  const registerPane = (pane: any, id:string) => {
    const index = findIndexInChildrenbyId(myChildren, id)
    panesList[index].register(pane)
  }

  const registerResizer = (resizer: any, id: string) => {
    const index = findIndexInChildrenbyId(myChildren, id)
    resizersList[index].register(resizer)
  }

  const registerContainer = ({getContainerRect}: any) => {
    contextDetails.getContainerRect = getContainerRect
    if (storage.empty && unit === RATIO && !contextDetails.isSetRatioMode) {
      toRatioModeFn(contextDetails)
      contextDetails.isSetRatioMode = true
    }
  }

  const getIdToSizeMap = () => createMap(panesList, SIZE)

  const setMouseDownDetails = ({mouseCoordinate}: any, resizerId: string) => {
    const resizer = findById(items, resizerId)
    const index = items.indexOf(resizer)

    console.log('setActiveIndex ', resizerId, 'index:', index)

    setActiveIndex(index)
    contextDetails.handleId = resizerId
    contextDetails.direction = DIRECTIONS.NONE
    contextDetails.axisCoordinate = mouseCoordinate
    syncAxisSizes()
  }

  const calculateAndSetHeight = (e: any) => {
    const {movement} = e
    if (movement) {
      setDirection(e)
      const isChangeRequired = setAxisConfig(e)

      if (isChangeRequired) {
        if (movement > ZERO) {
          goingDownLogic(e, contextDetails)
        } else if (movement < ZERO) {
          goingUpLogic(e, contextDetails)
        }
      }
      contextDetails.newVisibilityModel = false
      setUISizesFn(items, contextDetails.direction)
      // console.log('visPartiallyHidden ', getList(resizersList, 'isPartiallyHidden'))
      // console.log('maxSize ', getList(resizersList, 'maxSize'))
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
      console.log('setUpMaxLimits setUpMaxLimits')
      syncAxisSizes()
      contextDetails.axisCoordinate = topAxis
      return false
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(virtualOrderList, virtualActiveIndex)
      console.log('setDownMaxLimits setDownMaxLimits')
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

  // eslint-disable-next-line complexity
  const setVisibility = (param: IKeyToBoolMap) => {
    if (!param) {
      return
    }
    const oldVisibilityMap = createMap(panesList, VISIBILITY)

    const keys = Object.keys(oldVisibilityMap)
    const isNoChange = keys.every((key) => oldVisibilityMap[key] === param[key])
    if (isNoChange) {
      return
    }

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

    afterMathOfResizerOverlapping(contextDetails)
    storage.setStorage(contextDetails)
  }

  return {
    onMoveEndFn,
    registerPane,
    registerResizer,
    registerContainer,
    getIdToSizeMap,
    setMouseDownDetails,
    vertical,
    calculateAndSetHeight,
    props,
    contextDetails,
    storage,
    myChildren,
    getPaneSizeStyle,
    setVisibility
  }
}

export const ResizablePaneContext = createContext({})
