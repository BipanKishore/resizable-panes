import React from 'react'
import {RCy} from '../../utils'
import {testResizablePanesId} from '../../components/rp-test-wrapper/constant'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {withMinMaxEqualSize5PanesSet} from '../pane-model-config-sets'

const containerId = testResizablePanesId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  vertical: false
})
const {resizerSize} = rCy

describe('operations-with-min-max-plain-resizer', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxEqualSize5PanesSet}
        storageApi={localStorage}
        uniqueId={containerId}

        vertical={false}
      >

      </RPTestWrapper>

    )
  })

  it('should check height',
    () => {
      rCy.checkWidths([29, 2, 88, 2, 58, 2, 88, 2, 29])
    })
})
