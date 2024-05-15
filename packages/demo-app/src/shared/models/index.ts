

export class PaneModelConfig {
    size:number
    minSize: number | undefined
    maxSize: number | undefined
  
    constructor (size:number, minSize?: number, maxSize?: number) {
      this.size = size
      this.minSize = minSize
      this.maxSize = maxSize
    }
  }

