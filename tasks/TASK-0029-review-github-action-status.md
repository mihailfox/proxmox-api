Title
- Review GitHub Action migration tasks 20-28.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/automation/README.md
- docs/handover/README.md
- tasks/TASK-0020-github-action-requirements.md
- tasks/TASK-0021-github-action-entrypoint.md
- tasks/TASK-0022-github-action-package.md
- tasks/TASK-0023-github-action-release.md
- tasks/TASK-0024-github-action-adoption.md
- tasks/TASK-0025-automation-pipeline-workflow-scope.md
- tasks/TASK-0026-github-action-implementation.md
- tasks/TASK-0027-github-action-template-plan.md
- tasks/TASK-0028-github-action-migration.md

Scope
- Focus areas: docs/automation/, docs/handover/, plan/, tasks/, .github/actions/, .github/workflows/, tools/automation/
- Out of scope: app/, public/, docs/openapi/
- Data model and types: Automation pipeline canonical outputs remain the ground truth.

Allowed changes
- Documentation and planning updates summarizing outstanding work.
- Issue tracking notes for unresolved requirements.
- No runtime code modifications except clarifying comments if required.

Branch
- feature/{task-0029-review-github-action-status}

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not required for documentation review.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
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
- [ ] Tests and checks.
      - [ ] (defer) source .env. Not needed for documentation update.
      - [ ] (defer) Install dependencies. Existing environment reused.
      - [x] Build project or artifacts.
      - [ ] (defer) Run linter.
      - [ ] (defer) Run unit and integration tests.
- [ ] Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Documentation scope only.
      - [ ] (defer) Confirm no regressions in critical paths. Documentation scope only.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0029 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] Changelog.
      - [ ] Create versions/CHANGELOG-TASK-0029-{PR or short hash}-1.md
      - [ ] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Outstanding work for tasks 20-28 is documented with actionable next steps.
- Recommendations align with canonical plans and docs.
- Acceptance commands pass if executed.
- PR opened with template, checklist, and task link.

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
