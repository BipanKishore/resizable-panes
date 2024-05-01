import React from 'react'
import {joinClassName} from '../../../src/utils/dom'
import {VISIBLE, ZIPPED} from '../../../src/constant'

const statesClassOrange = {
  visible: 'bg-orange-500',
  zipped: 'bg-orange-300',
  hidden: 'bg-orange-100'
}

export const MultiStateButton = ({name, statesClass = statesClassOrange, state, onClick}: any) => {
  const onClickBtn = () => {
    const newState = ![VISIBLE, ZIPPED].includes(state)
    onClick({
      name,
      checked: newState
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
