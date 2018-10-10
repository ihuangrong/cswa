context('Task 7', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/task_07.html')
    })
    it('Heading size', () => {
        cy.get('h1').
            should('have.css', 'font-size', '24px')
    })
    it('Current Nav element', () => {
        cy.get('nav li.current').
            should('have.css', 'font-weight', '700')
    })
    it('Even-numbered li elements', () => {
        cy.get('article ul').
            each((list) => {
                cy.wrap(list).find('li').
                    each((item, idx) => {
                        if((idx + 1) % 2 === 0) {
                            cy.wrap(item).
                                should('have.css', 'background-color', 'rgb(128, 128, 128)')
                        }
                    })
            })
    })
})
