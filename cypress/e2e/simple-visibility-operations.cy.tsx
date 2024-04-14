import {CyMoveEvent, moveResizer} from '../utils/events'
import {checkWidths} from '../utils/check-widths'
import {SimpleVisibilityOperations, ENUMS} from '../utils'

const VERTICAL_CONTAINER_WIDTH = 1000 + 4 * 10
const VIEW_PORT_WIDTH = VERTICAL_CONTAINER_WIDTH + 16

const RESIZER_WIDTH = 10

const paneIds = ['P0', 'P1', 'P2', 'P3', 'P4']

const getResizableIds = (paneIds: string[]) => {
  const resizerIds = paneIds.map((id) => `resizer-${id}`)
  const checkboxIds = paneIds.map((id) => `checkbox-${id}`)
  return {
    resizerIds,
    checkboxIds,
    paneIds
  }
}

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = getResizableIds(paneIds)

describe('Simple visibility operations', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Check initial size', () => {
    checkWidths(ENUMS.initialSize)
  })

  describe('Hide single Pane', () => {
    it('hide P0', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 337,
        [P2]: 224,
        [P3]: 337,
        [P4]: 112,
        [R0]: 0,
        [R1]: RESIZER_WIDTH,
        [R2]: RESIZER_WIDTH,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P1', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      checkWidths({
        [P0]: 144,
        [P1]: 0,
        [P2]: 289,
        [P3]: 433,
        [P4]: 144,
        [R0]: 0,
        [R1]: RESIZER_WIDTH,
        [R2]: RESIZER_WIDTH,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P2', () => {
      cy.get(`[data-cy=${CK2}]`).uncheck()
      checkWidths({
        [P0]: 126,
        [P1]: 379,
        [P2]: 0,
        [P3]: 379,
        [P4]: 126,
        [R0]: RESIZER_WIDTH,
        [R1]: 0,
        [R2]: RESIZER_WIDTH,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P3', () => {
      cy.get(`[data-cy=${CK3}]`).uncheck()
      checkWidths({
        [P0]: 144,
        [P1]: 433,
        [P2]: 289,
        [P3]: 0,
        [P4]: 144,
        [R0]: RESIZER_WIDTH,
        [R1]: RESIZER_WIDTH,
        [R2]: 0,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P4', () => {
      cy.get(`[data-cy=${CK4}]`).uncheck()
      checkWidths({
        [P0]: 112,
        [P1]: 337,
        [P2]: 224,
        [P3]: 337,
        [P4]: 0,
        [R0]: RESIZER_WIDTH,
        [R1]: RESIZER_WIDTH,
        [R2]: RESIZER_WIDTH,
        [R3]: 0
      })
    })
  })

  describe('Hide two consecutive Panes', () => {
    it('hide P0>> P1', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 340,
        [P3]: 510,
        [P4]: 170,
        [R0]: 0,
        [R1]: 0,
        [R2]: RESIZER_WIDTH,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P1>> P2', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      checkWidths({
        [P0]: 204,
        [P1]: 0,
        [P2]: 0,
        [P3]: 612,
        [P4]: 204,
        [R0]: 0,
        [R1]: 0,
        [R2]: RESIZER_WIDTH,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P2>> P3', () => {
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      checkWidths({
        [P0]: 204,
        [P1]: 612,
        [P2]: 0,
        [P3]: 0,
        [P4]: 204,
        [R0]: RESIZER_WIDTH,
        [R1]: 0,
        [R2]: 0,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P3>> P4', () => {
      cy.get(`[data-cy=${CK3}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
      checkWidths({
        [P0]: 170,
        [P1]: 510,
        [P2]: 340,
        [P3]: 0,
        [P4]: 0,
        [R0]: RESIZER_WIDTH,
        [R1]: RESIZER_WIDTH,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Three consecutive Panes', () => {
    it('hide P0 >> P1 >> P2', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 772,
        [P4]: 258,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P1 >> P2 >> P3', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      checkWidths({
        [P0]: 515,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 515,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: RESIZER_WIDTH
      })
    })

    it('hide P2 >> P3 >> P4', () => {
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
      checkWidths({
        [P0]: 257,
        [P1]: 773,
        [P2]: 0,
        [P3]: 0,
        [P4]: 0,
        [R0]: RESIZER_WIDTH,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Four consecutive Panes', () => {
    it('hide P0 >> P1 >> P2 >> P3', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 1040,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Four consecutive Panes', () => {
    it('hide P0 >> P1 >> P2 >> P3', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 1040,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide All consecutive Panes', () => {
    it('hide P0 >> P1 >> P2 >> P3 >> P4', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 0,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Random two Panes', () => {
    it('hide P0 >> P4', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
      checkWidths({
        [P0]: 0,
        [P1]: 382,
        [P2]: 255,
        [P3]: 383,
        [P4]: 0,
        [R0]: 0,
        [R1]: RESIZER_WIDTH,
        [R2]: RESIZER_WIDTH,
        [R3]: 0
      }, 1040)
    })

    it('hide P1 >> P2', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      checkWidths({
        [P0]: 255,
        [P1]: 0,
        [P2]: 510,
        [P3]: 0,
        [P4]: 255,
        [R0]: 0,
        [R1]: RESIZER_WIDTH,
        [R2]: 0,
        [R3]: RESIZER_WIDTH
      }, 1040)
    })
  })
})
