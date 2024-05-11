import React from 'react'
import {RCy} from '../utils'
import {
  noMinMax5PanesSet,
  withMinMaxAllPaneEqualSizeExcept15PanesSet,
  withMinMaxEqualSize5PanesSet
} from './pane-model-config-sets'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {
  CK0,
  CK1,
  CK4,
  P0,
  P1,
  P2,
  P3,
  P4,
  R0,
  R1,
  R2,
  R3,
  containerId,
  rScontainerId
} from './fix-test-ids'
import {CustomResizerFirst} from '../components/custom-resizer'
import {Pane, ResizablePanes} from '../../src'
import {IGetState, IResizableApi} from '../../src/@types'
import {
  BUTTOM_FIRST, DEFAULT_MAX_SIZE_KEY, DEFAULT_MIN_SIZE_KEY, TOP_FIRST
} from '../../src/constant'
import {SinonSpy} from 'cypress/types/sinon'

describe('Storage api', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId
  })
  let resizableApi: IResizableApi

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <div className="h-300 w-100p">
        <ResizablePanes
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >
          <Pane className="bg-cyan-500" id={P0} size={1}></Pane>

          <Pane className="bg-red-500" id={P1} size={1}></Pane>
        </ResizablePanes>
      </div>
    )

    cy.wait(50)
  })

  it('Check initial sizes with fixed values and API.getSizes method', () => {
    const sizeMap = resizableApi.getSizes()
    rCy.checkWidths(sizeMap)
    rCy.checkWidths({
      P0: 515,
      P1: 515
    })
  })

  it('Check initial visibility with fixed values and API.getSizes method', () => {
    const visibilityMap = resizableApi.getVisibilities()
    expect(visibilityMap).to.deep.equal({
      P1: true,
      P0: true
    })
  })

  it('Hide P0 using API.setVisibilities method', () => {
    resizableApi.setVisibilities({P0: false})
    const visibilityMap = resizableApi.getVisibilities()

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
        [DEFAULT_MIN_SIZE_KEY]: 0,
        [DEFAULT_MAX_SIZE_KEY]: Infinity
      },
      P0: {
        size: 515,
        visibility: true,
        [DEFAULT_MIN_SIZE_KEY]: 0,
        [DEFAULT_MAX_SIZE_KEY]: Infinity
      }
    })
  })

  it('Hide P0 using API.setVisibilities method -- Then restore using API.restore', () => {
    resizableApi.setVisibilities({}) // For isNoChange code branch
    resizableApi.setVisibilities({P0: false})
    const visibilityMap = resizableApi.getVisibilities()

    expect(visibilityMap).to.deep.equal({
      P1: true,
      P0: false
    })

    resizableApi.restore()

    const state: IGetState = resizableApi.getState()

    expect(state).to.deep.equal({
      P1: {
        size: 515,
        visibility: true,
        [DEFAULT_MIN_SIZE_KEY]: 0,
        [DEFAULT_MAX_SIZE_KEY]: Infinity
      },
      P0: {
        size: 515,
        visibility: true,
        [DEFAULT_MIN_SIZE_KEY]: 0,
        [DEFAULT_MAX_SIZE_KEY]: Infinity
      }
    })
  })

  it('Move R0 -- Then restore using API.restore', () => {
    rCy.moveNPixel(R0, 100, 'right')

    rCy.checkWidths({
      P0: 615,
      [R0]: 10,
      P1: 415
    })

    resizableApi.restore()

    const state: IGetState = resizableApi.getState()

    expect(state).to.deep.equal({
      P1: {
        size: 515,
        visibility: true,
        [DEFAULT_MIN_SIZE_KEY]: 0,
        [DEFAULT_MAX_SIZE_KEY]: Infinity
      },
      P0: {
        size: 515,
        visibility: true,
        [DEFAULT_MIN_SIZE_KEY]: 0,
        [DEFAULT_MAX_SIZE_KEY]: Infinity
      }
    })
  })

  // Edge
  it(`
  -- Hide all Panes
  -- execute API.restore
  -- It should allow resizing now`, () => {
    resizableApi.setVisibilities({
      P0: false,
      P1: false
    })

    resizableApi.restore()
    rCy.moveNPixel(R0, 100, 'right')
    rCy.checkWidths({
      P0: 615,
      P1: 415
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
      <div className="h-300 w-100p">
        <ResizablePanes
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >
          <Pane className="bg-cyan-500" id={P0} minSize={0.1} size={1}></Pane>

          <Pane
            className="bg-red-500"
            id={P1}
            maxSize={5}
            minSize={1}
            size={3}
          >
          </Pane>
          <Pane
            className="bg-cyan-500"
            id={P2}
            maxSize={4}
            minSize={0.5}
            size={2}
          >
          </Pane>

          <Pane
            className="bg-red-500"
            id={P3}
            maxSize={5}
            minSize={1}
            size={3}
          >
          </Pane>
          <Pane className="bg-cyan-500" id={P4} minSize={0.1} size={1}></Pane>
        </ResizablePanes>
      </div>
    )
    cy.wait(50)
  })

  it('setSize should not make any change for of Negative numbers', () => {
    resizableApi.setSize(P0, -1)

    rCy.checkWidths([100, 10, 300, 10, 200, 10, 300, 10, 100])
  })

  it('setSize should not fork for hidden items', () => {
    resizableApi.setVisibilities({
      P0: false
    })
    resizableApi.setSize(P0, 500)

    rCy.checkWidths([0, 0, 337, 10, 224, 10, 337, 10, 112])
  })

  it('should setSize of First Pane to 500', () => {
    resizableApi.setSize(P0, 500)

    rCy.checkWidths([500, 10, 166, 10, 111, 10, 167, 10, 56])
  })

  it(`setSize of Pane to Infinity have maxSize = Infinity
  should only allow max possible depending on others`, () => {
    resizableApi.setSize(P0, 5000)

    rCy.checkWidths([740, 10, 100, 10, 50, 10, 100, 10, 10])
  })

  it('setting P2 to 500 Result it should set P2 to only max allowed ie 400', () => {
    resizableApi.setSize(P2, 500)
    rCy.checkWidths([75, 10, 225, 10, 400, 10, 225, 10, 75])
  })

  it('setting P2 to 10 Result it should set P2 to only min allowed ie 50', () => {
    resizableApi.setSize(P2, 10)
    rCy.checkWidths([119, 10, 356, 10, 50, 10, 356, 10, 119])
  })

  // Edge
  it('setting P1 to 600 by chaning 1 pixel, It should only move to its max', () => {
    for (let i = 400; i < 600; i++) {
      resizableApi.setSize(P1, i)
    }

    rCy.checkWidths([72, 10, 500, 10, 143, 10, 214, 10, 71])
  })

  // Edge Edge
  it('setting P1 to -5 by chaning 1 pixel, It should only move to its min', () => {
    for (let i = 200; i > -5; i--) {
      // cy.wait(0).then(() => resizableApi.setSize(P1, i))
      resizableApi.setSize(P1, i)
    }

    rCy.checkWidths([128, 10, 100, 10, 257, 10, 386, 10, 129])
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
      <div className="h-300 w-100p">
        <ResizablePanes
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >
          <Pane className="bg-cyan-500" id={P0} minSize={0.1} size={1}></Pane>

          <Pane
            className="bg-red-500"
            id={P1}
            maxSize={5}
            minSize={1}
            size={3}
          >
          </Pane>
          <Pane
            className="bg-cyan-500"
            id={P2}
            maxSize={4}
            minSize={0.5}
            size={2}
          >
          </Pane>

          <Pane
            className="bg-red-500"
            id={P3}
            maxSize={5}
            minSize={1}
            size={3}
          >
          </Pane>
          <Pane className="bg-cyan-500" id={P4} minSize={0} size={1}></Pane>
        </ResizablePanes>
      </div>
    )
    cy.wait(50)
  })

  // Edge
  it('Should work for last Hidden Pane', () => {
    rCy.move(R3, containerId, 'right')
    cy.wait(50).then(() => {
      resizableApi.setSize(P4, 400)
      rCy.checkWidths([60, 10, 180, 10, 120, 10, 240, 10, 400])
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
      <div className="h-300 w-100p">
        <ResizablePanes
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >
          <Pane className="bg-cyan-500" id={P0} minSize={0.1} size={1}></Pane>

          <Pane
            className="bg-red-500"
            id={P1}
            maxSize={5}
            minSize={1}
            size={3}
          >
          </Pane>
          <Pane
            className="bg-cyan-500"
            id={P2}
            maxSize={4}
            minSize={0.5}
            size={2}
          >
          </Pane>

          <Pane
            className="bg-red-500"
            id={P3}
            maxSize={5}
            minSize={1}
            size={3}
          >
          </Pane>
          <Pane className="bg-cyan-500" id={P4} minSize={0.1} size={1}></Pane>
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

describe.skip('PartialHidden:Plain resizer:API: Method setSize', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 5
  })
  let resizableApi

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <div className="h-300 w-100p">
        <ResizablePanes
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >
          <Pane className="bg-cyan-500" id={P0} size={1}>
            P0
          </Pane>

          <Pane className="bg-red-500" id={P1} maxSize={5} size={3}>
            P1
          </Pane>
          <Pane className="bg-orange-500" id={P2} maxSize={4} size={2}>
            P2
          </Pane>

          <Pane className="bg-red-500" id={P3} maxSize={5} size={3}>
            P3
          </Pane>

          <Pane className="bg-amber-500" id={P4} size={1}>
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
    rCy.checkWidths([500, 0, 0, 0, 0, 0, 0, 10, 530])
  })

  it('setting P2 to 500 Result it should set P2 to only max allowed ie 400', () => {
    rCy.move(R3, R1, 'left')
    cy.wait(50).then(() => {
      resizableApi.setSize(P2, 500)
    })

    rCy.checkWidths([60, 10, 179, 10, 400, 0, 0, 10, 371])
  })

  it('setting P2 to 10 Result it should set P2 to only min allowed ie 50', () => {
    rCy.move(R1, R3, 'left')
    cy.wait(50).then(() => {
      resizableApi.setSize(P2, 10)
    })

    rCy.checkWidths([402, 10, 490, 10, 10, 10, 0, 10, 98])
  })
})

describe('Storage api', () => {
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
        resizerClass="bg-slate-500"
        resizerSize={1}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >
      </RPTestWrapper>
    )
  })

  it('Move R0 -- Then restore using API.restore', () => {
    rCy.cyGet(CK0).click()
    rCy.cyGet(CK1).click()
    rCy.cyGet(CK4).click()

    rCy.move(R2, rScontainerId, 'left')
  })
})

describe.skip('Should make partial hidden visible with setSize', () => {
  let resizableApi: IResizableApi
  let onResizeStop: SinonSpy
  let onChangeVisibility: SinonSpy

  const rCy = new RCy({
    resizerSize: 1,
    detectionSize: 5
  })
  beforeEach(() => {
    rCy.setViewPort()
    onResizeStop = cy.spy()
    onChangeVisibility = cy.spy()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resizer={<CustomResizerFirst horizontal={false} size={10} />}
        resizerClass="bg-slate-500"
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
        onChangeVisibility={onChangeVisibility}
        onReady={(api: IResizableApi) => {
          resizableApi = api
        }}
        onResizeStop={onResizeStop}
      >
      </RPTestWrapper>
    )
  })

  // Edge
  it(`
  -- Partially hide P2 moving R2 to R1
  -- setSize P2 with 150 and BUTTOM_FIRST
  -- should emit onResizeStop haveing P2 = 150
  `, () => {
    rCy.move(R2, R1, 'left')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P2, 150, BUTTOM_FIRST)
        expect(onResizeStop.getCalls()[2].lastArg).to.deep.equal(
          {P0: 97, P1: 289, P2: 150, P3: 332, P4: 96}
        )
      })
  })

  // Edge
  it(`
    -- Partially hide P2 moving R1 to R2
    -- setSize P2 with 150 and BUTTOM_FIRST
    -- should emit onResizeStop haveing P2 = 150
    `, () => {
    rCy.move(R2, R1, 'left')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P2, 150, BUTTOM_FIRST)
        console.log(onResizeStop.getCalls()[2].lastArg)
        expect(onResizeStop.getCalls()[2].lastArg).to.deep.equal(
          {P0: 97, P1: 289, P2: 150, P3: 332, P4: 96}
        )
      })
  })

  // Edge
  it(`
    -- Partially hide P2 moving R1 to R2
    -- setSize P2 with 150 and TOP_FIRST
    -- should emit onResizeStop haveing P2 = 150
    `, () => {
    rCy.move(R2, R1, 'left')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P2, 150, TOP_FIRST)
        console.log(onResizeStop.getCalls()[2].lastArg)
        expect(onResizeStop.getCalls()[2].lastArg).to.deep.equal(
          {P0: 97, P1: 129, P2: 150, P3: 492, P4: 96}
        )
      })
  })

  // Edge
  it(`
    -- Partially hide P2 moving R2 to R1
    -- setSize P2 with 150 and TOP_FIRST
    -- should emit onResizeStop haveing P2 = 150
    `, () => {
    rCy.move(R1, R2, 'left')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P2, 150, TOP_FIRST)
        console.log(onResizeStop.getCalls()[2].lastArg)
        expect(onResizeStop.getCalls()[2].lastArg).to.deep.equal(
          {P0: 97, P1: 332, P2: 150, P3: 289, P4: 96}
        )
      })
  })

  // Edge
  it(`
    -- Partially hide last Pane moving last Resizer to right
    -- setSize last Pane with 150 and BUTTOM_FIRST
    -- should emit onChangeVisibility haveing P4 = visible
    -- should emit onResizeStop haveing P4 = 150
    `, () => {
    rCy.move(R3, containerId, 'right')
    cy.wait(50)
      .then(() => {
        resizableApi.setSize(P4, 150, BUTTOM_FIRST)
        expect(onChangeVisibility.getCalls()[2].lastArg).to.deep.equal(
          {P0: 'visible', P1: 'visible', P2: 'visible', P3: 'visible', P4: 'visible'}
        )
        expect(onResizeStop.getCalls()[2].lastArg).to.deep.equal(
          {P0: 97, P1: 289, P2: 193, P3: 235, P4: 150}
        )
      })
  })

  // Edge Edge
  it('Should make partial hidden visible with setSize test', () => {
    rCy.move(R0, containerId, 'right')
    cy.wait(50).then(() => {
      resizableApi.setSize(P4, 100)
      resizableApi.setSize(P3, 100)
      resizableApi.setSize(P2, 100)
      resizableApi.setSize(P1, 100)
      rCy.checkWidths([626, 10, 100, 10, 89, 10, 79, 10, 70])
    })
  })
})

describe('setSize should work in bottom_first behaviour', () => {
  let resizableApi: IResizableApi

  const rCy = new RCy({
    resizerSize: 1,
    detectionSize: 5
  })
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxEqualSize5PanesSet}
        resizer={<CustomResizerFirst horizontal={false} size={10} />}
        resizerClass="bg-slate-500"
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
        onReady={(api: IResizableApi) => {
          resizableApi = api
        }}
      >
      </RPTestWrapper>
    )
  })

  it(`
  -- Increase size using setSize
  -- BUTTOM_FIRST
  -- Result it should  it should execute in BUTTOM_FIRST Order
  `, () => {
    resizableApi.setSize(P1, 500, BUTTOM_FIRST)
    rCy.checkWidths([97, 10, 500, 10, 96, 10, 175, 10, 96])
  })

  // Edge
  it(`
  -- Increase size using setSize above acceptable size(1000) by the system
  -- BUTTOM_FIRST
  -- Result it should only get increased to acceptable size(752)
  `, () => {
    resizableApi.setSize(P1, 1000, BUTTOM_FIRST)
    rCy.checkWidths([10, 10, 752, 10, 96, 10, 96, 10, 10])
  })

  // Edge
  it(`
    -- Increase size using setSize above acceptable size(1000) by the system
    -- TOP_FIRST
    -- Result it should only get increased to acceptable size(752)
    `, () => {
    resizableApi.setSize(P1, 1000, TOP_FIRST)
    rCy.checkWidths([10, 10, 752, 10, 96, 10, 96, 10, 10])
  })

  it(`
  -- Increase size using setSize
  -- TOP_FIRST
  -- Result it should  it should execute in TOP_FIRST Order
  `, () => {
    resizableApi.setSize(P1, 500, TOP_FIRST)
    rCy.checkWidths([10, 10, 500, 10, 96, 10, 262, 10, 96])
  })

  // Edge
  it(`
  -- setSize in TOP_FIRST
  -- setSize in BUTTOM_FIRST with same size
  -- Result it should change size second time if there is no change in size
  `, () => {
    resizableApi.setSize(P2, 300, TOP_FIRST)
    const currentSize = resizableApi.getSizes()

    resizableApi.setSize(P2, 300, BUTTOM_FIRST)
    rCy.checkWidths(currentSize)
  })

  // Edge
  it(`
    -- setSize in TOP_FIRST
    -- setSize in TOP_FIRST with same size
    -- Result it should change size second time
    `, () => {
    resizableApi.setSize(P2, 300, TOP_FIRST)

    const currentSize = resizableApi.getSizes()

    resizableApi.setSize(P2, 300, TOP_FIRST)
    rCy.checkWidths(currentSize)
  })

  // Edge
  it(`
    -- decrease x amount using setSize in TOP_FIRST
    -- increase x amount using setSize in BUTTOM_FIRST
    -- Result it should behave as it has moved down
    `, () => {
    const X = 93

    const p2SizeStep1 = resizableApi.getSizes()[P2]
    resizableApi.setSize(P2, p2SizeStep1 - X, TOP_FIRST)

    const p2SizeStep2 = resizableApi.getSizes()[P2]
    resizableApi.setSize(P2, p2SizeStep2 + X, BUTTOM_FIRST)

    rCy.checkWidths([97, 10, 382, 10, 193, 10, 196, 10, 96])
  })

  // Edge
  it(`
    -- decrease x amount using setSize in BUTTOM_FIRST
    -- increase x amount using setSize in TOP_FIRST
    -- Result it should behave as it has moved Up
    `, () => {
    const X = 93

    const p2SizeStep1 = resizableApi.getSizes()[P2]
    resizableApi.setSize(P2, p2SizeStep1 - X, BUTTOM_FIRST)

    const p2SizeStep2 = resizableApi.getSizes()[P2]
    resizableApi.setSize(P2, p2SizeStep2 + X, TOP_FIRST)

    rCy.checkWidths([97, 10, 196, 10, 193, 10, 382, 10, 96])
  })
})

describe('setSize should work in TOP_FIRST & BUTTOM_FIRST', () => {
  let resizableApi: IResizableApi

  const rCy = new RCy({
    resizerSize: 1,
    detectionSize: 5
  })
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxAllPaneEqualSizeExcept15PanesSet}
        resizer={<CustomResizerFirst horizontal={false} size={10} />}
        resizerClass="bg-slate-500"
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
        onReady={(api: IResizableApi) => {
          resizableApi = api
        }}
      >
      </RPTestWrapper>
    )
  })
  /// ///////////////////////////////////////////////////////////////////////

  it(`
  -- decrease size using setSize
  -- BUTTOM_FIRST
  -- Result it should  it should execute in BUTTOM_FIRST Order
  `, () => {
    resizableApi.setSize(P1, 400, BUTTOM_FIRST)
    rCy.checkWidths([97, 10, 400, 10, 193, 10, 178, 10, 96])
  })

  // Edge
  it(`
  -- decrease size using setSize bellow acceptable size(100) by the system
  -- BUTTOM_FIRST
  -- Result it should only get reduced to acceptable size(192)
  `, () => {
    resizableApi.setSize(P1, 100, BUTTOM_FIRST)
    rCy.checkWidths([193, 10, 192, 10, 193, 10, 193, 10, 193])
  })

  // Edge
  it(`
    -- decrease size using setSize bellow acceptable size(100) by the system
    -- TOP_FIRST
    -- Result it should only get reduced to acceptable size(192)
    `, () => {
    resizableApi.setSize(P1, 100, TOP_FIRST)
    rCy.checkWidths([193, 10, 192, 10, 193, 10, 193, 10, 193])
  })

  it(`
  -- decrease size using setSize
  -- TOP_FIRST
  -- Result it should  it should execute in TOP_FIRST Order
  `, () => {
    resizableApi.setSize(P1, 400, TOP_FIRST)
    rCy.checkWidths([193, 10, 400, 10, 179, 10, 96, 10, 96])
  })
})

describe('setSizeRatio should work in TOP_FIRST & BUTTOM_FIRST', () => {
  let resizableApi: IResizableApi

  const rCy = new RCy({
    resizerSize: 1,
    detectionSize: 5
  })
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={withMinMaxAllPaneEqualSizeExcept15PanesSet}
        resizer={<CustomResizerFirst horizontal={false} size={10} />}
        resizerClass="bg-slate-500"
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
        onReady={(api: IResizableApi) => {
          resizableApi = api
        }}
      >
      </RPTestWrapper>
    )
  })
  /// ///////////////////////////////////////////////////////////////////////

  it(`
  -- to setSize to maximum space availiable using setSizeRatio
  `, () => {
    resizableApi.setSizeRatio(P1, 1, BUTTOM_FIRST)
    rCy.checkWidths([10, 10, 752, 10, 96, 10, 96, 10, 10])
  })

  it(`
  -- to setSize to minimum space availiable using setSizeRatio
  `, () => {
    resizableApi.setSizeRatio(P1, 0, BUTTOM_FIRST)
    rCy.checkWidths([193, 10, 182, 10, 193, 10, 193, 10, 193])
  })
})

describe('Zipping=false', () => {
  const rCy = new RCy({
    resizerSize: 10,
    containerId: rScontainerId,
    len: 4
  })
  let resizableApi: IResizableApi

  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <div className="h-300 w-100p">
        <ResizablePanes
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical

          onReady={(api: IResizableApi) => {
            resizableApi = api
          }}
        >
          <Pane className="bg-cyan-500" id={P0} size={1}></Pane>
          <Pane className="bg-red-500" id={P1} size={1}></Pane>
          <Pane className="bg-red-500" id={P2} size={1}></Pane>
          <Pane className="bg-red-500" id={P3} size={1}></Pane>
        </ResizablePanes>
      </div>
    )

    cy.wait(50)
  })

  // Edge
  it(`
  -- Move RO to most Right when zipping false
  -- Hide P0
  -- Show P0
  -- It should hide partially hidden again with visible resizer
  `, () => {
    rCy.move(R0, containerId, 'right')

    cy.wait(50)
      .then(() => {
        resizableApi.setVisibilities({P1: false})
        resizableApi.setVisibilities({P1: true})
        rCy.checkWidths([1000, 10, 0, 10, 0, 10, 0])
      })
  })
})
