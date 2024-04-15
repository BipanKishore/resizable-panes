import {CyMoveEvent} from '../utils/events'
import {checkWidths} from '../utils/check-widths'
import {ENUMS} from '../../cy-env/pages'
import {getResizableIds} from '../utils'

const uniqueIdResizablePanes = ENUMS.resizablePanesId
const VERTICAL_CONTAINER_WIDTH = 1000 + 4 * 10
const VIEW_PORT_WIDTH = VERTICAL_CONTAINER_WIDTH + 16

const {
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

const cyGet = (cyId: string) => {
  return cy.get(`[data-cy=${cyId}]`)
}

describe('Basic outside operations', () => {
  beforeEach(() => {
    cy.visit('')
    cy.viewport(VIEW_PORT_WIDTH, 500)
  })

  it('should check Initial Sizes', () => {
    checkWidths(INITIAL_SIZES)
  })

  it('Hide and show complete ResizalbePanes component', () => {
    cy.get('[data-cy=hide-resizable-panes]').click()
      .wait(50)
    cy.get('[data-cy=hide-resizable-panes]').click()
  })

  describe('API operations', () => {
    it('should restore to default view', () => {
      cyMoveEvent.moveItem(R0, R1)

      cyMoveEvent.moveItem(R3, R2)
      cyGet('restore-default')
        .click()

      checkWidths(INITIAL_SIZES)
    })

    it('should call api method getMap', () => {
      cyGet('get-map')
        .click()
    })
  })
})
