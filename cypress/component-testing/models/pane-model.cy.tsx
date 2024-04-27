/* eslint-disable max-len */
import React from 'react'
import {RCy} from '../../utils'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {noMinMax5PanesSet} from '../pane-model-config-sets'
import {P0_C, P0_c, P1_C, P2_C, R0, R0_C, R0_c, R1, R1_C, R1_c, rScontainerId} from '../fix-test-ids'
import {CustomResizerFirst} from '../../components/custom-resizer'
import {ResizableComponentCustomPanesTestWrapper} from '../../components/rp-test-wrapper/resizable-component-custom-panes-test-wrapper'
import {Pane, ResizablePanes} from '../../../src'

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

    describe('Test UI Action: toRatioMode method for nested panes', () => {
      // Edge
      describe('Test UI Action: toRatioMode method for nested panes: horizontal parent and horizontal child', () => {
        const rScontainerIdChild = `${rScontainerId}-child`
        const rCy = new RCy({
          containerId,
          plainResizer: false,
          resizerSize: 10,
          vertical: false,
          len: 3
        })

        const rCyChild = new RCy({
          containerId: rScontainerIdChild,
          plainResizer: true,
          resizerSize: 2,
          vertical: false,
          len: 3
        })

        beforeEach(() => {
          cy.viewport(1200, 1000)
          cy.mount(
            <ResizableComponentCustomPanesTestWrapper
              height={900}
              noExtra={true}
              resizer={
                <CustomResizerFirst horizontal={true} size={10} />
                }
              resizerSize={10}
              storageApi={localStorage}
              uniqueId={rScontainerId}
              vertical={false}
            >
              <Pane className='bg-red-500' id='P0' size={1} ></Pane>
              <Pane className='bg-cyan-500' id='P1' size={5}>
                <ResizablePanes
                  resizer={
                    <CustomResizerFirst horizontal={true} size={10} />
                    }
                  resizerSize={10}
                  uniqueId={rScontainerIdChild}
                >
                  <Pane className='bg-cyan-500' id='P1P0' size={5}></Pane>
                  <Pane className='bg-red-500' id='P1P1' size={1} ></Pane>
                  <Pane className='bg-cyan-500' id='P1P2' size={5}></Pane>
                </ResizablePanes>

              </Pane>
              <Pane className='bg-red-500' id='P2' size={1} ></Pane>
            </ResizableComponentCustomPanesTestWrapper>
          )
        })

        it('should check the initial size of both parent and child Elements', () => {
          rCy.checkWidths(
            [125, 10, 629, 10, 126]
          )

          rCyChild.checkWidths(
            {
              P1P0: 277,
              'resizer-P1P0': 10,
              P1P1: 55,
              'resizer-P1P1': 10,
              P1P2: 277
            }
          )
        })

        // Edge Movement
        it('should check the initial size of both parent and child Elements', () => {
          rCy.checkWidths(
            [125, 10, 629, 10, 126]
          )

          rCyChild.checkWidths(
            {
              P1P0: 277,
              'resizer-P1P0': 10,
              P1P1: 55,
              'resizer-P1P1': 10,
              P1P2: 277
            }
          )
        })
      })

      // Edge
      describe('Test UI Action: toRatioMode method for nested panes: Vertical parent and Vertical child', () => {
        const rScontainerIdChild = `${rScontainerId}-child`
        const rCy = new RCy({
          containerId,
          plainResizer: false,
          resizerSize: 10,
          vertical: true,
          len: 3
        })

        const rCyChild = new RCy({
          containerId: rScontainerIdChild,
          plainResizer: false,
          resizerSize: 10,
          vertical: true,
          len: 3
        })

        beforeEach(() => {
          cy.viewport(1200, 1000)
          cy.mount(
            <ResizableComponentCustomPanesTestWrapper
              height={900}
              noExtra={true}
              resizer={
                <CustomResizerFirst horizontal={false} size={10} />
                      }
              resizerSize={10}
              storageApi={localStorage}
              uniqueId={rScontainerId}
              vertical
            >
              <Pane className='bg-red-500' id='P0' size={1} ></Pane>
              <Pane className='bg-cyan-500' id='P1' size={5}>
                <ResizablePanes
                  resizer={
                    <CustomResizerFirst horizontal={false} size={10} />
                          }
                  resizerSize={10}
                  uniqueId={rScontainerIdChild}
                  vertical
                >
                  <Pane className='bg-cyan-500' id={P0_C} size={5}></Pane>
                  <Pane className='bg-red-500' id={P1_C} size={1} ></Pane>
                  <Pane className='bg-cyan-500' id={P2_C} size={5}></Pane>
                </ResizablePanes>

              </Pane>
              <Pane className='bg-red-500' id='P2' size={1} ></Pane>
            </ResizableComponentCustomPanesTestWrapper>
          )
        })

        it('should check the initial size of both parent and child Elements, Child container should equal to size of P1', () => {
          rCy.checkWidths(
            [167, 10, 831, 10, 166]
          )

          rCyChild.checkWidths(
            {
              [rScontainerIdChild]: 831,
              [P0_C]: 368,
              [R0_C]: 10,
              [P1_C]: 74,
              [R1_C]: 10,
              [P2_C]: 369
            }
          )
        })

        it('should check the parent movements', () => {
          rCy.moveNPixel(R0, 100, 'right')
          rCy.moveNPixel(R1, 100, 'left')

          rCy.checkWidths(
            [267, 10, 631, 10, 266]
          )

          rCyChild.checkWidths(
            {
              [rScontainerIdChild]: 631,
              [P0_C]: 277,
              [R0_C]: 10,
              [P1_C]: 56,
              [R1_C]: 10,
              [P2_C]: 278
            }
          )
        })

        it.only('should check the parent movements and child movements', () => {
          rCy.moveNPixel(R0, 100, 'right')
          rCy.moveNPixel(R1, 100, 'left')

          rCyChild.moveNPixel(R0_C, 100, 'left')
          rCyChild.moveNPixel(R1_C, 100, 'right')

          rCy.checkWidths(
            [267, 10, 631, 10, 266]
          )

          rCyChild.checkWidths(
            {
              [rScontainerIdChild]: 631,
              [P0_C]: 177,
              [R0_C]: 10,
              [P1_C]: 256,
              [R1_C]: 10,
              [P2_C]: 178
            }
          )
        })
      })

      // Edge
      describe('Test UI Action: toRatioMode method for nested panes: Vertical parent and Vertical child with min max', () => {
        const rScontainerIdChild = `${rScontainerId}-child`
        const rCy = new RCy({
          containerId,
          plainResizer: false,
          resizerSize: 10,
          vertical: true,
          len: 3
        })

        const rCyChild = new RCy({
          containerId: rScontainerIdChild,
          plainResizer: false,
          resizerSize: 10,
          vertical: true,
          len: 3
        })

        beforeEach(() => {
          cy.viewport(1200, 1000)
          cy.mount(
            <ResizableComponentCustomPanesTestWrapper
              height={900}
              noExtra={true}
              resizer={
                <CustomResizerFirst horizontal={false} size={10} />
                            }
              resizerSize={10}
              storageApi={localStorage}
              uniqueId={rScontainerId}
              vertical
            >
              <Pane className='bg-red-500' id='P0' size={1} ></Pane>
              <Pane className='bg-cyan-500' id='P1' size={5}>
                <ResizablePanes
                  resizer={
                    <CustomResizerFirst horizontal={false} size={10} />
                                }
                  resizerSize={10}
                  uniqueId={rScontainerIdChild}
                  vertical
                >
                  <Pane className='bg-cyan-500' id={P0_C} minSize={1} size={5}></Pane>
                  <Pane className='bg-red-500' id={P1_C} size={1}></Pane>
                  <Pane className='bg-cyan-500' id={P2_C} minSize={1} size={5}></Pane>
                </ResizablePanes>

              </Pane>
              <Pane className='bg-red-500' id='P2' size={1} ></Pane>
            </ResizableComponentCustomPanesTestWrapper>
          )
        })

        it.only('should check the parent movements and child movements', () => {
          rCy.moveNPixel(R0, 100, 'right')
          rCy.moveNPixel(R1, 100, 'left')

          rCyChild.moveNPixel(R0_C, 100, 'left')
          rCyChild.moveNPixel(R1_C, 100, 'right')

          rCy.checkWidths(
            [267, 10, 631, 10, 266]
          )

          rCyChild.checkWidths(
            {
              [rScontainerIdChild]: 631,
              [P0_C]: 177,
              [R0_C]: 10,
              [P1_C]: 256,
              [R1_C]: 10,
              [P2_C]: 178
            }
          )
        })
      })
    })
  })
})
