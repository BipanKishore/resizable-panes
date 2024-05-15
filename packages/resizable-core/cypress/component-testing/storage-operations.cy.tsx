import React from 'react'
import {RCy} from '../utils'
import {_2PaneWithNoMinMax, _3PanesWithMinMax, noMinMax5PanesSet} from './pane-model-config-sets'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {
  CK0,
  P0, P1, P2, P3, R0, R1, R2, R3,
  containerId, mountUnMountButtonId, rScontainerId
} from './fix-test-ids'
import {CustomResizerFirst} from '../components/custom-resizer'
import {Pane} from 'resizable-panes-react'
import {ResizableComponentCustomPanesTestWrapper}
  from '../components/rp-test-wrapper/resizable-component-custom-panes-test-wrapper'
import {IResizableApi} from '../../src/@types'

const rCy = new RCy({
  resizerSize: 10,
  detectionSize: 0,
  containerId: rScontainerId
})
const {resizerSize} = rCy

const storeInMemoryAndCheckSizeAfterRemounting = () => {
  rCy.moveNPixel(R2, 1000, 'left')
  rCy.checkWidthsAndSum({
    [R0]: resizerSize,
    [R1]: resizerSize,
    [R2]: resizerSize,
    [R3]: resizerSize,
    P0: 0,
    P1: 0,
    P2: 0,
    P3: 900,
    P4: 100
  })

  rCy.cyGet(mountUnMountButtonId).click()
    .wait(50)
  rCy.cyGet(mountUnMountButtonId).click()

  rCy.checkWidthsAndSum({
    [R0]: resizerSize,
    [R1]: resizerSize,
    [R2]: resizerSize,
    [R3]: resizerSize,
    P0: 0,
    P1: 0,
    P2: 0,
    P3: 900,
    P4: 100
  })
}

describe('Check auto clear memory', () => {
  it('should clear memeory when a pane id changes', () => {
    rCy.setViewPort()
    cy.mount(
      <ResizableComponentCustomPanesTestWrapper
        resizer={
          <CustomResizerFirst horizontal={false} size={10} />
      }
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >

        <Pane className='bg-cyan-500' id={P0} size={1}>
        </Pane>

        <Pane className='bg-red-500' id={P1} size={1}>
        </Pane>

      </ResizableComponentCustomPanesTestWrapper>
    )

    rCy.checkWidths({
      [rScontainerId]: 1040,
      P0: 515,
      P1: 515
    })

    rCy.moveNPixel(R0, 100, 'right')

    rCy.checkWidths({
      [rScontainerId]: 1040,
      P0: 615,
      P1: 415
    })

    rCy.reMount(mountUnMountButtonId)
    rCy.checkWidths({
      [rScontainerId]: 1040,
      P0: 615,
      P1: 415
    })

    cy.mount(
      <ResizableComponentCustomPanesTestWrapper
        resizer={
          <CustomResizerFirst horizontal={false} size={10} />
      }
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >

        <Pane className='bg-cyan-500' id={P0} size={1}>
        </Pane>

        <Pane className='bg-red-500' id={P2} size={1}>
        </Pane>

      </ResizableComponentCustomPanesTestWrapper>
    )
    // It set to inital size
    rCy.checkWidths({
      [rScontainerId]: 1040,
      P0: 515,
      P2: 515
    })
  })

  it('should clear memeory when number of panes changes', () => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={noMinMax5PanesSet}
        resizer={
          <CustomResizerFirst horizontal={false} size={10} />
      }
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >
      </RPTestWrapper>
    )
    storeInMemoryAndCheckSizeAfterRemounting()
    cy.wait(50)

    const noMinMax5PanesSetClone = [...noMinMax5PanesSet]

    noMinMax5PanesSetClone.pop()
    const noMinMax4PanesSet = noMinMax5PanesSetClone

    cy.mount(
      <RPTestWrapper
        panesList={noMinMax4PanesSet}
        resizer={
          <CustomResizerFirst horizontal={false} size={10} />
      }
        resizerSize={10}
        storageApi={localStorage}
        uniqueId={rScontainerId}
        vertical
      >
      </RPTestWrapper>
    )

    rCy.checkWidths({
      P0: 112,
      [R0]: 10,
      [P1]: 337,
      [R1]: 10,
      [P2]: 224,
      [R2]: 10,
      [P3]: 337
    })
  })
})

describe('should store memory', () => {
  let resizableApi: IResizableApi
  const rCy = new RCy({
    resizerSize: 10,
    containerId,
    len: 2
  })

  it('Should store memory after restore', () => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={_2PaneWithNoMinMax}
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
      />
    )

    rCy.moveNPixel(R0, 100)
    let sizeMapAfterRestore
    cy.wait(500)
      .then(() => {
        resizableApi.restore()

        sizeMapAfterRestore = resizableApi.getSizes()
      })

    rCy.cyGet(mountUnMountButtonId).click()
      .wait(50)
      .then(() => rCy.cyGet(mountUnMountButtonId).click())
      .wait(50)
      .then(() => {
        const sizeMapAfterRemount = resizableApi.getSizes()
        expect(sizeMapAfterRemount).to.deep.equal(sizeMapAfterRestore)
      })
  })

  it('Should store memory after size change', () => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={_2PaneWithNoMinMax}
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
      />
    )

    rCy.moveNPixel(R0, 100)
    let sizeMapAfterMovement
    cy.wait(500)
      .then(() => {
        sizeMapAfterMovement = resizableApi.getSizes()
      })

    rCy.cyGet(mountUnMountButtonId).click()
      .wait(50)
      .then(() => rCy.cyGet(mountUnMountButtonId).click())
      .wait(50)
      .then(() => {
        const sizeMapAfterRemount = resizableApi.getSizes()
        expect(sizeMapAfterRemount).to.deep.equal(sizeMapAfterMovement)
      })
  })

  it('Should store memory after visibility change', () => {
    rCy.setViewPort()
    cy.mount(
      <RPTestWrapper
        panesList={_3PanesWithMinMax}
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
      />
    )
    rCy.moveNPixel(R1, 100)
    rCy.cyGet(CK0).click()
    let sizeMapAfterVisibilityChange
    cy.wait(500)
      .then(() => {
        sizeMapAfterVisibilityChange = resizableApi.getSizes()
      })

    rCy.cyGet(mountUnMountButtonId).click()
      .wait(50)
      .then(() => rCy.cyGet(mountUnMountButtonId).click())
      .wait(50)
      .then(() => {
        const sizeMapAfterRemount = resizableApi.getSizes()
        expect(sizeMapAfterRemount).to.deep.equal(sizeMapAfterVisibilityChange)
      })
  })
})
