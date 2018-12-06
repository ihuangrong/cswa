context('Task 9', () => {
    it('Stored in history', () => {
        cy.visit('http://localhost:8080/')
        cy.get('#result').should('not.exist')
        cy.get('#history').should('not.exist')
        let a = Math.floor((Math.random() * 100) + 1)
        let b = Math.floor((Math.random() * 100) + 1)
        cy.get('input[type="number"][name="a"]').type(a)
        cy.get('input[type="number"][name="b"]').type(b)
        cy.get('select').select('+')
        cy.get('button').click()
        cy.get('#result').contains(a + ' + ' + b + ' = ' + (a + b))
        cy.get('#history').
            find('a').
            should('have.length', 1)
        cy.get('#history a').
            contains(a + ' + ' + b + ' = ' + (a + b))
    })
    it('Add to history', () => {
        cy.visit('http://localhost:8080/')
        let a1 = Math.floor((Math.random() * 100) + 1)
        let b1 = Math.floor((Math.random() * 100) + 1)
        let result1 = a1 + ' + ' + b1 + ' = ' + (a1 + b1)
        cy.get('input[type="number"][name="a"]').type(a1)
        cy.get('input[type="number"][name="b"]').type(b1)
        cy.get('select').select('+')
        cy.get('button').click()
        cy.get('#result').contains(result1)
        cy.get('#history').
            find('a').
            should('have.length', 1)
        cy.get('#history a').
            contains(result1)

        let a2 = Math.floor((Math.random() * 100) + 1)
        let b2 = Math.floor((Math.random() * 100) + 1)
        let result2  = a2 + ' - ' + b2 + ' = ' + (a2 - b2)
        cy.get('input[type="number"][name="a"]').clear().type(a2)
        cy.get('input[type="number"][name="b"]').clear().type(b2)
        cy.get('select').select('-')
        cy.get('button').click()
        cy.get('#result').contains(result2)
        cy.get('#history').
            find('a').
            should('have.length', 2)
        cy.get('#history a').
            contains(result1)
        cy.get('#history a').
            contains(result2)
    })
})
