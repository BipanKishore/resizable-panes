import {PaneModel} from '../models/pane-model'
import {IResizablePanesProps} from './component-types'
import {IKeyToBoolMap} from './general-type'

export type keyOfPaneModel = keyof PaneModel
export type IPaneNumericKeys = 'size' | 'defaultSize' | 'minSize' | 'maxSize' | 'defaultMinSize' | 'defaultMaxSize'

export interface IResizableApi {
    restoreDefault: () => void,
    setVisibility: (map: IKeyToBoolMap) => void
}

export interface IUseResizablePanesParams {
    getContainerRect: any,
    panesRefs: any,
    resizerRefs: any,
    vertical: boolean,
    props?: IResizablePanesProps
  }

export interface IInitPaneService {
    children: any[],
    getContainerRect: any,
    panesRefs: any[],
    vertical: boolean
}

export type IPaneModelKey = keyof PaneModel

export interface IResizerApi {
    setVisibility: (value: boolean) => unknown,
    getVisibleSize: () => number,
    visibility: boolean,
    setSize: (size: number) => void
  }
