import {IResizableContext} from '../@types'

function SingletonService () {
  const serviceMap: {
    [key: string]: IResizableContext
  } = {}

  const getService = (id: string, createService: () => IResizableContext) => {
    if (serviceMap[id]) {
      return serviceMap[id]
    }

    const service = createService()
    serviceMap[id] = service
    return service
  }

  const clearService = (id: string) => {
    delete serviceMap[id]
  }

  return {
    getService,
    clearService
  }
}

export const singletonService = SingletonService()
