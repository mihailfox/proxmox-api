Title
- Restore valid OpenAPI document delivery in the viewer.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0017-openapi-viewer.md

Scope
- Focus: app/routes/_index.tsx, app/routes/openapi[.]json.ts, app/routes/__tests__/, docs/openapi/
- Out of scope: scraping and normalization tooling under tools/, tests/ beyond index route coverage.
- Data model and types: Treat the generated docs/openapi/proxmox-ve.(json|yaml) artifacts as the canonical schema outputs.

Allowed changes
- UI and loader logic needed to render the OpenAPI viewer.
- Adjustments to generated artifact handling so long as schema structure remains intact.
- No schema or IR contract changes.

Branch
- feature/20250930---task-0018-openapi-viewer-fix

Preconditions
- Run: source .env (if exists)
- Ensure npm scripts from package.json are available.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. Not applicable; specs are generated locally.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>.
      - [ ] (defer) Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. Viewer serves static artifacts only.
      - [ ] (defer) Validate input values. Not applicable for static documents.
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
      - [ ] (defer) Confirm no regressions in critical paths. Not covered in this focused fix.
- [ ] (defer) Documentation.
      - [ ] (defer) Update docs only if behavior changed. Viewer behavior unchanged externally.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0018 openapi viewer fix
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0018-<PR or short hash>-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

