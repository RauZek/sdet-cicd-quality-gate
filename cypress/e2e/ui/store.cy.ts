import products from '../../fixtures/products.json';
import { CheckoutPage } from '../../pages/checkout';
import { InventoryPage } from '../../pages/inventory';

describe('SauceDemo shopping flow', () => {
  const inventoryPage = new InventoryPage();
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.loginAsStandardUser();
    inventoryPage.assertLoaded();
  });

  it('sorts the dynamic inventory table by price', () => {
    inventoryPage.assertLoaded();
    inventoryPage.sortBy('lohi');
    inventoryPage.assertProductsAreSortedByPriceAscending();
  });

  it('completes a multi-step cart and checkout flow', () => {
    cy.addProductToCart(products.backpack);
    cy.addProductToCart(products.bikeLight);
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', String(products.expectedCartCount));

    checkoutPage.openCart();
    cy.get('[data-test="cart-list"]').should('contain.text', products.backpack).and('contain.text', products.bikeLight);
    checkoutPage.startCheckout();
    checkoutPage.complete('Public', 'Portfolio', '10001');
    checkoutPage.assertReviewContains([products.backpack, products.bikeLight]);
    checkoutPage.finish();
  });
});