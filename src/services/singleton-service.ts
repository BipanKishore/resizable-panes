import {IResizableContext} from '../@types'
import { noop } from '../utils/util'

type ICreateService = () => IResizableContext

function SingletonService () {
  const serviceMap: {
    [key: string]: IResizableContext
  } = {}

  const getService = (id: string, createService: ICreateService) => 
     serviceMap[id] = serviceMap[id] ? serviceMap[id] : (createService as ICreateService)()
  

  const clearService = (id: string) => 
    delete serviceMap[id]
  

  return {
    getService,
    clearService
  }
}

export const singletonService = SingletonService()
