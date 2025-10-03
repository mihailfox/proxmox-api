Title
- Refresh documentation across repository.

Source of truth
- Product requirements and core design docs (unavailable; note for backlog).
- AGENTS.md guide (none present).
- Task files (this task file).

Scope
- Focus areas. Entire documentation set: README.md, docs/, app/, and other markdown guidance.
- Out of scope. Source code behavior unless required for documentation accuracy.
- Data model and types. Canonical schema and generated types from existing repository artifacts.

Allowed changes
- Documentation updates to reflect current state.
- Shared utilities only if required to demonstrate documentation examples; no code logic changes expected.
- No schema edits unless explicitly granted by product requirements.

Branch
- feature/2025-10-03---task-0050-docs-refresh

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list. (Product requirements unavailable; none to review.)
- [ ] (defer) Schema or type sync not required for documentation updates.
      Example with GitHub CLI:
      - [ ] (defer) Not needed for this scope.
      - [ ] (defer) Not needed for this scope.
- [x] Audit the current implementation in the focus area. (Reviewed existing documentation for accuracy.)
      - [ ] (defer) Not applicable for documentation-only scope.
      - [ ] (defer) Not applicable for documentation-only scope.
- [x] Implement changes with small, focused commits. (Documentation updates only.)
      - [ ] (defer) Not applicable for documentation updates.
      - [ ] (defer) Not applicable for documentation updates.
- [ ] (defer) Wire persistence and retrieval not in scope.
      - [ ] (defer) Not applicable.
      - [ ] (defer) Not applicable.
      - [ ] (defer) Not applicable.
- [x] Tests and checks.
      - [x] source .env (not required; `.env` absent).
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA covered by automated regression suite.
      - [ ] (defer) Not performed beyond automated coverage.
      - [ ] (defer) Not performed beyond automated coverage.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0050 documentation refresh
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0050-<PR or short hash>-1.md
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
