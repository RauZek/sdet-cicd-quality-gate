export class CheckoutPage {
  openCart(): void {
    cy.get('[data-test="shopping-cart-link"]').click();
  }

  startCheckout(): void {
    cy.get('[data-test="checkout"]').click();
  }

  complete(firstName: string, lastName: string, postalCode: string): void {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
  }

  assertReviewContains(productNames: string[]): void {
    cy.url().should('include', '/checkout-step-two.html');
    productNames.forEach((productName) => {
      cy.get('[data-test="cart-list"]').should('contain.text', productName);
    });
    cy.get('[data-test="total-label"]').should('contain.text', 'Total');
  }

  finish(): void {
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="complete-header"]').should('contain.text', 'Thank you');
  }
}