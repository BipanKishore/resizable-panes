import React from 'react'
import {RCy} from '../utils'
import {withMinMaxEqualSize5PanesSet} from './pane-model-config-sets'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {CK0, CK1, CK4, P0, P1, R0, R2, rScontainerId} from './fix-test-ids'
import {CustomResizerFirst} from '../components/custom-resizer'
import {Pane, ResizablePanes} from '../../src'
import {IGetState, IResizableApi} from '../../src/@types'

describe('Storage api', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId
  })
  let resizableApi: IResizableApi

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <div className='h-300 w-100p'>
        <ResizablePanes
          resizer={
            <CustomResizerFirst horizontal={false} size={10} />
        }
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >

          <Pane className='bg-cyan-500' id={P0} size={1}>
          </Pane>

          <Pane className='bg-red-500' id={P1} size={1}>
          </Pane>

        </ResizablePanes>
      </div>
    )

    cy.wait(50)
  })

  it('Check initial sizes with fixed values and API.getSizesMap method', () => {
    const sizeMap = resizableApi.getSizesMap()
    rCy.checkWidths(sizeMap)
    rCy.checkWidths({
      P0: 515,
      P1: 515
    })
  })

  it('Check initial visibility with fixed values and API.getSizesMap method', () => {
    const visibilityMap = resizableApi.getVisibilitiesMap()
    expect(visibilityMap).to.deep.equal({
      P1: true,
      P0: true
    })
  })

  it('Hide P0 using API.setVisibility method', () => {
    resizableApi.setVisibility({P0: false})
    const visibilityMap = resizableApi.getVisibilitiesMap()

    expect(visibilityMap).to.deep.equal({
      P1: true,
      P0: false
    })
  })

  it('should check API.getState method', () => {
    const state: IGetState = resizableApi.getState()

    expect(state).to.deep.equal({
      P1: {
        size: 515,
        visibility: true,
        minSize: 0,
        maxSize: Infinity
      },
      P0: {
        size: 515,
        visibility: true,
        minSize: 0,
        maxSize: Infinity
      }
    })
  })

  it('Hide P0 using API.setVisibility method -- Then restore using API.restoreDefault', () => {
    resizableApi.setVisibility({}) // For isNoChange code branch
    resizableApi.setVisibility({P0: false})
    const visibilityMap = resizableApi.getVisibilitiesMap()

    expect(visibilityMap).to.deep.equal({
      P1: true,
      P0: false
    })

    resizableApi.restoreDefault()

    const state: IGetState = resizableApi.getState()

    expect(state).to.deep.equal({
      P1: {
        size: 515,
        visibility: true,
        minSize: 0,
        maxSize: Infinity
      },
      P0: {
        size: 515,
        visibility: true,
        minSize: 0,
        maxSize: Infinity
      }
    })
  })

  it('Move R0 -- Then restore using API.restoreDefault', () => {
    rCy.moveNPixel(R0, 100, 'right')

    rCy.checkWidths({
      P0: 615,
      [R0]: 10,
      P1: 415
    })

    resizableApi.restoreDefault()

    const state: IGetState = resizableApi.getState()

    expect(state).to.deep.equal({
      P1: {
        size: 515,
        visibility: true,
        minSize: 0,
        maxSize: Infinity
      },
      P0: {
        size: 515,
        visibility: true,
        minSize: 0,
        maxSize: Infinity
      }
    })
  })
})
describe('Storage api', () => {
  let resizableApi: IResizableApi

  const rCy = new RCy({
    resizerSize: 1,
    detectionSize: 5
  })
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        detectionSize={5}
        panesList={withMinMaxEqualSize5PanesSet}
        resizerClass='bg-slate-500'
        resizerSize={1}
        storageApi={localStorage}
        uniqueId={rScontainerId}

        vertical
      >

      </RPTestWrapper>
    )
  })

  it('Move R0 -- Then restore using API.restoreDefault', () => {
    rCy.cyGet(CK0).uncheck()
    rCy.cyGet(CK1).uncheck()
    rCy.cyGet(CK4).uncheck()

    rCy.move(R2, rScontainerId, 'left')
  })
})
