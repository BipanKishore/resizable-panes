import React from 'react'
import {RCy} from '../../../utils'
import {ENUMS} from '../../../components/test-component-wrapper'
import {RPTestWrapper} from '../../../components/rp-test-wrapper'
import {CustomResizerFirst} from '../../../components/custom-resizer'
import {noMinMaxEqualSize7PanesSet} from '../../pane-model-config-sets'
import {
  R0, R1, R2, R3, R4, R5,
  CK0, CK1, CK2, CK3, CK4, CK5, CK6,
  P0, P1, P2, P3, P4, P5, P6
} from '../../fix-test-ids'

const uniqueIdResizablePanes = ENUMS.resizablePanesId
const rCy = new RCy({
  resizerSize: 10,
  containerId: uniqueIdResizablePanes,
  len: 7
})
const {resizerSize} = rCy

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
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMaxEqualSize7PanesSet}
        resizer={
          <CustomResizerFirst size={10} />
      }
        resizerSize={10}
        uniqueId={ENUMS.resizablePanesId}
        vertical
      />
    )
  })

  it(`
  -- Move R0 to R3 
  -- hide P3,P2,P1 
  -- Move  R3 to right by 100  
  Result- P1,R0,P2,R1,P3 should remain hidden`, () => {
    rCy.move(R0, R3)

    rCy.cyGet(CK3).uncheck()
    rCy.cyGet(CK2).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R3, 100)

    rCy.checkWidthsAndSum([701, 0, 0, 0, 0, 0, 0, 10, 43, 10, 143, 10, 143])
  })

  it(`
  -- Move R0 to R2
  -- Move R5 to R3 
  -- hide P3 
  -- Move  R0 to right by 100  
  Result- P0,R0,P6 visible`, () => {
    rCy.move(R0, R2)
    rCy.move(R5, R3, 'left')

    rCy.cyGet(CK3).uncheck()
    rCy.moveNPixel(R0, 100)

    rCy.checkWidthsAndSum([624, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 426])
  })

  it(`
  -- Move R3 to R0 
  -- hide P3,P2,P1`, () => {
    rCy.move(R3, R0, 'left')

    rCy.cyGet(CK3).uncheck()
    rCy.cyGet(CK2).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R3, 100, 'right')
    rCy.checkWidthsAndSum([242, 0, 0, 0, 0, 0, 0, 10, 502, 10, 143, 10, 143])
  })

  // runForPre
  it(`
  -- Move R1 to R2, R3 to R1 
  -- hide P3,P2,P1
  Result -- Visible P0, P4, P5, P6, R3, R4, R5`, () => {
    rCy.move(R1, R2, 'right')
    rCy.move(R3, R1, 'left')

    rCy.cyGet(CK3).uncheck()
    rCy.cyGet(CK2).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R5, 100, 'right')
    rCy.checkWidthsAndSum([203, 0, 0, 0, 0, 0, 0, 10, 421, 10, 303, 10, 103])
  })

  // leading to Bug
  it('-- Hide P2 -- Move R0 to R2 -- Show P2 -- Hide P1, Move R1 to 100px right Result -- Hide R0, P1', () => {
    rCy.cyGet(CK2).uncheck()

    rCy.move(R0, R2, 'right')
    rCy.cyGet(CK2).check()

    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R1, 100, 'right')
    rCy.checkWidths({
      [R0]: 0,
      [P1]: 0
    })
  })

  // leading to Bug
  it(`--Move R0 to R1 -- hide P1 -- Move R1 to 50 pexels right Result 
  -- hide R0 --  show P1 Result -- R1 hide`, () => {
    rCy.move(R0, R1, 'right')
    rCy.cyGet(CK1).uncheck()
    rCy.moveNPixel(R1, 50)

    rCy.checkWidths({
      [R0]: 0
    })

    rCy.cyGet(CK1).check()

    rCy.checkWidths({
      [R1]: 0
    })
  })

  // leading to Bug
  it('Move R1 to R2, r3 to R2 Result -- R0 HIDE , R3 VISIBLE', () => {
    rCy.move(R1, R2, 'right', 10)
    rCy.move(R3, R2, 'left', -10)
    rCy.cyGet(CK2).uncheck()
    rCy.checkWidths({
      [R2]: 0,
      [R3]: resizerSize
    })
  })

  // If Resizer is first visible Item it should hide
  it('Move R1 to container left -- hide P3,P2,P1', () => {
    rCy.move(R1, uniqueIdResizablePanes, 'left')
    rCy.cyGet(CK0).uncheck()

    rCy.move(R3, R2, 'left', -10)
    rCy.cyGet(CK2).uncheck()
    rCy.checkWidths({
      [R2]: 0,
      [R3]: resizerSize
    })
  })

  // last Resizer should hide automatically
  it('Move R4 to container Right,  -- ', () => {
    rCy.move(R4, uniqueIdResizablePanes, 'right')
    rCy.cyGet(CK6).uncheck()

    rCy.checkWidths({
      [R5]: 0,
      [R4]: resizerSize
    })

    rCy.moveNPixel(R4, 150, 'left')

    rCy.checkWidths({
      [R5]: 0,
      [R4]: resizerSize,
      [P6]: 0
    })

    rCy.cyGet(CK6).check()

    rCy.checkWidths({
      [R5]: resizerSize,
      [R4]: resizerSize,
      [P6]: 0
    })
    rCy.moveNPixel(R5, 100, 'left')

    rCy.checkWidths({
      [R5]: resizerSize,
      [R4]: resizerSize,
      [P6]: 95
    })

    rCy.checkContainerWidth()
    rCy.move(R3, R1, 'left', -10)
    rCy.cyGet(CK2).uncheck()
    rCy.checkWidths({
      [R2]: 0,
      [R3]: resizerSize
    })
  })
})

// Hide Hide P1 from right
// Hide P5 from left
// Hide P2
// Hide P4
// hIDE P5 -> Error

// Hide P1 to P6 from right
// hIDE P1 -> Error -> No Visible resizer

// Hide P5 to P0 from left
// hIDE P6 -> Error -> No Visible resizer

// Hide Hide P1 from left
// Hide P5 from right
// Hide P2
// Hide P4
// hIDE P5 -> Error
