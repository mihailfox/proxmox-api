Title
- Restore OpenAPI artifact regression baselines.

Source of truth
- product requirements and core design docs
- AGENTS.md (none found)
- tasks/TASK-0030-artifact-regression-analysis.md
- tasks/TASK-0031-refresh-openapi-baselines.md

Scope
- Focus: tools/automation/src/regression, docs/openapi
- Out of scope: other directories
- Data model and types: use generated artifact baseline schema in tools/automation

Allowed changes
- Automation utilities within focus area.
- Shared utilities only if necessary; keep backwards compatible.
- No schema edits.

Branch
- feature/2025-10-01---task-0032-fix-openapi-baselines

Preconditions
- Run: source .env (if exists)
- Ensure CLI tools available for npm and git commands.
- Confirm repo has PR template and scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] If the project syncs schema or types from a remote system, trigger the sync on the target branch.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
  - [x] Audit the current implementation in the focus area.
        - [x] Trace data flow from settings or inputs through persistence to output.
        - [x] Identify missing mappings or dead configuration.
  - [x] Implement changes with small, focused commits.
        - [x] Keep models aligned with generated types or schemas.
        - [ ] (defer) Remove unused config and wire only supported options end to end – not required for baseline refresh.
- [ ] (defer) Wire persistence and retrieval – no storage changes needed for artifact refresh.
      - [ ] Validate input values.
      - [ ] Persist to storage or API and read back.
      - [ ] Handle undefined and default values.
  - [x] Tests and checks.
        - [x] source .env
        - [ ] (defer) Install dependencies – workspace already had node_modules.
        - [x] Run linter.
        - [x] Build project or artifacts.
        - [x] Run unit and integration tests.
  - [x] Functional QA.
        - [x] Verify expected behavior on key user flows or endpoints.
        - [x] Confirm no regressions in critical paths.
- [ ] (defer) Documentation – behavior unchanged.
      - [ ] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
  - [x] Open PR.
        - [x] Use the repo PR template.
        - [x] Title: feat: TASK-0032 {short description}
        - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [ ] Create versions/CHANGELOG-TASK-0032-<PR or short hash>-1.md
      - [ ] Include the command log, key decisions, and outcomes.
  - [x] Done.
        - [x] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Requirements implemented and testable.
- Models align with canonical schema and generated types.
- Acceptance commands pass.
- Behavior verified via QA.
- PR open with template, checklist, task link.
- Changelog file created and readable.
