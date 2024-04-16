import {useEffect} from 'react'
import {
  restoreDefaultFn
} from '../utils/api'
import {IGetMaP, IGetMapApiParam, IPaneModelKey, IResizableContext} from '../@types'
import {createMap} from '../utils/util'

export const useResizableApi = (context: IResizableContext, props: any) => {
  const {contextDetails, setVisibility} = context
  const {
    onReady
  } = props

  const restoreDefault = () => restoreDefaultFn(contextDetails)

  const getState = (): IGetMaP =>
    createMap(contextDetails.panesList, 'size', 'visibility', 'defaultMinSize', 'defaultMaxSize')

  useEffect(() => {
    const api = {
      restoreDefault,
      setVisibility,
      getState,
      getMap: (...keys: IPaneModelKey[]) => createMap(contextDetails.panesList, ...keys)
    }

    onReady(api)
  }, [context])
}
