Title
- Resolve private-action-release dist sync failure.

Source of truth
- (Unavailable) Product requirements or design docs.
- (Unavailable) AGENTS.md guide.
- (Unavailable) Task files beyond this document.

Scope
- Focus areas. .github/actions/proxmox-openapi-artifacts/*, plan/private-action-release-dist-sync.md
- Out of scope. All other directories.
- Data model and types. Canonical schema and generated types in repo (none applicable).

Requirements summary
- Dist bundle for `.github/actions/proxmox-openapi-artifacts` must match `src` so the `Validate action tooling` job passes.
- Documented regeneration steps need to remain accurate for future contributors.
- Release automation expects committed `dist/` artifacts and lockfiles to be current before publishing.

Allowed changes
- CI workflow adjustments within scope directories.
- Action source, build scripts, or docs updates for dist packaging.
- Shared tooling changes only if required for packaging alignment.
- No schema edits.

Branch
- feature/20250214---task-0035-private-action-release-fix

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. — No remote schema dependencies for this task.
      Example with GitHub CLI:
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>. — No schema sync workflow needed.
      - [ ] (defer) Verify updated schema, seed data, and generated types. — No generated assets expected from remote sync.
- [x] Audit the current implementation in the focus area.
      - [ ] (defer) Trace data flow from settings or inputs through persistence to output. — Dist rebuild only required confirming bundler output drift.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [ ] (defer) Keep models aligned with generated types or schemas. — No model changes in scope.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Wire persistence and retrieval. — No storage changes involved in dist regeneration.
      - [ ] (defer) Validate input values. — No new inputs introduced.
      - [ ] (defer) Persist to storage or API and read back. — No persistence changes required.
      - [ ] (defer) Handle undefined and default values. — Action packaging logic untouched beyond rebuild.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) Functional QA. — Automated smoke tests cover the scope for this dist update.
      - [ ] (defer) Verify expected behavior on key user flows or endpoints. — No user-facing flows changed beyond compiled output.
      - [ ] (defer) Confirm no regressions in critical paths. — Covered by existing smoke tests.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0035 {short description}
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0035-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] (defer) Done. — Pending PR review and merge.
      - [ ] (defer) Mark remaining boxes as - [ ] (defer) with reasons. — Will revisit after PR closure.

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
