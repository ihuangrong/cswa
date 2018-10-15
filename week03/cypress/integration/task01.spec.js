context('Task 1', () => {
    it('Application runs', () => {
        cy.visit('http://localhost:4200/')
        cy.get('h1').contains('Calculator')
    })
})
