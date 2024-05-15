import React from 'react'
import {joinClassName} from '../../../../resizable-core'

const statesClassOrange = {
  true: 'bg-orange-500',
  zipped: 'bg-orange-300',
  false: 'bg-orange-100'
}

export const MultiStateButton = ({name, statesClass = statesClassOrange, state, onClick}: any) => {
  const onClickBtn = () => {
    onClick({
      name,
      checked: !state
    })
  }

  const className = joinClassName({
    'w-44 h-32 f-weight-700 br-5 mh-10': true,
    [statesClass[state]]: true
  })

  return (
    <button
      className={className}
      data-cy={`checkbox-${name}`}
      onClick={onClickBtn}
    >
      {name}
    </button>
  )
}
