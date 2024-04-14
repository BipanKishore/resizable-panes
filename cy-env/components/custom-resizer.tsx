import React from 'react'
import {joinClassName} from '../../src/utils/dom'

export interface ICustomResizerProp {
  horizontal?: boolean,
  onMouseDown?:any,
  isMouseDown?: boolean,
  onTouchStartCapture?: any,
  name?: string,
  size?: number
}

export const CustomResizerFirst = ({
  horizontal, onMouseDown,
  isMouseDown,
  onTouchStartCapture,
  name, size
}: ICustomResizerProp) => {
  // const isMouseDown = true
  const parentClassName = joinClassName({
    'custom-resizer-1st-parent': true,
    'h-100p flex-column': !horizontal,
    'flex-row': horizontal,
    'p-2px': !isMouseDown,
    'p-3px': isMouseDown,
    'h-10': !size && horizontal,
    'w-10': !size && !horizontal
  })

  const childClassName = joinClassName({
    'br-5 f-weight-800 white bg-slate-500': true,
    'h-70p w-100p vertical-cursur resizer-text-vertical': !horizontal,
    'w-70p h-100p horizontal-cursur': horizontal,
    'f-size-8': isMouseDown,
    'f-size-10': !isMouseDown
  })

  const parentStyle: any = {}

  if (size) {
    if (horizontal) {
      parentStyle.height = `${size}px`
    } else {
      parentStyle.width = `${size}px`
    }
  }

  return (
    <div
      className={parentClassName}
      // style={parentStyle}
    >
      <div
        className={childClassName}
        onMouseDown={onMouseDown}
        onTouchStartCapture={onTouchStartCapture}
      >
        {name}
      </div>
    </div>
  )
}
