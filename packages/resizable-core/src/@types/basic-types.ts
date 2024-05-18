import {PaneModel} from '../models'

export type UnitTypes = 'ratio' | 'pixel' | undefined

export type IPaneModelKey = keyof PaneModel

export type IPaneNumericKeys = 'size' | 'defaultSize' | 'minSize' | 'maxSize' | 'defaultMinSize' | 'defaultMaxSize'

export type IBooleanOrUndefined = boolean | undefined
export type IStringOrUndefined = string | undefined

export type IClearFlagsParam = 'setSize' | 'ratio' | 'visibility' | ''
export type ISetSizeBehaviour = 'ratio' | '1' | '2'

export type ISizeState = 'onNormalSize' | 'onMinSize' | 'onMaxSize'
