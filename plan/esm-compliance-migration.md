# ESM Compliance Migration Plan

## Overview
This document captures the findings from the TASK-0041 assessment of the repository's ECMAScript Module (ESM) posture and outlines the steps required to move the workspace, tooling, and supporting GitHub Action toward first-class ESM compatibility.

## Current state assessment
- The root `package.json` does not declare a module type, keeping Node.js execution in CommonJS mode and running CLIs through `ts-node` directly. 【F:package.json†L1-L41】
- The root TypeScript configuration targets CommonJS (`"module": "commonjs"`) for all shared tooling, which prevents native ESM output. 【F:tsconfig.json†L1-L20】
- CLI entrypoints rely on CommonJS-only globals such as `__dirname` and `require.main`, and ship with `#!/usr/bin/env ts-node` shebangs that bypass Node's native module loader. 【F:tools/api-scraper/src/cli.ts†L1-L31】【F:tools/shared/paths.ts†L1-L16】【F:tools/api-normalizer/src/cli.ts†L1-L39】
- The private GitHub Action workspace targets CommonJS in its TypeScript compiler settings and bundles with esbuild into a CJS artifact, so its source code is not yet authored as native ESM. 【F:.github/actions/proxmox-openapi-artifacts/tsconfig.json†L1-L15】
- Test and build tooling (Vite, Vitest, Remix) are already ESM-friendly, but depend on the shared configuration emitting CommonJS, which complicates cross-environment consistency. 【F:app/tsconfig.json†L1-L20】【F:vitest.config.ts†L1-L16】

## Gaps blocking ESM adoption
1. **Package format** – Without `"type": "module"`, Node treats project scripts as CommonJS. Adding this field will require aligning all compiled outputs and dependencies with ESM expectations.
2. **Compiler settings** – `tsconfig.json` uses CommonJS/Node resolution. Migrating to `module: "NodeNext"` (or `ESNext` with bundler resolution) demands updates to import specifiers and type resolution.
3. **Runtime constructs** – Scripts employ `__dirname` and `require.main`, both unavailable in ESM. They must be replaced with `fileURLToPath(import.meta.url)` helpers and `import.meta.main` equivalents.
4. **Execution tooling** – `ts-node`'s CommonJS-oriented entrypoints should be replaced with `tsx`, `ts-node --esm`, or precompiled outputs to ensure parity with the new module system.
5. **GitHub Action packaging** – The action's bundler needs to transpile from ESM sources while still delivering the CommonJS bundle that GitHub Actions currently expects, or we must confirm Node 20 action runtime support for native ESM bundles.

## Migration plan
1. **Bootstrap ESM helpers**
   - Introduce a shared utility (e.g., `tools/shared/module-paths.ts`) that converts `import.meta.url` to filesystem paths, replacing direct `__dirname` usage across tooling packages.
   - Add unit coverage to confirm path helpers resolve correctly from tests.

2. **Switch execution tooling**
   - Replace `ts-node` invocations in npm scripts with `tsx` (preferred) or configure `ts-node --esm` loader scripts.
   - Update CLI shebangs to `#!/usr/bin/env node` and call compiled outputs or `tsx` for local execution.

3. **Update TypeScript configurations**
   - Set the root `tsconfig.json` to `"module": "NodeNext"` and `"moduleResolution": "nodenext"`, enabling dual ESM/CJS typings.
   - Ensure secondary `tsconfig` files (automation, action workspace) extend the new settings or override with `NodeNext` as appropriate.
   - Audit path imports to guarantee explicit file extensions where required by NodeNext.

4. **Adopt ESM package semantics**
   - Add `"type": "module"` to the root `package.json` and adjust relative imports (e.g., ensure `.js` extensions in emitted code or configure TypeScript's `allowImportingTsExtensions`).
   - Confirm Vitest, Playwright, and Remix build pipelines continue to function under ESM by running the full acceptance suite.

5. **Refine GitHub Action build**
   - Author the action's source as ESM and configure esbuild to output both ESM and CJS bundles if GitHub marketplace compatibility is required, defaulting to CJS for the published artifact.
   - Validate the action in a dry-run workflow to confirm Node 20 runner compatibility.

6. **Incremental rollout**
   - Migrate one CLI package at a time (scraper → normalizer → openapi generator → automation pipeline), validating each step with existing regression tests.
   - Update documentation (README, task checklists) to note ESM requirements and new execution commands.

7. **Monitoring and follow-up**
   - Add CI checks ensuring no CommonJS-only globals remain (Biome lint rule) and that scripts run under `node --experimental-policy` to catch invalid imports early.
   - Track downstream tooling (e.g., GitHub Action consumers) for regressions after the migration.

## Risks and mitigations
- **Third-party CommonJS dependencies** – Some libraries may not ship ESM entrypoints. Use dynamic `createRequire` imports or stay on CommonJS for those modules while wrapping them in ESM-friendly facades.
- **Action runtime constraints** – GitHub may continue to prefer CJS bundles. Maintain esbuild's CommonJS output until the hosted runners officially support pure ESM actions.
- **Local developer tooling** – Ensure documentation and scripts clearly explain any new requirements (Node 22+, `corepack` for pnpm if introduced, etc.) to avoid onboarding friction.

## Next steps
- Capture the above tasks in future work tickets and prioritize updating the scraper CLI (the most CommonJS-centric entrypoint) to validate the approach before touching the remaining tooling.
