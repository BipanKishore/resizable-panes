import React from 'react'
import {RCy} from '../../utils'
import {RPTestWrapper} from '../../components/rp-test-wrapper'
import {R0, R2, rScontainerId} from '../fix-test-ids'
import {PaneModelConfig} from '../../components/rp-test-wrapper/util'

describe('Test setCurrentMinMax use cases', () => {
  describe('should test minMaxLogicUp', () => {
    it(`Moving R0 to left most, and P1 can consume all the space left by P0
  case aIndex === 0 && bIndex < lastIndex
  Result First pane sets to min size and Second pane sets to max size allowed, No change in size of other pane`,
    () => {
      const panesSet = [
        new PaneModelConfig(1, 0),
        new PaneModelConfig(3, 0.5),
        new PaneModelConfig(3, 0.5),
        new PaneModelConfig(3, 0.5)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 4
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R0, rScontainerId, 'left')
      rCy.checkWidthsAndSum([0, 2, 400, 2, 300, 2, 300])
    })

    it(`Moving R0 to left most, and P1 can consume only the space left by P0
  case aIndex === 0 && bIndex < lastIndex
  Result First pane sets to min size and Second pane sets to max size, No change in size of other pane`,
    () => {
      const panesSet = [
        new PaneModelConfig(4, 2),
        new PaneModelConfig(4, 2, 6),
        new PaneModelConfig(2, 0.5)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 3
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R0, rScontainerId, 'left')
      rCy.checkWidthsAndSum(
        [200, 2, 600, 2, 200]
      )
    })

    it(`Moving R2(Last Pane) to left most, and P3 consume only it can, P2 reduces only in amout pushed by P3
  case aIndex > 0 && bIndex === lastIndex: case value > 0:
  Result Last pane sets to max size and Second Second pane sets to (P2 size - change in P1)
   No change in size of other pane`,
    () => {
      const panesSet = [
        new PaneModelConfig(2, 1),
        new PaneModelConfig(1, 0.5, 6),
        new PaneModelConfig(5, 0),
        new PaneModelConfig(2, 0.5, 4)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 4
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R2, rScontainerId, 'left')
      rCy.checkWidthsAndSum(
        [200, 2, 100, 2, 300, 2, 400]
      )
    })

    it(`Moving R2(Last Pane) to left most, when:: case aIndex === 0 && bIndex === lastIndex: case value === 0:
  Result Last pane sets to max size and First pane sets to min size
   No change in size of other pane`,
    () => {
      const panesSet = [
        new PaneModelConfig(4, 2),
        new PaneModelConfig(1, 1, 1),
        new PaneModelConfig(1, 1, 1),
        new PaneModelConfig(4, 2, 6)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 4
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R2, rScontainerId, 'left')
      rCy.checkWidthsAndSum(
        [200, 2, 100, 2, 100, 2, 600]
      )
    })

    it(`Moving R2(Last Pane) to left most
    when:: case aIndex === 0 && bIndex === lastIndex: case value > 0:
    Result Last pane sets to max size allowed and First pane sets to = pane.size - (change in last pane)
    No change in size of other pane`,
    () => {
      const panesSet = [
        new PaneModelConfig(4, 2),
        new PaneModelConfig(1, 1, 1),
        new PaneModelConfig(1, 1, 1),
        new PaneModelConfig(4, 2, 5)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 4
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R2, rScontainerId, 'left')
      rCy.checkWidthsAndSum(
        [300, 2, 100, 2, 100, 2, 500]
      )
    })
  })

  describe('should test minMaxLogicDown', () => {
    it(`Move R0 to max right with bellow pane set config
    when case aIndex === 0 && bIndex < lastIndex: case value < 0:
    Result: P0 should set to max, change in P1 = change in P0, other should remain same
    `, () => {
      const panesSet = [
        new PaneModelConfig(1, 0, 2),
        new PaneModelConfig(4, 1, 6),
        new PaneModelConfig(1, 1),
        new PaneModelConfig(4, 1)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 4
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R0, rScontainerId, 'right')
      rCy.checkWidthsAndSum(
        [200, 2, 300, 2, 100, 2, 400]
      )
    })

    it(`Move R0 to max right with bellow pane set config
    case aIndex === 0 && bIndex === lastIndex: case value === 0:
    Result: P0 should set to max and P3 should set to min
    `, () => {
      const panesSet = [

        new PaneModelConfig(4, 2, 6),
        new PaneModelConfig(1, 1, 1),
        new PaneModelConfig(1, 1, 1),
        new PaneModelConfig(4, 2)
      ]

      const rCy = new RCy({
        containerId: rScontainerId,
        plainResizer: true,
        resizerSize: 2,
        vertical: true,
        len: 4
      })

      rCy.setViewPort()

      cy.mount(
        <RPTestWrapper
          panesList={panesSet}
          storageApi={localStorage}
          uniqueId={rScontainerId}

          vertical
        >

        </RPTestWrapper>
      )

      rCy.move(R0, rScontainerId, 'right')
      rCy.checkWidthsAndSum(
        [600, 2, 100, 2, 100, 2, 200]
      )
    })
  })
})
