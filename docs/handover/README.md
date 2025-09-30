# Proxmox API Tooling Handover Guide

This guide provides a full walkthrough for setting up, operating, validating, and releasing the
Proxmox API scraping and OpenAPI generation toolchain. It aggregates institutional knowledge from
the delivery tasks completed to date so new contributors can take ownership with confidence.

## 1. Audience and prerequisites

- **Audience**: Engineers and release managers responsible for maintaining the Proxmox API
  extraction pipeline.
- **Required tools**: Node.js 22+, npm 10+, Git, and a modern shell environment. Python 3 is
  optional for downstream validation tooling but not required for the core workflow.
- **Recommended packages**: Install Playwright browser binaries once per machine with
  `npx playwright install --with-deps` so local scrapes run without missing dependency errors.

## 2. Repository orientation

| Stage | Directory | Primary command | Output artifacts |
| --- | --- | --- | --- |
| Scrape | `tools/api-scraper/` | `npm run scraper:scrape` | `tools/api-scraper/data/raw/proxmox-api-schema.json` |
| Normalize | `tools/api-normalizer/` | `npm run normalizer:generate` | `tools/api-normalizer/data/ir/proxmox-api-ir.json` |
| OpenAPI emit | `tools/openapi-generator/` | `npm run openapi:generate` | `docs/openapi/proxmox-ve.{json,yaml}` |
| End-to-end pipeline | `tools/automation/` | `npm run automation:pipeline` | Updates all artifacts and logs QA summary |
| Regression QA | `tests/regression/` | `npm run test:regression` | Checksums + parity assertions |

Additional reference documents:

- [Automation pipeline overview](../automation/README.md)
- [QA regression checklist](../qa/regression-checklist.md)
- [Coding standards and review checklist](../contributing/coding-standards.md)

## 3. Environment setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Bootstrap Playwright (first run only)**

   ```bash
   npx playwright install --with-deps
   ```

3. **Verify linting and TypeScript builds**

   ```bash
   npm run lint
   npm run build
   ```

4. **Run the regression QA suite**

   ```bash
   npm run test:regression
   ```

These steps confirm the local environment matches CI expectations before you touch pipeline code or
refresh artifacts.

## 4. Operating the pipeline

### 4.1 Scrape the Proxmox API viewer

```bash
npm run scraper:scrape
```

- Writes a timestamped snapshot under `tools/api-scraper/data/raw/`.
- Use the `SCRAPER_BASE_URL` environment variable or the `-- --base-url <url>` flag to target a
  staging or air-gapped API viewer.
- Logs endpoint counts so you can quickly detect large upstream shifts.

### 4.2 Normalize scraped data

```bash
npm run normalizer:generate
```

- Reads the latest raw snapshot (override with `-- --input <path>`).
- Produces the intermediate representation (IR) JSON with normalized timestamps and checksums.
- Safe to re-run; it overwrites the destination file in place.

### 4.3 Generate OpenAPI documents

```bash
npm run openapi:generate
```

- Emits both JSON and YAML specs under `docs/openapi/`.
- Override the output directory, basename, or formats via CLI flags:
  - `-- --output <dir>`
  - `-- --basename <name>`
  - `-- --format json,yaml`

### 4.4 Run the automation pipeline

```bash
npm run automation:pipeline
```

- Default **CI mode** (`--mode=ci`) reuses cached artifacts, runs normalization + generation, and
  validates OpenAPI output with Swagger Parser.
- Use **full mode** for release refreshes:

  ```bash
  npm run automation:pipeline -- --mode=full
  ```

  - Forces a fresh Playwright scrape.
  - Honors additional flags such as `--base-url`, `--raw-output`, `--ir-output`, and
    `--openapi-dir` for staging scenarios.
- When `--mode=ci` is combined with flaky connectivity, pass `--fallback-to-cache` (default) to
  gracefully reuse the last committed snapshot.
- Review the tail of the pipeline log for the regression report summary (checksums, counts, parity).

## 5. QA and validation flow

Follow this cadence before merging or releasing updated artifacts:

1. `npm run lint`
2. `npm run build`
3. `npm run test:regression`
4. `npm run automation:pipeline` (CI mode) or `npm run automation:pipeline -- --mode=full`
5. Manual checks from the [regression checklist](../qa/regression-checklist.md):
   - Visual diff of raw snapshot, IR, and OpenAPI outputs.
   - Spot-check Playwright scrape coverage.
   - Run `npm run openapi:validate` for detailed schema diagnostics when needed.

## 6. Release and versioning process

1. **Prepare a fresh scrape**: `npm run automation:pipeline -- --mode=full`.
2. **Review diffs**: Confirm all generated artifacts reflect expected upstream changes.
3. **Update documentation**: Note the Proxmox API viewer date/build in commit messages or release
   notes if exposed by the upstream source.
4. **Tag consumer-facing releases**: When publishing downstream packages or specs, follow semantic
   versioning aligned with upstream Proxmox releases (e.g., `v8.3.0-openapi.1`).
5. **Changelog capture**: Record the pipeline commands executed, validation results, and manual
   verification outcomes in the task-specific changelog under `versions/`.
6. **QA sign-off**: Ensure the regression checklist items are checked (or deferred with rationale) in
   the pull request template before requesting review.

### 6.1 Private GitHub Action releases

- Trigger the `private-action-release` workflow via the GitHub UI when the action or automation
  tooling changes. Provide a semantic tag (for example `v0.2.0`) to create a stable release; omit the
  tag for prerelease builds tied to the current commit SHA.
- The workflow validates linting/builds, performs a CI-mode pipeline smoke test, and uploads
  `proxmox-openapi-action.tgz` containing the composite action and automation sources.
- Downstream repositories can pin to specific tags or prereleases depending on stability
  requirements.

## 7. Troubleshooting guide

| Symptom | Likely cause | Resolution |
| --- | --- | --- |
| `playwright` fails with missing dependencies | Chromium binaries not installed | Run `npx playwright install --with-deps` and retry. |
| `Scraper execution failed: net::ERR_FAILED` | Network blocked or API viewer offline | Re-run with `--mode=ci` to reuse cached snapshot, or provide an alternate `--base-url`. |
| `Unable to read cached snapshot` error during pipeline | Missing baseline files after clean checkout | Run `npm run scraper:scrape` once to seed the snapshot, then rerun the pipeline. |
| Swagger Parser validation error | Generated OpenAPI violates schema constraints | Inspect the normalized IR for malformed data, rerun `npm run openapi:generate`, and address generator bugs before releasing. |
| Regression checksums drift unexpectedly | Upstream docs changed or local edits modified artifacts | Review git diffs, confirm upstream change, and regenerate all artifacts together. |

## 8. Handover checklist

- [ ] Dependencies installed and Playwright browsers provisioned.
- [ ] Pipeline commands practiced end-to-end (scrape → normalize → generate → validate).
- [ ] Regression suite executed with passing results.
- [ ] Release steps and changelog expectations understood.
- [ ] Troubleshooting matrix bookmarked for rapid response.

Mark each item as you gain confidence. Once all boxes are checked, you are ready to own the next
Proxmox API documentation refresh.
