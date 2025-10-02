# Changelog — TASK-0036 Release workflow refactor

## Summary
- Split the `private-action-release` workflow into distinct action and schema publishing jobs with shared metadata outputs.
- Documented the new release split in the handover guide so maintainers know where each artifact is published.
- Captured task planning state and deferred manual QA awaiting a live GitHub workflow run.

## Command log
- source .env (repository root)
- npm ci
- npm run lint
- npm run build
- npm test

## Decisions and notes
- Schema release tags now use a `schema-` prefix to avoid collisions with action release tags and to signal their contents.
- Action release job retains the packaged tarball and exposes outputs for downstream jobs to keep release metadata consistent.
- Manual QA of the GitHub release process is deferred until the workflow runs in GitHub-hosted CI.

## Deferred or follow-up work
- Functional QA requires observing a full workflow execution in GitHub to confirm both releases publish successfully.
- Remote schema/type sync not needed for this workflow-only adjustment.
