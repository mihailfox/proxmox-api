Title
- Assess alignment with actions/typescript-action template.

Source of truth
- plan/private-github-action-plan.md
- docs/automation/README.md
- docs/automation/private-action-adoption.md
- tasks/TASK-0020-github-action-requirements.md
- tasks/TASK-0021-github-action-entrypoint.md
- tasks/TASK-0022-github-action-package.md
- tasks/TASK-0023-github-action-release.md
- tasks/TASK-0024-github-action-adoption.md
- versions/CHANGELOG-TASK-0019-PR-1.md

Scope
- Focus areas: plan/, docs/automation/, tasks/, versions/
- Out of scope: app/, tools/, workflows unless documentation requires references.
- Data model and types: Follow existing documentation conventions; no schema changes.

Allowed changes
- Documentation and planning artifacts within focus directories.
- No code or workflow changes; informational updates only.
- No schema edits.

Branch
- feature/20240528---task-0027-github-action-template-plan

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm repository has PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not applicable for documentation planning.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Documentation-only task.
      - [ ] (defer) Validate input values. Documentation-only task.
      - [ ] (defer) Persist to storage or API and read back. Documentation-only task.
      - [ ] (defer) Handle undefined and default values. Documentation-only task.
- [ ] (defer) Tests and checks.
      - [ ] (defer) source .env. Covered by lightweight documentation update; no runtime tests executed.
      - [ ] (defer) Install dependencies. No new dependencies required.
      - [ ] (defer) Run linter. Not needed for documentation-only change.
      - [ ] (defer) Build project or artifacts. Not needed for documentation-only change.
      - [ ] (defer) Run unit and integration tests. Not applicable.
- [ ] (defer) Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Documentation scope only.
      - [ ] (defer) Confirm no regressions in critical paths. Documentation scope only.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0027 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0027-<PR or short hash>-1.md
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
