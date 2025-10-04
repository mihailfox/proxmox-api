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
   The pipeline also supports:

   - `-- --offline` to skip the live scrape and reuse the cached snapshot when reviewing historical
     artifacts.
   - `-- --fallback-to-cache=false` (or `-- --no-fallback-to-cache`) to surface scrape failures immediately in full mode instead of silently reusing the cache.
   - `-- --report <path>` to persist a JSON summary describing the raw snapshot, IR, OpenAPI outputs,
     and cache usage.

   Target alternate viewers by setting `SCRAPER_BASE_URL` or passing
   `-- --base-url=<https://staging.example/...>` to `npm run scraper:scrape`.

Refer to the [handover guide](docs/handover/README.md) for deeper documentation covering setup,
manual QA, release planning, and troubleshooting.

## Tooling layout

- `tools/api-scraper/` contains the Playwright-based scraping toolkit.
  - `playwright.config.ts` defines the Playwright test runner configuration.
  - `tests/` currently includes the end-to-end smoke spec and a CLI option parser check; deeper regression coverage is deferred.
  - `src/cli.ts` provides the `npm run scraper:scrape` entry point.
- `tools/api-normalizer/` houses the IR builder that transforms raw snapshots into a deterministic
  intermediate representation consumed by the generator.
- `tools/openapi-generator/` maps the normalized IR to OpenAPI 3.1 JSON and YAML artifacts.
- `tools/automation/` orchestrates the scrape → normalize → emit workflow and includes the
  `npm run automation:pipeline` CLI plus regression logging helpers.
- `tools/shared/` and `tools/analysis/` host cross-cutting utilities (path resolution, regression
  summaries) and research scripts for parity validation against upstream Perl modules.
- `tools/scripts/` provides supporting automation (for example, release version bumps and Proxmox
  metadata fetchers) consumed by GitHub workflows.
- `tests/regression/` implements checksum and parity assertions for generated artifacts.
- `.github/actions/proxmox-openapi-artifacts/` contains the private TypeScript action that wraps the
  automation pipeline for downstream repositories.
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
