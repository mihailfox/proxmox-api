# Automation pipeline

The automation pipeline orchestrates the scrape → normalize → OpenAPI
workflow so both CI and local developers can regenerate artifacts in a single
step.

## Commands

- `npm run automation:pipeline`
  - Default **CI mode** loads the cached raw snapshot and regenerates the
    normalized IR plus OpenAPI JSON/YAML outputs. This keeps the workflow
    deterministic when network access to the public Proxmox docs is
    unavailable.
  - Pass `-- --mode=full` to force a fresh scrape against the Proxmox API
    viewer. Use this when you need to update the committed artifacts after the
    upstream documentation changes.
- Additional options:
  - `-- --base-url <url>` — target an alternate API viewer instance (or set `SCRAPER_BASE_URL`).
  - `-- --raw-output <path>` — override the persisted raw snapshot location.
  - `-- --ir-output <path>` — change the normalized IR output file.
  - `-- --openapi-dir <dir>` — redirect generated OpenAPI files (default `var/openapi/`).
  - `-- --basename <name>` — adjust the OpenAPI filename prefix.
  - `-- --offline` — skip the live scrape and reuse the cached snapshot.
  - `-- --fallback-to-cache=false` — propagate scrape failures instead of silently reusing the cache
    (helpful when diagnosing upstream outages).
  - `-- --report <path>` — write a JSON summary describing inputs, outputs, and cache usage for
    downstream automations.

## Fallback behaviour

- CI mode automatically falls back to the cached snapshot if a live scrape
  fails (for example when outbound network access is blocked). The subsequent
  normalization and OpenAPI generation steps still run, ensuring the pipeline
  validates the current artifacts end-to-end.
- Full mode propagates scrape failures and is intended for manual refreshes
  where connectivity issues should surface immediately.

## Verifying outputs

1. Run `npm run automation:pipeline -- --mode=full` locally to fetch the latest
   upstream data. Include `-- --report var/reports/automation-summary.json` when
   you need a machine-readable audit trail of the run and changelog snippet.
2. Inspect `tools/api-scraper/data/raw/proxmox-api-schema.json`,
   `tools/api-normalizer/data/ir/proxmox-api-ir.json`, and
   `var/openapi/proxmox-ve.(json|yaml)` for changes.
3. Upload refreshed specs to the release assets for the Proxmox API toolkit so consumers can fetch
   the latest schema without pulling from git.

## JSON summaries and automation entry point

- The CLI accepts `-- --report <path>` to write a JSON summary describing the raw
  snapshot, normalized IR, OpenAPI outputs, and cache usage. Standardize on
  `var/reports/automation-summary.json` so the formatter script and changelog
  templates have a predictable location.
- Run `npm run automation:summary -- --input var/reports/automation-summary.json`
  to convert the JSON payload into the Markdown block required for `versions/`
  changelog entries and release notes.
- The reusable `runAutomationPipeline` helper (exported from
  `tools/automation/src/pipeline.ts`) powers both the CLI and the private GitHub
  Action, ensuring all execution paths share the same option resolution and QA
  logging.

## Private GitHub Action usage

- TypeScript action location: `.github/actions/proxmox-openapi-artifacts`.

- Example workflow snippet:

  ```yaml
  jobs:
    generate-openapi:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - id: artifacts
          name: Generate artifacts
          uses: ./.github/actions/proxmox-openapi-artifacts
          with:
            mode: full
            install-playwright-browsers: true
        - name: Upload OpenAPI
          uses: actions/upload-artifact@v4
          with:
            name: proxmox-openapi
            path: |
              ${{ steps.artifacts.outputs.openapi-json }}
              ${{ steps.artifacts.outputs.openapi-yaml }}
              ${{ steps.artifacts.outputs.summary-path }}
  ```
- The action executes its TypeScript entrypoint with `tsx` at runtime. Run
  `npm install --prefix .github/actions/proxmox-openapi-artifacts` followed by
  `npm run action:package` to verify lint/typecheck results before committing
  workspace changes.
- Downstream repositories reference the action via a private checkout (e.g., a
  submodule or GitHub Actions `uses:` with organization-level access). Runners
  install the lightweight action dependencies on demand prior to execution.
- See [private-action-adoption.md](./private-action-adoption.md) for onboarding
  and sandbox validation guidance, including the TypeScript-based usage notes.

## CI workflow

The `automation-pipeline` GitHub Actions workflow executes the pipeline in CI
mode, validates the OpenAPI output, and ensures lint/build/test commands all
pass. It fails when any generated artifact diverges from the committed state,
providing early visibility into upstream Proxmox documentation changes.
