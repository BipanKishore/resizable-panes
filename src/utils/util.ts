import {IAnyMap, IPaneModelKey, IStoreResizableItemsModel} from '../@types'
import {DIRECTIONS, RESIZER, SIZE} from '../constant'
import {PaneModel} from '../models'
import {getSize} from '../models/pane'

export type INoop = (_: any) => any

export const noop: INoop = (_: any): any => _

export const findById = <T>(list: T[] | any[], _id: string) =>
  list.find(({id}) => id === _id)

export const createMap = (paneList: PaneModel[] | IStoreResizableItemsModel[], ...keys: IPaneModelKey[]) => {
  const map: IAnyMap = {}
  paneList.forEach((pane) => {
    const getValue = (key: string) => key === SIZE ? getSize(pane) : pane[key]

    const {id} = pane
    if (keys.length === 1) {
      map[id] = getValue(keys[0])
    } else {
      map[id] = keys.reduce((acc: any, key) => {
        acc[key] = getValue(key)
        return acc
      }, {})
    }
  })
  return map
}

// export const isUndefinedOrNull = (value: any) => value === undefined || value === null

export const findIndex = (list: any[], value: any, key = 'id') =>
  list.findIndex((item) => item[key] === value)

export const ratioToNumber = (totalSize: number, maxRatioValue: number, size: number) =>
  Number((totalSize * (size / maxRatioValue)).toFixed(0))

export const ratioAndRoundOff = (totalSize: number, maxRatioValue: number, size: number) => Math.round(
  ratioToNumber(totalSize, maxRatioValue, size)
)

// Not required
export const addDefaultProps = (props: any, defaultProps: any) => {
  const keys = Object.keys({...props, ...defaultProps})
  const newProps: any = {}

  for (const key of keys) {
    newProps[key] = props[key] === undefined ? defaultProps[key] : props[key]
  }
  return newProps
}

export const filterKeys = <T>(obj: T, ...keys: (keyof T)[]) => {
  const retObj: any = {}
  keys.forEach(key => {
    retObj[key] = obj[key]
  })

  return retObj
}

export const isItUp = (direction: number) => direction === DIRECTIONS.UP
export const isItDown = (direction: number) => direction === DIRECTIONS.DOWN

export const getResizerId = (paneId: string) => `${RESIZER}-${paneId}`

// need to make pure
export const deleteUndefined = (anyObject: any) => {
  Object.keys(anyObject).forEach(key => {
    if (anyObject[key] === undefined) {
      delete anyObject[key]
    }
  })
  return anyObject
}

export const reverse = <T>(list: T[]): T[] => [...list].reverse()
export const filterEmpty = (list: any[]) => list.filter(_ => _)
