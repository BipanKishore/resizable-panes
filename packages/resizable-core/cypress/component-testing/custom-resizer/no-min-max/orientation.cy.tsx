import React from 'react'
import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'
import {RCy} from '../../../utils'
import {RPTestWrapper} from '../../../components/rp-test-wrapper'
import {noMinMax5PanesSet} from '../../pane-model-config-sets'

const containerId = ENUMS.resizablePanesId

const rCy = new RCy({containerId, vertical: false})

const {
  resizerIds: [,,],
  checkboxIds: [,,,],
  paneIds: [,,,]
} = rCy.getResizableIds()

describe('Overlapping Resizers', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper vertical={false} />
    )
  })

  it('Vertical panes Initial size',
    () => {
      rCy.checkWidths(
        [26, 10, 78, 10, 52, 10, 78, 10, 26]
      )

      rCy.checkWidths({
        [containerId]: 300
      })
    })
})

describe('Horizontal Panes with plain Resizers', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resizerSize={1}
        uniqueId={containerId}
        vertical={false}
      />
    )
  })

  it('Vertical panes Initial size',
    () => {
      rCy.checkWidths({
        [containerId]: 300
      })
    })
})
