import {useEffect} from 'react'
import {closeFullSizeFn, restoreDefaultFn, setVisibilityFn, toFullPageFn, toFullSizeFn} from '../utils/api'
import {IContextDetails, IKeyToBoolMap} from '../@types'
import {createMap, getIdsKey} from '../utils/util'
import {PaneModel} from '../models/pane-model'

export const useResizableApi = (context: any, props: any) => {
  const contextDetails = context.contextDetails as IContextDetails
  const {onReady, onChangeVisibility} = props
  const toFullPage = (paneId: string) => {
    toFullPageFn(contextDetails.panesList, paneId)
  }

  const toFullSize = (paneId: string) => {
    toFullSizeFn(contextDetails, paneId)
  }

  const closeFullSize = () => {
    closeFullSizeFn(contextDetails)
  }

  const restoreDefault = () => {
    restoreDefaultFn(contextDetails)
  }

  const setVisibility = (param: IKeyToBoolMap) => {
    const {
      panesList, newVisibilityModel
    } = contextDetails

    if (!newVisibilityModel) {
      contextDetails.newVisibilityModel = true
      panesList.forEach((pane) => pane.setOldVisibilityModel())
    }

    setVisibilityFn(contextDetails, param)
    const visibilityMap = createMap(contextDetails.panesList, 'visibility')

    context.storage.setStorage(context)
    onChangeVisibility(visibilityMap)
  }

  useEffect(() => {
    const api = {
      toFullSize,
      closeFullSize,
      restoreDefault,
      toFullPage,
      setVisibility
    }

    onReady(api)
  }, [context])
}
