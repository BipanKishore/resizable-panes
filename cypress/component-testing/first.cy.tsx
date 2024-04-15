import React from 'react'
import {ENUMS, SimpleVisibilityOperations} from '../../cy-env/pages'
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
      <SimpleVisibilityOperations />
    )
  })

  it('Check initial sizes', () => {
    rCy.checkWidths(INITIAL_SIZES)

    rCy.cyGet('hide-resizable-panes').click()
      .wait(50)
    rCy.cyGet('hide-resizable-panes').click()
  })

  it('R2 to most Left', () => {
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
  })

  it('R1 to most Right', () => {
    rCy.toMostRight(R1)

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
