Title
- Add GitHub contribution templates.

Source of truth
- README.md

Scope
- Focus areas. .github/ directory and related configuration files.
- Out of scope. Application source under app/, public/.
- Data model and types. Not applicable; no schema changes.

Allowed changes
- Repository configuration files within scope.
- No runtime code changes unless strictly necessary.
- No schema edits.

Branch
- feature/20250929---task-0014-github-templates

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No schema involved.
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [ ] (defer) No existing templates to trace through data flows.
      - [ ] (defer) No configuration mappings present for template setup.
- [x] Implement changes with small, focused commits.
      - [ ] (defer) Keep models aligned with generated types or schemas.
      - [ ] (defer) Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Not applicable to template configuration.
      - [ ] (defer) Validate input values.
      - [ ] (defer) Persist to storage or API and read back.
      - [ ] (defer) Handle undefined and default values.
- [ ] (defer) Tests and checks. Not required for template-only change.
      - [ ] (defer) source .env — configuration-only change.
      - [ ] (defer) Install dependencies — not required for template addition.
      - [ ] (defer) Run linter — templates not linted.
      - [ ] (defer) Build project or artifacts — no build impact.
      - [ ] (defer) Run unit and integration tests — no runtime changes.
- [ ] (defer) Functional QA. Templates do not affect runtime behavior.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints.
      - [ ] (defer) Confirm no regressions in critical paths.
- [ ] (defer) Documentation. No documentation updates required for template addition.
      - [ ] (defer) No documentation updates required for template addition.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0014 github templates
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0014-f7b49c4-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [x] Done.
      - [x] Mark remaining boxes as - [ ] (defer) with reasons.

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
