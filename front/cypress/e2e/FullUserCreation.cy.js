/// <reference types="cypress" />

context('Full user creation and roaming', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    })

    it('can login with google', () => {
        cy.setCookie('next-auth.session-token', Cypress.env('token'));
        cy.setCookie('next-auth.callback-url', Cypress.env('callback'));
        cy.setCookie('next-auth.csrf-token', Cypress.env('csrf'));
        cy.visit('localhost:3000/home');
    })
})