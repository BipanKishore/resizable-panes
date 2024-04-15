import {checkWidths, checkWidthsAndSum} from './check-widths'
import {VIEW_PORT_PADDING} from './constants'
import {ISizeMap} from './types'
import {
  getPaneIds, getRects, move, moveElementLeft,
  moveItem, moveLeftEvent, moveNPixel, moveRightEvent, swiftMove
} from './utils'

interface IRCy {
  containerId?: string,
    resizerSize?: number,
    maxInitialPaneSize?: number,
    len?: number,
    height?: number,
}

export class RCy {
  resizerSize: number
  maxInitialPaneSize: number
  height: number
  len: number

  containerXLen: number
  containerYLen: number

  containerXStart: number
  containerXEnd: number

  viewPortXLen: number
  viewPortYLen: number
  viewPortstart = 0 // always be zero

  containerId: string

  get viewPortDimention () {
    return [this.viewPortXLen, this.viewPortYLen]
  }

  constructor (model: IRCy = {}) {
    const {
      containerId,
      resizerSize = 10,
      maxInitialPaneSize = 1000,
      height = 500,
      len = 5
    } = model

    this.containerId = containerId

    this.resizerSize = resizerSize
    this.maxInitialPaneSize = maxInitialPaneSize
    this.len = len

    this.containerYLen = height
    this.containerXLen = this.maxInitialPaneSize + (this.len - 1) * this.resizerSize

    this.viewPortXLen = this.containerXLen + (2 * VIEW_PORT_PADDING)
    this.viewPortYLen = this.containerYLen + (2 * VIEW_PORT_PADDING)

    this.containerXStart = VIEW_PORT_PADDING + 1
    this.containerXEnd = VIEW_PORT_PADDING + this.containerXLen
  }

  checkContainerWidth () {
    checkWidths({[this.containerId]: this.containerXLen})
  }

  getDimentions () {
    return {
      resizerSize: this.resizerSize
    }
  }

  setViewPort () {
    cy.viewport(this.viewPortXLen, this.viewPortYLen)
  }

  cyGet (cyId: string) {
    return cy.get(`[data-cy=${cyId}]`)
  }

  checkWidths (sizeMap: ISizeMap) {
    checkWidths(sizeMap)
  }

  checkWidthsAndSum (sizeMap: ISizeMap) {
    checkWidthsAndSum(this.containerXLen, sizeMap)
  }

  getResizableIds () {
    const paneIds = getPaneIds(this.len)
    const resizerIds = paneIds.map((id) => `resizer-${id}`)
    const checkboxIds = paneIds.map((id) => `checkbox-${id}`)

    return {
      resizerIds,
      checkboxIds,
      paneIds
    }
  }

  swiftMove = swiftMove
  moveItem = moveItem
  move = move
  moveNPixel = moveNPixel

  moveResizerToStart (cyResizerId: string) {
    getRects(cyResizerId)
      .then(([resizerRect]) => {
        const {x, width} = resizerRect
        const mouseDownX = x + width / 2
        console.log('moveResizerToStart', mouseDownX, this.containerXStart)
        moveElementLeft(cyResizerId, mouseDownX, this.containerXStart)
      })
  }

  toMostRight (cyId:string) {
    swiftMove(cyId, moveRightEvent(this.viewPortXLen))
  }

  toMostLeft (cyId:string) {
    swiftMove(cyId, moveRightEvent(this.viewPortstart))
  }
}
