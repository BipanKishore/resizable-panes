import React from 'react'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {RCy} from '../utils'
import {rScontainerId, CK0, CK1, R0} from './fix-test-ids'
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
  it('Hiding P0- P1 will become 1000 not 1001 as max = 100 x 10 with No Resizer', () => {
    rCy.cyGet(CK0).click()
    cy.wait(50)
      .then(() => {
        const rejectedArrgs = onChangeVisibility.getCall(1).args

        expect(rejectedArrgs).to.deep.equal([{
          P0: 'hidden',

          P1: 'visible'
        }])

        rCy.checkWidths(
          {
            P0: 0,
            [R0]: 0,
            P1: 1000
          }
        )
      })
  })

  // Edge
  it('Hiding P1- P2 will become 1000 not 1001 as max = 100 x 10 with No Resizer', () => {
    rCy.cyGet(CK1).click()
    cy.wait(50)
      .then(() => {
        const rejectedArrgs = onChangeVisibility.getCall(1).args

        expect(rejectedArrgs).to.deep.equal([{
          P0: 'visible',
          P1: 'hidden'
        }])

        rCy.checkWidths(
          {P0: 1000, [R0]: 0, P1: 0}
        )
      })
  })
})
