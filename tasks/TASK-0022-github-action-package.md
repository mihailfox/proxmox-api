Title
- Implement private GitHub Action package for OpenAPI generation.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Requirements summary
- Create the GitHub Action definition as a bundled TypeScript/JavaScript action following the
  `actions/typescript-action` structure.
- Configure inputs for execution mode, artifact output paths, and optional overrides.
- Ensure outputs expose artifact paths and summaries for downstream steps.
- Bundle production dependencies into `dist/` so consumers do not need to run `npm ci`.

Scope
- Focus areas: action.yml, new `action/` package (e.g., `src/`, `dist/`), tools/automation/ integration hooks, package.json
- Out of scope: app/, docs/openapi/
- Data model and types: Automation pipeline outputs are authoritative.

Allowed changes
- Add action implementation files and helper scripts.
- Adopt bundler configuration (`rollup`, `@vercel/ncc`, or template defaults) and supporting npm scripts required by
  the TypeScript action toolchain.
- Update tooling dependencies if required for the action runtime.
- No breaking changes to existing automation commands without coordination.

Branch
- feature/{date}---task-0022-github-action-package

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote sync needed for action packaging.
      Example with GitHub CLI:
-      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
-      - [ ] Verify updated schema, seed data, and generated types.
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
      - [ ] (defer) source .env. No .env file present.
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA. Additional validation will occur in downstream workflow runs.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. Pending live action execution.
      - [ ] (defer) Confirm no regressions in critical paths. Pending live action execution.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0022 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] (defer) Changelog. Consolidated under TASK-0026 umbrella changelog.
      - [ ] (defer) Create versions/CHANGELOG-TASK-0022-{PR or short hash}-1.md. Consolidated with TASK-0026.
      - [ ] (defer) Include the command log, key decisions, and outcomes. Consolidated with TASK-0026.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- GitHub Action executes automation entry point with configurable inputs.
- Generated artifacts are exposed as workflow outputs or uploaded as artifacts.
- Action dependencies installed automatically.
- Documentation updated with usage examples.

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
