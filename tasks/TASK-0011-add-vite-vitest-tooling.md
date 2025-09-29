Title
- Add Vite and Vitest tooling.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- README.md

Scope
- Focus areas. Root tooling configuration files (package.json, package-lock.json, tsconfig.json) and new frontend workspace under ui/.
- Out of scope. tools/api-scraper/, scraper runtime code, docs/ unless build output requires updates.
- Data model and types. Follow Vite vanilla TypeScript scaffolding defaults and TypeScript compiler settings.

Allowed changes
- UI or service code in the focus area.
- Shared utilities if strictly needed. Non breaking additions only.
- No schema edits unless explicitly granted by the product requirements.

Branch
- feature/2025-02-14---task-0011-add-vite-vitest-tooling

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (Not applicable for this tooling task.)
      Example with GitHub CLI:
- [x] Audit the current implementation in the focus area.
      - [ ] (defer) Trace data flow from settings or inputs through persistence to output. (UI workspace is new.)
      - [ ] (defer) Identify missing mappings or dead configuration. (UI workspace is new.)
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. (No persistence layer introduced.)
      - [ ] (defer) Validate input values. (Not required for initial tooling scaffolding.)
      - [ ] (defer) Persist to storage or API and read back. (Not part of scope.)
      - [ ] (defer) Handle undefined and default values. (Not part of scope.)
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
      - [x] Title: feat: TASK-0011 {short description}
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0011-{PR or short hash}-1.md
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
