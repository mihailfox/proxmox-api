Title
- Migrate private GitHub Action workspace to native ESM.

Source of truth
- plan/esm-compliance-migration.md
- plan/private-github-action-plan.md
- docs/automation/private-action-adoption.md
- tasks/TASK-0041-esm-compliance-assessment.md
- tasks/TASK-0042-esm-migration-phase1.md

Scope
- Focus areas. `.github/actions/proxmox-openapi-artifacts/` source, build scripts, and bundling workflow required for ESM authoring.
- Out of scope. Application Remix routes, root tooling packages, and unrelated documentation outside private action guidance.
- Data model and types. Follow generated TypeScript types within the action workspace and shared helpers as canonical contracts.

Allowed changes
- Action workspace source, configuration, and build tooling necessary to author and emit ESM/CommonJS bundles.
- Shared utilities only if required for action compatibility, keeping changes additive and non-breaking.
- No modifications to runtime schemas or API contracts beyond module format alignment.

Branch
- feature/20251002---task-0043-esm-action-workspace

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs for npm and GitHub Actions packaging are authenticated or not required for local execution.
- Confirm the repository has the PR template and standard scripts available.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list. (Reviewed plan/esm-compliance-migration.md, private action plan, adoption guide, and prior tasks.)
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. (No remote schema sync for action workspace.)
            - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH> (deferred; no remote schema pipeline)
            - [ ] (defer) Verify updated schema, seed data, and generated types. (No schema sync in scope.)
- [x] Audit the current implementation in the focus area. (Reviewed action tsconfig, bundle scripts, and release workflow for CommonJS assumptions.)
      - [x] Trace data flow from settings or inputs through persistence to output. (Mapped action inputs to automation pipeline invocation and output wiring.)
      - [x] Identify missing mappings or dead configuration. (Confirmed CommonJS module target, single bundle format, and Node22 runtime assumptions to replace.)
- [x] Implement changes with small, focused commits. (Updated action workspace to NodeNext ESM sources, dual bundle scripts, and runtime configuration.)
      - [x] Keep models aligned with generated types or schemas. (Ensured automation pipeline typings remained untouched while updating imports.)
      - [x] Remove unused config and wire only supported options end to end. (Replaced single-format esbuild command with dual CJS/ESM outputs and Node20 runtime verification.)
- [ ] (defer) Wire persistence and retrieval. (No storage layers touched by the action workspace migration.)
      - [ ] (defer) Validate input values. (Action inputs unchanged by module migration.)
      - [ ] (defer) Persist to storage or API and read back. (No persistence workflows involved.)
      - [ ] (defer) Handle undefined and default values. (Pipeline defaults unchanged.)
- [x] Tests and checks. (npm ci, lint, TypeScript builds, Vitest suites, regression pipeline, and Playwright smoke tests executed.)
      - [x] source .env
      - [x] Install dependencies. (npm ci)
      - [x] Run linter. (npm run lint)
      - [x] Build project or artifacts. (npm run build)
      - [x] Run unit and integration tests. (npm run test:normalizer, test:openapi, test:ui, test:regression, npm test)
- [x] Functional QA. (Regression suite confirmed pipeline outputs and checksums.)
      - [x] Verify expected behavior on key user flows or endpoints. (Regression tests validated action-driven pipeline outputs.)
      - [x] Confirm no regressions in critical paths. (Automation regression, Vitest, and Playwright suites all passed.)
- [ ] (defer) Documentation. (No behavior changes requiring doc updates.)
      - [ ] (defer) Update docs only if behavior changed. Keep changes concise. (Not required for this phase.)
- [x] Commits using Conventional Commits. (feat(action): migrate private action workspace to esm)
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [x] Open PR. (Submitted via make_pr with template.)
      - [x] Use the repo PR template.
      - [x] Title: feat: TASK-0043 {short description}
      - [x] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog. (versions/CHANGELOG-TASK-0043-PR-1.md recorded command log and decisions.)
      - [x] Create versions/CHANGELOG-TASK-0043-PR-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [x] Done.
      - [x] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Action workspace ESM requirements from the Source of Truth are implemented and testable.
- Esbuild (or equivalent) emits compatible bundles validated against the expected runtime.
- All acceptance commands pass successfully.
- Functional QA verifies the action on supported scenarios or equivalent local validation.
- PR is open with template, checklist, and task link.
- Changelog documents the implementation details and command log.
