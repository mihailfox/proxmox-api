Title
- Prevent duplicate releases based on Proxmox docs version.

Source of truth
- plan/private-github-action-plan.md
- plan/private-action-release-dist-sync.md
- tasks/TASK-0045-release-versioning-strategy.md

Scope
- Focus areas. `.github/workflows/private-action-release.yml`.
- Out of scope. Everything else unless required by workflow logic.
- Data model and types. Use existing workflow inputs and environment variables as the ground truth.

Allowed changes
- Workflow updates under `.github/workflows`.
- Shared utilities if strictly needed (non breaking additions only).
- No schema edits.

Branch
- feature/20240604---task-0046-release-version-check

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm repository has PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Workflow-only change; no schema sync available from this environment.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>. Not applicable.
      - [ ] (defer) Verify updated schema, seed data, and generated types. Not applicable.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Workflow change only; no storage layer involved.
      - [ ] (defer) Validate input values. Not applicable.
      - [ ] (defer) Persist to storage or API and read back. Not applicable.
      - [ ] (defer) Handle undefined and default values. Not applicable.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Requires GitHub-hosted workflow execution.
      - [ ] (defer) Confirm no regressions in critical paths. Requires GitHub-hosted workflow execution.
- [ ] (n/a) Documentation.
      - [ ] (n/a) Update docs only if behavior changed. Not required for this workflow-only change.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
  - [x] Open PR.
        - [x] Use the repo PR template.
        - [x] Title: feat: TASK-0046 {short description}
        - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0046-{PR or short hash}-1.md
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
