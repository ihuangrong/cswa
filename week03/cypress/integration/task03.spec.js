context('Task 3', () => {
    it('Calculate button', () => {
        cy.visit('http://localhost:4200/')
        cy.get('button')
        cy.get('#result').should('not.exist')
    })
    it('Press button', () => {
        cy.visit('http://localhost:4200/')
        cy.get('#result').should('not.exist')
        cy.get('button').click()
        cy.get('#result')
    })
})
