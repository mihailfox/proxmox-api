# TASK-0007 QA regression safeguards

## Summary
- Added regression artifact baselines and checksum enforcement shared between automation and tests.
- Extended automation pipeline output with QA regression reporting and introduced a dedicated vitest suite.
- Documented manual QA checklist covering baseline review, scraping validation, and OpenAPI verification.

## Detailed log
- Reviewed existing vitest suites under `tools/api-scraper`, `tools/api-normalizer`, and `tools/openapi-generator` to inventory coverage gaps.
- Defined checksum baselines for cached raw snapshot, normalized IR, and generated OpenAPI artifacts.
- Implemented shared regression helpers in `tools/automation/src/regression` for checksum validation and parity reporting.
- Created `tests/regression/artifacts.spec.ts` with vitest to assert artifact integrity and cross-stage parity (raw snapshot ⇄ IR ⇄ OpenAPI).
- Updated `tools/automation/src/pipeline.ts` to emit a QA regression summary during CI and local runs.
- Registered the regression suite via `npm run test:regression` and wired it into the automation workflow.
- Authored `docs/qa/regression-checklist.md` to capture manual smoke steps and escalation guidance.
- Adjusted Biome configuration to exclude generated OpenAPI assets from linting noise.

## Verification
- `npm ci`
- `npm run lint`
- `npm run build`
- `npm run test:normalizer`
- `npm run test:openapi`
- `CI=1 npm run test:ui`
- `npm run test:regression`
