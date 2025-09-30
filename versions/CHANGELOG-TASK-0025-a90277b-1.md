# TASK-0025 Refine automation-pipeline workflow triggers

## Summary
- Read plan/private-github-action-plan.md and docs/automation/README.md to confirm automation workflow requirements.
- Added pull request path filters so the automation-pipeline workflow only runs when relevant source files change.
- Documented task progress, including deferred QA and regression follow-up due to existing checksum mismatch.

## Command log
- source .env (if exists)
- npm ci
- npm run lint
- npm run build
- npm run test:normalizer
- npm run test:openapi
- npm run test:ui (exit `q`)
- npm run test:regression (fails: OpenAPI JSON/YAML checksum mismatch with committed baselines)

## Decisions and follow-ups
- Regression suite failure stems from divergent OpenAPI artifact hashes present on the base branch; no artifact changes were introduced in this task. Further investigation needed outside this scope.
- Manual QA and documentation updates deferred because the change only adjusts CI triggers.
