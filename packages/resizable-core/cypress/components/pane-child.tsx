import React, {useEffect, useState} from 'react'
import {getHookMethod} from '../utils'
import {LOADING_TEXT, LOADED_TEXT} from '../utils/constants'

interface IPaneChild {
  hook: string
}

export const PaneChild = (props: IPaneChild) => {
  const {hook} = props
  const createHook = getHookMethod(hook)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (
    <div className="d-flex text-align-center">
      {
                isLoading
                  ? <h2 data-cy={createHook('loading')}>{LOADING_TEXT}</h2>
                  : <h2 data-cy={createHook('loaded')}>{LOADED_TEXT}</h2>
    }
      <br />
    </div>
  )
}
