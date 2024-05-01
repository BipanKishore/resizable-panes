import React from 'react'
import {ENUMS, TestComponentWrapper} from '../../../components/test-component-wrapper'
import {RCy} from '../../../utils'

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
