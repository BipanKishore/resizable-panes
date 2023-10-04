import {
  IResizableEvent, IJoinClassNameParam,
  UnitTypes, IBooleanOrUndefined
} from '../@types'
import {DIRECTIONS, RATIO, ZERO} from '../constant'

export const getSizeStyle = (vertical: IBooleanOrUndefined, size: number) => {
  const style: any = {}
  const px = toPx(size)
  if (!vertical) {
    style.height = px
  } else {
    style.width = px
  }
  return style
}

export const toPx = (size: number) => `${size}px`

export const joinClassName = (param: IJoinClassNameParam, notRequired: boolean | any = false) => {
  if (notRequired) {
    return ''
  }
  const keys = Object.keys(param)
  return keys.map((key) => param[key] ? key : '').join(' ')
}

export const getContainerClass = (vertical: boolean, className: string, unit: UnitTypes) => {
  return joinClassName({
    'd-flex': true,
    'f-row w-fit-content': vertical,
    'f-column': !vertical,
    'w-100p': unit === RATIO && vertical,
    'h-100p': unit === RATIO && !vertical,
    [className]: className
  })
}

export function isTouchEvent (event: any): boolean {
  return event.type.startsWith('touch')
}

function resizableEvent (mouseCoordinate: number, movement: number) {
  return {
    mouseCoordinate,
    movement
  }
}

export const getResizableEventFromTouch = (e: any, vertical: boolean, previousTouchEvent: any): IResizableEvent => {
  const currentTouch = e.targetTouches[0]
  const {pageX = 0, pageY = 0} = previousTouchEvent.current ?? {}
  previousTouchEvent.current = currentTouch
  if (vertical) {
    return resizableEvent(currentTouch.clientX, currentTouch.pageX - pageX)
  } else {
    return resizableEvent(currentTouch.clientY, currentTouch.pageY - pageY)
  }
}

export const getResizableEventFromMouse = (e: any, vertical: boolean): IResizableEvent => {
  e.preventDefault()
  const {clientX, clientY, movementX, movementY} = e
  return vertical ? resizableEvent(clientX, movementX) : resizableEvent(clientY, movementY)
}

export const getResizableEvent = (e: any, vertical: boolean, previousTouchEvent: any): IResizableEvent => {
  return isTouchEvent(e)
    ? getResizableEventFromTouch(e, vertical, previousTouchEvent)
    : getResizableEventFromMouse(e, vertical)
}

export const getDirection = (e: IResizableEvent) => e.movement < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN

export const toArray = (items: any) => Array.isArray(items) ? items : [items]
