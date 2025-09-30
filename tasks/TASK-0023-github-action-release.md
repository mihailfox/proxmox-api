Title
- Automate private GitHub Action release workflow.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Requirements summary
- Create a GitHub Actions workflow that builds, tags, and publishes the private action.
- Generate GitHub releases with packaged assets and changelog entries.
- Support manual dispatch and automatic runs on main branch merges.

Scope
- Focus areas: .github/workflows/, plan/
- Out of scope: app/, tools/api-*, docs/openapi/
- Data model and types: Automation pipeline outputs remain canonical.

Allowed changes
- Add release workflow YAML and supporting scripts.
- Update documentation describing release triggers and required secrets.
- No changes to automation logic beyond packaging for release.

Branch
- feature/{date}---task-0023-github-action-release

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated (gh, npm, etc.).
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync required for workflow authoring.
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
- [ ] (defer) Functional QA. Release workflow will be validated during first production run.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Pending live release execution.
      - [ ] (defer) Confirm no regressions in critical paths. Pending live release execution.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0023 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] (defer) Changelog. Consolidated under TASK-0026 umbrella changelog.
      - [ ] (defer) Create versions/CHANGELOG-TASK-0023-{PR or short hash}-1.md. Consolidated with TASK-0026.
      - [ ] (defer) Include the command log, key decisions, and outcomes. Consolidated with TASK-0026.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Release workflow can create a Git tag and GitHub release for the action.
- Release artifacts (dist bundle, metadata) are attached to the release.
- Workflow supports manual dispatch and post-merge execution.
- Documentation updated with release procedure.

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
