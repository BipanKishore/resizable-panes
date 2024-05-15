import { PanesCollectionListRatioMode } from "../../shared/pane-model-config-sets"
import { detectMob } from "../../shared/utils"

 const initialConfigKey = 'initial-config'


export const INITIAL_CONFIG = {
  detectionRadius: detectMob() ? 10 : 7,
  vertical: true,
  unmounOnHide: true,
  storageApiFlag: false,
  resizerSize:  1,
  activePanesSet: PanesCollectionListRatioMode[4].label
}

export const clearAllResizableComponentData = () => {
  PanesCollectionListRatioMode.forEach((item) => {
    localStorage.removeItem(item.label)
  })
}

export const storeInitialConfig = (config: any) => {
  const value = JSON.stringify(config)
  localStorage.setItem(initialConfigKey, value)
}

export const getInitialConfig = () => {
  const stringifyValue = localStorage.getItem(initialConfigKey)

  return stringifyValue ? JSON.parse(stringifyValue) : INITIAL_CONFIG
}





