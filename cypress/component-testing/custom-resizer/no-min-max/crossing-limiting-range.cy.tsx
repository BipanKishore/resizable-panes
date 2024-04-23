import {checkWidths} from '../../../utils/check-widths'
import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'
import {RCy} from '../../../utils'
import React from 'react'
import {R2, R0, R1, R3, rScontainerId} from '../../fix-test-ids'

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
    rCy.moveNPixel(R2, 1000, 'left')

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
    rCy.moveNPixel(R1, 1000)

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
