context('Task 7', () => {
    it('Division', () => {
        cy.visit('http://localhost:4200/')
        cy.get('#result').should('not.exist')
        let a = Math.floor((Math.random() * 100) + 1)
        let b = Math.floor((Math.random() * 100) + 1)
        cy.get('input[type="number"][name="a"]').type(a)
        cy.get('input[type="number"][name="b"]').type(b)
        cy.get('select').select('/')
        cy.get('button').click()
        cy.get('#result').contains(a + ' / ' + b + ' = ' + (a / b).toFixed(2))
    })
})
