Title
- Plan private GitHub Action for OpenAPI artifact generation.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Scope
- Focus areas: plan/, tasks/
- Out of scope: app/, tools/, docs/openapi/
- Data model and types: Existing OpenAPI artifacts and automation pipeline outputs are the ground truth.

Allowed changes
- Documentation and planning updates under plan/
- New task definitions under tasks/
- No code changes to tooling or schemas.

Branch
- feature/2025-09-30---task-0019-github-action-plan

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync required for planning-only update.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>. Not applicable.
      - [ ] (defer) Verify updated schema, seed data, and generated types. Not applicable.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Not applicable to documentation-only plan.
      - [ ] (defer) Validate input values. Not applicable.
      - [ ] (defer) Persist to storage or API and read back. Not applicable.
      - [ ] (defer) Handle undefined and default values. Not applicable.
- [ ] (defer) Tests and checks. Documentation-only update with no executable changes.
      - [ ] (defer) source .env. Not required; no commands executed.
      - [ ] (defer) Install dependencies.
      - [ ] (defer) Run linter.
      - [ ] (defer) Build project or artifacts.
      - [ ] (defer) Run unit and integration tests.
- [ ] (defer) Functional QA. Documentation-only change.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Not applicable.
      - [ ] (defer) Confirm no regressions in critical paths. Not applicable.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0019 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0019-{PR or short hash}-1.md
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
