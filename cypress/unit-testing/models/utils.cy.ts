import {checkPaneModelErrors} from '../../../src/models/utils'
import {P0} from '../../component-testing/fix-test-ids'

export const checkPaneModelErrors2 = (size: number, minSize: number, maxSize: number, id: string) => {
  if (size < minSize) {
    throw Error('Size can not be smaller than minSize for pane id ' + id)
  }

  if (size > maxSize) {
    throw Error('Size can not be greatter than maxSize for pane id ' + id)
  }
}

describe('Dom utils', () => {
  it('should throw error minSize is greater than size', () => {
    expect(function () { checkPaneModelErrors(100, 110, 200, P0) })
      .to.throw('Size can not be smaller than minSize for pane id ' + P0)
  })

  it('should throw error size is greater than maxSize', () => {
    expect(function () { checkPaneModelErrors(300, 50, 200, P0) })
      .to.throw('Size can not be greatter than maxSize for pane id ' + P0)
  })
})
