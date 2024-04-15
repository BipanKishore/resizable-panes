import {toPx} from '../../src/utils/dom'

export interface ISizeMap {
    [key:string]: number
  }

export const checkWidths = (sizeMap: ISizeMap, sizesSum?:number) => {
  const keys = Object.keys(sizeMap)

  keys.forEach((key) => {
    cy.get(`[data-cy=${key}]`)
      .should('have.css', 'width', toPx(sizeMap[key]))
  })

  if (sizesSum) {
    let _sizeSum = 0
    keys.forEach((key) => {
      _sizeSum += sizeMap[key]
    })
    expect(_sizeSum).to.eq(sizesSum)
  }
}

export const checkWidthsAndSum = (sizesSum:number, sizeMap: ISizeMap) => {
  const keys = Object.keys(sizeMap)

  keys.forEach((key) => {
    cy.get(`[data-cy=${key}]`)
      .should('have.css', 'width', toPx(sizeMap[key]))
  })

  let _sizeSum = 0
  keys.forEach((key) => {
    _sizeSum += sizeMap[key]
  })

  cy.wrap({
    _sizeSum
  }).its('_sizeSum').should('equal', sizesSum)
}