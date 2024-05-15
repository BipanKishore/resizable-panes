import {SinonSpy} from 'cypress/types/sinon'
import {checkWidths} from './check-widths'
import {VIEW_PORT_PADDING} from './constants'
import {IMoveEvent, ISizeMap} from './types'
import {
  continousMovements,
  getHookMethod,
  getPaneIds, getRects, move, moveElementLeft,
  moveItem, moveLeftEvent,
  moveRightEvent
} from './utils'

interface IRCy {
  vertical?: boolean,
  containerId?: string,
    resizerSize?: number,
    maxInitialPaneSize?: number,
    len?: number,
    height?: number,
    plainResizer?:boolean,
    detectionSize?: number
}

export class RCy {
  resizerSize: number
  detectionSize: number

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

  itemItems: string[]
  paneIds: string[]
  resizerIds: string[]
  vertical: boolean
  plainResizer: boolean

  get viewPortDimention () {
    return [this.viewPortXLen, this.viewPortYLen]
  }

  constructor (model: IRCy = {}) {
    const {
      containerId,
      detectionSize = 5,
      resizerSize = 2,
      maxInitialPaneSize = 1000,
      height = 500,
      len = 5,
      vertical,
      plainResizer = false
    } = model

    this.vertical = vertical
    this.containerId = containerId
    this.plainResizer = plainResizer

    this.resizerSize = resizerSize
    this.detectionSize = detectionSize
    this.maxInitialPaneSize = maxInitialPaneSize
    this.len = len

    this.containerYLen = height
    this.containerXLen = this.maxInitialPaneSize + (this.len - 1) * this.resizerSize
    this.viewPortXLen = this.containerXLen + (2 * VIEW_PORT_PADDING)
    this.viewPortYLen = this.containerYLen + (2 * VIEW_PORT_PADDING)

    this.containerXStart = VIEW_PORT_PADDING + 1
    this.containerXEnd = VIEW_PORT_PADDING + this.containerXLen
    this.getResizableIds()
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

  toSizeMap (sizes: ISizeMap | number[], checkSum = false) {
    let sizeMap : any = {}
    let _sizeSum = 0
    if (Array.isArray(sizes)) {
      this.itemItems.forEach((id, i) => {
        const size = sizes[i]
        _sizeSum += size
        sizeMap[id] = size
      })
    } else {
      sizeMap = sizes
      Object.keys(sizeMap).forEach((key) => {
        _sizeSum += sizeMap[key]
      })
    }

    if (checkSum) {
      cy.wrap({
        _sizeSum
      }).its('_sizeSum').should('equal', this.containerXLen)
    }

    return sizeMap
  }

  checkWidths (sizes: ISizeMap | number[]) {
    const sizeMap = this.toSizeMap(sizes)
    console.log(sizeMap)
    checkWidths(sizeMap, this.vertical)
  }

  checkWidthsAndSum (sizes: ISizeMap | number[]) {
    const sizeMap = this.toSizeMap(sizes, true)

    checkWidths(sizeMap, this.vertical)
  }

  getResizableIds () {
    const paneIds = getPaneIds(this.len)
    const resizerIds = paneIds.map((id) => `resizer-${id}`)
    resizerIds.pop()
    const checkboxIds = paneIds.map((id) => `checkbox-${id}`)

    const laodingIds = paneIds.map((id) => {
      const createHook = getHookMethod(id)
      return createHook('loading')
    })

    const laodedIds = paneIds.map((id) => {
      const createHook = getHookMethod(id)
      return createHook('loaded')
    })

    this.paneIds = paneIds
    this.resizerIds = resizerIds

    const itemItems: string[] = []

    paneIds.forEach((id, i) => {
      itemItems.push(id, resizerIds[i])
    })

    itemItems.pop()

    this.itemItems = itemItems

    return {
      laodedIds,
      laodingIds,
      resizerIds,
      checkboxIds,
      paneIds
    }
  }

  moveItem = moveItem
  move = move
  continousMovements = continousMovements

  moveElement = (cyId: string, firstEvent: IMoveEvent, secondEvent: IMoveEvent) => {
    cy.get(`[data-cy=${cyId}]`)
      .trigger('mousedown')
      .trigger('mousemove', firstEvent)
      .trigger('mousemove', secondEvent)
    this.cyGet(this.containerId)
      .trigger('mouseup')
  }

  moveElementRight = (cyId: string, start: number, end: number, isTouch = false) => {
    const firstEvent = moveRightEvent(start + 1)
    const secondEvent = moveRightEvent(end)

    this.moveElement(cyId, firstEvent, secondEvent)
  }

  moveElementLeft = (cyId: string, start: number, end: number, isTouch = false) => {
    const firstEvent = moveLeftEvent(start - 1)
    const secondEvent = moveLeftEvent(end)

    this.moveElement(cyId, firstEvent, secondEvent)
  }

  moveNPixel = (cyId:string,
    nPixel : number,
    position: 'right' | 'left' | 'top' | 'bottom' = 'right'
  ) => {
    getRects(cyId)
      .then(([
        sourceRect
      ]: any) => {
        const {x: resizerX, width} = sourceRect
        const widthHalf = width / 2
        const mouseDownX = resizerX + widthHalf

        // console.log('moveResizerToStart', mouseDownX, X_START_CONTAINER)
        // console.log('resizerRect cyIdRect', resizerRect, cyIdRect)

        if (position === 'right') {
          this.moveElementRight(cyId, mouseDownX - 1, mouseDownX + nPixel)
        } else {
          this.moveElementLeft(cyId, mouseDownX + 1, mouseDownX - nPixel)
        }
      })
  }

  moveResizerToStart (cyResizerId: string) {
    getRects(cyResizerId)
      .then(([resizerRect]) => {
        const {x, width} = resizerRect
        const mouseDownX = x + width / 2
        moveElementLeft(cyResizerId, mouseDownX, this.containerXStart)
      })
  }

  reMount (mountUnMountButtonId: string) {
    this.cyGet(mountUnMountButtonId).click()
      .wait(50)
    this.cyGet(mountUnMountButtonId).click()
  }

  getAllArgs = (spy: SinonSpy) => spy.getCalls().map(({args}) => args)
}
