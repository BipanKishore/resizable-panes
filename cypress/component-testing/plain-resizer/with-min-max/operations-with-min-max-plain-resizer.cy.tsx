import React from 'react'
import {RCy} from '../../../utils'
import {RPTestWrapper} from '../../../components/rp-test-wrapper'
import {testResizablePanesId} from '../../../components/rp-test-wrapper/constant'
import {withMinMaxEqualSize5PanesSet} from '../../pane-model-config-sets'
import {R0, R1, R2, R3, CK1, CK0, CK4, CK2} from '../../fix-test-ids'

const containerId = testResizablePanesId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  detectionSize: 5
})

describe('operations-with-min-max-plain-resizer', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxEqualSize5PanesSet}
        storageApi={localStorage}
        uniqueId={containerId}
        vertical
      >

      </RPTestWrapper>

    )
  })

  it('Check initial sizes', () => {
    rCy.checkWidthsAndSum(
      [100, 2, 300, 2, 200, 2, 300, 2, 100]
    )
    rCy.checkContainerWidth()
  })

  describe('Only to Edges movements', () => {
    it('R0 to max right', () => {
      rCy.move(R0, containerId, 'right')
      rCy.checkWidthsAndSum(
        [300, 2, 100, 2, 200, 2, 300, 2, 100]
      )
      rCy.checkContainerWidth()
    })

    it('R0 to max left', () => {
      rCy.move(R0, containerId, 'left')
      rCy.checkWidthsAndSum([10, 2, 390, 2, 200, 2, 300, 2, 100])
    })

    it('R1 to max left', () => {
      rCy.move(R1, containerId, 'left')
      rCy.checkWidths([10, 2, 100, 2, 300, 2, 490, 2, 100])
    })

    it('R1 to max right', () => {
      rCy.move(R1, containerId, 'right')
      rCy.checkWidthsAndSum(
        [100, 2, 690, 2, 100, 2, 100, 2, 10]
      )
    })

    it('R2 to max left', () => {
      rCy.move(R2, containerId, 'left')
      rCy.checkWidthsAndSum(
        [10, 2, 100, 2, 100, 2, 690, 2, 100]
      )
    })

    it('R2 to max right', () => {
      rCy.move(R2, containerId, 'right')
      rCy.checkWidthsAndSum(
        [100, 2, 490, 2, 300, 2, 100, 2, 10]
      )
    })

    it('R3 to max left', () => {
      rCy.move(R3, containerId, 'left')
      rCy.checkWidthsAndSum(
        [100, 2, 300, 2, 200, 2, 100, 2, 300]
      )
    })

    it('R3 to max right', () => {
      rCy.move(R3, containerId, 'right')
      rCy.checkWidthsAndSum(
        [100, 2, 300, 2, 200, 2, 390, 2, 10]
      )
    })
  })

  // Edge Case
  it('Left Axis: Outside the axis movements should not reproduce any change', () => {
    rCy.continousMovements(R2)
      .then(({left}) => {
        return left(700)
      })
      .then(({right}) => {
        rCy.checkWidthsAndSum(
          [10, 2, 100, 2, 100, 2, 690, 2, 100]
        )
        return right(10)
      })
      .then(({right}) => {
        rCy.checkWidthsAndSum(
          [10, 2, 100, 2, 100, 2, 690, 2, 100]
        )
        return right(100)
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
          [100, 2, 690, 2, 100, 2, 100, 2, 10]
        )
        return left(10)
      })
      .then(({up}) => {
        rCy.checkWidthsAndSum(
          [100, 2, 690, 2, 100, 2, 100, 2, 10]
        )
        return up()
      })
  })

  describe('Resizing with visibility operations', () => {
    it('Continuous resizing with visibility operations', () => {
      rCy.move(R1, R2, 'left')
      rCy.checkWidthsAndSum([100, 2, 490, 2, 100, 2, 210, 2, 100])

      rCy.cyGet(CK1).click()

      rCy.checkWidthsAndSum([197, 0, 0, 2, 196, 2, 413, 2, 196])

      rCy.cyGet(CK1).click()
      rCy.checkWidthsAndSum([100, 2, 490, 2, 100, 2, 210, 2, 100])

      rCy.moveNPixel(R1, 100, 'left')
      rCy.checkWidthsAndSum([100, 2, 390, 2, 200, 2, 210, 2, 100])

      rCy.cyGet(CK0).click()
      rCy.cyGet(CK4).click()
      rCy.checkWidthsAndSum([0, 0, 489, 2, 251, 2, 264, 0, 0])

      rCy.moveNPixel(R1, 45, 'left')

      rCy.checkWidthsAndSum([0, 0, 444, 2, 296, 2, 264, 0, 0])

      rCy.moveNPixel(R1, 200, 'left')
      rCy.checkWidthsAndSum([0, 0, 244, 2, 300, 2, 460, 0, 0])

      rCy.moveNPixel(R2, 200, 'right')

      rCy.checkWidthsAndSum([0, 0, 444, 2, 300, 2, 260, 0, 0])

      rCy.cyGet(CK2).click()
      rCy.checkWidthsAndSum([0, 0, 634, 0, 0, 2, 372, 0, 0])

      rCy.moveNPixel(R2, 200, 'right')
      rCy.checkWidthsAndSum([0, 0, 834, 0, 0, 2, 172, 0, 0])

      rCy.moveNPixel(R2, 400, 'left')
      rCy.checkWidthsAndSum([0, 0, 434, 0, 0, 2, 572, 0, 0])

      rCy.move(R2, containerId, 'left')
      rCy.checkWidthsAndSum([0, 0, 100, 0, 0, 2, 906, 0, 0])

      rCy.move(R2, containerId, 'right')
      rCy.checkWidthsAndSum([0, 0, 906, 0, 0, 2, 100, 0, 0])

      rCy.checkContainerWidth()
    })

    // F
    it('Hide P0, P1, P4 - R2 move most left', () => {
      cy.get(`[data-cy=${CK0}]`).click()
      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK4}]`).click()
      rCy.move(R2, containerId, 'left')

      rCy.checkWidthsAndSum([0, 0, 0, 0, 100, 2, 906, 0, 0])
    })
  })
})
