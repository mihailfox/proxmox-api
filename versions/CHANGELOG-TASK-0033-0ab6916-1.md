# TASK-0033 – Repair private action release dist sync

## Summary
- Regenerated the proxmox-openapi-artifacts GitHub Action bundle to keep the committed dist output aligned with src/main.ts.
- Ran repository lint/build/test checks to ensure the updated bundle integrates without regressions.

## Command log
- `npm install --prefix .github/actions/proxmox-openapi-artifacts` 【ddb496†L1-L11】
- `npm run package --prefix .github/actions/proxmox-openapi-artifacts` 【b7955f†L1-L11】【52596e†L1-L11】
- `npm install` 【1d4e67†L1-L2】【e1a405†L1-L17】
- `npm run lint` 【d1ef8a†L1-L7】
- `npm run build` 【49b8b6†L1-L5】
- `npm run test:normalizer` 【40d42b†L1-L5】【b7adf0†L1-L5】【229654†L1-L11】
