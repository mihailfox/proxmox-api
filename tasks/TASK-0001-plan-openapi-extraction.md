Title
- Plan Proxmox API documentation extraction to OpenAPI.

Source of truth
- README.md

Scope
- Focus areas: plan/, tasks/
- Out of scope: All other directories.
- Data model and types: Not applicable; no schemas referenced.

Allowed changes
- Planning documentation within plan/.
- Task tracking documentation within tasks/.
- No code or schema modifications.

Branch
- feature/2025-09-29---task-0001-plan-openapi

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated if needed.
- Confirm the repository has the PR template and standard scripts (TBD during future implementation).

Plan checklist
- [ ] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] If the project syncs schema or types from a remote system, trigger the sync on the target branch.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
- [ ] Audit the current implementation in the focus area.
      - [ ] Trace data flow from settings or inputs through persistence to output.
      - [ ] Identify missing mappings or dead configuration.
- [ ] Implement changes with small, focused commits.
      - [ ] Keep models aligned with generated types or schemas.
      - [ ] Remove unused config and wire only supported options end to end.
- [ ] Wire persistence and retrieval.
      - [ ] Validate input values.
      - [ ] Persist to storage or API and read back.
      - [ ] Handle undefined and default values.
- [ ] Tests and checks.
      - [ ] source .env
      - [ ] Install dependencies.
      - [ ] Run linter.
      - [ ] Build project or artifacts.
      - [ ] Run unit and integration tests.
- [ ] Functional QA.
      - [ ] Verify expected behavior on key user flows or endpoints.
      - [ ] Confirm no regressions in critical paths.
- [ ] Documentation.
      - [ ] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0001 {short description}
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] Changelog.
      - [ ] Create versions/CHANGELOG-TASK-0001-{PR or short hash}-1.md
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
