import React, {useRef, useState} from 'react'

import '../../styles/style.css'
import {ResizablePanes} from '../../../src'
import {addDefaultProps} from '../../../src/utils/util'
import {testResizablePanesId} from './constant'

interface IIDMap {
  [id: string]: boolean
}

export const ResizableComponentCustomPanesTestWrapper = (props: any) => {
  const currentProps = addDefaultProps(props, {
    uniqueId: testResizablePanesId
  })

  const {children, visibility, ...otherProps} = currentProps

  const [visibilityMap, setVisibilityMap] = useState<IIDMap>(visibility ?? {})

  const [resizablePanesVisibility, setResizablePanesVisibility] = useState(true)

  const apiRef = useRef <any>({})

  const updateVisibilityMap = (e: any) => {
    const {name, checked} = e.currentTarget
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
          onClick={() => apiRef.current.restoreDefault()}
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
          >
            {children}
          </ResizablePanes>
        }

      </div>

      <div className='d-flex justify-context'>
        {Object
          .keys(visibilityMap)
          .map((id) => (

            <label className='m-r-10' htmlFor={id} key={id}>
              <input
                checked={visibilityMap[id]}
                data-cy={`checkbox-${id}`}
                id={id}
                name={id}
                type="checkbox"
                onChange={updateVisibilityMap}
              />
              <span className='m-l-5' >
                {id}
              </span>

            </label>

          ))}
      </div>

    </div>
  )
}
