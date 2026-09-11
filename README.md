# SDET CI/CD Quality Gate

[![CI Build Status](https://github.com/RauZek/sdet-cicd-quality-gate/actions/workflows/ci.yml/badge.svg)](https://github.com/RauZek/sdet-cicd-quality-gate/actions/workflows/ci.yml)
[![Cypress Version](https://img.shields.io/npm/v/cypress?label=Cypress)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

An anonymized, standalone quality engineering portfolio. It demonstrates browser E2E coverage against the public SauceDemo application and REST assertions against JSONPlaceholder. No private systems, credentials, proprietary selectors, or internal test data are required.

## One-command setup

```bash
git clone https://github.com/RauZek/sdet-cicd-quality-gate.git
cd sdet-cicd-quality-gate
npm ci && npm test
```

Run the interactive runner with `npm run cy:open` or execute the performance and accessibility gate with `npm run lighthouse`.

## Architecture

```text
sdet-cicd-quality-gate/
├── .github/workflows/ci.yml        Cypress and Lighthouse CI pipeline
├── cypress.config.ts               Cypress runtime policy and reporting
├── cypress/
│   ├── support/                    typed commands and global hooks
│   ├── pages/                      page object responsibilities
│   ├── fixtures/                   data-driven, non-secret inputs
│   └── e2e/
│       ├── ui/store.cy.ts          inventory, cart, and checkout behavior
│       └── api/posts.cy.ts         direct HTTP API contract testing
├── lighthouse.js                   performance and accessibility budgets
└── package.json                    reproducible test scripts and dependencies
```

The repository root contains the implementation and the GitHub Actions workflow. Configuration owns runtime policy, commands own repeatable workflows, page objects own UI intent, fixtures own scenario data, and specs describe business behavior. `strict` TypeScript catches command and contract drift before a browser run.

## Quality gates

The GitHub Actions workflow runs on pull requests and pushes to `main`. It executes Cypress in headless Chrome, runs Lighthouse CI against the public demo, and uploads screenshots, MP4 videos, Mochawesome HTML reports, and Lighthouse output even when a job fails.

Lighthouse CI blocks regressions below the configured performance, accessibility, and best-practice thresholds. The best-practices baseline is set to `0.75` because the audited public demo is third-party controlled; adjust it when auditing an owned application.

## Project scope

This repository focuses on Cypress and TypeScript test automation, Lighthouse CI quality budgets, Mochawesome reporting, and GitHub Actions execution. Pytest and PostHog are intentionally outside this repository because they are not required to run these public-demo tests.

## Configuration

Copy `.env.example` to `.env` only when changing the public defaults. `CYPRESS_BASE_URL` selects the UI target and `API_BASE_URL` selects the public API target; neither value contains private infrastructure.