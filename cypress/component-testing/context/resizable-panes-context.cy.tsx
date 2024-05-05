import {RCy} from '../../utils'
import {noMinMax5PanesSet} from '../pane-model-config-sets'
import {CK3, CK4, P0, P1, containerId} from '../fix-test-ids'
import {CustomResizerFirst} from '../../components/custom-resizer'
import React from 'react'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {IResizableApi} from '../../../src/@types'

describe('should test ResizableContext: clearflagsOnNewView', () => {
  let resizableApi: IResizableApi
  const rCy = new RCy({
    containerId,
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

        uniqueId={containerId}
        vertical
        zipping={false}

        onReady={(api: IResizableApi) => {
          resizableApi = api
        }}
      >
      </RPTestWrapper>
    )
  })

  it(`
  - using api.setSize set P0 to MAX 
  - hide P4, P3
  - using api.setSize set P0 to MAX
  - Result: It should allow P0 to set to current max (P3, P4 hidden)`, () => {
    resizableApi.setSize(P0, 10000)
    rCy.cyGet(CK4).click()
    rCy.cyGet(CK3).click()

    cy.wait(50)
      .then(() => {
        rCy.checkWidths(
          [1020, 10, 0, 10, 0, 0, 0, 0, 0]
        )

        resizableApi.setSize(P0, 10000)
        rCy.checkWidths(
          [1020, 10, 0, 10, 0, 0, 0, 0, 0]
        )
      })
  })

  it.only(`
  - using api.setSize set P0 to MAX 
  - hide P4, P3
  - using api.setSize set P0 to MAX
  - Result: It should allow P0 to set to current max (P3, P4 hidden)`, () => {
    rCy.cyGet(CK4).click()
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P0, 10000)
      })
      .wait(50)
      .then(() => {
        rCy.cyGet(CK3).click()
      })
    // resizableApi.setSize(P0, 10000)
    // resizableApi.restore()
    // resizableApi.setSize(P1, 10000)
    // cy.wait(50)
    //   .then(() => {
    //     rCy.checkWidths(
    //       [1020, 10, 0, 10, 0, 0, 0, 0, 0]
    //     )

    //     resizableApi.setSize(P0, 10000)
    //     rCy.checkWidths(
    //       [1020, 10, 0, 10, 0, 0, 0, 0, 0]
    //     )
    //   })
  })
})
