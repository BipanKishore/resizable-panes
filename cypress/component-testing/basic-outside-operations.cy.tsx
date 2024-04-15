import {checkWidths} from '../utils/check-widths'
import React from 'react'
import {RCy} from '../utils'
import {ENUMS, TestComponentWrapper} from '../components/test-component-wrapper'

const uniqueIdResizablePanes = ENUMS.resizablePanesId

const rCy = new RCy()
const {resizerSize, containerXLen} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

const INITIAL_SIZES: any = {
  [uniqueIdResizablePanes]: containerXLen,
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

describe('Basic outside operations', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

  it('should check Initial Sizes', () => {
    rCy.checkWidths(INITIAL_SIZES)
  })

  it('Hide and show complete ResizalbePanes component', () => {
    cy.get('[data-cy=hide-resizable-panes]').click()
      .wait(50)
    cy.get('[data-cy=hide-resizable-panes]').click()
  })

  describe('API operations', () => {
    it('should restore to default view', () => {
      rCy.moveItem(R0, R1)

      rCy.moveItem(R3, R2)
      rCy.cyGet('restore-default')
        .click()

      checkWidths(INITIAL_SIZES)
    })

    it('should call api method getMap', () => {
      rCy.cyGet('get-map')
        .click()
    })
  })
})
