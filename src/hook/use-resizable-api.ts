import {useEffect} from 'react'
import {
  restoreDefaultFn,
  setVisibilityFn
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

  const restoreDefault = () => restoreDefaultFn(contextDetails)

  const setVisibility = (param: IKeyToBoolMap) => {
    const {
      panesList, newVisibilityModel,
      resizersList
    } = contextDetails

    if (!newVisibilityModel) {
      contextDetails.newVisibilityModel = true
      panesList.forEach(pane => pane.setOldVisibilityModel())
      resizersList.forEach(resizer => resizer.setOldVisibilityModel())
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
      restoreDefault,
      setVisibility,
      getMap
    }

    onReady(api)
  }, [context])
}
