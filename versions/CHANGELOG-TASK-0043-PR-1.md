# TASK-0043 ESM action workspace migration (rev 1)

## Summary
- Converted the private action workspace to native ESM with NodeNext TypeScript settings, dual CJS/ESM bundles, and a Node 20 entrypoint so both GitHub runners and local tooling can execute the action. 【F:.github/actions/proxmox-openapi-artifacts/package.json†L1-L36】【F:.github/actions/proxmox-openapi-artifacts/tsconfig.json†L1-L16】【F:.github/actions/proxmox-openapi-artifacts/action.yml†L50-L69】
- Hardened shared repository path helpers to fall back to the GitHub workspace when `import.meta` is unavailable, keeping bundled CommonJS outputs functional. 【F:tools/shared/paths.ts†L1-L33】
- Swapped JSON import assertions for NodeNext attributes and added a release workflow check to parse both bundles under Node 20. 【F:tools/automation/src/regression/baselines.ts†L1-L45】【F:tools/api-normalizer/tests/normalizer.spec.ts†L1-L70】【F:.github/workflows/private-action-release.yml†L32-L51】

## Command log
- `npm ci` 【69da7b†L1-L7】
- `npm run lint` 【fade2e†L1-L7】
- `npm run build` 【06173d†L1-L6】
- `npm run test:normalizer` 【ee16f0†L1-L6】【2eef78†L1-L28】
- `npm run test:openapi` 【321dd7†L1-L6】【a89af4†L1-L32】
- `npm run test:ui` 【d32fda†L1-L6】【50e200†L1-L34】
- `npm run test:regression` 【194ef8†L1-L8】【5ff5eb†L1-L20】
- `npm test` 【fd1ebf†L1-L5】【718470†L1-L9】
