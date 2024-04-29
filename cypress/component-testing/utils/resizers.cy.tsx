import React from 'react'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {R0, R1, rScontainerId} from '../fix-test-ids'
import {mix3PanesSet} from '../pane-model-config-sets'
import {RCy} from '../../utils'
const containerId = rScontainerId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 10,
  vertical: true,
  len: 3
})

describe('Test UI Action: setResizersLimits method with mix3PanesSet', () => {
  beforeEach(() => {
    rCy.setViewPort()

    cy.mount(
      <RPTestWrapper
        panesList={mix3PanesSet}
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >
      </RPTestWrapper>
    )
  })

  it('Move R0 to most right R1 should become zero', () => {
    rCy.move(R0, containerId, 'right')
    rCy.checkWidths(
      [750, 10, 0, 0, 260]
    )
  })

  // Edge
  it('Move R1 to most left R0 should become zero', () => {
    rCy.move(R1, containerId, 'left')
    rCy.checkWidths(
      [260, 0, 0, 10, 750]
    )
  })

  // Edge
  it('Move R0 to most left R0 should remain same', () => {
    rCy.move(R0, containerId, 'left')
    rCy.checkWidths(
      [125, 10, 500, 10, 375]
    )
  })

  it('Move R01to most right R1 should remain same', () => {
    rCy.move(R1, containerId, 'right')
    rCy.checkWidths(
      [375, 10, 500, 10, 125]
    )
  })
})
