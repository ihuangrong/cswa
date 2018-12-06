context('Task 1', () => {
    it('Application runs', () => {
        cy.visit('http://localhost:8080/')
        cy.get('h1').contains('Calculator')
    })
})
