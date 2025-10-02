# TASK-0040 tooling consistency audit (rev 1)

## Summary
- Reviewed automation and action tooling and upgraded core dependencies to current stable releases (Remix 2.17, Vite 6.3, Vitest 3.2, TypeScript 5.7, Biome 2.2.5) while adding npm overrides to eliminate esbuild and PrismJS advisories. 【F:package.json†L11-L48】
- Updated the private action workflow to use shared npm scripts and refreshed the action workspace toolchain (TypeScript 5.7, esbuild 0.25). 【F:.github/workflows/private-action-release.yml†L35-L74】【F:.github/actions/proxmox-openapi-artifacts/package.json†L1-L25】
- Fixed Biome schema mismatch and resolved lint violations in the analysis tooling to keep the pipeline checks green. 【F:biome.json†L1-L39】【F:tools/analysis/src/pvesh-comparison.ts†L189-L238】

## Command log
- `npm outdated` to baseline upgrade requirements. 【87ff21†L1-L12】
- `npm audit` to identify vulnerabilities before upgrades. 【5f35bb†L1-L41】
- `npm install` after dependency updates to refresh the lockfile. 【a0acef†L1-L7】
- `npm install --prefix .github/actions/proxmox-openapi-artifacts` to sync the action workspace. 【36c87a†L1-L7】
- `npm run lint` after refactors to ensure static analysis passes. 【f16a1b†L1-L7】
- `npm test` to confirm Playwright smoke coverage on the upgraded stack. 【1cafaa†L1-L4】
- `npm run build` to verify TypeScript type-checking across workspaces. 【1f0c4c†L1-L5】
- `npm run test:normalizer`, `npm run test:openapi`, `npm run test:ui`, and `npm run test:regression` to validate pipelines and UI suites on the upgraded toolchain. 【335ff8†L1-L21】【7766ae†L1-L32】【8aa21b†L1-L24】【7d4fa5†L1-L21】
- `npm audit` (post-upgrade) to confirm the dependency tree is free of reported vulnerabilities. 【1c2ad6†L1-L3】
