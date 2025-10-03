# TASK-0050 — documentation refresh

## Summary
- Added private action and automation script coverage to the repository README so the tooling layout matches the current codebase.
- Generalized the QA regression checklist changelog guidance to point at the task-specific `versions/` entries instead of an outdated task ID.
- Replaced stale terminal output citations in the pvesh vs. scrape research note with references to checked-in comparison data.

## Command log
- npm install
- npm run lint
- npm run build
- npm run test:regression

## Notes
- Schema/type synchronization was deferred because the task only touched documentation.
- Functional QA beyond the regression suite was deferred; automated parity checks cover this scope.
