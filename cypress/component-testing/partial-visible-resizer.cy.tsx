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

describe('Partially use case', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

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
