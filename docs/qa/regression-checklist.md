# Proxmox API QA Regression Checklist

This checklist enumerates the automated and manual verifications required before publishing Proxmox API tooling outputs.

## Automated coverage

1. **QA Regression Vitest suite** (`npm run test:regression`)
   - Verifies the SHA-256 checksum of cached raw snapshots, normalized IR, and OpenAPI artifacts.
   - Confirms normalized counts align with the raw snapshot metadata.
   - Asserts that JSON and YAML OpenAPI documents remain structurally identical.
2. **Automation pipeline summary** (`npm run automation:pipeline`)
   - Emits a QA regression summary highlighting artifact checksums, coverage counts, and parity indicators during CI and local runs.

## Manual smoke tests

Perform the following validations whenever baselines are intentionally regenerated:

- [ ] **Visual diff review**: Inspect git diffs for `tools/api-scraper/data/raw/proxmox-api-schema.json`, `tools/api-normalizer/data/ir/proxmox-api-ir.json`, and `docs/openapi/proxmox-ve.{json,yaml}` to confirm expected upstream changes.
- [ ] **Playwright scrape spot check**: Run `npm run scraper:scrape` (with a clean cache) and confirm the resulting snapshot captures representative endpoints (e.g., `/nodes`, `/access`, `/cluster`).
- [ ] **OpenAPI validator**: Execute `npm run openapi:validate` and confirm no schema warnings are reported.
- [ ] **IR sampling**: Inspect a handful of normalized endpoints in `tools/api-normalizer/data/ir/proxmox-api-ir.json` to confirm security metadata and schema flags were preserved.
- [ ] **Documentation sync**: Ensure `docs/openapi/` artifacts mirror the latest pipeline outputs and update downstream consumers if version numbers change.

## Escalation guidance

- Unexpected checksum failures usually indicate upstream documentation changes. Review the automation pipeline logs for failing artifacts and regenerate baselines only after manual confirmation.
- If the OpenAPI validator fails, prioritize resolving structural issues in the generator before updating baselines.
- Record investigation details and outcomes in the task-specific changelog (`versions/CHANGELOG-TASK-0007-*.md`).
