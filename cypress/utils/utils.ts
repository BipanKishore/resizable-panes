import {LEFT_MOVEMENT_VALUE, RIGHT_MOVEMENT_VALUE} from './events'
import {IMoveEvent} from './types'

export const getPaneIds = (length: number) => {
  const paneIds = []
  for (let i = 0; i < length; i++) {
    paneIds.push('P' + i)
  }

  return paneIds
}

export const getResizableIds = (len: number = 5, model: any = {}) => {
  const {
    resizerSize = 10,
    maxInitialPaneSize = 1000,
    height = 500
  } = model

  const containerSize = maxInitialPaneSize + (len - 1) * resizerSize
  const viewPortWidth = containerSize + 16

  const viewPortDimention: [number, number] = [viewPortWidth, height]

  const paneIds = getPaneIds(len)

  const resizerIds = paneIds.map((id) => `resizer-${id}`)
  const checkboxIds = paneIds.map((id) => `checkbox-${id}`)
  return {
    containerSize,
    resizerSize,
    viewPortDimention,
    resizerIds,
    checkboxIds,
    paneIds
  }
}

export const moveRightEvent = (clientX: number) => {
  return {
    clientX,
    movementX: RIGHT_MOVEMENT_VALUE
  }
}

export const moveButtomEvent = (clientY: number) => {
  return {
    clientY,
    movementY: LEFT_MOVEMENT_VALUE
  }
}

export const moveTopEvent = (clientY: number) => {
  return {
    clientY,
    movementY: RIGHT_MOVEMENT_VALUE
  }
}

export const moveLeftEvent = (clientX: number) => {
  return {
    clientX,
    movementX: LEFT_MOVEMENT_VALUE
  }
}

export const getRects = (...cyIds: string[]) => {
  return cy.document().then((doc) => {
    return cyIds.map((cyId) => {
      const element = doc.querySelector(`[data-cy=${cyId}]`)
      if (element) {
        return element.getBoundingClientRect()
      } else {
        throw new Error(`Cyid: ${cyId} does not exist`)
      }
    })
  })
}

export const moveElement = (cyId: string, firstEvent: IMoveEvent, secondEvent: IMoveEvent) => {
  cy.get(`[data-cy=${cyId}]`)
    .trigger('mousedown')
    .trigger('mousemove', firstEvent)
    .trigger('mousemove', secondEvent)
    .trigger('mouseup')
}

export const moveElementNoMouseUp = (cyId: string, firstEvent: IMoveEvent, secondEvent: IMoveEvent) => {
  cy.get(`[data-cy=${cyId}]`)
    .trigger('mousemove', firstEvent)
    .trigger('mousemove', secondEvent)
}

export const moveElementWithTouch = (cyId: string, firstEvent: IMoveEvent, secondEvent: IMoveEvent) => {
  cy.get(`[data-cy=${cyId}]`)
  // onTouchStartCapture
    .trigger('touchstart')
    .trigger('touchmove', firstEvent)
    .trigger('touchmove', secondEvent)
    .trigger('touchend')
}

export const moveElementRightNoMouseUp = (cyId: string, start: number, end: number, isTouch = false) => {
  const firstEvent = moveRightEvent(start + 1)
  const secondEvent = moveRightEvent(end)

  moveElementNoMouseUp(cyId, firstEvent, secondEvent)
}

export const moveElementLeftNoMouseUp = (cyId: string, start: number, end: number, isTouch = false) => {
  const firstEvent = moveLeftEvent(start - 1)
  const secondEvent = moveLeftEvent(end)

  moveElementNoMouseUp(cyId, firstEvent, secondEvent)
}

export const moveElementRight = (cyId: string, start: number, end: number, isTouch = false) => {
  const firstEvent = moveRightEvent(start + 1)
  const secondEvent = moveRightEvent(end)

  if (isTouch) {
    return moveElementWithTouch(cyId, firstEvent, secondEvent)
  } else {
    return moveElement(cyId, firstEvent, secondEvent)
  }
}

export const moveElementButtom = (cyId: string, start: number, end: number, isTouch = false) => {
  const firstEvent = moveButtomEvent(start + 1)
  const secondEvent = moveButtomEvent(end)

  if (isTouch) {
    moveElementWithTouch(cyId, firstEvent, secondEvent)
  } else {
    moveElement(cyId, firstEvent, secondEvent)
  }
}

export const moveElementTop = (cyId: string, start: number, end: number, isTouch = false) => {
  const firstEvent = moveTopEvent(start + 1)
  const secondEvent = moveTopEvent(end)

  if (isTouch) {
    moveElementWithTouch(cyId, firstEvent, secondEvent)
  } else {
    moveElement(cyId, firstEvent, secondEvent)
  }
}

export const moveElementLeft = (cyId: string, start: number, end: number, isTouch = false) => {
  const firstEvent = moveLeftEvent(start - 1)
  const secondEvent = moveLeftEvent(end)

  if (isTouch) {
    moveElementWithTouch(cyId, firstEvent, secondEvent)
  } else {
    moveElement(cyId, firstEvent, secondEvent)
  }
}

export const moveItem = (sourceCyId: string, targetCyId: string, isTouch = false) => {
  getRects(sourceCyId, targetCyId)
    .then(([
      sourceRect,
      targetRect
    ]: any) => {
      // console.log(sourceRect, targetRect)

      const {x: resizerX, width} = sourceRect
      const widthHalf = width / 2
      const mouseDownX = resizerX + widthHalf
      const {x: cyIdX} = targetRect
      // console.log('moveResizerToStart', mouseDownX, X_START_CONTAINER)
      // console.log('resizerRect cyIdRect', resizerRect, cyIdRect)

      if (resizerX < cyIdX) {
        const {right} = targetRect
        return moveElementRight(sourceCyId, mouseDownX + widthHalf - 1, right, isTouch)
      } else {
        const {left} = targetRect
        return moveElementLeft(sourceCyId, mouseDownX - widthHalf + 1, left, isTouch)
      }
    })
}

export const move = (sourceCyId: string, targetCyId: string,
  position: 'right' | 'left' | 'top' | 'bottom' = 'right',
  addOn: number = 0) => {
  getRects(sourceCyId, targetCyId)
    // eslint-disable-next-line complexity
    .then(([
      sourceRect,
      targetRect
    ]: any) => {
      console.log(sourceRect, targetRect)
      const vertical = ['right', 'left'].includes(position)

      const sourceSize = sourceRect[vertical ? 'width' : 'height']

      const sourceCoordinate = sourceRect[vertical ? 'x' : 'y']

      const sourceHalfSize = sourceSize / 2

      const mouseDownX = sourceCoordinate + sourceHalfSize

      const finalCoordinate = targetRect[position] + addOn

      if (sourceCoordinate < finalCoordinate) {
        if (vertical) {
          moveElementRight(sourceCyId, mouseDownX + sourceHalfSize - 1, finalCoordinate)
        } else {
          moveElementTop(sourceCyId, mouseDownX + sourceHalfSize - 1, finalCoordinate)
        }
      } else {
        if (vertical) {
          moveElementLeft(sourceCyId, mouseDownX - sourceHalfSize + 1, finalCoordinate)
        } else {
          moveElementButtom(sourceCyId, mouseDownX + sourceHalfSize - 1, finalCoordinate)
        }
      }
    })
}

export const moveNPixel = (cyId:string,
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
        moveElementRight(cyId, mouseDownX - 1, mouseDownX + nPixel)
      } else {
        moveElementLeft(cyId, mouseDownX + 1, mouseDownX - nPixel)
      }
    })
}

export const moveNPixelNoMouseUp = (
  cyId:string,
  currentXY: number,
  nPixel : number,
  position: 'right' | 'left' | 'top' | 'bottom' = 'right'
) => {
  const nextXY = position === 'right' ? currentXY + nPixel : currentXY - nPixel
  if (position === 'right') {
    moveElementRightNoMouseUp(cyId, currentXY - 1, currentXY + nPixel)
  } else {
    moveElementLeftNoMouseUp(cyId, currentXY + 1, currentXY - nPixel)
  }
  cy.wait(50)
    .then(() => {
      return {
        right: (nPixel: number) => moveNPixelNoMouseUp(cyId, nextXY, nPixel, 'right'),
        left: (nPixel: number) => moveNPixelNoMouseUp(cyId, nextXY, nPixel, 'left'),
        up: () => {
          cy.get(`[data-cy=${cyId}]`)
            .trigger('mouseup')
        }
      }
    })
}

export const continousMovements = (cyId:string
) => {
  cy.get(`[data-cy=${cyId}]`)
    .trigger('mousedown')

  return getRects(cyId)
    .then(([
      sourceRect
    ]: any) => {
      const {x: resizerX, width} = sourceRect
      const widthHalf = width / 2
      const currentXY = resizerX + widthHalf

      return {
        right: (nPixel: number) => moveNPixelNoMouseUp(cyId, currentXY, nPixel, 'right'),
        left: (nPixel: number) => moveNPixelNoMouseUp(cyId, currentXY, nPixel, 'left'),
        up: () => {
          cy.get(`[data-cy=${cyId}]`)
            .trigger('mouseup')
        }
      }
    })
}

export const getHookMethod = (parentHook: string) => {
  return (hook: string) => {
    return `${parentHook}-${hook}`
  }
}
