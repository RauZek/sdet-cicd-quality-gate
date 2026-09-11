import users from '../fixtures/users.json';
import { LoginPage } from '../pages/login';

Cypress.Commands.add('loginAsStandardUser', () => {
  const loginPage = new LoginPage();
  loginPage.visit();
  loginPage.login(users.standard.username, users.standard.password);
  cy.url().should('include', '/inventory');
});

Cypress.Commands.add('addProductToCart', (productName: string) => {
  cy.contains('[data-test="inventory-item"]', productName)
    .should('be.visible')
    .find('button')
    .click();
});