# TASK-0052 — automation summary formatter and documentation updates

## Summary
- Added `tools/automation/scripts/format-summary.ts` to convert pipeline summary JSON into the standardized Markdown block for `versions/` entries.
- Created dedicated Vitest coverage for the formatter and wired a reusable `npm run automation:summary` script plus `npm run test:automation` for the module.
- Updated handover, automation, QA, and PR template documentation alongside a reusable changelog template so release engineers capture the summary consistently.

## Command log
- source .env
- npm install
- npm run lint
- npm run build
- npm run test:automation
- npm run test:regression

## Notes
- `docs/product-requirements.md` was not present in the repository; requirements gathered from handover, QA, and plan documents instead.
- Workflow integration that uploads the summary JSON remains out of scope for this slice and will be scheduled separately.
