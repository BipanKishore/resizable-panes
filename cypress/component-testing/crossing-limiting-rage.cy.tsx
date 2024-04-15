import {checkWidths} from '../utils/check-widths'
import {ENUMS, TestComponentWrapper} from '../components/test-component-wrapper'
import {RCy} from '../utils'
import React from 'react'

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

describe('Overlapping Resizers', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

  it('Check initial size', () => {
    checkWidths(INITIAL_SIZES)

    cy.get('[data-cy=hide-resizable-panes]').click()
      .wait(50)
    cy.get('[data-cy=hide-resizable-panes]').click()
  })

  it('R2 to most Left', () => {
    rCy.toMostLeft(R2)

    rCy.checkWidths({
      [uniqueIdResizablePanes]: containerXLen
    })

    rCy.checkWidthsAndSum({
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
    rCy.toMostRight(R1)

    rCy.checkWidths({
      [uniqueIdResizablePanes]: containerXLen
    })

    rCy.checkWidthsAndSum({
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
