# Changelog — TASK-0029 (PR-2)

## Summary
- Restore the private action packaging workflow by installing the automation dependencies required for type-checking and bundling the TypeScript action.
- Address TypeScript strictness issues surfaced during the release job by tightening types in the API scraper and regression summary modules.
- Regenerated the bundled GitHub Action artifact after the dependency and type fixes.

## Command log
- npm install --prefix .github/actions/proxmox-openapi-artifacts
- npm run package --prefix .github/actions/proxmox-openapi-artifacts
- npm run build

## Decisions and notes
- Added the automation pipeline runtime dependencies as devDependencies of the action package so the release workflow can install them in isolation before bundling.
- Marked the non-actionable Playwright, Swagger parser, and YAML imports as externals in esbuild to ensure the packaged artifact continues to rely on the repository workspace for the heavy libraries.
- Kept the task checklist deferrals for schema sync, linting, and QA; the resumed work focused solely on unblocking the release workflow.
