# Title
- Remove bundled dist artifacts from action workspace

# Source of truth
- docs/automation/private-action-adoption.md
- plan/esm-compliance-migration.md
- tasks/TASK-0043-esm-action-workspace.md

# Scope
- Focus: .github/actions/proxmox-openapi-artifacts, .github/workflows
- Out of scope: app/, tools/ (except shared utilities referenced by the action), tests/
- Data model and types: Canonical automation pipeline types under tools/automation/src remain the ground truth.

# Allowed changes
- Action workspace scripts and configuration.
- Release workflow adjustments tied to the action bundle.
- Documentation updates to explain action packaging expectations.
- Shared utilities only for non-breaking additions.
- No schema edits.

# Branch
- feature/20251002---task-0044-action-dist-cleanup

# Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm repository has PR template and scripts.

# Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval.
      - [ ] (defer) Validate input values.
      - [ ] (defer) Persist to storage or API and read back.
      - [ ] (defer) Handle undefined and default values.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0044 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0044-PR-1.md with log, decisions, outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

# Acceptance criteria
- Requirements implemented and testable.
- Models align with canonical schema and generated types.
- Acceptance commands pass.
- Behavior verified via QA.
- PR open with template, checklist, task link.
- Changelog written and human readable.
