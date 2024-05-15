import {ResizableModel} from '../models'

function SingletonService () {
  const serviceMap: {
    [key: string]: ResizableModel
  } = {}

  const getService = (id: string, createService: () => ResizableModel) => {
    serviceMap[id] = serviceMap[id] ? serviceMap[id] : createService()
    return serviceMap[id]
  }

  const clearService = (id: string) =>
    delete serviceMap[id]

  return {
    getService,
    clearService
  }
}

export const singletonService = SingletonService()
