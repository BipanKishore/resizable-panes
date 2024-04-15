import {ENUMS} from '../components/test-component-wrapper'
import React from 'react'
import {RCy} from '../utils'
import {TestComponentWrapperWithMinMax} from '../components/test-component-wrapper-with-min-max'

const rCy = new RCy()
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

describe('Rezing with min max limits', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapperWithMinMax />
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
