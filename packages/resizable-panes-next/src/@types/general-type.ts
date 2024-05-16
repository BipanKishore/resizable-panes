export interface IKeyToBoolMap {
    [name: string]: boolean
  }
export interface IMapIdToSize {
    [key:string] : number
  }

export interface IAnyMap {
      [key: string]: any
    }

export type IResizableEvent = [ mouseCoordinate: number, movement: number]

export interface ISizeStyle {
  height?: string,
  width?: string
}
