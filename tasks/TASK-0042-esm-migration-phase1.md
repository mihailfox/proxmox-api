Title
- Bootstrap ESM migration for tooling CLIs.

Source of truth
- plan/esm-compliance-migration.md
- tasks/TASK-0040-tooling-consistency-review.md
- tasks/TASK-0041-esm-compliance-assessment.md

Scope
- Focus areas. Shared tooling under tools/, root package scripts, and tsconfig settings required for phase-one ESM readiness.
- Out of scope. Application Remix app/, UI assets, backend schemas, GitHub Action packaging outputs.
- Data model and types. Follow generated and hand-authored TypeScript definitions under tools/ as the canonical contracts.

Allowed changes
- Tooling and configuration required to execute tooling CLIs under NodeNext semantics.
- Shared utilities that unblock ESM adoption, without breaking existing consumers.
- No schema or API surface changes for application runtime modules.

Branch
- feature/20250215---task-0042-esm-migration-phase1

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated for npm and GitHub tooling (none required for local execution).
- Confirm repository PR template and scripts exist.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (Not applicable for local tooling changes.)
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. (No persistence layers touched during tooling migration.)
      - [ ] (defer) Validate input values. (Inputs unchanged.)
      - [ ] (defer) Persist to storage or API and read back. (No persistence updates in scope.)
      - [ ] (defer) Handle undefined and default values. (Behavior unchanged.)
- [x] Tests and checks.
      - [x] source .env
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
      - [x] Title: feat: TASK-0042 {short description}
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0042-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [x] Done.
      - [x] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Phase-one ESM tooling requirements from the Source of Truth are implemented and testable.
- Tooling TypeScript projects compile under NodeNext with updated helpers.
- All acceptance commands pass successfully.
- Functional QA confirms CLI behavior parity.
- PR is open with template, checklist, and task link.
- Changelog file documents the worklog and outcomes.
