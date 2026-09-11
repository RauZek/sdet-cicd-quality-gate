/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginAsStandardUser(): Chainable<void>;
    addProductToCart(productName: string): Chainable<void>;
  }
}