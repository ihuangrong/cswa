context('Task 6', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_06.html')
    })
    it('Implemented', () => {
    })
    it('Strong emphasis', () => {
        cy.get('strong').contains('enumerably infinite set')
    })
    it('Deleted element', () => {
        cy.get('del').contains('that')
    })
    it('Weak emphasis', () => {
        cy.get('em').first().
            contains('arbitrary')
        cy.get('em').
            should('have.length', 5)
    })
})
