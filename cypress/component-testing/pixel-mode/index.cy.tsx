import React from 'react'
import {RCy} from '../../utils'
import {testResizablePanesId} from '../../components/rp-test-wrapper/constant'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {withMinMaxPixelMode5PanesSet} from '../pane-model-config-sets'
import {R0} from '../fix-test-ids'

const containerId = testResizablePanesId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  vertical: true
})
const {resizerSize} = rCy

describe('Pixel mode', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxPixelMode5PanesSet}
        storageApi={localStorage}
        uniqueId={containerId}

        vertical
      >

      </RPTestWrapper>

    )
  })

  it('should check inital sizes',
    () => {
      rCy.checkWidths([100, 2, 300, 2, 400, 2, 50, 2, 150])
    })

  it('move R0 max right',
    () => {
      rCy.moveNPixel(R0, 300, 'right')
      rCy.checkWidths([300, 2, 100, 2, 400, 2, 50, 2, 150])
    })

  it('move R0 max left',
    () => {
      rCy.moveNPixel(R0, 300, 'left')
      rCy.checkWidths([50, 2, 350, 2, 400, 2, 50, 2, 150])
    })
})
