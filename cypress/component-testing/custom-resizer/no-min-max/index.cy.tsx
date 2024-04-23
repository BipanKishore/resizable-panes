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

  describe('Partial visible resizer auto fix use case', () => {
    it('Partially hide R1 from left using R0, R1 should hide completely', () => {
      rCy.move(R0, P1, 'right', 2)
      rCy.checkWidths({
        [R1]: 0
      })
    })

    it('Partially hide R2 from right using R3, R2 should hide completely', () => {
      rCy.move(R3, P3, 'left', -2)
      rCy.checkWidths({
        [R2]: 0
      })
    })
  })

  describe('Simple Resizing and visibility operations', () => {
    it('hide P1 >> P2 >> R1 TO 100Px right', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
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

      cy.get(`[data-cy=${CK1}]`).check()
      cy.get(`[data-cy=${CK3}]`).check()

      rCy.checkWidths({
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })
  })

  describe('Overlap resizer to another, no visibility operation', () => {
    describe('R0 Movements', () => {
      it('Overlap R0 to R1', () => {
        rCy.moveItem(R0, R1)

        rCy.checkWidthsAndSum({
          [P0]: 410,
          [P1]: 0,
          [P2]: 200,
          [P3]: 300,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })

      it('Overlap R2 to R1', () => {
        rCy.moveItem(R2, R1)
        rCy.checkWidthsAndSum({
          [P0]: 100,
          [P1]: 300,
          [P2]: 0,
          [P3]: 510,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })

      it('Overlap R2 to R3', () => {
        rCy.moveItem(R2, R3)
        rCy.checkWidthsAndSum({
          [P0]: 100,
          [P1]: 300,
          [P2]: 510,
          [P3]: 0,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: resizerSize,
          [R2]: resizerSize,
          [R3]: 0
        })
      })

      it('Overlap R0 to R1 >> R0 to Start', () => {
        rCy.moveItem(R0, R1)
        rCy.moveResizerToStart(R0)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 400,
          [P2]: 200,
          [P3]: 300,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: resizerSize,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })

      it('Overlap R0 to R3 >> R0 to start >> R1 to start >> R2 to start >> R3 to start', () => {
        rCy.moveItem(R0, R3)

        rCy.checkWidthsAndSum({
          [P0]: 930,
          [P1]: 0,
          [P2]: 0,
          [P3]: 0,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: 0,
          [R3]: 0
        })

        rCy.moveResizerToStart(R0)

        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 920,
          [P2]: 0,
          [P3]: 0,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: resizerSize,
          [R2]: 0,
          [R3]: 0
        })

        rCy.moveResizerToStart(R1)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 0,
          [P2]: 920,
          [P3]: 0,
          [P4]: 100,
          [R0]: 0,
          [R1]: resizerSize,
          [R2]: resizerSize,
          [R3]: 0
        })

        rCy.moveResizerToStart(R2)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 0,
          [P2]: 0,
          [P3]: 920,
          [P4]: 100,
          [R0]: 0,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })

        rCy.moveResizerToStart(R3)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 0,
          [P2]: 0,
          [P3]: 0,
          [P4]: 1030,
          [R0]: 0,
          [R1]: 0,
          [R2]: 0,
          [R3]: resizerSize
        })
      })
    })
  })
})
