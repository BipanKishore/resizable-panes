import React from 'react'
import {RCy} from '../utils'
import {CK0, P0, P1, P2, P3, P4, R0, R1, R2, R3, CK1, CK2, CK3, CK4, rScontainerId} from './fix-test-ids'
import {withMinMaxEqualSize5PanesSet} from './pane-model-config-sets'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {CustomResizerFirst} from '../components/custom-resizer'

const containerId = rScontainerId
const rCy = new RCy({
  resizerSize: 10,
  containerId,
  plainResizer: false
})
const {resizerSize} = rCy

describe('Resizing with min and max with visibility operations', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxEqualSize5PanesSet}
        resizer={
          <CustomResizerFirst size={10} />
        }
        resizerClass='bg-slate-500'
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >

      </RPTestWrapper>

    )
  })

  describe('Only Visibility operations', () => {
    it('Hide P0', () => {
      cy.get(`[data-cy=${CK0}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 337,
        [P2]: 224,
        [P3]: 337,
        [P4]: 112,
        [R0]: 0,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('Hide P1', () => {
      cy.get(`[data-cy=${CK1}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 144,
        [P1]: 0,
        [P2]: 289,
        [P3]: 433,
        [P4]: 144,
        [R0]: 0,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('Hide P2', () => {
      cy.get(`[data-cy=${CK2}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 126,
        [P1]: 379,
        [P2]: 0,
        [P3]: 379,
        [P4]: 126,
        [R0]: resizerSize,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('Hide P3', () => {
      cy.get(`[data-cy=${CK3}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 144,
        [P1]: 433,
        [P2]: 289,
        [P3]: 0,
        [P4]: 144,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: 0,
        [R3]: resizerSize
      })
    })

    it('Hide P4', () => {
      cy.get(`[data-cy=${CK4}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 112,
        [P1]: 337,
        [P2]: 224,
        [P3]: 337,
        [P4]: 0,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: 0
      })
    })

    it('Hide P0, P1', () => {
      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK0}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 0,
        [P2]: 300,
        [P3]: 540,
        [P4]: 180,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('Hide P0, P2', () => {
      cy.get(`[data-cy=${CK2}]`).click()
      cy.get(`[data-cy=${CK0}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 437,
        [P2]: 0,
        [P3]: 437,
        [P4]: 146,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('Hide P0, P3', () => {
      cy.get(`[data-cy=${CK3}]`).click()
      cy.get(`[data-cy=${CK0}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 540,
        [P2]: 300,
        [P3]: 0,
        [P4]: 180,
        [R0]: 0,
        [R1]: resizerSize,
        [R2]: 0,
        [R3]: resizerSize
      })
    })

    it('Hide P0, P4', () => {
      cy.get(`[data-cy=${CK4}]`).click()
      cy.get(`[data-cy=${CK0}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 382,
        [P2]: 255,
        [P3]: 383,
        [P4]: 0,
        [R0]: 0,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: 0
      })
    })

    it('Hide P0, P1, P2', () => {
      cy.get(`[data-cy=${CK0}]`).click()
      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK2}]`).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 772,
        [P4]: 258,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: resizerSize
      })
    })

    it('Hide P0, P1, P4', () => {
      cy.get(`[data-cy=${CK0}]`).click()
      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK4}]`).click()
      rCy.checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 300,
        [P3]: 730,
        [P4]: 0,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: 0
      })
      rCy.checkContainerWidth()
    })

    it('Hide P0, P2, P3', () => {
      rCy.cyGet(CK0).click()
      rCy.cyGet(CK2).click()
      rCy.cyGet(CK3).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 772,
        [P2]: 0,
        [P3]: 0,
        [P4]: 258,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: resizerSize
      })
      rCy.checkContainerWidth()
    })

    it('Hide P0, P2, P4', () => {
      rCy.cyGet(CK0).click()
      rCy.cyGet(CK2).click()
      rCy.cyGet(CK4).click()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 515,
        [P2]: 0,
        [P3]: 515,
        [P4]: 0,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: 0
      })
      rCy.checkContainerWidth()
    })

    it('Hide P0, P1, P2, P4', () => {
      rCy.cyGet(CK0).click()
      rCy.cyGet(CK1).click()
      rCy.cyGet(CK2).click()
      rCy.cyGet(CK4).click()
      rCy.checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 1040,
        [P4]: 0,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
      rCy.checkContainerWidth()
    })

    it('Hide P0, P2, P3, P4', () => {
      rCy.cyGet(CK0).click()
      rCy.cyGet(CK2).click()
      rCy.cyGet(CK3).click()
      rCy.cyGet(CK4).click()
      rCy.checkWidths({
        [P0]: 0,
        [P1]: 1040,
        [P2]: 0,
        [P3]: 0,
        [P4]: 0,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
      rCy.checkContainerWidth()
    })
  })

  describe('Rezing to container Edges', () => {
    it('R0 to max right', () => {
      rCy.move(R0, containerId, 'right')
      rCy.checkWidths({
        [P0]: 300,
        [P1]: 100,
        [R0]: resizerSize,
        [R1]: resizerSize
      })
    })

    it('R0 to max left', () => {
      rCy.move(R0, containerId, 'left')
      rCy.checkWidths({
        [P0]: 10,
        [P1]: 390,
        [R0]: resizerSize,
        [R1]: resizerSize
      })
    })

    it('R1 to max left', () => {
      rCy.move(R1, containerId, 'left')
      rCy.checkWidths({
        [P0]: 10,
        [P1]: 100,
        [P2]: 300,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize
      })
    })

    it('R1 to max right', () => {
      rCy.move(R1, containerId, 'right')
      rCy.checkWidthsAndSum({
        [P0]: 100,
        [P1]: 690,
        [P2]: 100,
        [P3]: 100,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('R2 to max left', () => {
      rCy.move(R2, containerId, 'left')
      rCy.checkWidthsAndSum({
        [P0]: 10,
        [P1]: 100,
        [P2]: 100,
        [P3]: 690,
        [P4]: 100,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('R2 to max right', () => {
      rCy.move(R2, containerId, 'right')
      rCy.checkWidthsAndSum({
        [P0]: 100,
        [P1]: 490,
        [P2]: 300,
        [P3]: 100,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('R3 to max left', () => {
      rCy.move(R3, containerId, 'left')
      rCy.checkWidthsAndSum({
        [P0]: 100,
        [P1]: 300,
        [P2]: 200,
        [P3]: 100,
        [P4]: 300,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('R3 to max right', () => {
      rCy.move(R3, containerId, 'right')
      rCy.checkWidthsAndSum({
        [P0]: 100,
        [P1]: 300,
        [P2]: 200,
        [P3]: 390,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('R3 to max right - R2 to max right', () => {
      rCy.move(R3, containerId, 'right')
      rCy.move(R2, containerId, 'right')
      rCy.checkWidthsAndSum({
        [P0]: 100,
        [P1]: 490,
        [P2]: 300,
        [P3]: 100,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('R3 to max right - R0 to max left - R2 to max right - R1 to most left', () => {
      rCy.move(R3, containerId, 'right')
      rCy.move(R0, containerId, 'left')
      rCy.checkWidthsAndSum({
        [P0]: 10,
        [P1]: 390,
        [P2]: 200,
        [P3]: 390,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })

      rCy.move(R2, containerId, 'right')

      rCy.checkWidthsAndSum({
        [P0]: 10,
        [P1]: 580,
        [P2]: 300,
        [P3]: 100,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })

      rCy.move(R1, containerId, 'left')

      rCy.checkWidthsAndSum({
        [P0]: 10,
        [P1]: 100,
        [P2]: 300,
        [P3]: 580,
        [P4]: 10,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })
  })

  describe('Resizing with visibility operations', () => {
    it('Continuous resizing with visibility operations', () => {
      rCy.move(R1, R2, 'left')
      rCy.checkWidths([
        100,
        10,
        500,
        10,
        100,
        10,
        200,
        10,
        100
      ])

      rCy.cyGet(CK1).click()

      rCy.checkWidths([
        202,
        0,
        0,
        10,
        202,
        10,
        404,
        10,
        202
      ])

      rCy.cyGet(CK1).click()

      rCy.checkWidths([
        100,
        10,
        500,
        10,
        100,
        10,
        200,
        10,
        100
      ])

      rCy.moveNPixel(R1, 100, 'left')

      rCy.checkWidths(
        [
          100,
          10,
          400,
          10,
          200,
          10,
          200,
          10,
          100
        ]
      )

      rCy.cyGet(CK0).click()
      rCy.cyGet(CK4).click()

      rCy.checkWidths(
        [
          0,
          0,
          510,
          10,
          255,
          10,
          255,
          0,
          0
        ]
      )

      rCy.moveNPixel(R1, 45, 'left')

      rCy.checkWidths(
        [
          0,
          0,
          465,
          10,
          300,
          10,
          255,
          0,
          0
        ]
      )

      rCy.moveNPixel(R1, 200, 'left')

      rCy.checkWidths(
        [
          0,
          0,
          265,
          10,
          300,
          10,
          455,
          0,
          0
        ]
      )

      rCy.moveNPixel(R2, 200, 'right')

      rCy.checkWidths(
        [
          0,
          0,
          465,
          10,
          300,
          10,
          255,
          0,
          0
        ]
      )

      rCy.cyGet(CK2).click()

      rCy.checkWidths(
        [
          0,
          0,
          665,
          0,
          0,
          10,
          365,
          0,
          0
        ]
      )

      rCy.moveNPixel(R2, 200, 'right')

      rCy.checkWidths(
        [
          0,
          0,
          865,
          0,
          0,
          10,
          165,
          0,
          0
        ]
      )

      rCy.moveNPixel(R2, 400, 'left')

      rCy.checkWidths(
        [
          0,
          0,
          465,
          0,
          0,
          10,
          565,
          0,
          0
        ]
      )

      rCy.move(R2, containerId, 'left')

      rCy.checkWidths(
        [
          0,
          0,
          100,
          0,
          0,
          10,
          930,
          0,
          0
        ]
      )

      rCy.move(R2, containerId, 'right')

      rCy.checkWidths(
        [
          0,
          0,
          930,
          0,
          0,
          10,
          100,
          0,
          0
        ]
      )

      rCy.checkContainerWidth()
    })

    // F
    it('Hide P0, P1, P4 - R2 move most left', () => {
      cy.get(`[data-cy=${CK0}]`).click()
      cy.get(`[data-cy=${CK1}]`).click()
      cy.get(`[data-cy=${CK4}]`).click()
      rCy.move(R2, containerId, 'left')
      rCy.checkWidths({
        [P0]: 0,
        [P1]: 0,
        [P2]: 100,
        [P3]: 930,
        [P4]: 0,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: 0
      })
      rCy.checkContainerWidth()
    })
  })
})

describe('Resizing with min and max with visibility operations written here for unSafeVisibilityMode', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxEqualSize5PanesSet}
        resizer={
          <CustomResizerFirst size={10} />
        }
        resizerClass='bg-slate-500'
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >

      </RPTestWrapper>

    )
  })

  // Resizing after this fails
  it('Hide P0, P1, P3 - should not allow movement when View Size Changed has changed (isViewSizeChanged)', () => {
    cy.get(`[data-cy=${CK0}]`).click()
    cy.get(`[data-cy=${CK1}]`).click()
    cy.get(`[data-cy=${CK3}]`).click()
    rCy.checkWidths({
      [P0]: 0,
      [P1]: 0,
      [P2]: 300,
      [P3]: 0,
      [P4]: 300,
      [R0]: 0,
      [R1]: 0,
      [R2]: 0,
      [R3]: resizerSize
    })
    rCy.checkContainerWidth()
    rCy.moveNPixel(R3, 100, 'right')
    rCy.checkWidths({
      [P0]: 0,
      [P1]: 0,
      [P2]: 300,
      [P3]: 0,
      [P4]: 300,
      [R0]: 0,
      [R1]: 0,
      [R2]: 0,
      [R3]: resizerSize
    })
  })

  it('Hide P0, P1, P2, P3', () => {
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()
    rCy.cyGet(CK2).click()
    rCy.cyGet(CK3).click()
    rCy.checkWidths({
      [P0]: 0,
      [P1]: 0,
      [P2]: 0,
      [P3]: 0,
      [P4]: 300,
      [R0]: 0,
      [R1]: 0,
      [R2]: 0,
      [R3]: 0
    })
    rCy.checkContainerWidth()
  })

  it('Hide P0, P1, P3, P4', () => {
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()
    rCy.cyGet(CK3).click()
    rCy.cyGet(CK4).click()
    rCy.checkWidths({
      [P0]: 0,
      [P1]: 0,
      [P2]: 300,
      [P3]: 0,
      [P4]: 0,
      [R0]: 0,
      [R1]: 0,
      [R2]: 0,
      [R3]: 0
    })
    rCy.checkContainerWidth()
  })

  it('Hide P1, P2, P3, P4', () => {
    rCy.cyGet(CK1).click()
    rCy.cyGet(CK2).click()
    rCy.cyGet(CK3).click()
    rCy.cyGet(CK4).click()
    rCy.checkWidths({
      [P0]: 300,
      [P1]: 0,
      [P2]: 0,
      [P3]: 0,
      [P4]: 0,
      [R0]: 0,
      [R1]: 0,
      [R2]: 0,
      [R3]: 0
    })
    rCy.checkContainerWidth()
  })
})
