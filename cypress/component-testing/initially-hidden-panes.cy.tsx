import React from 'react'

import {CK0, R1, rScontainerId} from './fix-test-ids'
import {RCy} from '../utils'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {withMinMaxEqualSize5PanesSet} from './pane-model-config-sets'

const containerId = rScontainerId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 10,
  vertical: true
})
const {resizerSize} = rCy

describe('Initial visibility use case', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        initalVisibility={{
          P0: false,
          P1: true,
          P2: true
        }}
        panesList={withMinMaxEqualSize5PanesSet}
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={containerId}
        vertical
      >

      </RPTestWrapper >

    )
  })

  afterEach(() => {
    rCy.checkContainerWidth()
  })

  it('should check inital sizes',
    () => {
      rCy.checkWidths(
        [0, 0, 337, 10, 224, 10, 337, 10, 112]
      )
    })

  // Edge
  it('After initial size/mount if we trun ON P0 visibility, it should come back to its normal size', () => {
    rCy.cyGet(CK0).check()

    rCy.checkWidths(
      [100, 10, 300, 10, 200, 10, 300, 10, 100]
    )
  })

  // Edge
  it('Default hidden Pane whenever made visible should come to its default size',
    () => {
      rCy.moveNPixel(R1, 10, 'right')
      rCy.cyGet(CK0).check()
      rCy.checkWidths(
        [100, 10, 309, 10, 191, 10, 300, 10, 100]
      )
    })

  // Edge
  // eslint-disable-next-line max-len
  it('Default hidden Pane whenever made visible should come to its default size and its resizer should stay after novement',
    () => {
      rCy.moveNPixel(R1, 10, 'right')
      rCy.cyGet(CK0).check()
      rCy.moveNPixel(R1, 10, 'right')
      rCy.checkWidths(
        [100, 10, 319, 10, 181, 10, 300, 10, 100]
      )
    })
})
