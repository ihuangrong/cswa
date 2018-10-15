context('Task 9', () => {
    it('Retrieve from history', () => {
        cy.visit('http://localhost:4200/')
        cy.get('#result').should('not.exist')
        cy.get('#history').should('not.exist')
        let a1 = Math.floor((Math.random() * 100) + 1)
        let b1 = Math.floor((Math.random() * 100) + 1)
        cy.get('input[type="number"][name="a"]').type(a1)
        cy.get('input[type="number"][name="b"]').type(b1)
        cy.get('select').select('+')
        cy.get('button').click()
        cy.get('#result').contains(a1 + ' + ' + b1 + ' = ' + (a1 + b1))
        cy.get('#history').
            find('a').
            should('have.length', 1)
        cy.get('#history a').get(0).
            contains(a1 + ' + ' + b1 + ' = ' + (a1 + b1))

        let a2 = Math.floor((Math.random() * 100) + 1)
        let b2 = Math.floor((Math.random() * 100) + 1)
        cy.get('input[type="number"][name="a"]').type(a2)
        cy.get('input[type="number"][name="b"]').type(b2)
        cy.get('select').select('-')
        cy.get('button').click()
        cy.get('#result').contains(a2 + ' - ' + b2 + ' = ' + (a2 - b2))
        cy.get('#history').
            find('a').
            should('have.length', 2)
        cy.get('#history a').
            contains(a1 + ' + ' + b1 + ' = ' + (a1 + b1))
        cy.get('#history a').
            contains(a2 + ' - ' + b2 + ' = ' + (a2 - b2))
    })
})
