export interface IKeyToBoolMap {
    [name: string]: boolean
  }
export interface IMapIdToSize {
    [key:string] : number
  }

export interface IAnyMap {
      [key: string]: any
    }

export interface IResizableEvent {
    mouseCoordinate: number,
    movement: number
}
export type addAndRemoveType = '+'| '-'

export type IBooleanOrUndefined = boolean | undefined
