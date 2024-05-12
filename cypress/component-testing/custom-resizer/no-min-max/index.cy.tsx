import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'
import React from 'react'
import {RCy} from '../../../utils'

const uniqueIdResizablePanes = ENUMS.resizablePanesId
const rCy = new RCy({
  resizerSize: 10,
  containerId: uniqueIdResizablePanes
})
const {resizerSize, containerXLen} = rCy

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

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

describe('No min max limits, Custom resizer with resizerSize prop', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

  it('should check Initial Sizes', () => {
    rCy.checkWidths(INITIAL_SIZES)
  })

  describe('Remounting ', () => {
    it('should remount properly', () => {
      cy.get('[data-cy=hide-resizable-panes]').click()
        .wait(50)
      cy.get('[data-cy=hide-resizable-panes]').click()
    })
  })

  describe('API operations', () => {
    it('should restore to default view', () => {
      rCy.moveItem(R0, R1)

      rCy.moveItem(R3, R2)
      rCy.cyGet('restore-default')
        .click()

      rCy.checkWidths(INITIAL_SIZES)
    })

    // need working
    it('should call api method getMap', () => {
      rCy.cyGet('get-map')
        .click()
    })
  })

  describe('Simple Resizing and visibility operations', () => {
    it('hide P1 >> P2 >> R1 TO 100Px right', () => {
      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK3}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 255,
        [P1]: 0,
        [P2]: 510,
        [P3]: 0,
        [P4]: 255,
        [R0]: 0,
        [R1]: resizerSize,
        [R2]: 0,
        [R3]: resizerSize
      })

      rCy.moveNPixel(R1, 400, 'right')

      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK3}]`).click()

      rCy.checkWidths({
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })
  })
})
