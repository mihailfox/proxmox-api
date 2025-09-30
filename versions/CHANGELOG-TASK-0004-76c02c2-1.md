# TASK-0004 Normalization pipeline

## Key decisions
- Established a reusable intermediate representation (IR) schema that captures endpoint metadata, security flags, and schema
  constraints for downstream OpenAPI generation.
- Implemented a deterministic normalizer that hashes the raw snapshot, produces stable slugs/operationIds, and preserves nested
  parameter/response structures including metadata and permissions.
- Added a dedicated Vitest suite and Node CLI so contributors can validate transformations and regenerate the IR from fresh
  scraper outputs.

## Command log
- `npm install`
- `npm run normalizer:generate`
- `npm run lint`
- `npm run build`
- `npm run test:normalizer`

## Outcomes
- Committed `tools/api-normalizer/data/ir/proxmox-api-ir.json` as the canonical IR artifact aligned with the latest scraper
  snapshot.
- Documented usage in `tools/api-normalizer/README.md`, including custom input/output targets for regeneration.
- Introduced scripts and configuration updates (`package.json`, `tsconfig.json`, `biome.json`) so linting, builds, and tests
  cover the new pipeline by default.
