import {PaneModelConfig} from '../components/rp-test-wrapper/util'

export const noMinMaxEqualSize7PanesSet = [
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1)
]

export const withMinMaxEqualSize5PanesSet = [
  new PaneModelConfig(1, 0.1, 3),
  new PaneModelConfig(3, 1),
  new PaneModelConfig(2, 1, 3),
  new PaneModelConfig(3, 1),
  new PaneModelConfig(1, 0.1, 3)
]
