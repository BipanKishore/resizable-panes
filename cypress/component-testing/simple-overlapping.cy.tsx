import React from 'react'
import {RCy} from '../utils'
import {ENUMS, TestComponentWrapper} from '../components/test-component-wrapper'

const rCy = new RCy()
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

describe('Overlapping resizer to another', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

  describe('Single Resizer Movements', () => {
    describe('R0 Movements', () => {
      it('Overlap R0 to R1', () => {
        rCy.moveItem(R0, R1)

        rCy.checkWidthsAndSum({
          [P0]: 410,
          [P1]: 0,
          [P2]: 200,
          [P3]: 300,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })
    })
  })

  describe('Single Resizer Movements', () => {
    describe('R0 Movements', () => {
      it('Overlap R0 to R1', () => {
        rCy.moveItem(R0, R1)

        rCy.checkWidthsAndSum({
          [P0]: 410,
          [P1]: 0,
          [P2]: 200,
          [P3]: 300,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })

      it('Overlap R2 to R1', () => {
        rCy.moveItem(R2, R1)
        rCy.checkWidthsAndSum({
          [P0]: 100,
          [P1]: 300,
          [P2]: 0,
          [P3]: 510,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })

      it('Overlap R2 to R3', () => {
        rCy.moveItem(R2, R3)
        rCy.checkWidthsAndSum({
          [P0]: 100,
          [P1]: 300,
          [P2]: 510,
          [P3]: 0,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: resizerSize,
          [R2]: resizerSize,
          [R3]: 0
        })
      })

      it('Overlap R0 to R1 >> R0 to Start', () => {
        rCy.moveItem(R0, R1)
        rCy.moveResizerToStart(R0)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 400,
          [P2]: 200,
          [P3]: 300,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: resizerSize,
          [R2]: resizerSize,
          [R3]: resizerSize
        })
      })

      it('Overlap R0 to R3 >> R0 to start >> R1 to start >> R2 to start >> R3 to start', () => {
        rCy.moveItem(R0, R3)

        rCy.checkWidthsAndSum({
          [P0]: 930,
          [P1]: 0,
          [P2]: 0,
          [P3]: 0,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: 0,
          [R2]: 0,
          [R3]: 0
        })

        rCy.moveResizerToStart(R0)

        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 920,
          [P2]: 0,
          [P3]: 0,
          [P4]: 100,
          [R0]: resizerSize,
          [R1]: resizerSize,
          [R2]: 0,
          [R3]: 0
        })

        rCy.moveResizerToStart(R1)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 0,
          [P2]: 920,
          [P3]: 0,
          [P4]: 100,
          [R0]: 0,
          [R1]: resizerSize,
          [R2]: resizerSize,
          [R3]: 0
        })

        rCy.moveResizerToStart(R2)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 0,
          [P2]: 0,
          [P3]: 920,
          [P4]: 100,
          [R0]: 0,
          [R1]: 0,
          [R2]: resizerSize,
          [R3]: resizerSize
        })

        rCy.moveResizerToStart(R3)
        rCy.checkWidthsAndSum({
          [P0]: 0,
          [P1]: 0,
          [P2]: 0,
          [P3]: 0,
          [P4]: 1030,
          [R0]: 0,
          [R1]: 0,
          [R2]: 0,
          [R3]: resizerSize
        })
      })
    })
  })
})
