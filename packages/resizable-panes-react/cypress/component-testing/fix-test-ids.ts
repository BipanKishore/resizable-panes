import {RCy} from '../utils'

const rCy = new RCy({
  len: 7
})

const {
  resizerIds: [R0, R1, R2, R3, R4, R5],
  checkboxIds: [CK0, CK1, CK2, CK3, CK4, CK5, CK6],
  paneIds: [P0, P1, P2, P3, P4, P5, P6],
  laodedIds: [L0, L1, L2, L3],
  laodingIds: [LG0, LG1, LG2, LG3]
} = rCy.getResizableIds()

const rScontainerId = 'rScontainerId'
const containerId = rScontainerId
const mountUnMountButtonId = 'hide-resizable-panes'

export const minSizeClassTest = 'minSizeClassTest'
export const maxSizeClassTest = 'maxSizeClassTest'

const loadingId = 'loading'
const loadedId = 'loaded'

const textAreaP1 = 'textArea-P1'
export {
  containerId,
  loadingId,
  loadedId,
  L0, L1, L2, L3,
  LG0, LG1, LG2, LG3,
  mountUnMountButtonId,
  rScontainerId,
  R0, R1, R2, R3, R4, R5,
  CK0, CK1, CK2, CK3, CK4, CK5, CK6,
  P0, P1, P2, P3, P4, P5, P6,
  textAreaP1
}
