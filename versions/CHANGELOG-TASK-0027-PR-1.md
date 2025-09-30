# Changelog – TASK-0027

## Summary
- Created TASK-0027 planning ticket and expanded the private action plan with a template alignment phase and gap analysis.
- Updated action-related task briefs and automation docs to describe the migration path toward the `actions/typescript-action` structure.
- Documented consumer-facing adoption updates outlining the forthcoming switch from the composite wrapper to a bundled TypeScript action.

## Source materials consulted
- plan/private-github-action-plan.md
- docs/automation/README.md
- docs/automation/private-action-adoption.md
- tasks/TASK-0020-github-action-requirements.md
- tasks/TASK-0021-github-action-entrypoint.md
- tasks/TASK-0022-github-action-package.md
- tasks/TASK-0023-github-action-release.md
- tasks/TASK-0024-github-action-adoption.md
- https://github.com/actions/typescript-action

## Command log
- `source .env`
- `git clone --depth 1 https://github.com/actions/typescript-action /tmp/typescript-action`

## Decisions
- Adopt the `actions/typescript-action` repository layout as the long-term target, introducing an additional implementation phase for migration.
- Bundle the automation entry point via a TypeScript façade so future action runs avoid per-execution `npm ci` installs.
- Extend release and adoption plans to incorporate `check-dist` validation, prebuilt `dist/` assets, and simplified `uses:` references for downstream workflows.
