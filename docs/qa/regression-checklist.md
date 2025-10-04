# Proxmox API QA Regression Checklist

This checklist enumerates the automated and manual verifications required before publishing Proxmox API tooling outputs.

## Automated coverage

1. **QA Regression Vitest suite** (`npm run regression:test`)
   - Verifies the SHA-256 checksum of cached raw snapshots, normalized IR, and OpenAPI artifacts.
   - Confirms normalized counts align with the raw snapshot metadata.
   - Asserts that JSON and YAML OpenAPI documents remain structurally identical.
2. **Automation pipeline summary** (`npm run automation:pipeline`)
   - Emits a QA regression summary highlighting artifact checksums, coverage counts, and parity indicators during CI and local runs.
   - When invoked with `-- --report <path>`, persists a JSON summary that downstream tooling can ingest for release notes or artifact uploads.

## Manual smoke tests

Perform the following validations whenever baselines are intentionally regenerated:

- [ ] **Visual diff review**: Inspect git diffs for `tools/api-scraper/data/raw/proxmox-api-schema.json`, `tools/api-normalizer/data/ir/proxmox-api-ir.json`, and the regenerated `var/openapi/proxmox-ve.{json,yaml}` artifacts to confirm expected upstream changes before uploading them to the release assets.
- [ ] **Playwright scrape spot check**: Run `npm run scraper:scrape` (with a clean cache) and confirm the resulting snapshot captures representative endpoints (e.g., `/nodes`, `/access`, `/cluster`).
- [ ] **OpenAPI validator**: Execute `npm run openapi:validate` and confirm no schema warnings are reported.
- [ ] **IR sampling**: Inspect a handful of normalized endpoints in `tools/api-normalizer/data/ir/proxmox-api-ir.json` to confirm security metadata and schema flags were preserved.
- [ ] **Documentation sync**: Ensure the GitHub release assets include the refreshed `proxmox-ve.json` (and optional YAML) so downstream consumers receive the latest schema, and update references if version numbers change. Attach `var/reports/automation-summary.json` (or the exported workflow artifact) and paste the generated Markdown snippet into the "Automation summary" section of the task changelog.

## Escalation guidance

- Unexpected checksum failures usually indicate upstream documentation changes. Review the automation pipeline logs for failing artifacts and regenerate baselines only after manual confirmation.
- If the OpenAPI validator fails, prioritize resolving structural issues in the generator before updating baselines.
- Record investigation details and outcomes in the task-specific changelog under `versions/`.
