Title
- Tooling consistency audit

Source of truth
- plan/private-github-action-plan.md
- docs/automation/README.md
- docs/automation/private-action-adoption.md

Scope
- Focus areas. Review tooling scripts in tools/, package scripts, and GitHub Actions.
- Out of scope. Application runtime code under app/, docs content updates beyond tooling references.
- Data model and types. Follow existing TypeScript types defined in app/ and generated artifacts.

Allowed changes
- UI or service code in the focus area.
- Shared utilities if strictly needed. Non breaking additions only.
- No schema edits unless explicitly granted by the product requirements.

Branch
- feature/20251002---task-0040-tooling-consistency-review

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (Not applicable for this repository).
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH> (No remote sync workflow required).
      - [ ] (defer) Verify updated schema, seed data, and generated types. (No remote artifacts).
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. (No persistence changes in scope).
      - [ ] (defer) Validate input values. (No new inputs added).
      - [ ] (defer) Persist to storage or API and read back. (No storage interactions modified).
      - [ ] (defer) Handle undefined and default values. (No behavioral changes).
- [x] Tests and checks.
      - [x] source .env (not required; no .env file present)
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [ ] (defer) Documentation. (Behavior unchanged).
      - [ ] (defer) Update docs only if behavior changed. (No documentation updates required).
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0040 {short description}
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-{NNNN}-{PR or short hash}-1.md
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
