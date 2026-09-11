import './commands';
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', (error) => {
  if (error.message.includes('ResizeObserver loop')) {
    return false;
  }
  return true;
});