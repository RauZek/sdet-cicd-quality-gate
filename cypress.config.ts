/// <reference types="node" />

import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.CYPRESS_BASE_URL || 'https://www.saucedemo.com';
const apiBaseUrl = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

function requireHttpUrl(value: string, name: string): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid HTTP(S) URL.`);
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${name} must use HTTP or HTTPS.`);
  }

  return value.replace(/\/$/, '');
}

const validatedBaseUrl = requireHttpUrl(baseUrl, 'CYPRESS_BASE_URL');
const validatedApiBaseUrl = requireHttpUrl(apiBaseUrl, 'API_BASE_URL');

export default defineConfig({
  e2e: {
    baseUrl: validatedBaseUrl,
    viewportHeight: 900,
    viewportWidth: 1440,
    testIsolation: true,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    allowCypressEnv: false,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  expose: {
    API_BASE_URL: validatedApiBaseUrl,
  },
});