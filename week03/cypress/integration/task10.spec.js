context('Task 10', () => {
    it('Retrieve from history', () => {
        cy.visit('http://localhost:4200/')
        cy.get('#result').should('not.exist')
        cy.get('#history').should('not.exist')

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

        cy.get('input[type="number"][name="a"]').clear()
        cy.get('input[type="number"][name="b"]').clear()
        cy.get('#history a').each((link) => {
            let content = link.html()
            link = cy.wrap(link)
            link.click()
            if(content === result1) {
                cy.get('#result').contains(result1)
            } else if(content === result2) {
                cy.get('#result').contains(result2)
            }
        })

        cy.get('#history').
            find('a').
            should('have.length', 4)
    })
})
