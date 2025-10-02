# Changelog — TASK-0037 Refresh action dist bundle

## Summary
- Regenerated the proxmox-openapi-artifacts action bundle to sync `dist/` with current TypeScript sources.
- Verified repository scripts with lint, build, and test commands to confirm the bundle integrates cleanly.

## Command log
1. `npm install --prefix .github/actions/proxmox-openapi-artifacts`
2. `npm run package --prefix .github/actions/proxmox-openapi-artifacts`
3. `npm ci`
4. `npm run lint`
5. `npm run build`
6. `npm test`

## Decisions
- Deferred schema/type sync because the task only refreshes the bundled action output.
- Left existing documentation unchanged; regeneration instructions remain accurate in existing guides.

## Follow-ups
- None.
