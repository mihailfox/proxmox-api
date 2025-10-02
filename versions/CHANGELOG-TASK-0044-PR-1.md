# TASK-0044 Remove bundled dist artifacts from action workspace (rev 1)

## Summary
- Converted the private action to a composite workflow that installs dependencies with `npm ci` and executes `src/main.ts` via `tsx`, eliminating the committed `dist/` bundle while updating workspace scripts accordingly. 【F:.github/actions/proxmox-openapi-artifacts/action.yml†L1-L86】【F:.github/actions/proxmox-openapi-artifacts/package.json†L1-L32】【F:.gitignore†L1-L12】
- Adjusted release automation and documentation to package the action sources and lockfile, emphasise lint/typecheck validation, and describe the on-demand runtime model. 【F:.github/workflows/private-action-release.yml†L1-L73】【F:docs/automation/private-action-adoption.md†L30-L61】【F:docs/handover/README.md†L149-L166】【F:docs/automation/README.md†L68-L91】
- Realigned action planning tasks and guidance to reflect the tsx execution strategy and removal of `dist/` expectations. 【F:plan/private-action-release-dist-sync.md†L1-L55】【F:plan/private-github-action-plan.md†L58-L181】【F:tasks/TASK-0022-github-action-package.md†L10-L28】【F:tasks/TASK-0023-github-action-release.md†L10-L28】【F:tasks/TASK-0024-github-action-adoption.md†L10-L22】【F:tasks/TASK-0037-action-dist-refresh.md†L10-L18】

## Command log
- `npm install --prefix .github/actions/proxmox-openapi-artifacts` 【f7205e†L1-L1】【6976fe†L1-L7】
- `npm run action:install` 【13ae7d†L1-L6】【42ff1a†L1-L7】
- `npm run action:package` 【691f77†L1-L10】【ccfdb2†L1-L4】
- `npm install` 【a14eef†L1-L1】【cdf074†L1-L7】
- `npm run lint` 【00e358†L1-L6】
- `npm run build` 【5747fa†L1-L6】
- `npm run test:normalizer` 【a870a9†L1-L5】【5d3825†L1-L26】
- `npm run test:openapi` 【1c3e59†L1-L5】【a0ecd9†L1-L28】
- `npm run test:ui` 【3758bb†L1-L5】【f018ce†L1-L20】【f7d9dd†L1-L28】
- `npm run test:regression` 【11ea98†L1-L5】【ff3bfb†L1-L20】【3752bd†L1-L24】【00a8f9†L1-L12】【5448af†L1-L31】【87ca2a†L1-L21】
- `npm test` 【02832c†L1-L5】【e52c33†L1-L6】【3c630f†L1-L4】
