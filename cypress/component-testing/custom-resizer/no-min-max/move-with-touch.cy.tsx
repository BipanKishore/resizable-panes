import React from 'react'
import {checkWidths} from '../../../utils/check-widths'
import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'

const uniqueIdResizablePanes = ENUMS.resizablePanesId

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
    cy.viewport('iphone-x')
    cy.mount(
      <TestComponentWrapper />
    )
  })

  it('should check Initial Sizes', () => {
    checkWidths(INITIAL_SIZES)
  })
})
