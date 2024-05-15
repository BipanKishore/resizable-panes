import {PaneModelConfig} from '../components/rp-test-wrapper/util'

export const _2PaneWithMinMax = [
  new PaneModelConfig(6, 2, 10),
  new PaneModelConfig(4, 3, 10)
]

export const _2PaneWithNoMinMax = [
  new PaneModelConfig(6),
  new PaneModelConfig(4)
]

export const _3PanesWithMinMax = [
  new PaneModelConfig(3, 1, 6),
  new PaneModelConfig(2),
  new PaneModelConfig(3, 1, 6)
]

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

export const withMinMaxAllPaneEqualSizeExcept15PanesSet = [
  new PaneModelConfig(1, 0.1, 2),
  new PaneModelConfig(6, 0.1),
  new PaneModelConfig(1, 1, 2),
  new PaneModelConfig(1, 1, 2),
  new PaneModelConfig(1, 0.1, 2)
]

export const withMinMaxPixelMode5PanesSet = [
  new PaneModelConfig(100, 50, 300),
  new PaneModelConfig(300, 100, 500),
  new PaneModelConfig(400, 150),
  new PaneModelConfig(50, 30, 400),
  new PaneModelConfig(150, 50, 300)
]

export const noMinMax5PanesSet = [
  new PaneModelConfig(1),
  new PaneModelConfig(3),
  new PaneModelConfig(2),
  new PaneModelConfig(3),
  new PaneModelConfig(1)
]

export const withMinMaxWithMinMaxUnitPixel5PanesSet = [
  new PaneModelConfig(1, 100, 1000),
  new PaneModelConfig(2, 200, 1000),
  new PaneModelConfig(1, 100, 1000)
]

export const withMinMaxEqualSize1PanesSet = [
  new PaneModelConfig(1, 0.1, 3)
]

export const mix3PanesSet = [
  new PaneModelConfig(3, 1, 6),
  new PaneModelConfig(2),
  new PaneModelConfig(3, 1, 6)
]
