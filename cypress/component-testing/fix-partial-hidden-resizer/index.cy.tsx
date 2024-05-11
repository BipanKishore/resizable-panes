import React from 'react'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {RCy} from '../../utils'
import {noMinMax5PanesSet} from '../pane-model-config-sets'
import {R0, R1, R2, R3, rScontainerId} from '../fix-test-ids'
import {CustomResizerFirst} from '../../components/custom-resizer'

const rCy = new RCy({
  containerId: rScontainerId,
  plainResizer: true,
  resizerSize: 10,
  detectionSize: 5
})

describe.skip('operations-no-min-max-plain-resizer', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resigerClass="bg-slate-500"
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >

      </RPTestWrapper>

    )
  })

  afterEach(() => {
    rCy.checkContainerWidth()
  })

  it('Check initial sizes', () => {
    rCy.checkWidthsAndSum(
      [100, 10, 300, 10, 200, 10, 300, 10, 100]
    )
  })

  // Edge
  it('should hide R2 when R1 overlap over it and P1 size shoul increase by resizer size', () => {
    rCy.moveNPixel(R1, 200 + 1)

    rCy.checkWidthsAndSum(
      [100, 10, 510, 10, 0, 0, 300, 10, 100]
    )
  })

  // Edge
  it('should hide R1 when R2 overlap over it and P3 size shoul increase by resizer size', () => {
    rCy.moveNPixel(R2, 200 + 1, 'left')

    rCy.checkWidthsAndSum(
      [100, 10, 300, 0, 0, 10, 510, 10, 100]
    )
  })
})

describe('should test MinSize=0 & zipping=false', () => {
  const rCy = new RCy({
    containerId: rScontainerId,
    plainResizer: false,
    resizerSize: 10
  })
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resigerClass="bg-slate-500"
        resizer={
          <CustomResizerFirst size={10} />
        }
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
        zipping={false}
      >

      </RPTestWrapper>

    )
  })

  afterEach(() => {
    rCy.checkContainerWidth()
  })

  it('should hide R1 when R2 overlap over it and P3 size shoul increase by resizer size', () => {
    rCy.move(R0, R3, 'left')
    rCy.checkWidthsAndSum(
      [920, 10, 0, 10, 0, 10, 0, 10, 80]
    )
  })
})
