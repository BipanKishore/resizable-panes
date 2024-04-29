import React from 'react'
import {RCy} from '../../utils'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {noMinMax5PanesSet, withMinMaxWithMinMaxUnitPixel5PanesSet} from '../pane-model-config-sets'
import {R0, R1, rScontainerId} from '../fix-test-ids'
import {CustomResizerFirst} from '../../components/custom-resizer'

const containerId = rScontainerId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  vertical: true
})
const {resizerSize} = rCy

describe('Test Pane Model', () => {
  describe('Test UI Action: toRatioMode method', () => {
    it('should decreases panes size to half approx, When the port size decreases to half', () => {
      cy.viewport(1000, 1000)
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

      rCy.checkWidths(
        [95, 10, 283, 10, 189, 10, 283, 10, 94]
      )

      cy.wait(50)
      cy.viewport(500, 500)
      rCy.checkWidths(
        [45, 10, 133, 10, 89, 10, 133, 10, 44]
      )
    })

    it('should increases panes size to double approx, When the port size increases to double', () => {
      cy.viewport(1000, 1000)
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

      rCy.checkWidths(
        [95, 10, 283, 10, 189, 10, 283, 10, 94]
      )
      cy.wait(50)
      cy.viewport(2000, 2000)
      rCy.checkWidths(
        [195, 10, 583, 10, 389, 10, 583, 10, 194]
      )
    })

    it('should test minMaxUnit, when Port size 1000 chamges to 2000, min max limit should not change', () => {
      const rCy = new RCy({
        containerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 3
      })

      cy.viewport(1000, 1000)
      cy.mount(
        <RPTestWrapper
          minMaxUnit='pixel'
          panesList={withMinMaxWithMinMaxUnitPixel5PanesSet}
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

      rCy.checkWidths(
        [241, 10, 482, 10, 241]
      )
      cy.wait(50)
      cy.viewport(2000, 2000)

      rCy.move(R0, rScontainerId, 'right')
      rCy.checkWidths(
        [1000, 10, 473, 10, 491]
      )
      rCy.move(R1, rScontainerId, 'left')
      rCy.checkWidths(
        [764, 10, 200, 10, 1000]
      )
    })
  })
})
