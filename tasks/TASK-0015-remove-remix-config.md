Title
- Remove legacy Remix classic config file.

Source of truth
- User-provided Remix documentation excerpt.

Scope
- Focus areas. Root configuration files (`remix.config.js`), build tooling (`vite.config.ts`).
- Out of scope. Application code under `app/`, public assets, server tooling.
- Data model and types. Use generated types present in the repository as canonical.

Allowed changes
- Configuration adjustments to align with Remix Vite usage.
- Shared utilities if strictly necessary (non-breaking additions only).
- No schema edits.

Branch
- feature/20250930---task-0015-remove-remix-config

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not applicable for this configuration-only change.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. No persistence involved in config cleanup.
      - [ ] (defer) Validate input values.
      - [ ] (defer) Persist to storage or API and read back.
      - [ ] (defer) Handle undefined and default values.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [x] Functional QA.
      - [x] Verify expected behavior on key user flows or endpoints.
      - [x] Confirm no regressions in critical paths.
- [ ] (defer) Documentation. No observable behavior change for users.
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
