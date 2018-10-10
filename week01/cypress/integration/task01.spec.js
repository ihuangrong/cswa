context('Task 1', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_01.html')
    })
    it('Attempted', () => {
    })
    it('Page title', () => {
        cy.get('title').contains('Test page')
    })
    it('Heading element', () => {
        cy.get('h1').contains('Test page')
    })
})
