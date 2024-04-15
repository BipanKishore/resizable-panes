export const getPaneIds = (length: number) => {
  const paneIds = []
  for (let i = 0; i < length; i++) {
    paneIds.push('P' + i)
  }

  return paneIds
}

export const getResizableIds = (len: number = 5, model: any = {}) => {
  const {
    resizerSize = 10,
    maxInitialPaneSize = 1000,
    height = 500
  } = model

  const containerSize = maxInitialPaneSize + (len - 1) * resizerSize
  const viewPortWidth = containerSize + 16

  const viewPortDimention: [number, number] = [viewPortWidth, height]

  const paneIds = getPaneIds(len)

  const resizerIds = paneIds.map((id) => `resizer-${id}`)
  const checkboxIds = paneIds.map((id) => `checkbox-${id}`)
  return {
    containerSize,
    resizerSize,
    viewPortDimention,
    resizerIds,
    checkboxIds,
    paneIds
  }
}

export const mountingWithRetry = (mounting: any, resizablePanesId: string, retryTimes = 5) => {
  mounting()
  cy.document()
    .then((doc) => {
      try {
        const element = doc.querySelector(`[data-cy=${resizablePanesId}]`)
        if (!element && retryTimes) {
          --retryTimes
          mountingWithRetry(mounting, resizablePanesId, retryTimes)
        } else if (!retryTimes) {
          throw new Error(`Mouting Error: cyId:  ${resizablePanesId} not found, Maybe Flaky issue`)
        }
      } catch (ex) {
        --retryTimes
        mountingWithRetry(mounting, resizablePanesId, retryTimes)
      }
    })
}
