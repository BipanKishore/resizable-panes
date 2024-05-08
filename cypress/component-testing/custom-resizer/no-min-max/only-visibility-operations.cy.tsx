import {TestComponentWrapper} from '../../../components/test-component-wrapper'
import React from 'react'
import {RCy} from '../../../utils'
import {RPTestWrapper} from '../../../components/rp-test-wrapper'
import {rScontainerId} from '../../fix-test-ids'
import {_2PaneWithNoMinMax, noMinMax5PanesSet} from '../../pane-model-config-sets'
import {CustomResizerFirst} from '../../../components/custom-resizer'

const rCy = new RCy({
  resizerSize: 10
})
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

describe('Only visibility operations', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

  describe('Hide single Pane', () => {
    it('hide P0', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
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

    it('hide P1', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
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

    it('hide P2', () => {
      cy.get(`[data-cy=${CK2}]`).uncheck()
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

    it('hide P3', () => {
      cy.get(`[data-cy=${CK3}]`).uncheck()
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

    it('hide P4', () => {
      cy.get(`[data-cy=${CK4}]`).uncheck()
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
  })

  describe('Hide two consecutive Panes', () => {
    it('hide P0>> P1', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 0,
        [P2]: 340,
        [P3]: 510,
        [P4]: 170,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('hide P1>> P2', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 204,
        [P1]: 0,
        [P2]: 0,
        [P3]: 612,
        [P4]: 204,
        [R0]: 0,
        [R1]: 0,
        [R2]: resizerSize,
        [R3]: resizerSize
      })
    })

    it('hide P2>> P3', () => {
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 204,
        [P1]: 612,
        [P2]: 0,
        [P3]: 0,
        [P4]: 204,
        [R0]: resizerSize,
        [R1]: 0,
        [R2]: 0,
        [R3]: resizerSize
      })
    })

    it('hide P3>> P4', () => {
      cy.get(`[data-cy=${CK3}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 170,
        [P1]: 510,
        [P2]: 340,
        [P3]: 0,
        [P4]: 0,
        [R0]: resizerSize,
        [R1]: resizerSize,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Three consecutive Panes', () => {
    it('hide P0 >> P1 >> P2', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
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

    it('hide P1 >> P2 >> P3', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 515,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 515,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: resizerSize
      })
    })

    it('hide P2 >> P3 >> P4', () => {
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 257,
        [P1]: 773,
        [P2]: 0,
        [P3]: 0,
        [P4]: 0,
        [R0]: resizerSize,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Four consecutive Panes', () => {
    it('hide P0 >> P1 >> P2 >> P3', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 1040,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Four consecutive Panes', () => {
    it('hide P0 >> P1 >> P2 >> P3', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK2}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 0,
        [P1]: 0,
        [P2]: 0,
        [P3]: 0,
        [P4]: 1040,
        [R0]: 0,
        [R1]: 0,
        [R2]: 0,
        [R3]: 0
      })
    })
  })

  describe('Hide Random two Panes', () => {
    it('hide P0 >> P4', () => {
      cy.get(`[data-cy=${CK0}]`).uncheck()
      cy.get(`[data-cy=${CK4}]`).uncheck()
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

    it('hide P1 >> P2', () => {
      cy.get(`[data-cy=${CK1}]`).uncheck()
      cy.get(`[data-cy=${CK3}]`).uncheck()
      rCy.checkWidthsAndSum({
        [P0]: 255,
        [P1]: 0,
        [P2]: 510,
        [P3]: 0,
        [P4]: 255,
        [R0]: 0,
        [R1]: resizerSize,
        [R2]: 0,
        [R3]: resizerSize
      })
    })
  })
})

describe('Test Visibility for 2 panes', () => {
  const rCy = new RCy({
    resizerSize: 1,
    containerId: rScontainerId,
    len: 2
  })

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={_2PaneWithNoMinMax}
        resizerClass='bg-slate-500'
        resizerSize={1}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >
      </RPTestWrapper>
    )
  })

  // Edge
  it('should should hide resizer for two pane set', () => {
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()
    rCy.checkWidths(
      {
        P0: 0,
        [R0]: 0,
        P1: 0
      }
    )
  })
})

describe('Test Visibility for 5 panes', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 5
  })

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
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

  // Edge
  it(`
  -- 1st Partially hide P2, P3, P4 (One Half)
  -- Hide P0, 01 (Other Half)
  -- Result It should make visible Partially hidden panes
  -- 2nd Show P0, and P1
  -- Partially hidden should hide again`, () => {
    rCy.move(R1, rScontainerId, 'right')
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()

    rCy.checkWidths([0, 0, 0, 0, 340, 10, 340, 10, 340])
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()
    rCy.checkWidths([100, 10, 920, 10, 0, 0, 0, 0, 0])
  })
})

// https://github.com/BipanKishore/resizable-panes-react/pull/64
// describe('Hide All consecutive Panes', () => {
//   it('hide P0 >> P1 >> P2 >> P3 >> P4', () => {
//     cy.get(`[data-cy=${CK0}]`).uncheck()
//     cy.get(`[data-cy=${CK1}]`).uncheck()
//     cy.get(`[data-cy=${CK2}]`).uncheck()
//     cy.get(`[data-cy=${CK3}]`).uncheck()
//     cy.get(`[data-cy=${CK4}]`).uncheck()
//     rCy.checkWidths({
//       [P0]: 0,
//       [P1]: 0,
//       [P2]: 0,
//       [P3]: 0,
//       [P4]: 0,
//       [R0]: 0,
//       [R1]: 0,
//       [R2]: 0,
//       [R3]: 0
//     })
//   })
// })
