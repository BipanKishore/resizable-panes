import {IServiceRef} from '../@types'

class SingletonService {
  serviceMap: {
    [key: string]: IServiceRef
  } = {}

  getService (id: string) {
    if (this.serviceMap[id]) {
      return this.serviceMap[id]
    }

    return {}
  }

  clearService (id: string) {
    delete this.serviceMap[id]
  }
}

export const singletonService = new SingletonService()
