export class LoginPage {
  visit(): void {
    cy.visit('/');
  }

  login(username: string, password: string): void {
    cy.get('[data-test="username"]').clear().type(username);
    cy.get('[data-test="password"]').clear().type(password);
    cy.get('[data-test="login-button"]').click();
  }
}