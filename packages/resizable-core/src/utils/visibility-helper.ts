import {IKeyToBoolMap} from '../@types'
import {CHANGE} from './constant'
import {ResizableModel, PaneModel} from '../models'
import {getSize, setPaneVisibility, setVisibilitySize, syncPaneToOldVisibilityModel} from '../models/pane'
import {
  change1PixelToPanes,
  getItemsSizeSum, getVisibleItems
} from './panes'
import {getMaxContainerSizes} from './resizable-pane'

// actionList it can be removed
export const updateSizeInRatio = (
  allVisiblePanes: PaneModel[],
  maxPaneSize: number,
  actionVisibleList: PaneModel[]
) => {
  const currentPanesSize = getItemsSizeSum(allVisiblePanes)
  const sizeChange = maxPaneSize - currentPanesSize

  if (sizeChange === 0 || actionVisibleList.length === 0) {
    return
  }

  const operation = sizeChange > 0 ? CHANGE.ADD : CHANGE.REMOVE

  const sizeChangeAbsolute = Math.abs(sizeChange)

  if (sizeChangeAbsolute <= actionVisibleList.length) {
    change1PixelToPanes(actionVisibleList, sizeChangeAbsolute, operation)
    return
  }

  const ratioSum = getItemsSizeSum(actionVisibleList)

  const nextActionVisibleList: PaneModel[] = []
  actionVisibleList.forEach((pane) => {
    const size = getSize(pane)
    const newSize = Math.round(sizeChangeAbsolute * (size / ratioSum))

    const remainingSize = setVisibilitySize(pane, newSize, operation)
    if (remainingSize) {
      nextActionVisibleList.push(pane)
    }
  })

  updateSizeInRatio(allVisiblePanes, maxPaneSize, nextActionVisibleList)
}

export const setVisibilityFn = (resizable: ResizableModel, idMap: IKeyToBoolMap) => {
  const {panesList, items} = resizable

  let first = -1
  for (let i = 0; i < items.length; i += 2) {
    const item = items[i]
    syncPaneToOldVisibilityModel(item)
    const {id} = item
    setPaneVisibility(item, idMap[id])

    setPaneVisibility(items[i + 1], false)
    if (item.visibility) {
      if (first !== -1) {
        setPaneVisibility(items[i - 1], true)
      }
      first = i
    }
  }

  const visiblePanes = getVisibleItems(panesList)
  const currentPanesSize = getItemsSizeSum(visiblePanes)

  if (currentPanesSize === 0) {
    visiblePanes.forEach((pane) => {
      pane.size = 1
    })
  }

  const {maxPaneSize} = getMaxContainerSizes(resizable)

  updateSizeInRatio(visiblePanes, maxPaneSize, visiblePanes)
}
