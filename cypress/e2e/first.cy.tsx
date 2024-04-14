import {CyMoveEvent, moveResizer} from '../utils/events'
import {checkWidths} from '../utils/check-widths'
import {ENUMS} from '../../cy-env/pages'

const uniqueIdResizablePanes = ENUMS.resizablePanesId
const VERTICAL_CONTAINER_WIDTH = 1000 + 4 * 10
const VIEW_PORT_WIDTH = VERTICAL_CONTAINER_WIDTH + 16

const R0 = 'resizer-P0'
const R1 = 'resizer-P1'
const R2 = 'resizer-P2'
const R3 = 'resizer-P3'

const INITIAL_SIZES: any = {
  [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
  'resizer-P0': 10,
  'resizer-P1': 10,
  'resizer-P2': 10,
  'resizer-P3': 10,
  P0: 100,
  P1: 300,
  P2: 200,
  P3: 300,
  P4: 100
}

describe('Overlapping Resizers', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Check initial size', () => {
    checkWidths(INITIAL_SIZES)
  })

  it('R2 to most Left', () => {
    moveResizer('resizer-P2', CyMoveEvent.toMostLeft())
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      [R0]: 0,
      [R1]: 0,
      [R2]: 10,
      [R3]: 10,
      P0: 0,
      P1: 0,
      P2: 0,
      P3: 920,
      P4: 100
    })
  })

  it('R1 to most Right', () => {
    moveResizer(R1, CyMoveEvent.toMostRight(VIEW_PORT_WIDTH))
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      [R0]: 10,
      [R1]: 10,
      [R2]: 0,
      [R3]: 0,
      P0: 100,
      P1: 920,
      P2: 0,
      P3: 0,
      P4: 0
    })
  })
})
