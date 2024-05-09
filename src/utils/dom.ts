import {
  IResizableEvent, IJoinClassNameParam,
  UnitTypes, IBooleanOrUndefined, ISizeStyle
} from '../@types'
import {
  BORDER_BOTTOM, BORDER_LEFT, BORDER_RIGHT,
  BORDER_TOP,
  DIRECTIONS, HIDDEN, MARGIN, MARGIN_BOTTOM, MARGIN_LEFT,
  MARGIN_RIGHT, MARGIN_TOP, MIN_HEIGHT, MIN_WIDTH, RATIO,
  VISIBLE
} from '../constant'

export const toPx = (size: number) => `${size}px`
export const getSizeKey = (vertical: boolean) => vertical ? 'width' : 'height'
export const getSizeStyle = (vertical: IBooleanOrUndefined, size: number): ISizeStyle => ({
  [getSizeKey(vertical as boolean)]: toPx(size)
})

export const joinClassName = (param: IJoinClassNameParam, notRequired: boolean | any = false) => {
  if (notRequired) {
    return ''
  }
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

export const getDirection = (movement: number) => movement < 0 ? DIRECTIONS.UP : DIRECTIONS.DOWN

export const toArray = (items: any) => Array.isArray(items) ? items : [items]

const clearPlainResizerStyle = (node: any) => {
  [
    MARGIN,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    MIN_WIDTH, MIN_HEIGHT,
    BORDER_LEFT, BORDER_RIGHT, BORDER_BOTTOM, BORDER_TOP].forEach((key:string) => {
    node.style[key] = null
  })
}

const setPlainResizerStyle = (node: any, style: any) => {
  const keys = Object.keys(style)
  keys.forEach((key) => { node.style[key] = style[key] })
}

export const generateResizerStyle = (resizerSize: number,
  detectionSize: number, vertical: boolean) => {
  const detectionSizePx = toPx(detectionSize)
  const minSize = toPx(resizerSize + 2 * detectionSize)
  const border = `${detectionSizePx} solid transparent`

  const negativeDetectionSizePxString = `-${detectionSizePx}`

  if (vertical) {
    return {
      [MARGIN_LEFT]: negativeDetectionSizePxString,
      [MARGIN_RIGHT]: negativeDetectionSizePxString,
      minWidth: minSize,
      [BORDER_LEFT]: border,
      [BORDER_RIGHT]: border
    }
  }

  return {
    [MARGIN_TOP]: negativeDetectionSizePxString,
    [MARGIN_BOTTOM]: negativeDetectionSizePxString,
    minHeight: minSize,
    [BORDER_TOP]: border,
    [BORDER_BOTTOM]: border
  }
}

export const getSetSize = (node: any, vertical: boolean) => (size: number) => {
  node.style[getSizeKey(vertical)] = toPx(size)
}

export const getSetResizerSize = (node: any, vertical: boolean,
  isValidCustomResizer: boolean, resizerSize: number, detectionSize: number) => (size: number) => {
  node.style[getSizeKey(vertical)] = toPx(size)
  node.style.overflow = size ? VISIBLE : HIDDEN
  const sizeReduction = Math.abs(size - resizerSize)

  if (!isValidCustomResizer) {
    if (size) {
      const style = generateResizerStyle(resizerSize - sizeReduction, detectionSize, vertical)
      setPlainResizerStyle(node, style)
    } else {
      clearPlainResizerStyle(node)
    }
  }
}
