Title
- Fix private action release workflow formatting.

Source of truth
- Current user request describing workflow formatting issues.
- Repository root guidance (no AGENTS.md present).
- Existing workflow implementation in `.github/workflows/private-action-release.yml`.

Scope
- Focus areas. `.github/workflows/private-action-release.yml`, new helper scripts if required.
- Out of scope. Application source under `app/`, `tests/`, and unrelated documentation.
- Data model and types. Not applicable; workflow YAML and auxiliary scripts act as source of truth.

Allowed changes
- Workflow logic and supporting scripts to satisfy formatting requirements.
- Documentation updates only if behavior changes.
- No schema edits.

Branch
- feature/2025-10-03---task-0047-workflow-formatting

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are available (`node`, `npm`, `python` for script execution).
- Confirm repository PR template and scripts remain intact.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (Workflow-only change; no schema artifacts.)
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH> (Not required.)
      - [ ] (defer) Verify updated schema, seed data, and generated types. (Not required.)
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. (Not applicable to GitHub Actions workflow.)
      - [ ] (defer) Validate input values. (Not applicable.)
      - [ ] (defer) Persist to storage or API and read back. (Not applicable.)
      - [ ] (defer) Handle undefined and default values. (Not applicable.)
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. (Workflow execution requires GitHub Actions.)
      - [ ] (defer) Confirm no regressions in critical paths. (Workflow execution requires GitHub Actions.)
- [ ] (defer) Documentation. (Behavior unchanged.)
      - [ ] (defer) Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-{NNNN} {short description}
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-{NNNN}-{PR or short hash}-1.md
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
