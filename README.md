# proxmox-api

This repository contains tooling to scrape the [Proxmox VE API viewer](https://pve.proxmox.com/pve-docs/api-viewer/) and convert the captured data into OpenAPI specifications.

## Getting started

1. Install dependencies (Node.js 22 or newer is required):

   ```bash
   npm install
   ```

2. Run the Playwright smoke test to verify connectivity with the Proxmox API viewer:

   ```bash
   npm test
   ```

3. Execute the prototype scraper entry point:

   ```bash
   npm run scraper:scrape
   ```

## Tooling layout

- `tools/api-scraper/` contains the Playwright-based scraping toolkit.
  - `playwright.config.ts` defines the Playwright test runner configuration.
  - `tests/` holds smoke and regression tests for the scraper.
  - `src/cli.ts` is a placeholder CLI entry point that will evolve into the end-to-end scraping workflow.
- `ui/` contains a Vite-powered sandbox for rapid UI prototyping and component experimentation.
  - `npm run ui:dev` starts the Vite development server.
  - `npm run ui:build` produces a production-ready bundle in `dist/ui`.
  - `npm run test:ui` executes Vitest unit tests with jsdom.

## Linting

Run Biome against the tooling sources:

```bash
npm run lint
```

To apply automatic formatting fixes:

```bash
npm run format
```
