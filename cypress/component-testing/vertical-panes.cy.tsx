import React from 'react'
import {ResizablePanes, Panes} from '../../src'
import '../styles/style.css'
import {VERTICAL_CONTAINER_WIDTH, CyMoveEvent} from '../utils/events'
import {toPx} from '../../src/utils/dom'
import {checkWidths} from '../utils/check-widths'

const uniqueIdResizablePanes = 'vertical-panes'

const INITIAL_SIZES: any = {
  [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
  P0: 299,
  P1: 398,
  P2: 299
}

describe('Vertical Panes with Basic Resizer', () => {
  beforeEach(() => {
    cy.mount(
      <div className='h-300'>
        <ResizablePanes
          className=''
          uniqueId={uniqueIdResizablePanes}
          unit='ratio'
          vertical
        >
          <Panes className='bg-red-500' id='P0' minSize={3} size={30}>
          </Panes>

          <Panes className='bg-orange-500' id='P1' minSize={4} size={40}>
          </Panes>

          <Panes className='bg-lime-500' id='P2' minSize={3} size={30}>
          </Panes>
        </ResizablePanes>
      </div>
    )
  })

  describe('Check initial size', () => {
    it('Basic Resizer', () => {
      checkWidths(INITIAL_SIZES)
    })
  })

  describe.skip('Movements', () => {
    // it('Resizer R0 movement to most Left', () => {
    //   cy.get('[data-cy=resizer-P0]')
    //     .trigger('mousedown')
    //     .trigger('mousemove', CyMoveEvent.toMostLeft())
    //     .trigger('mouseup')

    //   checkWidths({
    //     [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
    //     P0: 30,
    //     P1: 667,
    //     P2: 299
    //   })
    // })

    // it('Then Resizer R0 movement to most Right', () => {
    //   cy.get('[data-cy=resizer-P0]')
    //     .trigger('mousedown')
    //     .trigger('mousemove', CyMoveEvent.toMostRight())
    //     .trigger('mouseup')

    //   checkWidths({
    //     [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
    //     P0: 928,
    //     P1: 40,
    //     P2: 30
    //   })
    // })

    it('Then Resizer R1 movement to Center', () => {
      cy.get('[data-cy=resizer-P1]')
        .trigger('mousedown')
        .trigger('mousemove', CyMoveEvent.toCenterMovingLeft())
        .trigger('mouseup')

      checkWidths({
        [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH
        // P0: 299,
        // P1: 40,
        // P2: 30
      })
    })
  })
})
