Title
- Extract reusable automation entry point for GitHub Action.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Requirements summary
- Provide a dedicated script or CLI wrapper around `npm run automation:pipeline` for action consumption.
- Ensure configurable inputs for mode, output directories, and artifact naming.
- Add smoke coverage validating CI and full execution paths.

Scope
- Focus areas: tools/automation/, tools/api-*/, package.json scripts
- Out of scope: app/, docs/openapi/, public/
- Data model and types: Existing automation pipeline outputs.

Allowed changes
- Refactor automation scripts to expose reusable entry point.
- Update package scripts and supporting utilities as needed.
- No changes to generated OpenAPI schemas beyond deterministic regeneration.

Branch
- feature/{date}---task-0021-github-action-entrypoint

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync needed for automation refactor.
      Example with GitHub CLI:
-      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
-      - [ ] Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [x] Wire persistence and retrieval.
      - [x] Validate input values.
      - [x] Persist to storage or API and read back.
      - [x] Handle undefined and default values.
- [x] Tests and checks.
      - [ ] (defer) source .env. No .env file present.
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0021 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] (defer) Changelog. Consolidated under TASK-0026 umbrella changelog.
      - [ ] (defer) Create versions/CHANGELOG-TASK-0021-{PR or short hash}-1.md. Consolidated with TASK-0026.
      - [ ] (defer) Include the command log, key decisions, and outcomes. Consolidated with TASK-0026.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Automation entry point supports configurable inputs for action usage.
- Regression commands succeed in CI and full modes.
- Documentation updated to reflect new entry point.
- Deterministic artifacts maintained.

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
