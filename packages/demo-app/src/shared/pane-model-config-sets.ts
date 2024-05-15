import { PaneModelConfig } from "./models"

export const _1Pane = [
  new PaneModelConfig(1)
]

export const _2PaneWithMinMax = [
  new PaneModelConfig(6, 2, 10),
  new PaneModelConfig(4, 3, 10),
]

export const _3PanesWithNoMinMax = [
  new PaneModelConfig(1),
  new PaneModelConfig(1),
  new PaneModelConfig(1)
]

export const _3PanesWithMinMax = [
  new PaneModelConfig(3, 1, 6),
  new PaneModelConfig(2),
  new PaneModelConfig(3, 1, 6)
]

export const _4PanesWithMinMax = [
  new PaneModelConfig(1, 0.5, 3),
  new PaneModelConfig(3, 1),
  new PaneModelConfig(3, 1),
  new PaneModelConfig(1, 0.5, 3)
]

export const _4PanesWithNoMinMax = [
  new PaneModelConfig(1),
  new PaneModelConfig(3),
  new PaneModelConfig(3),
  new PaneModelConfig(1)
]

export const _5PanesWithMinMax = [
  new PaneModelConfig(1, 0.6, 3),
  new PaneModelConfig(3, 1),
  new PaneModelConfig(2, 1, 3),
  new PaneModelConfig(3, 1),
  new PaneModelConfig(1, 0.6, 3)
]

export const _5PanesWithNoMinMax = [
  new PaneModelConfig(1),
  new PaneModelConfig(3),
  new PaneModelConfig(2),
  new PaneModelConfig(3),
  new PaneModelConfig(1)
]

export const withMinMaxPixelMode5PanesSet = [
  new PaneModelConfig(100, 50, 300),
  new PaneModelConfig(300, 100, 500),
  new PaneModelConfig(400, 150),
  new PaneModelConfig(50, 30, 400),
  new PaneModelConfig(150, 50, 300)
]


export const withMinMaxWithMinMaxUnitPixel3PanesSet = [
  new PaneModelConfig(1, 100, 1000),
  new PaneModelConfig(2, 200, 1000),
  new PaneModelConfig(1, 100, 1000)
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






 export const PanesCollectionListRatioMode = [
  {
    label: 'Single Pane',
    value: _1Pane,
    ratio: true
  },
  {
    label: '2 Panes with Min & Max',
    value: _2PaneWithMinMax,
    ratio: true
  },
  {
    label: '3 Panes with Min & Max',
    value: _3PanesWithMinMax,
    ratio: true
  },
  {
    label: '3 Panes with No Min & Max',
    value: _3PanesWithNoMinMax,
    ratio: true
  },
  {
      label: '4 Panes with Min & Max',
      value: _4PanesWithMinMax,
      ratio: true
  },
  {
    label: '4 Panes with No Min & Max',
    value: _4PanesWithNoMinMax,
    ratio: true
}, 
  {
    label: '5 Panes with Min & Max',
    value: _5PanesWithMinMax,
    ratio: true
  },

  {
    label: '5 Panes No Min & Max',
    value: _5PanesWithNoMinMax,
    ratio: true
  },
  {
    label: '7 Panes Equal Size No Min & Max',
    value: noMinMaxEqualSize7PanesSet,
    ratio: true
  },
]



export const PANES_COLLECTION_IN_RATIO_MODE = [
  {
    label: '3 Panes Min Max Pixel Mode',
    value: withMinMaxWithMinMaxUnitPixel3PanesSet,
    ratio: false
  },
  {
    label: '5 Panes with Min Max Pixel Mode',
    value: withMinMaxPixelMode5PanesSet,
    ratio: false
  },
]



export const findePanesSet = (label: string) => {
  const panesSet = PanesCollectionListRatioMode.find((set) => set.label === label)
  return panesSet?.value
}

