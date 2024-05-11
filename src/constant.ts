// Need to make Plain
export const DIRECTIONS = {
  DOWN: -1,
  NONE: 0,
  UP: 1
}

export const CHANGE = {
  ADD: 1,
  REMOVE: 2
}

export const RATIO = 'ratio'
export const SET_SIZE = 'setSize'

export const BUTTOM_FIRST = 'buttomFirst'
export const TOP_FIRST = 'topFirst'

export const RESIZER = 'resizer'

export const VISIBILITY = 'visibility'
export const SIZE = 'size'
export const DEFAULT_MIN_SIZE_KEY = 'defaultMinSize'
export const DEFAULT_MAX_SIZE_KEY = 'defaultMaxSize'

export const VISIBLE = 'visible'
export const HIDDEN = 'hidden'

export const MARGIN = 'margin' // Not required to export
const BORDER = 'border'
export const MIN_WIDTH = 'minWidth'
export const MIN_HEIGHT = 'minHeight'

const CSS_POSITION_KEYS = ['Left', 'Right', 'Top', 'Bottom']

export const [
  MARGIN_LEFT,
  MARGIN_RIGHT,
  MARGIN_TOP,
  MARGIN_BOTTOM
] = CSS_POSITION_KEYS.map(key => `${MARGIN}${key}`)

export const [
  BORDER_LEFT,
  BORDER_RIGHT,
  BORDER_TOP,
  BORDER_BOTTOM
] = CSS_POSITION_KEYS.map(key => `${BORDER}${key}`)

export const RESIZE_HTML_EVENT = 'resize'

// written same name as of event to optimize the code
export const MIN_SIZE_STATE = 'onMinSize'
export const MAX_SIZE_STATE = 'onMaxSize'
export const NORMAL_SIZE_STATE = 'onNormalSize'

export const EVENT_NAMES = {
  mouseup: 'mouseup',
  mousemove: 'mousemove',
  mousedown: 'mousedown',
  touchmove: 'touchmove',
  touchend: 'touchend',
  touchStartCapture: 'touchStartCapture'
}
