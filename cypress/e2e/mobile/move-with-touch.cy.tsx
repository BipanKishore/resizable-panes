import {ENUMS} from '../../../cy-env/pages'
import {getResizableIds} from '../../utils'
import {checkWidths} from '../../utils/check-widths'
import {CyMoveEvent} from '../../utils/events'

const uniqueIdResizablePanes = ENUMS.resizablePanesId

const {
  resizerSize,
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = getResizableIds(5)

const cyMoveEvent = new CyMoveEvent({
  maxPaneSize: 1000,
  paneIds: [],
  resizerSize: 10
})

const INITIAL_SIZES: any = {
  [uniqueIdResizablePanes]: 359,
  'resizer-P0': 10,
  'resizer-P1': 10,
  'resizer-P2': 10,
  'resizer-P3': 10,
  P0: 31,
  P1: 96,
  P2: 64,
  P3: 96,
  P4: 32
}

describe('Move Panes on', () => {
  beforeEach(() => {
    cy.visit('')
    cy.viewport('iphone-x')
  })

  it('should check Initial Sizes', () => {
    checkWidths(INITIAL_SIZES)
  })

  describe('Single Resizer Movements', () => {
    describe('R0 Movements', () => {
      it('Overlap R0 to R1', () => {
        cyMoveEvent.moveItem(R0, R1)
        checkWidths({
          [P0]: 137,
          [P1]: 0,
          [P2]: 64,
          [P3]: 96,
          [P4]: 32,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })
    })
  })
})
