import {createContext} from 'react'
import {createMap, findById} from '../utils/util'
import {DIRECTIONS, RATIO, SIZE, VISIBILITY, ZERO} from '../constant'
import {
  createPaneModelListAndResizerModelList,
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
  const {
    vertical, children, unit,
    uniqueId, storageApi,
    onResizeStop, onChangeVisibility
  } = props

  const myChildren = toArray(children)

  // reference will never change for these items: storage,
  // panesList, PaneModels, resizersList, ResizerModels
  const storage = new ResizeStorage(uniqueId, storageApi, myChildren)
  const [panesList, resizersList] = createPaneModelListAndResizerModelList(myChildren, props, storage)
  // const resizersList = createResizerModelList(myChildren, props, storage)
  // reference will never change for these items: storage, panesList, resizersList

  console.log(
    resizersList
  )

  const contextDetails: any = {
    vertical,
    panesList,
    resizersList,
    isSetRatioMode: false,
    newVisibilityModel: false
  }

  const syncAxisSizes = () => syncAxisSizesFn(panesList)

  const setUISizes = () => setUISizesOfAllElement(panesList, resizersList)

  const setCurrentMinMaxAndAxes = (index?: number) => {
    setCurrentMinMax(contextDetails, index)
    minMaxTotal(contextDetails)
  }

  const setActiveIndex = (index: number) => {
    contextDetails.activeIndex = index
  }

  const registerPane = (pane: any, id:string) => {
    const index = findIndexInChildrenbyId(myChildren, id)
    panesList[index].register(pane)
  }

  const registerResizer = (resizer: any, id: string) => {
    const index = findIndexInChildrenbyId(myChildren, id)

    if (index < (myChildren).length - 1) {
      resizersList[index].register(resizer)
    }
  }

  const registerContainer = ({getContainerRect}: any) => {
    contextDetails.getContainerRect = getContainerRect
    if (storage.empty && unit === RATIO && !contextDetails.isSetRatioMode) {
      toRatioModeFn(contextDetails)
      contextDetails.isSetRatioMode = true
    }
  }

  const getIdToSizeMap = () => createMap(panesList, SIZE)

  const setMouseDownDetails = ({mouseCoordinate}: any, id: string) => {
    const index = findIndexInChildrenbyId(myChildren, id)
    setActiveIndex(index)
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
      setUISizes()
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
    syncAxisSizes()
    setCurrentMinMaxAndAxes()
  }

  const setAxisConfig = (e: any) => {
    const {activeIndex} = contextDetails
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

  return {
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
