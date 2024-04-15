import {CyMoveEvent, moveResizer} from '../utils/events'
import {checkWidths} from '../utils/check-widths'
import {ENUMS} from '../../cy-env/pages'
import {getResizableIds} from '../utils'

const uniqueIdResizablePanes = ENUMS.resizablePanesId

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4],
  viewPortDimention,
  resizerSize,
  containerSize
} = getResizableIds(5)

const [VIEW_PORT_WIDTH] = viewPortDimention

const INITIAL_SIZES: any = {
  [uniqueIdResizablePanes]: containerSize,
  'resizer-P0': resizerSize,
  'resizer-P1': resizerSize,
  'resizer-P2': resizerSize,
  'resizer-P3': resizerSize,
  P0: 100,
  P1: 300,
  P2: 200,
  P3: 300,
  P4: 100
}

describe('Overlapping Resizers', () => {
  beforeEach(() => {
    cy.viewport(...viewPortDimention)
    cy.visit('')
  })

  it('Check initial size', () => {
    checkWidths(INITIAL_SIZES)

    cy.get('[data-cy=hide-resizable-panes]').click()
      .wait(50)
    cy.get('[data-cy=hide-resizable-panes]').click()
  })

  it('R2 to most Left', () => {
    moveResizer('resizer-P2', CyMoveEvent.toMostLeft())
    checkWidths({
      [uniqueIdResizablePanes]: containerSize,
      [R0]: 0,
      [R1]: 0,
      [R2]: resizerSize,
      [R3]: resizerSize,
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
      [uniqueIdResizablePanes]: containerSize,
      [R0]: resizerSize,
      [R1]: resizerSize,
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
