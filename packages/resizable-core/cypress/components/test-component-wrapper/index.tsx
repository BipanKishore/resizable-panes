import React, {useRef, useState} from 'react'

import '../../styles/style.css'
import {Pane, ResizablePanes} from 'resizable-panes-react'
import {CustomResizerFirst} from '../custom-resizer'

const VERTICAL_CONTAINER_WIDTH = 1000 + 4 * 10

const resizablePanesId = 'simple-visibility-operation'
export const ENUMS = {
  resizablePanesId,
  initialVisibility: {
    P0: true,
    P1: true,
    P2: true,
    P3: true,
    P4: true
  },
  initialSize: {
    [resizablePanesId]: VERTICAL_CONTAINER_WIDTH,
    'resizer-P0': 10,
    'resizer-P1': 10,
    'resizer-P2': 10,
    'resizer-P3': 10,
    P0: 100,
    P1: 300,
    P2: 200,
    P3: 300,
    P4: 100
  }
}

interface IIDMap {
  [id: string]: boolean
}

export const TestComponentWrapper = (props: any) => {
  const {vertical = true} = props
  const [visibilityMap, setVisibilityMap] = useState<IIDMap>(ENUMS.initialVisibility)
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

  const onRestore = () => {
    setVisibilityMap(ENUMS.initialVisibility)
    apiRef.current.restore()
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

      <div
        className='h-300 w-100p'
      >

        {
          resizablePanesVisibility &&
          <ResizablePanes
            className=''
            resizer={
              <CustomResizerFirst horizontal={!vertical} size={10} />
            }
            resizerSize={10}
            storageApi={localStorage}
            uniqueId={ENUMS.resizablePanesId}
            vertical={vertical}
            visibility={visibilityMap}
            onReady={(api) => {
              apiRef.current = api
            }}
          >
            <Pane className='bg-red-500' id='P0' size={1}>
              P0
            </Pane>

            <Pane className='bg-orange-500' id='P1' size={3}>
              P1
            </Pane>

            <Pane className='bg-lime-500' id='P2' size={2}>
              P2
            </Pane>

            <Pane className='bg-orange-500' id='P3' size={3}>
              P3
            </Pane>

            <Pane className='bg-red-500' id='P4' size={1}>
              P4
            </Pane>

          </ResizablePanes>
        }

      </div>

      <div className=' d-flex justify-context'>
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
