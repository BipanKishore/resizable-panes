import React from 'react'
import {ResizablePanes, Panes} from '../../src'
import '../styles/style.css'
import {VERTICAL_CONTAINER_WIDTH, CyMoveEvent, moveResizer} from '../utils/events'
import {checkWidths} from '../utils/check-widths'

const uniqueIdResizablePanes = 'vertical-panes'

const INITIAL_SIZES: any = {
  [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
  'resizer-P0': 12,
  'resizer-P1': 12,

  P0: 299,
  P1: 398,
  P2: 299
}

const paneIds = ['P0', 'P1', 'P2']

const cyMoveEvent = new CyMoveEvent({
  maxPaneSize: 1000,
  paneIds,
  resizerSize: 10
})

describe('Moving outside the Limiting Range', () => {
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

  it('Check initial size', () => {
    checkWidths(INITIAL_SIZES)
  })

  it('Resizer R0 movement to most Left', () => {
    moveResizer('resizer-P0', CyMoveEvent.toMostLeft())

    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 30,
      P1: 667,
      P2: 299
    })
  })

  it('Then Resizer R0 movement to most Right', () => {
    moveResizer('resizer-P0', CyMoveEvent.toMostRight())
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 928,
      P1: 40,
      P2: 30
    })
  })

  it('Then Resizer R1 movement to most Left', () => {
    moveResizer('resizer-P1', CyMoveEvent.toMostLeft())
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 30,
      P1: 40,
      P2: 928
    })
  })

  it('Then Resizer R1 movement to most Right', () => {
    moveResizer('resizer-P1', CyMoveEvent.toMostRight())

    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 299,
      P1: 667,
      P2: 30
    })
  })

  it('R0 to most Left >> R0 to Most Right >> R1 to most Left', () => {
    moveResizer('resizer-P0', CyMoveEvent.toMostLeft())
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 30,
      P1: 667,
      P2: 299
    })

    moveResizer('resizer-P0', CyMoveEvent.toMostRight())
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 928,
      P1: 40,
      P2: 30
    })

    moveResizer('resizer-P1', CyMoveEvent.toMostLeft())
    checkWidths({
      [uniqueIdResizablePanes]: VERTICAL_CONTAINER_WIDTH,
      P0: 30,
      P1: 40,
      P2: 928
    })
  })
})
