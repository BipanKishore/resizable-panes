import React from 'react'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {RCy} from '../utils'
import {rScontainerId, CK0, CK1} from './fix-test-ids'
import {_2PaneWithMinMax} from './pane-model-config-sets'
import {SinonSpy} from 'cypress/types/sinon'

describe('Test onChangeVisibility Rejected param', () => {
  let onChangeVisibility: SinonSpy

  const rCy = new RCy({
    resizerSize: 1,
    containerId: rScontainerId,
    len: 2
  })

  beforeEach(() => {
    rCy.setViewPort()
    onChangeVisibility = cy.spy()
    cy.mount(
      <RPTestWrapper
        panesList={_2PaneWithMinMax}
        resizerClass='bg-slate-500'
        resizerSize={1}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
        onChangeVisibility={onChangeVisibility}
      >
      </RPTestWrapper>
    )
  })

  // Edge
  it('should reject when trying to hide P0', () => {
    rCy.cyGet(CK0).click()
    cy.wait(50)
      .then(() => {
        const rejectedArrgs = onChangeVisibility.getCall(1).args
        const acceptedArrgs = onChangeVisibility.getCall(2).args

        expect(rejectedArrgs).to.deep.equal([{
          P0: 'hidden',
          P1: 'visible'
        }, {accepted: false}])
        expect(acceptedArrgs).to.deep.equal([{
          P0: 'visible',
          P1: 'visible'
        }, {accepted: true}])

        rCy.checkWidths(
          {P0: 600, P1: 400}
        )
      })
  })

  // Edge
  it('should reject when trying to hide P1', () => {
    rCy.cyGet(CK1).click()
    cy.wait(50)
      .then(() => {
        const rejectedArrgs = onChangeVisibility.getCall(1).args
        const acceptedArrgs = onChangeVisibility.getCall(2).args

        expect(rejectedArrgs).to.deep.equal([{
          P0: 'visible',
          P1: 'hidden'
        }, {accepted: false}])
        expect(acceptedArrgs).to.deep.equal([{
          P0: 'visible',
          P1: 'visible'
        }, {accepted: true}])

        rCy.checkWidths(
          {P0: 600, P1: 400}
        )
      })
  })
})
