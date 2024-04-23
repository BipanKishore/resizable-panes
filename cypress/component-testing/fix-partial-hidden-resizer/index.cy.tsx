import React from 'react'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {testResizablePanesId} from '../../components/rp-test-wrapper/constant'
import {RCy} from '../../utils'
import {noMinMax5PanesSet} from '../pane-model-config-sets'
import {R1, R2, rScontainerId} from '../fix-test-ids'

const containerId = testResizablePanesId
const detectionSize = 5

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 10,
  detectionSize: 5
})

describe('operations-no-min-max-plain-resizer', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={containerId}
        vertical
      >

      </RPTestWrapper>

    )
  })

  afterEach(() => {
    rCy.checkContainerWidth()
  })

  it('Check initial sizes', () => {
    rCy.checkWidthsAndSum(
      [100, 10, 300, 10, 200, 10, 300, 10, 100]
    )
  })

  // Edge
  it('should hide R2 when R1 overlap over it and P1 size shoul increase by resizer size', () => {
    rCy.moveNPixel(R1, 200 + 1)

    rCy.checkWidthsAndSum(
      [100, 10, 510, 10, 0, 0, 300, 10, 100]
    )
  })

  // Edge
  it('should hide R1 when R2 overlap over it and P3 size shoul increase by resizer size', () => {
    rCy.moveNPixel(R2, 200 + 1, 'left')

    rCy.checkWidthsAndSum(
      [100, 10, 300, 0, 0, 10, 510, 10, 100]
    )
  })
})
