import React from 'react'
import {ENUMS, TestComponentWrapper} from '../components/test-component-wrapper'
import {RCy} from '../utils'

const uniqueIdResizablePanes = ENUMS.resizablePanesId

const rCy = new RCy()
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

const INITIAL_SIZES: any = {
  // [uniqueIdResizablePanes]: containerSize,
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

  it('Check initial sizes', () => {
    rCy.checkWidths(INITIAL_SIZES)

    rCy.cyGet('hide-resizable-panes').click()
      .wait(50)
    rCy.cyGet('hide-resizable-panes').click()
  })

  it('Resize Panes then hide and show resizalbe comonent, all the sizes should be same', () => {
    rCy.toMostLeft(R2)
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

    rCy.cyGet('hide-resizable-panes').click()
      .wait(50)
    rCy.cyGet('hide-resizable-panes').click()

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
})
