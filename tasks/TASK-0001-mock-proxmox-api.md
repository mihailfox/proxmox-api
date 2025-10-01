Title
- Mock Proxmox API viewer requests in Codex environment.

Source of truth
- [x] README.md
- [x] docs/handover/README.md
- [x] docs/contributing/coding-standards.md
- [x] plan/proxmox-openapi-extraction-plan.md

Scope
- Focus areas. app/
- Out of scope. tools/, docs/
- Data model and types. TypeScript definitions in app/ directory.

Allowed changes
- UI or service code in the focus area.
- Shared utilities if strictly needed. Non breaking additions only.
- No schema edits unless explicitly granted by the product requirements.

Branch
- feature/2025-10-01---task-0001-mock-proxmox-api

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (Not required fo
r this mocking change.)
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. (No persistence surfaces were modified.)
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [ ] (defer) Documentation. (No user-facing docs require updates for internal mock handling.)
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

Requirements summary
- When `CODEX_ENV=true`, the application must avoid real network calls to https://pve.proxmox.com and instead use a mocked response so the UI remains functional in restricted environments.
- In local development and CI (without `CODEX_ENV`), the existing behavior should remain unchanged and continue to fetch live data.

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
