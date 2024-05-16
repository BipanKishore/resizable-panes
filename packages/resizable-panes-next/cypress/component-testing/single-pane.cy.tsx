import React from 'react'
import {RCy} from '../utils'
import {testResizablePanesId} from '../components/rp-test-wrapper/constant'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {withMinMaxEqualSize1PanesSet} from './pane-model-config-sets'
const containerId = testResizablePanesId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  vertical: false,
  len: 1
})
const {resizerSize} = rCy

describe('Test single resizer', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxEqualSize1PanesSet}
        storageApi={localStorage}
        uniqueId={containerId}

        vertical={false}
      >

      </RPTestWrapper>

    )
  })

  it('Check initial size', () => {
    rCy.checkWidths([300])
  })
})
