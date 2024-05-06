// Need to make Plain
export const DIRECTIONS = {
  DOWN: -1,
  NONE: 0,
  UP: 1
}

export const RIGHT_BUTTON_VALUE = 0

export const ZERO = 0
export const MINUS_ONE = -1

// export const APP_NAME = 'react-split-pane'

export const RATIO = 'ratio'
export const SET_SIZE = 'setSize'

export const BUTTOM_FIRST = 'buttom_first'
export const TOP_FIRST = 'top_first'

export const RESIZER = 'resizer'

export const VISIBILITY = 'visibility'
export const SIZE = 'size'
export const DEFAULT_MIN_SIZE = 'defaultMinSize'
export const DEFAULT_MAX_SIZE = 'defaultMaxSize'

export const PLUS = '+'
export const MINUS = '-'

export const LEFT = 'left'
export const RIGHT = 'right'
export const NONE = 'none'

export const ZIPPED = 'zipped'
export const VISIBLE = 'visible'
export const HIDDEN = 'hidden'

export const MARGIN = 'margin' // Not required to export
export const BORDER = 'border' // Not required to export
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

export const MIN_SIZE_STATE = 'minSizeState'
export const MAX_SIZE_STATE = 'maxSizeState'
export const NORMAL_SIZE_STATE = 'normalSizeState'
