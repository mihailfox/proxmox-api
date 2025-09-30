Title
- Define private GitHub Action requirements and interface.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Requirements summary
- Capture inputs, outputs, runtime expectations, and portability requirements for the private GitHub Action.
- Document action design decisions (composite vs. JavaScript) and integration guidelines.

Scope
- Focus areas: plan/, docs/automation/, docs/handover/
- Out of scope: tools/, app/, docs/openapi/
- Data model and types: Existing automation pipeline outputs remain the ground truth.

Allowed changes
- Documentation updates describing the action requirements and design brief.
- Planning artifacts outlining interface contracts.
- No code or schema modifications.

Branch
- feature/{date}---task-0020-github-action-requirements

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync needed for documentation updates.
      Example with GitHub CLI:
-      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
-      - [ ] Verify updated schema, seed data, and generated types.
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
- [x] Tests and checks.
      - [ ] (defer) source .env. No .env file in repository.
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [ ] (defer) Run unit and integration tests. Not required for documentation updates.
- [ ] (defer) Functional QA. Documentation-only scope.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Not applicable.
      - [ ] (defer) Confirm no regressions in critical paths. Not applicable.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0020 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] (defer) Changelog. Tracked under TASK-0026 umbrella changelog.
      - [ ] (defer) Create versions/CHANGELOG-TASK-0020-{PR or short hash}-1.md. Consolidated with TASK-0026.
      - [ ] (defer) Include the command log, key decisions, and outcomes. Consolidated with TASK-0026.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Requirements and interface documentation completed.
- No changes to automation behaviour beyond documentation.
- All acceptance commands pass if executed.
- Changelog captures planning work.

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
