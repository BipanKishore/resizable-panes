import React, {useRef, useState} from 'react'

import '../../styles/style.css'
import {ResizablePanes} from 'resizable-panes-react'
import {testResizablePanesId} from './constant'
import {MultiStateButtonGroup} from './multi-state-button-group'
import {addDefaultProps} from '../../utils'

interface IIDMap {
  [id: string]: boolean
}

export const ResizableComponentCustomPanesTestWrapper = (props: any) => {
  const currentProps = addDefaultProps(props, {
    uniqueId: testResizablePanesId
  })

  const {children, visibility = {}, ...otherProps} = currentProps
  const [paneVisibilityState, setPaneVisibilityState] = useState(visibility)

  const [visibilityMap, setVisibilityMap] = useState<IIDMap>(visibility)

  const [resizablePanesVisibility, setResizablePanesVisibility] = useState(true)

  const apiRef = useRef <any>({})

  const onRestore = () => {
    setVisibilityMap(visibility)
    apiRef.current.restore()
  }

  const updateVisibilityMap = (e: any) => {
    const {name, checked} = e
    const newVisibilityMap = {
      ...visibilityMap,
      [name]: checked
    }
    setVisibilityMap(newVisibilityMap)
  }

  return (
    <div className='h-100p w-100p' >

      <div className='d-flex justify-content-center m-10'>
        <button
          data-cy="hide-resizable-panes"
          onClick={() => setResizablePanesVisibility(!resizablePanesVisibility)}
        >
          {resizablePanesVisibility ? 'Hide All' : 'Show'}
        </button>

        <button
          data-cy="restore-default"
          onClick={onRestore}
        >
          Restore Default
        </button>

        <button
          data-cy="get-map"
          onClick={() => apiRef.current.getState()}
        >
          Get State
        </button>
      </div>

      <div className='h-300 w-100p'>
        {
          resizablePanesVisibility &&
          <ResizablePanes
            visibility={visibilityMap}
            onReady={(api) => {
              apiRef.current = api
            }}
            {...otherProps}
            onChangeVisibility={setPaneVisibilityState}
          >
            {children}
          </ResizablePanes>
        }

      </div>

      <MultiStateButtonGroup stateMap={paneVisibilityState} onClick={updateVisibilityMap} />

    </div>
  )
}
