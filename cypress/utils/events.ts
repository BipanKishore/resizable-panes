export const RIGHT_MOVEMENT_VALUE = 1
export const LEFT_MOVEMENT_VALUE = -1

const VIEW_PORT_WIDTH = 1016
const PADDING = 8

export const VERTICAL_CONTAINER_WIDTH = 1016 - 2 * PADDING
export const X_CENTER = VIEW_PORT_WIDTH / 2

// START MOST LEFT
export const X_START = 0
export const X_START_CONTAINER = PADDING + 1

// END MOST RIGHT
export const X_END = VIEW_PORT_WIDTH
export const X_END_CONTAINER = VIEW_PORT_WIDTH - PADDING

export interface IMoveEvent {
   clientX: number; movementX: number;
}

export const moveResizer = (cyHook: string, event: any) => {
  cy.get(`[data-cy=${cyHook}]`)
    .trigger('mousedown')
    .trigger('mousemove', event)
    .trigger('mouseup')
}

export class CyMoveEvent {
  containerSize: number
  viewPortSize: number

  constructor (params?: any) {
    const {maxPaneSize, paneIds, resizerSize} = params
    this.containerSize = maxPaneSize + (resizerSize * (paneIds.length - 1))
    this.viewPortSize = this.containerSize + 16
  }

  static toMostLeft () {
    const clientX = X_START
    const movementX = LEFT_MOVEMENT_VALUE

    return {
      clientX,
      movementX
    }
  }

  static toCenterMovingLeft () {
    const clientX = X_CENTER
    const movementX = LEFT_MOVEMENT_VALUE

    return {
      clientX,
      movementX
    }
  }

  static toCenterMovingRight () {
    const clientX = X_CENTER
    const movementX = RIGHT_MOVEMENT_VALUE

    return {
      clientX,
      movementX
    }
  }

  static toMostRight (VIEW_PORT_WIDTH?: number) {
    const clientX = VIEW_PORT_WIDTH || X_END
    const movementX = RIGHT_MOVEMENT_VALUE

    return {
      clientX,
      movementX
    }
  }
}
