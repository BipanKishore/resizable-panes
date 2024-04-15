import React from 'react'
import {ENUMS, SimpleVisibilityOperations} from '../../../cy-env/pages'
import {RCy} from '../../utils'
import {checkWidths} from '../../utils/check-widths'

const uniqueIdResizablePanes = ENUMS.resizablePanesId
const rCy = new RCy({
})
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

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
      <SimpleVisibilityOperations />
    )
  })

  it('should check Initial Sizes', () => {
    checkWidths(INITIAL_SIZES)
  })

  describe('Single Resizer Movements', () => {
    describe('R0 Movements', () => {
      it('Overlap R0 to R1', () => {
        rCy.moveItem(R0, R1)
        checkWidths({
          [P0]: 137,
          [P1]: 0,
          [P2]: 64,
          [P3]: 96,
          [P4]: 32,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })
    })
  })
})
