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
| OpenAPI emit | `tools/openapi-generator/` | `npm run openapi:generate` | `var/openapi/proxmox-ve.{json,yaml}` |
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
- Use the `SCRAPER_BASE_URL` environment variable to target a staging or air-gapped API viewer.
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

- Emits both JSON and YAML specs under `var/openapi/`.
- Override the output directory, basename, or formats via CLI flags:
  - `-- --output <dir>`
  - `-- --basename <name>`
  - `-- --format json,yaml`

### 4.4 Run the automation pipeline

```bash
npm run automation:pipeline
```

- Default **CI mode** (`--mode=ci`) reuses cached artifacts, runs normalization + generation, and
  validates OpenAPI output with Swagger Parser. CI mode automatically sets `--offline` and
  `--fallback-to-cache` so the pipeline succeeds when the upstream viewer is unreachable.
- Use **full mode** for release refreshes:

  ```bash
  npm run automation:pipeline -- --mode=full
  ```

  - Forces a fresh Playwright scrape.
  - Honors additional flags such as `-- --base-url`, `-- --raw-output`, `-- --ir-output`, and
    `-- --openapi-dir` for staging scenarios.
  - Toggle `-- --offline` explicitly when you need the full pipeline without hitting the network in
    full mode (for example, reviewing historic artifacts offline).
  - Use `-- --fallback-to-cache=false` in full mode to surface scrape failures immediately instead of
    silently reusing the previous snapshot.
  - Append `-- --report var/reports/automation-summary.json` to emit a JSON summary documenting
    input/output paths and cache usage for audit trails or downstream automation.
- Review the tail of the pipeline log for the regression report summary (checksums, counts, parity).
- Generated OpenAPI files live in `var/openapi/`. Upload `proxmox-ve.json` (and optional YAML) to the
  GitHub release assets so downstream consumers can download the spec without cloning the repo.

## 5. QA and validation flow

Follow this cadence before merging or releasing updated artifacts:

1. `npm run lint`
2. `npm run build`
3. `npm run test:regression`
4. `npm run automation:pipeline` (CI mode) or `npm run automation:pipeline -- --mode=full -- --report var/reports/automation-summary.json`
5. Generate the Markdown changelog snippet with `npm run automation:summary -- --input var/reports/automation-summary.json` and store the JSON file for release assets.
6. Manual checks from the [regression checklist](../qa/regression-checklist.md):
   - Visual diff of raw snapshot, IR, and OpenAPI outputs.
   - Spot-check Playwright scrape coverage.
   - Run `npm run openapi:validate` for detailed schema diagnostics when needed.

## 6. Release and versioning process

1. **Prepare a fresh scrape**: `npm run automation:pipeline -- --mode=full`.
2. **Review diffs**: Confirm all generated artifacts reflect expected upstream changes.
3. **Update documentation**: Note the Proxmox API viewer date/build in commit messages or release
   notes if exposed by the upstream source.
4. **Tag consumer-facing releases**: When publishing downstream packages or specs, follow semantic
   versioning aligned with upstream Proxmox releases (e.g., `v8.3.0-openapi.1`). The
   `private-action-release` workflow automatically increments the patch component when no explicit
   version is supplied; provide the `version` input on manual runs to override the computed tag or to
   cut prereleases (for example `v9.0.0-rc.1`).
5. **Changelog capture**: Record the pipeline commands executed, validation results, and manual
   verification outcomes in the task-specific changelog under `versions/`, including an "Automation
   summary" section generated via `npm run automation:summary -- --input var/reports/automation-summary.json`. Start from
   `versions/CHANGELOG-template.md` and link to the stored JSON summary or uploaded release asset
   for auditors.
6. **QA sign-off**: Ensure the regression checklist items are checked (or deferred with rationale) in
   the pull request template before requesting review.

### 6.1 Private GitHub Action releases

- Trigger the `private-action-release` workflow via the GitHub UI when the action or automation
  tooling changes. Provide a semantic tag (for example `v0.3.0`) to force a specific release number;
  omit the input to let the workflow bump the previous `vX.Y.Z` tag automatically. Supply the
  optional **Release items** field (comma or semicolon delimited, e.g. `TASK-0050;ISSUE-0002`) to
  explicitly control which `versions/CHANGELOG-*` entries appear in the GitHub release body when
  running the workflow manually.
- The workflow assembles the "Summary" sections from the resolved changelog entries and publishes
  them as the only release body content (replacing GitHub's default "What's changed"/"Full
  Changelog" blocks). When no release items are supplied—such as the automatic `push` trigger on
  `main` or future `release/` branches—the helper selects every `versions/CHANGELOG-*` file touched
  since the previous semantic tag so release notes stay aligned with the shipped commits.
- The workflow validates linting/builds and publishes two releases from separate jobs:
  - `release_action` packages the TypeScript action workspace (`action.yml`, `src/`, `tsconfig.json`,
    `package.json`, `package-lock.json`) and tags the release with the resolved semantic version.
  - `release_schema` regenerates the OpenAPI artifacts in CI mode, detects the upstream Proxmox docs
    version from `https://pve.proxmox.com/pve-docs/`, and publishes a companion release tagged
    `schema-<version>-pve-<docsVersion>`. The job uploads both the zipped OpenAPI artifacts and a
    `pve-metadata.json` file capturing the upstream version and "Last updated" timestamp so consumers can
    audit the source state.
  The action archive ships the TypeScript sources and lockfile so runners install dependencies on demand
  before executing `src/main.ts` with `tsx`.
- Downstream repositories can pin to specific tags or prereleases depending on stability requirements.

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
