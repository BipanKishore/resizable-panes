import React from 'react'
import {ENUMS, TestComponentWrapper} from '../components/test-component-wrapper'
import {RCy} from '../utils'

const containerId = ENUMS.resizablePanesId

const rCy = new RCy({containerId})
const {resizerSize} = rCy

const {
  resizerIds: [R0, R1, R2, R3],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4],
  paneIds: [P0, P1, P2, P3, P4]
} = rCy.getResizableIds()

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

describe('Overlapping Resizers', () => {
  beforeEach(() => {
    rCy.setViewPort()
    cy.mount(
      <TestComponentWrapper />
    )
  })

  it('Move R2 to container right >> Hide P4 >> Move back R2 >> show P4 >> Move back R2 again, R3 should become visible',
    () => {
      rCy.move(R2, containerId, 'right')
      rCy.cyGet(CK4).click()
      rCy.moveNPixel(R2, 100, 'left')
      rCy.cyGet(CK4).click()
      rCy.moveNPixel(R2, 100, 'left')

      rCy.checkContainerWidth()
      rCy.checkWidths({
        [R3]: resizerSize
      })
    })

  it('Move R0 to container left >> Hide P0 >> Move back R1 >> show P0 >> Move back R1 again, R0 should become visible',
    () => {
      rCy.move(R1, containerId, 'left')
      rCy.cyGet(CK0).click()
      rCy.moveNPixel(R1, 100, 'right')
      rCy.cyGet(CK0).click()
      rCy.moveNPixel(R1, 100, 'right')

      rCy.checkContainerWidth()
      rCy.checkWidths({
        [R0]: resizerSize
      })
    })

  // it('Move R0 to container left >> Hide P1, P2, P3, P4 :: P0 should come to max size even with width zero', () => {
  //   rCy.move(R0, containerId, 'left')

  //   rCy.cyGet(CK1).uncheck()
  //   rCy.cyGet(CK2).uncheck()
  //   rCy.cyGet(CK3).uncheck()
  //   rCy.cyGet(CK4).uncheck()

  //   rCy.checkContainerWidth()
  //   rCy.checkWidths({
  //     [R0]: 0,
  //     [P0]: rCy.containerXLen
  //   })
  // })

  // it.only(`Move R0 to container right >> Hide P0 P1, P2, P3 :: P0, P1,
  // P2, P3 should come to equal size even with width zero`, () => {
  //   rCy.move(R0, containerId, 'right')

  //   rCy.cyGet(CK0).uncheck()

  //   rCy.checkContainerWidth()
  //   rCy.checkWidths({
  //     // [R0]: 0,
  //     // [P0]: rCy.containerXLen
  //   })
  //   const nextActionList: number[] = []
  //   actionList.forEach((i) => {
  //     const size = panesList[i].getSize()
  //     let newSize
  //     if (ratioSum) {
  //       newSize = Math.round(sizeChangeAbsolute * (size / ratioSum))
  //     } else {
  //       newSize = Math.round(sizeChangeAbsolute * (1 / actionList.length))
  //     }

  //     const remainingSize = panesList[i].setVisibilitySize(newSize, operation)
  //     if (remainingSize === 0) {
  //       nextActionList.push(i)
  //     }
  //   })
  // })
})