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
- [ ] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] If the project syncs schema or types from a remote system, trigger the sync on the target branch.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
- [ ] Audit the current implementation in the focus area.
      - [ ] Trace data flow from settings or inputs through persistence to output.
      - [ ] Identify missing mappings or dead configuration.
- [ ] Implement changes with small, focused commits.
      - [ ] Keep models aligned with generated types or schemas.
      - [ ] Remove unused config and wire only supported options end to end.
- [ ] Wire persistence and retrieval.
      - [ ] Validate input values.
      - [ ] Persist to storage or API and read back.
      - [ ] Handle undefined and default values.
- [ ] Tests and checks.
      - [ ] source .env
      - [ ] Install dependencies.
      - [ ] Run linter.
      - [ ] Build project or artifacts.
      - [ ] Run unit and integration tests.
- [ ] Functional QA.
      - [ ] Verify expected behavior on key user flows or endpoints.
      - [ ] Confirm no regressions in critical paths.
- [ ] Documentation.
      - [ ] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0024 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] Changelog.
      - [ ] Create versions/CHANGELOG-TASK-0024-{PR or short hash}-1.md
      - [ ] Include the command log, key decisions, and outcomes.
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
