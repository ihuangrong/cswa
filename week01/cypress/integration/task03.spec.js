context('Task 3', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_03.html')
    })
    it('Implemented', () => {
    })
    it('Has two headings', () => {
        cy.get('h1').should('have.length', 2)
    })
    it('Has two lists', () => {
        cy.get('ul').should('have.length', 2)
    })
    it('Full structure', () => {
        cy.get('h1').first().
            contains('Undergraduate Degrees').
            next().
            should('match', 'ul').
            next().
            should('match', 'h1').
            next().
            should('match', 'ul')
        cy.get('ul').first().
            find('li').
            should('have.length', 10)
        cy.get('ul').eq(1).
            find('li').
            should('have.length', 3)
    })
})
