import React from 'react'
import {MultiStateButton} from './multi-state-button'

export const MultiStateButtonGroup = ({stateMap, onClick}: any) => {
  return (
    <div className='d-flex justify-context m-10'>
      {Object
        .keys(stateMap)
        .map((id) => (
          <MultiStateButton
            key={id}
            name={id}
            state={stateMap[id]}
            onClick={onClick}
          />
        ))}
    </div>
  )
}
