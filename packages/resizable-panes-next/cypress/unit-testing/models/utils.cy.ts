import {checkPaneModelErrors} from '../../../../resizable-core'
import {P0} from '../../component-testing/fix-test-ids'

describe('Dom utils', () => {
  it('should throw error minSize is greater than size', () => {
    expect(function () { checkPaneModelErrors(100, 110, 200, P0) })
      .to.throw(`Size(${100}) can not be smaller than minSize(${110}) for pane id ${P0}`)
  })

  it('should throw error size is greater than maxSize', () => {
    expect(function () { checkPaneModelErrors(300, 50, 200, P0) })
      .to.throw(`Size(${300}) can not be greatter than maxSize(${200}) for pane id ${P0}`)
  })
})
