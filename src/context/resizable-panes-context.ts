import {createContext} from 'react'
import {createMap, findById} from '../utils/util'
import {DIRECTIONS, RATIO, SIZE, VISIBILITY, ZERO} from '../constant'
import {
  createPaneModelList,
  createResizerModelList,
  findIndexInChildrenbyId, setDownMaxLimits,
  setUISizesOfAllElement, setUpMaxLimits, syncAxisSizesFn
} from '../utils/panes'
import {
  calculateAxes, goingDownLogic, goingUpLogic, setCurrentMinMax,
  toRatioModeFn
} from '../utils/resizable-pane'
import {minMaxTotal} from '../utils/development-util'
import {getDirection, getSizeStyle, toArray} from '../utils/dom'
import {ResizeStorage} from '../utils/storage'
import {IKeyToBoolMap, IResizableContext, IResizablePaneProviderProps} from '../@types'
import {PaneModel} from '../models/pane-model'
import {setVisibilityFn} from '../utils/api'

export const getResizableContext = (props: IResizablePaneProviderProps): IResizableContext => {
  console.log('Runnging')
  const {
    vertical, children, unit,
    uniqueId, storageApi,
    onResizeStop, onChangeVisibility
  } = props

  const myChildren = toArray(children)

  const storage = new ResizeStorage(uniqueId, storageApi)
  const panesList = createPaneModelList(myChildren, props, storage)
  const contextDetails: any = {
    vertical,
    panesList,
    resizersList: createResizerModelList(myChildren, props, storage),
    isSetRatioMode: false,
    newVisibilityModel: false
  }

  const syncAxisSizes = () => syncAxisSizesFn(contextDetails.panesList)

  const setUISizes = () => setUISizesOfAllElement(contextDetails.panesList, contextDetails.resizersList)

  const setCurrentMinMaxAndAxes = (index?: number) => {
    setCurrentMinMax(contextDetails, index)
    minMaxTotal(contextDetails)
  }

  const setActiveIndex = (index: number) => {
    contextDetails.activeIndex = index
  }

  const registerPane = (pane: any, id:string) => {
    const index = findIndexInChildrenbyId(myChildren, id)
    contextDetails.panesList[index].registerRef(pane)
  }

  const registerResizer = (resizer: any, id: string) => {
    const index = findIndexInChildrenbyId(myChildren, id)

    if (index < (myChildren).length - 1) {
      contextDetails.resizersList[index].register(resizer)
    }
  }

  const registerContainer = ({getContainerRect}: any) => {
    contextDetails.getContainerRect = getContainerRect
    if (storage.empty && unit === RATIO && !contextDetails.isSetRatioMode) {
      toRatioModeFn(contextDetails)
      contextDetails.isSetRatioMode = true
    }
  }

  const getIdToSizeMap = () => createMap(contextDetails.panesList, SIZE)

  const setMouseDownDetails = ({mouseCoordinate}: any, id: string) => {
    const index = findIndexInChildrenbyId(myChildren, id)
    setActiveIndex(index)
    contextDetails.prevDirection = DIRECTIONS.NONE
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
      setUISizes()
    }
  }

  const setDirection = (e: any) => {
    const {prevDirection} = contextDetails
    const direction = getDirection(e)

    if (prevDirection !== direction) {
      directionChangeActions(e)
      contextDetails.prevDirection = direction
    }
  }

  const directionChangeActions = (e: any) => {
    contextDetails.axisCoordinate = e.mouseCoordinate
    syncAxisSizes()
    setCurrentMinMaxAndAxes()
  }

  const setAxisConfig = (e: any) => {
    const {panesList, activeIndex} = contextDetails
    const {
      bottomAxis,
      topAxis
    } = calculateAxes(contextDetails)

    if (e.mouseCoordinate <= topAxis) {
      setUpMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      contextDetails.axisCoordinate = topAxis
      return false
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      contextDetails.axisCoordinate = bottomAxis
      return false
    }
    return true
  }

  const getPaneSizeStyle = (id: string) => {
    const {panesList} = contextDetails
    const size = findById(panesList, id)?.getSize()
    return getSizeStyle(vertical, size as number)
  }

  // eslint-disable-next-line complexity
  const setVisibility = (param: IKeyToBoolMap) => {
    if (!param) {
      return
    }
    const oldVisibilityMap = createMap(contextDetails.panesList, VISIBILITY)

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
      panesList, newVisibilityModel
    } = contextDetails

    if (!newVisibilityModel) {
      contextDetails.newVisibilityModel = true
      panesList.forEach((pane: PaneModel) => pane.setOldVisibilityModel())
    }

    setVisibilityFn(contextDetails, newMap)
    const visibilityMap = createMap(contextDetails.panesList, VISIBILITY)

    // storage.setStorage(contextDetails)
    const sisesMap = getIdToSizeMap()
    if (onResizeStop) { onResizeStop(sisesMap) }
    if (onChangeVisibility) { onChangeVisibility(visibilityMap) }
  }

  return {
    setActiveIndex,
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
