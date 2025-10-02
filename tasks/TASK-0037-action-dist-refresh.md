Title
- Refresh action dist bundle

Source of truth
- plan/private-action-release-dist-sync.md (covers release tooling expectations)
- (none) No AGENTS.md available in scope
- (pending) This task file

Scope
- Focus areas. `.github/actions/proxmox-openapi-artifacts` build output.
- Out of scope. Other workflows, application runtime code, schema definitions.
- Data model and types. Canonical source is existing generated action bundle outputs; no schema changes.

Allowed changes
- (Superseded) The action no longer commits `.github/actions/proxmox-openapi-artifacts/dist`; validate the
  runtime `tsx` execution instead.
- Update supporting docs if regeneration steps change.
- No modifications to unrelated modules or schemas.

Branch
- feature/{date}---task-0037-action-dist-refresh

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) Schema/types sync not required for action dist regeneration.
      Example with GitHub CLI:
      - [ ] (defer) Not triggered.
      - [ ] (defer) Not applicable.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval — no persistence layer touched.
      - [ ] (defer) Not applicable.
      - [ ] (defer) Not applicable.
      - [ ] (defer) Not applicable.
- [x] Tests and checks.
      - [ ] (defer) source .env — no .env present.
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [ ] (defer) Documentation — existing guidance remains accurate.
      - [ ] (defer) No updates required.
- [x] Commits using Conventional Commits.
      - [x] Will complete with final commit.
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title and body follow required format.
- [x] Changelog.
      - [x] To be created post-commit.
      - [x] To be documented post-commit.
- [ ] Done.
      - [ ] (defer) Final review pending.

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
