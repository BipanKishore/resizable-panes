import React from 'react'
import {RCy} from '../../utils'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {
  mix3PanesSet,
  noMinMax5PanesSet,
  withMinMaxWithMinMaxUnitPixel5PanesSet
} from '../pane-model-config-sets'
import {CK0, L0, LG0, R0, R1, rScontainerId} from '../fix-test-ids'
import {CustomResizerFirst} from '../../components/custom-resizer'
import {ResizableComponentCustomPanesTestWrapper}
  from '../../components/rp-test-wrapper/resizable-component-custom-panes-test-wrapper'
import {Pane} from 'resizable-panes-react'
import {PaneChild} from '../../components/pane-child'
import {LOADED_TEXT, LOADING_TEXT} from '../../utils/constants'

const containerId = rScontainerId

const rCy = new RCy({
  containerId,
  plainResizer: true,
  resizerSize: 2,
  vertical: true
})

describe('Test Pane Model', () => {
  describe('Test UI Action: toRatioMode method', () => {
    it('should decreases panes size to half approx, When the port size decreases to half', () => {
      cy.viewport(1000, 1000)
      cy.mount(
        <RPTestWrapper
          panesList={noMinMax5PanesSet}
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
        >
        </RPTestWrapper>
      )

      rCy.checkWidths([95, 10, 283, 10, 189, 10, 283, 10, 94])

      cy.wait(50)
      cy.viewport(500, 500)
      rCy.checkWidths([45, 10, 133, 10, 89, 10, 133, 10, 44])
    })

    it('should increases panes size to double approx, When the port size increases to double', () => {
      cy.viewport(1000, 1000)
      cy.mount(
        <RPTestWrapper
          panesList={noMinMax5PanesSet}
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
        >
        </RPTestWrapper>
      )

      rCy.checkWidths([95, 10, 283, 10, 189, 10, 283, 10, 94])
      cy.wait(50)
      cy.viewport(2000, 2000)
      rCy.checkWidths([195, 10, 583, 10, 389, 10, 583, 10, 194])
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
          minMaxUnit="pixel"
          panesList={withMinMaxWithMinMaxUnitPixel5PanesSet}
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
        >
        </RPTestWrapper>
      )

      rCy.checkWidths([241, 10, 482, 10, 241])
      cy.wait(50)
      cy.viewport(2000, 2000)

      rCy.move(R0, rScontainerId, 'right')
      rCy.checkWidths([1000, 10, 473, 10, 491])
      rCy.move(R1, rScontainerId, 'left')
      rCy.checkWidths([764, 10, 200, 10, 1000])
    })
  })

  describe('visibility + unmountOnHide', () => {
    it('unmountOnHide: true at parent level', () => {
      cy.viewport(1000, 1000)
      cy.mount(
        <RPTestWrapper
          panesList={mix3PanesSet}
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
        >
        </RPTestWrapper>
      )
      rCy.cyGet(CK0).click()
      cy.wait(1000).then(() => {
        rCy.cyGet(CK0).click()
        cy.wait(50).then(() => {
          rCy.cyGet(LG0)
            .should('have.text', LOADING_TEXT)
        })
      })
    })

    it('unmountOnHide: false at parent level', () => {
      cy.viewport(1000, 1000)
      cy.mount(
        <RPTestWrapper
          panesList={mix3PanesSet}
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          unmountOnHide={false}
          vertical
        >
        </RPTestWrapper>
      )

      rCy.cyGet(CK0).click()
      cy.wait(1000).then(() => {
        rCy.cyGet(CK0).click()
        cy.wait(50).then(() => {
          rCy.cyGet(L0)
            .should('have.text', LOADED_TEXT)
        })
      })
    })

    it('unmountOnHide: false at Pane level', () => {
      cy.viewport(1000, 1000)
      cy.mount(
        <ResizableComponentCustomPanesTestWrapper
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          vertical
        >
          <Pane
            className="bg-orange-500"
            id="P0"
            size={1}
            unmountOnHide={false}
          >

            <PaneChild hook='P0' />
          </Pane>
          <Pane className="bg-teal-500" id="P1" size={1}>

            <PaneChild hook='P1' />
          </Pane>
        </ResizableComponentCustomPanesTestWrapper>
      )

      rCy.cyGet(CK0).click()
      cy.wait(1000).then(() => {
        rCy.cyGet(CK0).click()
        cy.wait(50).then(() => {
          rCy.cyGet(L0)
            .should('have.text', LOADED_TEXT)
        })
      })
    })

    it('unmountOnHide: true at Pane level', () => {
      cy.viewport(1000, 1000)
      cy.mount(
        <ResizableComponentCustomPanesTestWrapper
          resizer={<CustomResizerFirst horizontal={false} size={10} />}
          resizerSize={10}
          storageApi={localStorage}
          uniqueId={rScontainerId}
          unmountOnHide={false}
          vertical
        >
          <Pane
            className="bg-orange-500" id="P0" size={1}
            unmountOnHide={true}
          >

            <PaneChild hook='P0' />
          </Pane>
          <Pane className="bg-teal-500" id="P1" size={1}>

            <PaneChild hook='P1' />
          </Pane>
        </ResizableComponentCustomPanesTestWrapper>
      )

      rCy.cyGet(CK0).click()
      cy.wait(1000).then(() => {
        rCy.cyGet(CK0).click()
        cy.wait(50).then(() => {
          rCy.cyGet(LG0)
            .should('have.text', LOADING_TEXT)
        })
      })
    })
  })
})
