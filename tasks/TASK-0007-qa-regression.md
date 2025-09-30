Title
- Establish QA strategy and regression safeguards for Proxmox API tooling outputs.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0006-automation-ci.md

Scope
- Focus areas: tests/, tools/ regression suites, docs/qa/.
- Out of scope: Core implementation changes to scraping or generation logic except as required for test hooks.
- Data model and types: Use canonical IR and OpenAPI artifacts from previous tasks as baselines.

Allowed changes
- Add regression tests comparing generated artifacts against baselines.
- Configure snapshot management processes and documentation.
- Introduce QA checklists for manual verification of critical flows.

Branch
- feature/2025-09-29---task-0007-qa-regression

Preconditions
- Run: source .env (if exists)
- Ensure automation pipeline commands are available locally.
- Gather sample outputs from previous tasks for comparison.

Plan checklist
- [x] Inventory existing automated tests across tooling.
- [x] Define regression coverage requirements (scrape diffs, IR validation, OpenAPI contract checks).
- [x] Implement automated comparisons for high-risk areas.
- [x] Document QA procedures, including manual smoke tests.
- [x] Update CI to surface QA results where appropriate.
- [x] Commit changes using Conventional Commits.
- [x] Update changelog with QA findings and tooling updates.

Acceptance criteria
- Regression test suite covers scraping, normalization, and OpenAPI generation outputs.
- QA documentation enumerates manual verification steps.
- CI reports include QA status.
- Changelog revision captures QA tooling additions and outcomes.
