export const getResizableIds = (paneIds: string[]) => {
  const resizerIds = paneIds.map((id) => `resizer-${id}`)
  const checkboxIds = paneIds.map((id) => `checkbox-${id}`)
  return {
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
