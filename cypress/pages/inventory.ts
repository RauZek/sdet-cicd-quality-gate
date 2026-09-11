export class InventoryPage {
  assertLoaded(): void {
    cy.url().should('include', '/inventory');
    cy.get('[data-test="inventory-container"]').should('be.visible');
  }

  sortBy(option: 'az' | 'lohi' | 'hilo'): void {
    cy.get('[data-test="product-sort-container"]').select(option);
  }

  assertProductsAreSortedByPriceAscending(): void {
    cy.get('[data-test="inventory-item-price"]')
      .then(($prices) => [...$prices].map((price) => Number(price.innerText.replace('$', ''))))
      .should((prices) => expect(prices).to.deep.equal([...prices].sort((a, b) => a - b)));
  }
}