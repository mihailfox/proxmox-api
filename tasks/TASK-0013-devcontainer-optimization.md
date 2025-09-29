Title
- Optimize devcontainer configuration.

Source of truth
- README.md
- plan/proxmox-openapi-extraction-plan.md

Requirements
- Provide a reliable Node.js + TypeScript tooling environment aligned with Playwright-based scraping workflows.
- Support linting with Biome and npm scripts defined in the repository.
- Ensure Playwright can run Chromium with necessary system dependencies inside the devcontainer.

Scope
- Focus areas. `.devcontainer/`
- Out of scope. All application source directories outside devcontainer configuration.
- Data model and types. Node.js and TypeScript project configuration as defined in repository tooling.

Allowed changes
- UI or service code in the focus area.
- Shared utilities if strictly needed. Non breaking additions only.
- No schema edits unless explicitly granted by the product requirements.

Branch
- feature/20250214---task-0013-devcontainer-optimization

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote schema dependencies for devcontainer setup.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [ ] (defer) Trace data flow from settings or inputs through persistence to output. Devcontainer setup has no runtime data flow.
      - [ ] (defer) Identify missing mappings or dead configuration. No configuration wiring beyond container provisioning.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Not applicable for development container configuration.
      - [ ] (defer) Validate input values.
      - [ ] (defer) Persist to storage or API and read back.
      - [ ] (defer) Handle undefined and default values.
- [ ] (defer) Tests and checks. Devcontainer setup only; no runtime code changes to test.
      - [ ] (defer) source .env
      - [ ] (defer) Install dependencies.
      - [ ] (defer) Run linter.
      - [ ] (defer) Build project or artifacts.
      - [ ] (defer) Run unit and integration tests.
- [ ] (defer) Functional QA. No user-facing flows affected by tooling configuration.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints.
      - [ ] (defer) Confirm no regressions in critical paths.
- [ ] (defer) Documentation. No behavior changes requiring documentation updates.
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
