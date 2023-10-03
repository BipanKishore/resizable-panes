import {useEffect} from 'react'
import {
  closeFullSizeFn, restoreDefaultFn,
  setVisibilityFn, toFullPageFn, toFullSizeFn
} from '../utils/api'
import {IGetMaP, IGetMapApiParam, IKeyToBoolMap, IResizableContext} from '../@types'
import {createMap} from '../utils/util'
import {VISIBILITY} from '../constant'

export const useResizableApi = (context: IResizableContext, props: any) => {
  const {getIdToSizeMap, storage, contextDetails} = context

  const {
    onReady,
    onChangeVisibility, onResizeStop
  } = props

  const toFullPage = (paneId: string) => toFullPageFn(contextDetails.panesList, paneId)

  const toFullSize = (paneId: string) => toFullSizeFn(contextDetails, paneId)

  const closeFullSize = () => closeFullSizeFn(contextDetails)

  const restoreDefault = () => restoreDefaultFn(contextDetails)

  const setVisibility = (param: IKeyToBoolMap) => {
    const {
      panesList, newVisibilityModel
    } = contextDetails

    if (!newVisibilityModel) {
      contextDetails.newVisibilityModel = true
      panesList.forEach(pane => pane.setOldVisibilityModel())
    }

    setVisibilityFn(contextDetails, param)
    const visibilityMap = createMap(contextDetails.panesList, VISIBILITY)

    storage.setStorage(context)
    const sisesMap = getIdToSizeMap()
    onResizeStop(sisesMap)
    onChangeVisibility(visibilityMap)
  }

  const getMap = (...keys: IGetMapApiParam[]): IGetMaP => {
    return createMap(contextDetails.panesList, ...keys)
  }

  useEffect(() => {
    const api = {
      toFullSize,
      closeFullSize,
      restoreDefault,
      toFullPage,
      setVisibility,
      getMap
    }

    onReady(api)
  }, [context])
}
