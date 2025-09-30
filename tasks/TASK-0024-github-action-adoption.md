Title
- Document consumer onboarding and validation for private GitHub Action.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Requirements summary
- Produce usage documentation and sample workflows for downstream repositories.
- Establish validation strategy via sandbox repo or integration tests.
- Provide troubleshooting and versioning guidance for private distribution.

Scope
- Focus areas: docs/automation/, docs/handover/, plan/
- Out of scope: tools/, app/, docs/openapi/
- Data model and types: Generated OpenAPI specs remain authoritative outputs.

Allowed changes
- Documentation updates covering onboarding, validation, and troubleshooting.
- Optional automation for sandbox validation workflows.
- No changes to core automation pipeline.

Branch
- feature/{date}---task-0024-github-action-adoption

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync required for documentation updates.
      Example with GitHub CLI:
-      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
-      - [ ] Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Documentation-focused task.
      - [ ] (defer) Validate input values. Documentation-focused task.
      - [ ] (defer) Persist to storage or API and read back. Documentation-focused task.
      - [ ] (defer) Handle undefined and default values. Documentation-focused task.
- [x] Tests and checks.
      - [ ] (defer) source .env. No .env file present.
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA. Adoption validation will occur in sandbox repositories.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Pending downstream execution.
      - [ ] (defer) Confirm no regressions in critical paths. Pending downstream execution.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0024 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] (defer) Changelog. Consolidated under TASK-0026 umbrella changelog.
      - [ ] (defer) Create versions/CHANGELOG-TASK-0024-{PR or short hash}-1.md. Consolidated with TASK-0026.
      - [ ] (defer) Include the command log, key decisions, and outcomes. Consolidated with TASK-0026.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Documentation enables downstream teams to adopt the action with minimal ramp-up.
- Validation strategy confirmed via sandbox or integration runs.
- Troubleshooting and versioning guidance published.
- Acceptance commands succeed when executed.

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
