import {IAnyMap, IMapIdToSize, IPaneModelKey, IStorePaneModel} from '../@types'
import {PaneModel} from '../models/pane-model'

export const noop = (_: any): any => _

export const findById = (list: PaneModel[], _id: string) => {
  return list.find(({
    id
  }) => id === _id)
}

export const createMap = (paneList: PaneModel[], ...keys: IPaneModelKey[]) => {
  const map: IAnyMap = {}
  paneList.forEach((pane) => {
    const {id} = pane
    if (keys.length === 1) {
      map[id] = pane[keys[0]]
    } else {
      map[id] = keys.reduce((acc: any, key) => {
        acc[key] = pane[key]
        return acc
      }, {})
    }
  })
  return map
}

export const toRatioMap = (sizeMap: any, total: number) => {
  const ratioMap = Object.keys(sizeMap)
    .reduce((acc: any, key) => {
      acc[key] = sizeMap[key] / total
      return acc
    }, {})
  return ratioMap
}

export const isUndefinedOrNull = (value: any) => value === undefined || value === null

export const findIndex = (list: any[], value: any, key = 'id') => {
  return list.findIndex((item) => item[key] === value)
}

export const ratioToNumber = (totalSize: number, maxRatioValue: number, size: number) => {
  return Number(
    (totalSize * (size / maxRatioValue)).toFixed(0)
  )
}
export const getIdsKey = (list: any[]) => list.map((pane) => pane.visibility ? pane.id : '').join('')
