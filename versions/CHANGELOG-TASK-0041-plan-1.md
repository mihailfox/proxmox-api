# TASK-0041 ESM compliance assessment (rev 1)

## Summary
- Documented the current CommonJS constraints and the phased migration strategy toward full ESM support across tooling, automation, and the private GitHub Action. 【F:plan/esm-compliance-migration.md†L1-L56】
- Captured the assessment scope, completed review steps, and deferred implementation work in the TASK-0041 tracker. 【F:tasks/TASK-0041-esm-compliance-assessment.md†L1-L53】

## Command log
- `find .. -name AGENTS.md -print` to confirm whether repo-specific agent instructions exist. 【c655c2†L1-L2】
- `ls tasks` to inspect prior planning artifacts for continuity. 【89fc1c†L1-L2】
- `cat package.json` to review scripts and module settings that influence ESM compatibility. 【1a3c81†L1-L41】
- `cat tsconfig.json` to verify the compiler module target for shared tooling. 【330756†L1-L20】
- `cat app/tsconfig.json` and `cat tools/automation/tsconfig.json` to compare application and automation module settings. 【5da220†L1-L17】【63e889†L1-L6】
- `rg '#!/usr/bin/env ts-node' -n`, `rg '__dirname' -n`, and `rg 'require.main' -n` to locate CommonJS-only constructs. 【211790†L1-L5】【7facfa†L1-L12】【9a194b†L1-L3】
- `sed -n '1,160p' tools/api-scraper/src/cli.ts`, `sed -n '1,120p' tools/api-normalizer/src/cli.ts`, and `sed -n '1,160p' tools/openapi-generator/src/cli.ts` to audit CLI entrypoints for runtime expectations. 【b90746†L1-L31】【af5c77†L1-L39】【1cd1b1†L1-L78】
- `sed -n '1,120p' tools/automation/src/cli.ts` and `sed -n '1,120p' tools/shared/paths.ts` to map shared utility dependencies on CommonJS globals. 【3622e5†L1-L37】【e5e1b7†L1-L16】
- `cat .github/actions/proxmox-openapi-artifacts/tsconfig.json` to confirm the action workspace compiler target. 【a3af91†L1-L15】
- `nl -ba vitest.config.ts | sed -n '1,40p'` to identify additional usages of `__dirname` in test tooling. 【9c7ea9†L1-L17】
