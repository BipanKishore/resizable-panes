import React from 'react'
import {RCy} from '../../../utils'
import {checkWidths} from '../../../utils/check-widths'
import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'
import {RPTestWrapper} from '../../../components/rp-test-wrapper'
import {Pane} from '../../../../src'
import {CustomResizerFirst} from '../../../components/custom-resizer'
import {PaneModelConfig} from '../../../components/rp-test-wrapper/util'

const uniqueIdResizablePanes = ENUMS.resizablePanesId
const rCy = new RCy({
})
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3, R4, R5, R6],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4, CK5, CK6],
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

const noMinMax7PanesSet = [
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1)
]

describe('Move Panes on', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax7PanesSet}
        resizer={
          <CustomResizerFirst size={10} />
      }
        resizerSize={10}
        // storageApi={localStorage}
        uniqueId={ENUMS.resizablePanesId}
        unit='ratio'
        vertical
      />
    )
  })

  it('Move R0 to R3 -- hide P3,P2,P1', () => {
    rCy.move(R0, R3)

    rCy.cyGet(CK3).uncheck()
    rCy.cyGet(CK2).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R0, 100, 'left')

    rCy.checkWidthsAndSum([830, 10, 0, 0, 0, 0, 0, 0, 200])
  })

  it('Move R3 to R0 -- hide P3,P2,P1', () => {
    rCy.move(R3, R0, 'left')

    rCy.cyGet(CK3).uncheck()
    rCy.cyGet(CK2).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R3, 100, 'right')
    rCy.checkWidthsAndSum([200, 0, 0, 0, 0, 0, 0, 10, 830])
  })

  // runForPre
  it('Move R1 to R2, R3 to R1 -- hide P3,P2,P1', () => {
    rCy.move(R1, R2, 'right')
    rCy.move(R3, R1, 'left')

    rCy.cyGet(CK3).uncheck()
    rCy.cyGet(CK2).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R3, 100, 'right')
    rCy.checkWidthsAndSum([302, 0, 0, 0, 0, 0, 0, 10, 728])
  })

  // leading to Bug
  it.only('Move R0 to R3 -- hide P3,P2,P1', () => {
    rCy.cyGet(CK2).uncheck()

    rCy.move(R0, R2, 'right')
    // rCy.cyGet(CK2).check()

    // rCy.cyGet(CK1).uncheck()
    // rCy.moveNPixel(R1, 100, 'right')
    rCy.checkWidths({
      [R2]: 0
    })
  })
})
