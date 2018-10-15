context('Task 10', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_10.html')
    })
    it('Initial state', () => {
        cy.get('li a').
            each((item, idx) => {
                if(idx === 0) {
                    cy.wrap(item).should('have.css', 'font-weight', '700')
                } else {
                    cy.wrap(item).should('have.css', 'font-weight', '400')
                }
            })
        cy.get('div').
            each((item, idx) => {
                if(idx === 0) {
                    cy.wrap(item).should('be.visible')
                } else {
                    cy.wrap(item).should('not.be.visible')
                }
            })
    })
    it('Click test', () => {
        cy.get('a').eq(2).click()
        cy.get('a').eq(0).
            should('have.attr', 'aria-current', 'false')
        cy.get('a').eq(2).
            should('have.attr', 'aria-current', 'true')
        cy.get('div').eq(0).
            should('not.be.visible')
        cy.get('div').eq(2).
            should('be.visible')
    })
    it('Keyboard navigation', () => {
        cy.get('*[tabindex="0"]').focus().type('{rightarrow} ')
        cy.focused().
            contains('Tab 2')
        cy.get('a').eq(0).
            should('have.attr', 'aria-current', 'false')
        cy.get('a').eq(1).
            should('have.attr', 'aria-current', 'true')
        cy.get('div').eq(0).
            should('not.be.visible')
        cy.get('div').eq(1).
            should('be.visible')
        cy.focused().type('{rightarrow} ')
        cy.focused().type('{leftarrow} ')
        cy.focused().type('{leftarrow} ')
        cy.focused().
            contains('Tab 1')
        cy.get('a').eq(0).
            should('have.attr', 'aria-current', 'true')
        cy.get('a').eq(1).
            should('have.attr', 'aria-current', 'false')
        cy.get('a').eq(1).
            should('have.attr', 'aria-current', 'false')
        cy.get('div').eq(0).
            should('be.visible')
        cy.get('div').eq(1).
            should('not.be.visible')
        cy.get('div').eq(2).
            should('not.be.visible')
    })
})
