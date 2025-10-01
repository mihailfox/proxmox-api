Title
- Refresh OpenAPI artifact baselines after upstream changes.

Source of truth
- README.md
- docs/handover/README.md
- docs/qa/regression-checklist.md

Scope
- Focus areas: tools/automation/src/regression/baselines.ts, docs/openapi/
- Out of scope: tools/api-scraper/, tools/api-normalizer/, app/
- Data model and types: Generated OpenAPI artifacts in docs/openapi/ are the ground truth.

Allowed changes
- Update regression baseline metadata and corresponding committed artifacts.
- Adjust supporting documentation or changelog entries tied to the artifact refresh.
- Do not modify scraping or normalization schemas unless required by product requirements.

Branch
- feature/2025-10-01---task-0031-refresh-openapi-baselines

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are available (npm, git).
- Confirm repository includes PR template and npm scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
      - [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not applicable; Proxmox artifacts are managed locally in-repo.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>. Not required.
      - [ ] (defer) Verify updated schema, seed data, and generated types. Not required.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [ ] (defer) Remove unused config and wire only supported options end to end. No unused configuration observed.
- [ ] (defer) Wire persistence and retrieval. Not applicable for baseline metadata refresh.
      - [ ] (defer) Validate input values. Not applicable.
      - [ ] (defer) Persist to storage or API and read back. Not applicable.
      - [ ] (defer) Handle undefined and default values. Not applicable.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [ ] (defer) Documentation. Behavior unchanged; no documentation updates required.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0031 refresh openapi baselines
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0031-PR-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Requirements from the Source of Truth are implemented and testable.
- Models align with the canonical schema and generated types.
- All acceptance commands pass.
- Behavior is verified by QA steps relevant to the change.
- PR is open with template, checklist, and task link.
- Changelog file exists and is human readable.

Acceptance commands template
- Environment
  - source .env (if exists)
- Optional schema or types sync
  - Trigger CI/CLI sync if applicable and verify updated artifacts.
- Install and checks
  - Install dependencies
  - Run linter
  - Build artifacts
- Tests
  - Run unit tests
  - Run integration and/or end-to-end tests as applicable
