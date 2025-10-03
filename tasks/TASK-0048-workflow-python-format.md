Title
- Fix release workflow inline Python formatting

Source of truth
- docs/handover/README.md
- Existing workflow files in .github/workflows

Scope
- Focus: .github/workflows/private-action-release.yml, tools/scripts
- Out of scope: application source directories outside workflow tooling
- Data model and types: Not applicable; rely on existing workflow structure

Allowed changes
- Workflow YAML updates to address formatting and execution issues
- Supporting script adjustments under tools/scripts if required
- No schema or application code changes

Branch
- feature/{task-0048-workflow-python-format}

Preconditions
- Run: source .env (if exists)
- Ensure Git and Node tooling available per repo scripts
- Confirm repository PR template is present

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. *(No schema sync for workflow-only task.)*
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [ ] (defer) Keep models aligned with generated types or schemas. *(Not applicable to workflow tooling.)*
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval.
      - [ ] (defer) Validate input values.
      - [ ] (defer) Persist to storage or API and read back.
      - [ ] (defer) Handle undefined and default values.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. *(Requires GitHub-hosted workflow run.)*
      - [ ] (defer) Confirm no regressions in critical paths. *(Requires GitHub-hosted workflow run.)*
- [ ] (defer) Documentation.
      - [ ] (defer) Update docs only if behavior changed. *(No user-facing documentation impact.)*
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0048 Fix release workflow python formatting
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0048-PR-1.md
      - [x] Include the command log, key decisions, and outcomes.
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
