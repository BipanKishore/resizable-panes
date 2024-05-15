export interface IMoveHorizontalEvent {
  clientX: number;
  movementX: number;
}

export interface IMoveVerticalEvent {
  clientY: number;
  movementY: number;
}

export type IMoveEvent = IMoveVerticalEvent | IMoveHorizontalEvent

export interface ISizeMap {
    [key:string]: number
  }
