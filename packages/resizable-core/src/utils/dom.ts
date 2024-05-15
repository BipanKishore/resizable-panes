import {
  IResizableEvent, IJoinClassNameParam,
  UnitTypes, IBooleanOrUndefined, ISizeStyle
} from '../@types'
import {

  DIRECTIONS,
  MIN_HEIGHT,
  MIN_WIDTH,
  RATIO
} from './constant'

export const toPx = (size: number) => `${size}px`
export const getSizeKey = (vertical: boolean) => vertical ? 'width' : 'height'
export const getSizeStyle = (vertical: IBooleanOrUndefined, size: number): ISizeStyle => ({
  [getSizeKey(vertical)]: toPx(size)
})

export const joinClassName = (param: IJoinClassNameParam) => {
  const keys = Object.keys(param)
  return keys.map((key) => param[key] ? key : '').join(' ')
}

export const getContainerClass = (vertical: boolean, className: string, unit: UnitTypes) =>
  joinClassName({
    flex: true,
    'f-row w-fit-content h-100p': vertical,
    'f-column': !vertical,
    'w-100p h-100p': unit === RATIO,
    [className]: className
  })

export const isTouchEvent = (event: any) => event.type.startsWith('touch')

export const getResizableEventFromTouch = (e: any, vertical: boolean, previousTouchEvent: any): IResizableEvent => {
  const currentTouch = e.targetTouches[0]
  const {pageX = 0, pageY = 0} = previousTouchEvent.current ?? {}
  previousTouchEvent.current = currentTouch
  if (vertical) {
    return [currentTouch.clientX, currentTouch.pageX - pageX]
  } else {
    return [currentTouch.clientY, currentTouch.pageY - pageY]
  }
}

export const getResizableEventFromMouse = (e: any, vertical: boolean): IResizableEvent => {
  const {clientX, clientY, movementX, movementY} = e
  return vertical ? [clientX, movementX] : [clientY, movementY]
}

export const getResizableEvent = (e: any, vertical: boolean, previousTouchEvent: any): IResizableEvent => {
  e.preventDefault()
  return isTouchEvent(e)
    ? getResizableEventFromTouch(e, vertical, previousTouchEvent)
    : getResizableEventFromMouse(e, vertical)
}

// it can be removed
export const getDirection = (movement: number) => movement < 0 ? DIRECTIONS.UP : DIRECTIONS.DOWN

export const toArray = (items: any) => Array.isArray(items) ? items : [items]

export const getSetSize = (node: any, vertical: boolean) => (size: number) => {
  node.style[getSizeKey(vertical)] = toPx(size)
}

export const getSetResizerSize = (node: any, vertical: boolean) => (size: number) => {
  const getSizeKey = (vertical: boolean) => vertical ? MIN_WIDTH : MIN_HEIGHT
  node.style[getSizeKey(vertical)] = toPx(size)
}

export const addDOMEvent = (node: HTMLElement | Document | Window,
  callBack: (e: any) => void, ...eventNames: string[]) => {
  eventNames.forEach((eventName) => node.addEventListener(eventName, callBack))
}

export const addDOMEventPassive = (node: HTMLElement | Document | Window,
  callBack: (e: any) => void, eventName: string) => {
  node.addEventListener(eventName, callBack, {passive: false})
}

export const removeDOMEvent = (node: HTMLElement | Document | Window,
  callBack: (e: any) => void, ...eventNames: string[]) => {
  eventNames.forEach((eventName) => node.removeEventListener(eventName, callBack))
}
