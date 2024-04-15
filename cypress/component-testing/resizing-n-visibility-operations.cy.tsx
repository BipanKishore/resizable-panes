import {ENUMS, TestComponentWrapper} from '../components/test-component-wrapper'
import React from 'react'
import {RCy} from '../utils'

const rCy = new RCy()
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

describe('Simple Resizing and visibility operations', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

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
