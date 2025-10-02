Title
- Refactor release workflow to zip action and schema assets.

Source of truth
- plan/private-github-action-plan.md
- plan/private-action-release-dist-sync.md
- docs/handover/README.md
- docs/automation/README.md
- .github/workflows/private-action-release.yml

Scope
- Focus areas. .github/workflows/private-action-release.yml
- Out of scope. app/, tools/, docs/ (except release workflow notes if necessary)
- Data model and types. Automation pipeline outputs and committed action dist remain canonical.

Allowed changes
- Update release workflow configuration to adjust packaging outputs.
- Refresh supporting documentation referencing release artifact formats, if required.
- No changes to application runtime code or schemas beyond workflow automation.

Branch
- feature/2025-10-02---task-0038-release-workflow-zip-artifacts

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote schema sync required for workflow-only change.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>. Not applicable.
      - [ ] (defer) Verify updated schema, seed data, and generated types. Not applicable.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Workflow configuration only.
      - [ ] (defer) Validate input values. Not applicable.
      - [ ] (defer) Persist to storage or API and read back. Not applicable.
      - [ ] (defer) Handle undefined and default values. Not applicable.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA. Requires GitHub-hosted workflow execution.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Pending release workflow run.
      - [ ] (defer) Confirm no regressions in critical paths. Pending release workflow run.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0038 {short description}
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0038-{PR or short hash}-1.md
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
