# TASK-0038 Release workflow zip artifacts

## Summary
- Refactored `private-action-release` workflow packaging to emit ZIP archives for the action bundle and schema outputs.
- Added release documentation updates covering the new ZIP-based assets for action and schema releases.
- Captured task planning details in `tasks/TASK-0038-release-workflow-zip-artifacts.md` for ongoing tracking.

## Detailed log
- Reviewed release automation plans and handover docs to confirm asset expectations and current workflow behaviour.
- Inspected `.github/workflows/private-action-release.yml` to understand existing tarball packaging and schema asset publishing.
- Replaced the tarball creation step with a ZIP archive scoped to the action manifest, bundled dist, and lockfiles, ensuring clean output by removing prior archives before zipping.
- Added schema packaging step generating a ZIP archive with the JSON and YAML specs, and simplified release asset publishing to attach the single archive.
- Updated `plan/private-github-action-plan.md` and `docs/handover/README.md` to document the ZIP-based release assets and schema archive contents.
- Recorded progress and deferrals within `tasks/TASK-0038-release-workflow-zip-artifacts.md` per workflow governance guidelines.
- Executed repository linting, build, and targeted test suites to confirm no regressions introduced by workflow changes.

## Verification
- `npm install`
- `npm run lint`
- `npm run build`
- `npm run test:normalizer`
- `npm run test:openapi`
