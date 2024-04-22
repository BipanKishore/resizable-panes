import React from 'react'
import {RCy} from '../utils'
import {noMinMax5PanesSet} from './pane-model-config-sets'
import {RPTestWrapper} from '../components/rp-test-wrapper'
import {P0, P1, P2, R0, R1, R2, R3, mountUnMountButtonId, rScontainerId} from './fix-test-ids'
import {CustomResizerFirst} from '../components/custom-resizer'
import {Pane} from '../../src'
import {ResizableComponentCustomPanesTestWrapper}
  from '../components/rp-test-wrapper/resizable-component-custom-panes-test-wrapper'

const rCy = new RCy({
  resizerSize: 10,
  detectionSize: 0
})
const {resizerSize} = rCy

const INITIAL_SIZES: any = {
  // [uniqueIdResizablePanes]: containerSize,
  'resizer-P0': resizerSize,
  'resizer-P1': resizerSize,
  'resizer-P2': resizerSize,
  'resizer-P3': resizerSize,
  P0: 100,
  P1: 300,
  P2: 200,
  P3: 300,
  P4: 100
}

const storeInMemoryAndCheckSizeAfterRemounting = () => {
  rCy.moveNPixel(R2, 1000, 'left')
  rCy.checkWidthsAndSum({
    [R0]: 0,
    [R1]: 0,
    [R2]: resizerSize,
    [R3]: resizerSize,
    P0: 0,
    P1: 0,
    P2: 0,
    P3: 920,
    P4: 100
  })

  rCy.cyGet(mountUnMountButtonId).click()
    .wait(50)
  rCy.cyGet(mountUnMountButtonId).click()

  rCy.checkWidthsAndSum({
    [R0]: 0,
    [R1]: 0,
    [R2]: resizerSize,
    [R3]: resizerSize,
    P0: 0,
    P1: 0,
    P2: 0,
    P3: 920,
    P4: 100
  })
}

describe('Storage api', () => {
  beforeEach(() => {
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
  })

  it('Check initial sizes', () => {
    rCy.checkWidths(INITIAL_SIZES)

    rCy.cyGet(mountUnMountButtonId).click()
      .wait(50)
    rCy.cyGet(mountUnMountButtonId).click()
  })

  it('Resize Panes then hide and show resizalbe comonent, all the sizes should be same',
    storeInMemoryAndCheckSizeAfterRemounting)
})

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
      P1: 337,
      P2: 224,
      P3: 337
    })
  })
})
