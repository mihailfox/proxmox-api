# TASK-0018 openapi viewer fix

## Summary
- Regenerated the committed Proxmox VE OpenAPI artifacts after they were truncated, restoring a valid document for the viewer.
- Hardened the Remix loader with JSON/structure validation and clearer error responses before serving `/openapi.json`.
- Added regression tests that exercise the loader success path, method guards, and corrupted/missing spec scenarios.

## Command log
- `npm run openapi:generate`
- `npm install`
- `npm run lint`
- `npm run build`
- `npm run test:ui -- --run`
- `npm run openapi:validate`

## Notes
- Manual QA consisted of exercising the Remix loader indirectly through the new vitest coverage; broader UI regression remains deferred for this targeted repair.
