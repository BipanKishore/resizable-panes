import {IResizableContext} from '../@types'

function SingletonService () {
  const serviceMap: {
    [key: string]: IResizableContext
  } = {}

  const getService = (id: string, createService: () => IResizableContext) => {
    serviceMap[id] = serviceMap[id] ? serviceMap[id] : createService()
  }

  const clearService = (id: string) =>
    delete serviceMap[id]

  return {
    getService,
    clearService
  }
}

export const singletonService = SingletonService()
