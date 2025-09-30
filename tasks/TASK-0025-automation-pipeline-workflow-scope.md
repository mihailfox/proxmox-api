Title
- Refine automation-pipeline workflow triggers.

Source of truth
- plan/private-github-action-plan.md
- docs/automation/README.md

Requirements summary
- Ensure the automation pipeline workflow only runs for relevant source code changes supporting the pipeline and verification commands.

Scope
- Focus areas. .github/workflows/automation-pipeline.yml
- Out of scope. All other directories.
- Data model and types. Existing automation pipeline workflow definition is the ground truth.

Allowed changes
- Workflow logic within the focus area.
- Shared utilities if strictly needed. Non breaking additions only.
- No schema edits unless explicitly granted by the product requirements.

Branch
- feature/{task-0025-automation-pipeline-workflow-scope}

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not applicable for this task.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>. No remote sync workflow required.
      - [ ] (defer) Verify updated schema, seed data, and generated types. No generated types were touched.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Not applicable for workflow trigger adjustments.
      - [ ] (defer) Validate input values. No persistence changes required.
      - [ ] (defer) Persist to storage or API and read back. No persistence flows touched.
      - [ ] (defer) Handle undefined and default values. No data handling logic modified.
- [ ] (defer) Tests and checks. Regression baseline mismatch blocks full pass.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [ ] (defer) Run unit and integration tests. Regression suite fails on existing OpenAPI checksum mismatch.
- [ ] (defer) Functional QA. Workflow-only change; manual QA not applicable.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Not executed for CI trigger update.
      - [ ] (defer) Confirm no regressions in critical paths. No runtime behavior affected.
- [ ] (defer) Documentation. No user-facing documentation updates required for trigger refinement.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0025 Refine automation-pipeline workflow triggers
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0025-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] (defer) Done. Outstanding deferrals require follow-up outside this task scope.
      - [ ] (defer) Mark remaining boxes as - [ ] (defer) with reasons.

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

