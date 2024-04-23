import {SinonSpy} from 'cypress/types/sinon'
import {ResizeStorage} from '../../../src/utils/storage'
import {P0, rScontainerId} from '../../component-testing/fix-test-ids'
import {ReactElement} from 'react'

describe('Store unit tests', () => {
  const myChildren = [{
    props: {
      id: P0
    }
  }, {
    props: {
      id: P0
    }
  }] as ReactElement[]

  let removeItem: SinonSpy
  const storageApi: any = {}

  beforeEach(() => {
    removeItem = cy.spy()
    storageApi.removeItem = removeItem
    storageApi.getItem = cy.stub().returns('{}')

    const storage = new ResizeStorage(rScontainerId, storageApi, myChildren)
  })

  it('should call removeItem when panes property is not present in store', () => {
    expect(removeItem.calledWithExactly(rScontainerId)).to.equal(true)
  })
})
