Title
- Continue GitHub Action TypeScript migration.

Source of truth
- plan/private-github-action-plan.md
- docs/automation/README.md
- tasks/TASK-0020-github-action-requirements.md
- tasks/TASK-0021-github-action-entrypoint.md
- tasks/TASK-0022-github-action-package.md
- tasks/TASK-0023-github-action-release.md
- tasks/TASK-0024-github-action-adoption.md

Scope
- Focus areas. .github/actions/proxmox-openapi-artifacts, tools/automation, workflows, documentation under docs/automation, plan/private-github-action-plan.md.
- Out of scope. app/, tests/, public/, docs unrelated to automation.
- Data model and types. Use canonical schema and generated types referenced in the automation pipeline.

Allowed changes
- GitHub Action and automation pipeline implementation updates.
- Documentation updates required to describe the new behavior.
- Shared utilities supporting the action pipeline.
- No schema edits unless mandated by requirements.

Branch
- feature/20250930---task-0028-github-action-migration

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync required for this task.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
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
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [ ] (defer) Run unit and integration tests. No additional automated tests defined beyond pipeline smoke run.
- [ ] (defer) Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Covered by follow-up release validation.
      - [ ] (defer) Confirm no regressions in critical paths. Pending live action execution.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0028 Continue GitHub Action migration
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] Changelog.
      - [ ] Create versions/CHANGELOG-TASK-0028-PR-1.md
      - [ ] Include the command log, key decisions, and outcomes.
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
