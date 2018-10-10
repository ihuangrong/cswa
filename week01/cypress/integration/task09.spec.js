context('Task 9', () => {
    it('Login', () => {
        cy.visit('http://localhost:8080/task_09.html')
        cy.get('form').
            should('be.visible')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=password]').type('password')
        cy.get('button').click()
        cy.get('form').
            should('not.be.visible')
    })
})
