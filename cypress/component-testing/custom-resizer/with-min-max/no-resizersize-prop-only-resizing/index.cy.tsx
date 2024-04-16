import {ENUMS} from '../../../../components/test-component-wrapper'
import React from 'react'
import {RCy} from '../../../../utils'
import {Pane, ResizablePanes} from '../../../../../src'
import {CustomResizerFirst} from '../../../../components/custom-resizer'

const containerId = ENUMS.resizablePanesId

const rCy = new RCy({containerId})
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

describe('Resizing with min max limits with no resizerSize', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <div
        className='h-100p w-100p'
      >

        <ResizablePanes
          className=''
          resizer={
            <CustomResizerFirst size={10} />
            }
          storageApi={localStorage}
          uniqueId={containerId}
          unit='ratio'
          vertical
        >
          <Pane className='bg-red-500' id='P0' maxSize={3} minSize={0.1} size={1}>
          </Pane>

          <Pane className='bg-orange-500' id='P1' minSize={1} size={3}>
          </Pane>

          <Pane className='bg-lime-500' id='P2' maxSize={3} minSize={1} size={2}>
          </Pane>

          <Pane className='bg-orange-500' id='P3' minSize={1} size={3}>
          </Pane>

          <Pane className='bg-red-500' id='P4' maxSize={3} minSize={0.1} size={1}>
          </Pane>

        </ResizablePanes>

      </div>
    )
  })

  it('R0 to max right', () => {
    rCy.move(R0, ENUMS.resizablePanesId, 'right')
    rCy.checkWidths({
      [P0]: 300,
      [P1]: 100,
      [R0]: resizerSize,
      [R1]: resizerSize
    })
  })

  it('R0 to max left', () => {
    rCy.move(R0, ENUMS.resizablePanesId, 'left')
    rCy.checkWidths({
      [P0]: 10,
      [P1]: 390,
      [R0]: resizerSize,
      [R1]: resizerSize
    })
  })

  it('R1 to max left', () => {
    rCy.move(R1, ENUMS.resizablePanesId, 'left')
    rCy.checkWidths({
      [P0]: 10,
      [P1]: 100,
      [P2]: 300,
      [R0]: resizerSize,
      [R1]: resizerSize,
      [R2]: resizerSize
    })
  })

  it('R1 to max right', () => {
    rCy.move(R1, ENUMS.resizablePanesId, 'right')
    rCy.checkWidthsAndSum({
      [P0]: 100,
      [P1]: 690,
      [P2]: 100,
      [P3]: 100,
      [P4]: 10,
      [R0]: resizerSize,
      [R1]: resizerSize,
      [R2]: resizerSize,
      [R3]: resizerSize
    })
  })

  it('R2 to max left', () => {
    rCy.move(R2, ENUMS.resizablePanesId, 'left')
    rCy.checkWidthsAndSum({
      [P0]: 10,
      [P1]: 100,
      [P2]: 100,
      [P3]: 690,
      [P4]: 100,
      [R0]: resizerSize,
      [R1]: resizerSize,
      [R2]: resizerSize,
      [R3]: resizerSize
    })
  })

  it('R2 to max right', () => {
    rCy.move(R2, ENUMS.resizablePanesId, 'right')
    rCy.checkWidthsAndSum({
      [P0]: 100,
      [P1]: 490,
      [P2]: 300,
      [P3]: 100,
      [P4]: 10,
      [R0]: resizerSize,
      [R1]: resizerSize,
      [R2]: resizerSize,
      [R3]: resizerSize
    })
  })

  it('R3 to max left', () => {
    rCy.move(R3, ENUMS.resizablePanesId, 'left')
    rCy.checkWidthsAndSum({
      [P0]: 100,
      [P1]: 300,
      [P2]: 200,
      [P3]: 100,
      [P4]: 300,
      [R0]: resizerSize,
      [R1]: resizerSize,
      [R2]: resizerSize,
      [R3]: resizerSize
    })
  })

  it('R3 to max right', () => {
    rCy.move(R3, ENUMS.resizablePanesId, 'right')
    rCy.checkWidthsAndSum({
      [P0]: 100,
      [P1]: 300,
      [P2]: 200,
      [P3]: 390,
      [P4]: 10,
      [R0]: resizerSize,
      [R1]: resizerSize,
      [R2]: resizerSize,
      [R3]: resizerSize
    })
  })
})
