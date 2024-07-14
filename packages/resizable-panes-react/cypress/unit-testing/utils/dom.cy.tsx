import {getResizableEvent} from '../../../../resizable-core'

describe('Dom utils', () => {
  describe('It should test getResizableEvent for Touch evevts', () => {
    const event = {
      type: 'touch',
      targetTouches: [{
        clientX: 10,
        pageX: 10,
        clientY: 20,
        pageY: 20
      }]
    }

    beforeEach(() => {

    })

    afterEach(() => {

    })

    it.only('should test getResizableEvent vertical panes ', () => {
      const retValue = [10, 10]
      const value = getResizableEvent(event, true, {})
      expect(value).to.deep.equals(retValue)
    })

    it('should test getResizableEvent Horizontal panes ', () => {
      const retValue = [20, 20]
      const value = getResizableEvent(event, false, {})
      expect(value).to.deep.equals(retValue)
    })
  })

  // // Edge case
  // describe.only('should test generateResizerStyle', () => {
  //   it('should run generateResizerStyle for vertical direction', () => {
  //     const retValue = {
  //       marginLeft: '-5px',
  //       marginRight: '-5px',
  //       minWidth: '12px',
  //       borderLeft: '5px solid transparent',
  //       borderRight: '5px solid transparent'
  //     }

  //     const value = generateResizerStyle(2, 5, true)
  //     expect(value).to.deep.equals(retValue)
  //   })

  //   it('should run generateResizerStyle for horizontal direction', () => {
  //     const retValue = {
  //       marginTop: '-5px',
  //       marginBottom: '-5px',
  //       minHeight: '12px',
  //       borderTop: '5px solid transparent',
  //       borderBottom: '5px solid transparent'
  //     }

  //     const value = generateResizerStyle(2, 5, false)
  //     expect(value).to.deep.equals(retValue)
  //   })
  // })
})
