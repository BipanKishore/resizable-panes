import {SinonSpy} from 'cypress/types/sinon'
import {getResizableEvent} from '../../src/utils/dom'

describe('Dom utils', () => {
  describe('It should test getResizableEvent for Touch evevts', () => {
    let preventDefault: SinonSpy
    const event = {
      type: 'touch',
      preventDefault,
      targetTouches: [{
        clientX: 10,
        pageX: 10,
        clientY: 20,
        pageY: 20
      }]
    }

    beforeEach(() => {
      preventDefault = cy.spy()
      event.preventDefault = preventDefault
    })

    afterEach(() => {

    })

    it('should test getResizableEvent vertical panes ', () => {
      const retValue = {mouseCoordinate: 10, movement: 10}

      const value = getResizableEvent(event, true, {})
      expect(preventDefault.calledOnce).to.equal(true)

      expect(value).to.deep.equals(retValue)
    })

    it('should test getResizableEvent Horizontal panes ', () => {
      const retValue = {mouseCoordinate: 20, movement: 20}

      const value = getResizableEvent(event, false, {})
      expect(preventDefault.calledOnce).to.equal(true)

      expect(value).to.deep.equals(retValue)
    })
  })
})
