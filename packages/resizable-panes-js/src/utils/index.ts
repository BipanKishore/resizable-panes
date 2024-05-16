import {RATIO, noop} from '../../../resizable-core'
import {IResizableOptions} from '../@types'

export const attachDefaultOptions = (
  options: IResizableOptions
) => {
  const children = options.panes.map((pane) => {
    return {
      props: pane
    }
  })
  return {
    onResize: noop,
    onResizeStop: noop,
    onReady: noop,
    onChangeVisibility: noop,

    vertical: false,
    unit: RATIO,
    resizerSize: 2,
    detectionRadius: 6,
    visibility: {},
    children,
    ...options
  }
}

export const addClasses = (node: HTMLElement, classes: string) => {
  const classList = classes.split(' ')
  classList.forEach((paneClass) => paneClass && node.classList.add(paneClass))
}

export const removeClasses = (node: HTMLElement, classes: string) => {
  const classList = classes.split(' ')
  classList.forEach((paneClass) => paneClass && node.classList.remove(paneClass))
}

export const getMouseDownOnResizer = (
  node: HTMLElement, nodeId: string,
  activeClasses: string = '', normalClasses: string = '') =>
  (id: string, isMouseDown: boolean) => {
    if (id === nodeId) {
      if (isMouseDown) {
        addClasses(node, activeClasses)
        removeClasses(node, normalClasses)
      } else {
        addClasses(node, normalClasses)
        removeClasses(node, activeClasses)
      }
    }
  }

export const getElementById = (id: string) => document.getElementById(id)

export const INITIAL_CONFIG:IResizableOptions = {
  vertical: true,
  uniqueId: 'container',
  resizerSize: 10,
  detectionRadius: 6,
  resizerClass: 'bg-slate-500',
  storageApi: sessionStorage,

  visibility: {
    P1: false
  },
  panes: [
    {
      id: 'P0',
      size: 100,
      minSize: 30,
      maxSize: 150,
      detectionRadius: 20,
      onMaxSize: (id: string, size: number) => {
        console.log('onMaxSize', id, size)
      },
      onMinSize: (id: string, size: number) => {
        console.log('onMinSize', id, size)
      },
      onNormalSize: (id: string) => {
        console.log('onNormalSize', id)
      }
    },
    {
      id: 'P1',
      size: 100
    },
    {
      id: 'P2',
      size: 100
    },
    {
      id: 'P3',
      size: 100
    }
  ]
}
