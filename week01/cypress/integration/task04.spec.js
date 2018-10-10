context('Task 4', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_04.html')
    })
    it('Implemented', () => {
    })
    it('Heading element', () => {
        cy.get('h1').contains('Sony makes experimental e-paper watch')
    })
    it('Structure test', () => {
        cy.get('p').first().
            should('match', 'p').
            should('contain', 'Sony').
            next().
            should('match', 'p').
            should('contain', 'design').
            next().
            should('match', 'blockquote').
            should('contain', 'we wanted to test')
    })
})
