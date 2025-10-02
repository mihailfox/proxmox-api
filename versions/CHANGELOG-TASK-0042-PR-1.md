# TASK-0042 ESM migration phase 1 (rev 1)

## Summary
- Declared the workspace as ESM, switched TypeScript to NodeNext resolution, and introduced shared module helpers to replace `__dirname` usage across tooling. 【F:package.json†L1-L46】【F:tsconfig.json†L1-L21】【F:tools/shared/module-paths.ts†L1-L35】【F:tools/shared/paths.ts†L1-L16】
- Migrated CLI pipelines and regression harnesses to `tsx` execution with `.js` import specifiers, ensuring every tool runs under native ESM semantics. 【F:package.json†L11-L30】【F:tools/api-scraper/src/cli.ts†L1-L32】【F:tools/automation/src/pipeline.ts†L1-L71】【F:tools/openapi-generator/src/cli.ts†L1-L36】【F:tests/regression/helpers.ts†L1-L18】
- Updated documentation, tests, and JSON loaders to reflect the new runtime (`tsx`) and satisfy NodeNext import assertions. 【F:docs/research/pvesh-vs-scrape.md†L10-L22】【F:tools/analysis/src/pvesh-comparison.ts†L93-L105】【F:tools/api-normalizer/tests/normalizer.spec.ts†L1-L6】【F:tools/automation/src/regression/baselines.ts†L1-L6】【F:tools/api-scraper/README.md†L24-L30】【F:docs/automation/private-action-adoption.md†L44-L48】

## Command log
- `npm install` 【232afe†L1-L7】
- `npm run lint` 【5601e9†L1-L7】
- `npm run build` 【02e910†L1-L6】
- `npm run test:normalizer` 【5bc7c3†L1-L6】【843885†L1-L28】
- `npm run test:openapi` 【e28c70†L1-L6】【6db331†L1-L32】
- `npm run test:ui` 【a9ddd7†L1-L5】【163147†L1-L34】
- `npm run test:regression` 【dc5f53†L1-L6】【0c0fbf†L1-L44】
- `npm test` 【b959ff†L1-L6】【73d477†L1-L4】
