context('Task 2', () => {
    it('Input Elements', () => {
        cy.visit('http://localhost:4200/')
        cy.get('input[type="number"]').
            should('have.length', 2)
        cy.get('input[type="number"][name="a"]')
        cy.get('input[type="number"][name="b"]')
        cy.get('select').
            should('have.length', 1).
            find('option').
            should('have.length', 5)
        cy.get('select').
            select('+').
            select('-').
            select('*').
            select('/').
            select('%')
    })
})
