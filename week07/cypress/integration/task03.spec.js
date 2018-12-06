context('Task 3', () => {
    it('Calculate button', () => {
        cy.visit('http://localhost:8080/')
        cy.get('button')
        cy.get('#result').should('not.exist')
    })
    it('Press button', () => {
        cy.visit('http://localhost:4200/')
        cy.get('#result').should('not.exist')
        cy.get('input[type="number"][name="a"]').type('1')
        cy.get('input[type="number"][name="b"]').type('1')
        cy.get('button').click()
        cy.get('#result')
    })
})
