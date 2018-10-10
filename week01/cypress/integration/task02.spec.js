context('Task 2', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_02.html')
    })
    it('Implemented', () => {
    })
    it('Has main heading', () => {
        cy.get('h1').contains('Computing')
    })
    it('Has three paragraphs', () => {
        cy.get('p').should('have.length', 3)
    })
})
