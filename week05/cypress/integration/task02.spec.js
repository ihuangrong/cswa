context('Task 2', () => {
    it('Test ARIA alert', () => {
        cy.visit('http://localhost:4200/aria/alert')
        cy.get('*[role="alert"]').contains('Please check your screenreader works')
    })
})
