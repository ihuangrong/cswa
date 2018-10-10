context('Task 8', () => {
    it('Test Click', () => {
        cy.visit('http://localhost:8080/task_08.html')
        cy.get('button').click()
        cy.get('p').contains('Shutting down')
    })
})
