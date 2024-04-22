import {useEffect} from 'react'
import {
  restoreDefaultFn
} from '../utils/api'
import {IResizableContext} from '../@types'
import {createMap} from '../utils/util'

export const useResizableApi = (context: IResizableContext, props: any) => {
  const {contextDetails, setVisibility} = context
  const {panesList} = contextDetails
  const {
    onReady
  } = props

  const restoreDefault = () => restoreDefaultFn(contextDetails)

  const getState = () =>
    createMap(panesList, 'size', 'visibility', 'defaultMinSize', 'defaultMaxSize')

  const getSizes = () => createMap(panesList, 'size')
  const getVisibilitys = () => createMap(panesList, 'visibility')

  useEffect(() => {
    const api = {
      restoreDefault,
      setVisibility,
      getSizes,
      getVisibilitys,
      getState
    }

    onReady(api)
  }, [context])
}
