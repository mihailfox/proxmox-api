Title
- Implement private GitHub Action pipeline foundation.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md
- tasks/TASK-0019-github-action-plan.md
- tasks/TASK-0020-github-action-requirements.md
- tasks/TASK-0021-github-action-entrypoint.md
- tasks/TASK-0022-github-action-package.md
- tasks/TASK-0023-github-action-release.md
- tasks/TASK-0024-github-action-adoption.md

Scope
- Focus areas: tools/automation/, tools/api-*/, package.json, .github/actions/, .github/workflows/, docs/automation/, docs/handover/, plan/
- Out of scope: app/, public/, docs/openapi/ (except deterministic regeneration), tests/ unrelated to automation pipeline
- Data model and types: Existing automation pipeline outputs and generated OpenAPI specs remain canonical.

Allowed changes
- Refactor automation tooling to expose reusable entry points and configuration.
- Add GitHub Action implementation, workflows, and supporting scripts.
- Update documentation and planning artifacts relevant to the action rollout.
- Regenerate artifacts only when required to keep outputs deterministic.

Branch
- feature/2025-09-30---task-0026-github-action-implementation

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated (gh, npm, Playwright installs when needed).
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync needed for this task.
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
      - [ ] Title: feat: TASK-0026 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0026-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- GitHub Action implementation aligns with documented requirements and exposes reusable automation entry point.
- Release workflow exists for packaging and publishing the private action.
- Documentation updated for adoption and onboarding.
- All acceptance commands pass.
- PR opened with template, checklist, and task link.
- Changelog recorded with execution details.
