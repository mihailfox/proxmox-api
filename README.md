# proxmox-api

This repository contains tooling to scrape the [Proxmox VE API viewer](https://pve.proxmox.com/pve-docs/api-viewer/) and convert the captured data into OpenAPI specifications.

## Quickstart

1. Install dependencies (Node.js 22 or newer is required):

   ```bash
   npm install
   npx playwright install --with-deps
   ```

2. Validate the environment:

   ```bash
   npm run lint
   npm run build
   npm run test:regression
   ```

3. Regenerate artifacts end to end:

   ```bash
   npm run automation:pipeline -- --mode=full
   ```

   This command scrapes the upstream documentation, normalizes the snapshot, generates JSON/YAML
   OpenAPI documents, and validates the output. For cached CI parity, drop the `--mode=full` flag.

Refer to the [handover guide](docs/handover/README.md) for deeper documentation covering setup,
manual QA, release planning, and troubleshooting.

## Tooling layout

- `tools/api-scraper/` contains the Playwright-based scraping toolkit.
  - `playwright.config.ts` defines the Playwright test runner configuration.
  - `tests/` holds smoke and regression tests for the scraper.
  - `src/cli.ts` is a placeholder CLI entry point that will evolve into the end-to-end scraping workflow.
- `app/` contains a Remix + Vite sandbox for rapid UI prototyping and component experimentation.
  - `npm run ui:dev` starts the Remix-enhanced Vite development server.
  - `npm run ui:build` compiles the Remix client and server bundles into `build/`.
  - `npm run ui:preview` starts the Remix preview server backed by the production build output.
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

## Contributing

Review the [coding standards](docs/contributing/coding-standards.md) before opening a pull request.
They document TypeScript style expectations, Playwright testing requirements, and the review
checklist that must be included in each PR.
