import React from 'react'
import { RCy } from '../../utils'
import { testResizablePanesId } from '../../components/rp-test-wrapper/constant'
import { RPTestWrapper } from '../../components/rp-test-wrapper'
import { noMinMax5PanesSet, withMinMaxPixelMode5PanesSet } from '../pane-model-config-sets'
import { R0, rScontainerId } from '../fix-test-ids'
import { CustomResizerFirst } from '../../components/custom-resizer'
import { ResizableComponentCustomPanesTestWrapper } from '../../components/rp-test-wrapper/resizable-component-custom-panes-test-wrapper'
import { Pane, ResizablePanes } from '../../../src'

const containerId = testResizablePanesId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  vertical: true
})
const { resizerSize } = rCy

describe('Test Pane Model', () => {

  describe('Test UI Action: toRatioMode method', () => {
    it('When change in Port size reduces to half pane size should also change to 50% approx', () => {
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

      cy.viewport(500, 500)
      rCy.checkWidths(
        [45, 10, 133, 10, 89, 10, 133, 10, 44]
      )
    })


    it('When change the port size increases to double pane size should also increases to double approx', () => {
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

      cy.viewport(2000, 2000)
      rCy.checkWidths(
        [195, 10, 583, 10, 389, 10, 583, 10, 194]
      )
    })

    describe.only('Test UI Action: toRatioMode method for nested panes', () => {

      // Edge
      it('Test UI Action: toRatioMode method for nested panes: horizontal case', () => {
        cy.viewport(1200, 1000)
        cy.mount(
          <ResizableComponentCustomPanesTestWrapper
            resizer={
              <CustomResizerFirst horizontal={true} size={10} />
            }
            resizerSize={10}
            storageApi={localStorage}
            uniqueId={rScontainerId}
            vertical={false}
            height={900}
            noExtra={true}
          >
            <Pane id='P0' size={5} className='bg-cyan-500'>
            <ResizablePanes
            uniqueId={rScontainerId + '-2'}>
          <Pane id='P0' size={5} className='bg-cyan-500'></Pane>
          <Pane id='P1' size={1} className='bg-red-500' ></Pane>
          <Pane id='P2' size={5} className='bg-cyan-500'></Pane>
          </ResizablePanes>

            </Pane>
            <Pane id='P1' size={1} className='bg-red-500' ></Pane>
          </ResizableComponentCustomPanesTestWrapper>
        )
      })

    })

  })

})
