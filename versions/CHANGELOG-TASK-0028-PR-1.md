# TASK-0028 – Continue GitHub Action TypeScript migration (PR 1)

## Summary
- Replaced the composite Proxmox OpenAPI artifacts action with a bundled TypeScript implementation that imports the shared automation pipeline.
- Added an esbuild-based packaging toolchain, committed `dist/` artifacts, and wired release automation to verify and publish the bundle.
- Updated automation documentation, adoption guidance, and handover notes to describe the new action workflow and release packaging.

## Command log
- `npm install` – refreshed workspace dependencies before lint/build/test. 【6ae376†L1-L11】
- `npm run lint` – Biome lint with action `dist/` excluded via overrides. 【098ec0†L1-L7】
- `npm run build` – TypeScript project checks across root, app, and automation packages. 【8367c7†L1-L6】
- `npm run automation:pipeline -- --mode=ci --report tmp/cli-smoke.json` – CI-mode smoke verification with summary output (OpenAPI diffs expected because artifacts are unchanged). 【daa26d†L1-L6】【7b034f†L2-L6】【33376e†L1-L4】【7608b6†L1-L23】
- `npm install --prefix .github/actions/proxmox-openapi-artifacts` – installed action workspace dependencies for bundling. 【da0d26†L1-L9】
- `npm run package --prefix .github/actions/proxmox-openapi-artifacts` – typecheck and esbuild bundle for the TypeScript action. 【2f1e50†L1-L9】【0abfc7†L1-L11】

## Decisions and follow-ups
- Biome configuration now disables linting for committed bundle output while keeping repository-wide checks intact.
- Release workflow builds the action bundle in both validation and publishing jobs and fails when `dist/` or the lockfile drift.
- Functional QA remains deferred to a future staging run once the private action repository consumes the new TypeScript bundle.
