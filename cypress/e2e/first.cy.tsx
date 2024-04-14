describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })

  it('Should visit', () => {
    cy.visit('http://localhost:8080/')
  })
})
