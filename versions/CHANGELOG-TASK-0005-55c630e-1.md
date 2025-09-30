# TASK-0005 OpenAPI generator

## Key decisions
- Added a dedicated OpenAPI generator that flattens the normalized IR into OpenAPI 3.1 paths, request bodies, and custom vendor extensions while preserving Proxmox-specific metadata.
- Produced both JSON and YAML artifacts plus a validator script using `@apidevtools/swagger-parser` to guarantee specification integrity during automation.
- Captured high-signal regression tests that exercise path parameters, query mapping, and authentication metadata to protect the generator contract.

## Command log
- `npm install`
- `npm run openapi:generate`
- `npm run openapi:validate`
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run test:normalizer`
- `npm run test:openapi`

## Outcomes
- Generated `docs/openapi/proxmox-ve.(json|yaml)` as deterministic artifacts sourced from the latest IR snapshot.
- Introduced `tools/openapi-generator` CLI, validation entry point, README, and Vitest suite covering core data transformations.
- Updated project scripts and TypeScript configuration so the new generator participates in standard lint/build/test workflows.
