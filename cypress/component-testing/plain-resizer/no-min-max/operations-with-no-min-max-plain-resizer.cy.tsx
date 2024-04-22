import React from 'react'
import {RCy} from '../../../utils'
import {RPTestWrapper} from '../../../components/rp-test-wrapper'
import {testResizablePanesId} from '../../../components/rp-test-wrapper/constant'
import {noMinMax5PanesSet} from '../../pane-model-config-sets'
import {R0, R1, R2} from '../../fix-test-ids'

const containerId = testResizablePanesId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  detectionSize: 5
})

describe('operations-no-min-max-plain-resizer', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resizerSize={2}
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
      [100, 2, 300, 2, 200, 2, 300, 2, 100]
    )
  })

  describe('Only to Edges movements', () => {
    it('R0 to max right', () => {
      rCy.move(R0, containerId, 'right')
      rCy.checkWidthsAndSum(
        [1006, 2, 0, 0, 0, 0, 0, 0, 0]
      )
    })

    it('R0 to max left', () => {
      rCy.move(R0, containerId, 'left')
      rCy.checkWidthsAndSum(
        [0, 2, 400, 2, 200, 2, 300, 2, 100]
      )
    })
  })

  // Edge Case
  it('Left Axis: Outside the axis movements should not reproduce any change', () => {
    rCy.continousMovements(R2)
      .then(({left}) => {
        return left(1200)
      })
      .then(({right}) => {
        rCy.checkWidthsAndSum([0, 0, 0, 0, 0, 2, 904, 2, 100]
        )
        return right(10)
      })
      .then(({right}) => {
        right(100)

        rCy.checkWidthsAndSum([0, 0, 0, 0, 0, 2, 904, 2, 100])
      })
  })

  // Edge Case
  it('Right Axis: Outside the axis movements should not reproduce any change', () => {
    rCy.continousMovements(R1)
      .then(({right}) => {
        return right(800)
      })
      .then(({left}) => {
        rCy.checkWidthsAndSum(
          [100, 2, 904, 2, 0, 0, 0, 0, 0]
        )
        return left(10)
      })
      .then(({up}) => {
        rCy.checkWidthsAndSum(
          [100, 2, 904, 2, 0, 0, 0, 0, 0]
        )
        return up()
      })
  })
})
