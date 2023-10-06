import {useEffect} from 'react'
import {
  restoreDefaultFn,
  setVisibilityFn
} from '../utils/api'
import {IGetMaP, IGetMapApiParam, IKeyToBoolMap, IResizableContext} from '../@types'
import {createMap} from '../utils/util'
import {VISIBILITY} from '../constant'

export const useResizableApi = (context: IResizableContext, props: any) => {
  const {contextDetails, setVisibility} = context

  const {
    onReady
  } = props

  const restoreDefault = () => restoreDefaultFn(contextDetails)

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
