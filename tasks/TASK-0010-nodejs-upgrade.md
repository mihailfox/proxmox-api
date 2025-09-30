Title
- Upgrade Node.js tooling to v22 baseline

Source of truth
- README.md

Scope
- Focus areas. package.json, package-lock.json, tooling configs
- Out of scope. Application source under src, tools except for config updates, documentation outside tooling changes
- Data model and types. Existing TypeScript configuration and generated types remain canonical

Allowed changes
- UI or service code in the focus area.
- Shared utilities if strictly needed. Non breaking additions only.
- No schema edits unless explicitly granted by the product requirements.

Branch
- feature/20240608---task-0010-nodejs-upgrade

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not required for tooling-only update.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Not applicable for tooling configuration update.
      - [ ] (defer) Validate input values. Not applicable.
      - [ ] (defer) Persist to storage or API and read back. Not applicable.
      - [ ] (defer) Handle undefined and default values. Not applicable.
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
      - [x] Title: feat: TASK-0010 Upgrade Node.js tooling to v22 baseline
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0010-{PR or short hash}-1.md
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

Notes
- Keep npm-based workflows working: install deps via `npm install`, lint via `npm run lint`, tests via `npm test`, and scraper entry `npm run scraper:scrape`.
- Tooling previously used ESLint with TypeScript presets plus Prettier integration; scripts called `eslint` directly. Replace with Biome-based workflow.
- No project-level `.env` file exists; sourcing step is a no-op.
