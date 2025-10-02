Title
- Assess ESM compliance across project tooling.

Source of truth
- Product requirements and design docs (unavailable; note for backlog).
- AGENTS.md (none present).
- Task files: tasks/TASK-0040-tooling-consistency-review.md (latest related context).

Scope
- Focus: package.json, tsconfig files, tooling under tools/, app/, and scripts influencing module format.
- Out of scope: API schemas, generated OpenAPI artifacts, documentation not related to module format.
- Data model and types: Use generated TypeScript types in tools/ directories as canonical.

Allowed changes
- Updates to configuration and build tooling needed for ESM compliance.
- Adjustments to shared utilities if required to support ESM without breaking consumers.
- No schema edits.

Branch
- feature/20250214---task-0041-esm-compliance-assessment

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated.
- Confirm repository PR template and scripts exist.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list. (Product requirements unavailable; reviewed TASK-0040 context.)
- [x] Audit the current implementation in the focus area. (Reviewed tsconfig targets, ts-node usage, and CLI entry points.)
      - [x] Trace data flow from settings or inputs through persistence to output. (Confirmed CLI scripts rely on ts-node/commonjs workflows.)
      - [x] Identify missing mappings or dead configuration. (Noted reliance on require.main and __dirname blocking ESM.)
- [ ] (defer) Implement changes with small, focused commits. (Assessment-only task; no runtime changes delivered.)
      - [ ] (defer) Keep models aligned with generated types or schemas. (No models modified.)
      - [ ] (defer) Remove unused config and wire only supported options end to end. (Deferred to future implementation tasks.)
- [ ] (defer) Wire persistence and retrieval. (No persistence work required for planning exercise.)
      - [ ] (defer) Validate input values. (No new inputs introduced.)
      - [ ] (defer) Persist to storage or API and read back. (No persistence surface touched.)
      - [ ] (defer) Handle undefined and default values. (Behavior unchanged.)
- [ ] (defer) Tests and checks. (Skipped because no executable code changed.)
      - [ ] (defer) source .env
      - [ ] (defer) Install dependencies.
      - [ ] (defer) Run linter.
      - [ ] (defer) Build project or artifacts.
      - [ ] (defer) Run unit and integration tests.
- [ ] (defer) Functional QA.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints.
      - [ ] (defer) Confirm no regressions in critical paths.
- [x] Documentation.
      - [x] Update docs only if behavior changed. (Documented migration plan under `plan/`.)
- [x] Commits using Conventional Commits. (Planned single docs commit.)
- [ ] Open PR with template and checklist.
- [x] Changelog with command log.
- [x] Done; defer items as needed. (Planning deliverables complete; runtime work deferred.)

Acceptance criteria
- Requirements implemented per sources.
- Models aligned with canonical types.
- Acceptance commands pass.
- Behavior verified.
- PR opened with template and task link.
- Changelog created with command log.
