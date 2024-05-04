import React from 'react'
import {RCy} from '../utils'
import {withMinMaxEqualSize5PanesSet} from './pane-model-config-sets'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {CK0, CK1, CK4, P0, P1, P2, P3, P4, P5, R0, R1, R2, R3, containerId, rScontainerId} from './fix-test-ids'
import {CustomResizerFirst} from '../components/custom-resizer'
import {Pane, ResizablePanes} from '../../src'
import {IGetState, IResizableApi} from '../../src/@types'
import {HIDDEN, VISIBLE} from '../../src/constant'

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
      P1: VISIBLE,
      P0: VISIBLE
    })
  })

  it('Hide P0 using API.setVisibility method', () => {
    resizableApi.setVisibility({P0: false})
    const visibilityMap = resizableApi.getVisibilitiesMap()

    expect(visibilityMap).to.deep.equal({
      P1: VISIBLE,
      P0: HIDDEN
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
      P1: VISIBLE,
      P0: HIDDEN
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

describe('Custom resizer:API: Method setSize', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 5
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

          <Pane className='bg-cyan-500' id={P0} minSize={0.1} size={1}>
          </Pane>

          <Pane className='bg-red-500' id={P1} maxSize={5} minSize={1} size={3}>
          </Pane>
          <Pane className='bg-cyan-500' id={P2} maxSize={4} minSize={0.5} size={2}>
          </Pane>

          <Pane className='bg-red-500' id={P3} maxSize={5} minSize={1} size={3}>
          </Pane>
          <Pane className='bg-cyan-500' id={P4} minSize={0.1} size={1} >
          </Pane>

        </ResizablePanes>
      </div>
    )
    cy.wait(50)
  })

  it('setSize should not make any change for Zero of Negative numbers', () => {
    resizableApi.setSize(P0, 0)

    rCy.checkWidths(
      [100, 10, 300, 10, 200, 10, 300, 10, 100]
    )
  })

  it('setSize should not fork for hidden items', () => {
    resizableApi.setVisibility({
      P0: false
    })
    resizableApi.setSize(P0, 500)

    rCy.checkWidths(
      [0, 0, 337, 10, 224, 10, 337, 10, 112]
    )
  })

  it('should setSize of First Pane to 500', () => {
    resizableApi.setSize(P0, 500)

    rCy.checkWidths(
      [500, 10, 166, 10, 111, 10, 167, 10, 56]
    )
  })

  it(`setSize of Pane to Infinity have maxSize = Infinity 
  should only allow max possible depending on others`, () => {
    resizableApi.setSize(P0, 5000)

    rCy.checkWidths(
      [740, 10, 100, 10, 50, 10, 100, 10, 10]
    )
  })

  it('setting P2 to 500 Result it should set P2 to only max allowed ie 400', () => {
    resizableApi.setSize(P2, 500)
    rCy.checkWidths(
      [75, 10, 225, 10, 400, 10, 225, 10, 75]
    )
  })

  it('setting P2 to 10 Result it should set P2 to only min allowed ie 50', () => {
    resizableApi.setSize(P2, 10)
    rCy.checkWidths(
      [119, 10, 356, 10, 50, 10, 356, 10, 119]
    )
  })

  // Edge
  it('setting P1 to 600 by chaning 1 pixel, It should only move to its max', () => {
    for (let i = 400; i < 600; i++) {
      resizableApi.setSize(P1, i)
    }

    rCy.checkWidths(
      [72, 10, 500, 10, 143, 10, 214, 10, 71]
    )
  })

  // Edge
  it('setting P1 to -5 by chaning 1 pixel, It should only move to its min', () => {
    for (let i = 200; i > -5; i--) {
      resizableApi.setSize(P1, i)
    }

    rCy.checkWidths(
      [128, 10, 100, 10, 257, 10, 386, 10, 129]
    )
  })
})

describe('Custom resizer:API: Method setSize', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 5
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

          <Pane className='bg-cyan-500' id={P0} minSize={0.1} size={1}>
          </Pane>

          <Pane className='bg-red-500' id={P1} maxSize={5} minSize={1} size={3}>
          </Pane>
          <Pane className='bg-cyan-500' id={P2} maxSize={4} minSize={0.5} size={2}>
          </Pane>

          <Pane className='bg-red-500' id={P3} maxSize={5} minSize={1} size={3}>
          </Pane>
          <Pane className='bg-cyan-500' id={P4} minSize={0} size={1} >
          </Pane>

        </ResizablePanes>
      </div>
    )
    cy.wait(50)
  })

  // Edge
  it('Should work for last Hidden Pane', () => {
    rCy.move(R3, containerId, 'right')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P4, 400)
        rCy.checkWidths(
          [60, 10, 180, 10, 120, 10, 240, 10, 400]
        )
      })
  })
})

describe('Plain resizer:API: Method setSize', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 5
  })
  let resizableApi

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <div className='h-300 w-100p'>
        <ResizablePanes
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >

          <Pane className='bg-cyan-500' id={P0} minSize={0.1} size={1}>
          </Pane>

          <Pane className='bg-red-500' id={P1} maxSize={5} minSize={1} size={3}>
          </Pane>
          <Pane className='bg-cyan-500' id={P2} maxSize={4} minSize={0.5} size={2}>
          </Pane>

          <Pane className='bg-red-500' id={P3} maxSize={5} minSize={1} size={3}>
          </Pane>
          <Pane className='bg-cyan-500' id={P4} minSize={0.1} size={1} >
          </Pane>

        </ResizablePanes>
      </div>
    )
    cy.wait(50)
  })

  it('should setSize of First Pane to 500', () => {
    resizableApi.setSize(P0, 500)

    rCy.checkWidths({
      P0: 500,
      P1: 166,
      P2: 111,
      P3: 167,
      P4: 56
    })
  })

  it('setting P2 to 500 Result it should set P2 to only max allowed ie 400', () => {
    resizableApi.setSize(P2, 500)

    rCy.checkWidths({
      P0: 75,
      P1: 225,
      P2: 400,
      P3: 225,
      P4: 75
    })
  })

  it('setting P2 to 10 Result it should set P2 to only min allowed ie 50', () => {
    resizableApi.setSize(P2, 10)

    rCy.checkWidths({
      P0: 119,
      P1: 356,
      P2: 50,
      P3: 356,
      P4: 119
    })
  })
})

describe('PartialHidden:Plain resizer:API: Method setSize', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 5
  })
  let resizableApi

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
            P0
          </Pane>

          <Pane className='bg-red-500' id={P1} maxSize={5} size={3}>
            P1
          </Pane>
          <Pane className='bg-orange-500' id={P2} maxSize={4} size={2}>
            P2
          </Pane>

          <Pane className='bg-red-500' id={P3} maxSize={5} size={3}>
            P3
          </Pane>

          <Pane className='bg-amber-500' id={P4} size={1} >
            P4
          </Pane>

        </ResizablePanes>
      </div>
    )
    cy.wait(50)
  })

  it('Move R3 to R0, should setSize of First Pane to 500', () => {
    rCy.move(R3, R0, 'left')

    resizableApi.setSize(P0, 500)
    rCy.checkWidths(
      [500, 0, 0, 0, 0, 0, 0, 10, 530]
    )
  })

  it('setting P2 to 500 Result it should set P2 to only max allowed ie 400', () => {
    rCy.move(R3, R1, 'left')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P2, 500)
      })

    rCy.checkWidths(
      [60, 10, 179, 10, 400, 0, 0, 10, 371]
    )
  })

  it('setting P2 to 10 Result it should set P2 to only min allowed ie 50', () => {
    rCy.move(R1, R3, 'left')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P2, 10)
      })

    rCy.checkWidths(
      [402, 10, 490, 10, 10, 10, 0, 10, 98]
    )
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
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()
    rCy.cyGet(CK4).click()

    rCy.move(R2, rScontainerId, 'left')
  })
})
