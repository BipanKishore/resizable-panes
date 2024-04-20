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

export const withMinMaxPixelMode5PanesSet = [
  new PaneModelConfig(100, 50, 300),
  new PaneModelConfig(300, 100, 500),
  new PaneModelConfig(400, 150),
  new PaneModelConfig(50, 30, 400),
  new PaneModelConfig(150, 50, 300)
]
