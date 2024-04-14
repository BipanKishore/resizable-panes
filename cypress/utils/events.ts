import {IResizableEvent} from '../../src/@types'

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

  moveRightEvent (clientX: number) {
    const movementX = RIGHT_MOVEMENT_VALUE
    return {
      clientX,
      movementX
    }
  }

  moveLeftEvent (clientX: number) {
    const movementX = LEFT_MOVEMENT_VALUE
    return {
      clientX,
      movementX
    }
  }

  getDOMElement (cyId:string) {
    return new Promise((resolve) => {
      cy.document().then((doc) => {
        const element = doc.querySelector(`[data-cy=${cyId}]`)
        if (element) {
          resolve(element)
        } else {
          throw new Error(`Cyid: ${cyId} does not exist`)
        }
      })
    })
  }

  async getRect (cyId:string): Promise<any> {
    const element:any = await this.getDOMElement(cyId)
    return element.getBoundingClientRect()
  }

  moveElement (cyId: string, firstEvent: IMoveEvent, secondEvent: IMoveEvent) {
    cy.get(`[data-cy=${cyId}]`)
      .trigger('mousedown')
      .trigger('mousemove', firstEvent)
      .trigger('mousemove', secondEvent)
      .trigger('mouseup')
  }

  moveElementRight (cyId: string, start: number, end: number) {
    const firstEvent = this.moveRightEvent(start + 1)
    const secondEvent = this.moveRightEvent(end)
    this.moveElement(cyId, firstEvent, secondEvent)
  }

  moveElementLeft (cyId: string, start: number, end: number) {
    const firstEvent = this.moveLeftEvent(start - 1)
    const secondEvent = this.moveLeftEvent(end)
    this.moveElement(cyId, firstEvent, secondEvent)
  }

  async moveResizer (cyResizerId: string, cyId:string) {
    const resizerRect = await this.getRect(cyResizerId)
    const cyIdRect = await this.getRect(cyId)
    const {x: resizerX, width} = resizerRect
    const widthHalf = width / 2
    const mouseDownX = resizerX + widthHalf
    const {x: cyIdX} = cyIdRect
    // console.log('moveResizerToStart', mouseDownX, X_START_CONTAINER)
    // console.log('resizerRect cyIdRect', resizerRect, cyIdRect)

    if (resizerX < cyIdX) {
      const {right} = cyIdRect
      this.moveElementRight(cyResizerId, mouseDownX + widthHalf - 1, right)
    } else {
      const {left} = cyIdRect
      this.moveElementLeft(cyResizerId, mouseDownX - widthHalf + 1, left)
    }
    cy.wait(100)
  }

  async moveResizerToStart (cyResizerId: string) {
    const resizerRect = await this.getRect(cyResizerId)

    const {x, width} = resizerRect
    const mouseDownX = x + width / 2
    console.log('moveResizerToStart', mouseDownX, X_START_CONTAINER)
    this.moveElementLeft(cyResizerId, mouseDownX, X_START_CONTAINER)
    cy.wait(100)
  }
}
