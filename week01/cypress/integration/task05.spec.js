context('Task 5', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_05.html')
    })
    it('Implemented', () => {
    })
    it('Table Heading', () => {
        cy.get('thead').
            find('tr').
            should('have.length', 1).
            find('th').
            should('have.length', 8).
            eq(1).
            contains('Team')
    })
    it('Table Body', () => {
        cy.get('tbody').
            find('tr').
            should('have.length', 3).
            each(function(row, index) {
                cy.wrap(row).find('th').
                    should('have.length', 1).
                    contains(index + 1);
                cy.wrap(row).find('td').
                    should('have.length', 7)
            })
    })
})
