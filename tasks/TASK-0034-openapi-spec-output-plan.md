Title
- Plan to externalize OpenAPI spec artifacts

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Scope
- Focus: project-wide automation, tooling, docs updates for OpenAPI artifacts
- Out of scope: product code unrelated to artifact generation, external services
- Data model and types: Intermediate representation and OpenAPI generator types are canonical

Allowed changes
- Documentation and tooling plans affecting artifact generation
- Shared utilities if required to describe plan steps
- No schema or data model edits in this planning task

Branch
- feature/20241016---task-0034-openapi-spec-artifact-decoupling

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs authenticated
- Confirm repository PR template and standard scripts available

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (Not applicable for this tooling-only change.)
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
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
      - [ ] (defer) source .env (no .env provided)
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
- [x] Open PR.
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0034 Plan to externalize OpenAPI spec artifacts
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0034-<PR or short hash>-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] (defer) Mark remaining boxes as - [ ] (defer) with reasons. (Complete after review.)

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

Requirements summary
- Pipeline currently commits generated specs under `docs/openapi/` and documentation expects git diffs for review.
- Automation, regression tests, and the Remix UI rely on those committed files for runtime behaviour.
- Future workflow must allow deterministic generation while distributing artifacts via local runs or CI-produced outputs, not version control.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0034-<PR or short hash>-1.md
      - [x] Include the command log, key decisions, and outcomes.
