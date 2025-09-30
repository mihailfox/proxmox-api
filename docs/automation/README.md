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
  - `-- --base-url <url>` — target an alternate API viewer instance.
  - `-- --raw-output <path>` — override the persisted raw snapshot location.
  - `-- --ir-output <path>` — change the normalized IR output file.
  - `-- --openapi-dir <dir>` — redirect generated OpenAPI files.
  - `-- --basename <name>` — adjust the OpenAPI filename prefix.

## Fallback behaviour

- CI mode automatically falls back to the cached snapshot if a live scrape
  fails (for example when outbound network access is blocked). The subsequent
  normalization and OpenAPI generation steps still run, ensuring the pipeline
  validates the current artifacts end-to-end.
- Full mode propagates scrape failures and is intended for manual refreshes
  where connectivity issues should surface immediately.

## Verifying outputs

1. Run `npm run automation:pipeline -- --mode=full` locally to fetch the latest
   upstream data.
2. Inspect `tools/api-scraper/data/raw/proxmox-api-schema.json`,
   `tools/api-normalizer/data/ir/proxmox-api-ir.json`, and
   `docs/openapi/proxmox-ve.(json|yaml)` for changes.
3. Commit any updates together so the repository remains internally consistent.

## CI workflow

The `automation-pipeline` GitHub Actions workflow executes the pipeline in CI
mode, validates the OpenAPI output, and ensures lint/build/test commands all
pass. It fails when any generated artifact diverges from the committed state,
providing early visibility into upstream Proxmox documentation changes.
