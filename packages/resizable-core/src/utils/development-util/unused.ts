import {DIRECTIONS} from '../constant'

export const RIGHT_BUTTON_VALUE = 0

// eslint-disable-next-line complexity
export const directionBehaviourConsole = (direction: number, prevDirection: number) => {
  switch (true) {
    case prevDirection === DIRECTIONS.NONE && direction === DIRECTIONS.UP:
      console.warn('direction we have starteed Up')
      break
    case prevDirection === DIRECTIONS.NONE && direction === DIRECTIONS.DOWN:
      console.warn('direction we have starteed Down')
      break
    case prevDirection === DIRECTIONS.UP && direction === DIRECTIONS.DOWN:
      console.warn('direction UP to Down')
      break
    case prevDirection === DIRECTIONS.DOWN && direction === DIRECTIONS.UP:
      console.warn('direction Down to UP')
      break
  }
}

export const isNotRightButtonPressed = (e: MouseEvent) => e.button !== RIGHT_BUTTON_VALUE

export const toRatioMap = (sizeMap: any, total: number) => {
  const ratioMap = Object.keys(sizeMap)
    .reduce((acc: any, key) => {
      acc[key] = sizeMap[key] / total
      return acc
    }, {})
  return ratioMap
}

export const getIdsKey = (list: any[]) => list.map((pane) => pane.visibility ? pane.id : '').join('')

export const throwForNonZero = (value: any, id: string) => {
  if (typeof value !== 'number') {
    throw new Error(`${id} -- ${value} `)
  }
}
