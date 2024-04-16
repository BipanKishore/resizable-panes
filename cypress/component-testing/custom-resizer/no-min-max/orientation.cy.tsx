import React from 'react'
import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'
import {RCy} from '../../../utils'

const containerId = ENUMS.resizablePanesId

const rCy = new RCy({containerId, vertical: false})
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
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
      <TestComponentWrapper vertical={false} />
    )
  })

  it('Vertical panes Initial size',
    () => {
      rCy.checkWidths(
        [26, 10, 78, 10, 52, 10, 78, 10, 26]
      )

      rCy.checkWidths({
        [containerId]: 300
      })
    })
})
