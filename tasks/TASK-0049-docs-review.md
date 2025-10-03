Title
- Update documentation audit

Source of truth
- Product requirements and core design docs (unavailable; note for backlog)
- AGENTS.md (none found in repository)
- Task files (existing documentation tasks for context)

Scope
- Focus areas: docs/, README.md, public/, app/, tests/, tools/, plan/, versions/
- Out of scope: node_modules/, .git/, .github/workflows (code-level automation unchanged)
- Data model and types: Use existing TypeScript definitions as canonical (no schema changes)

Allowed changes
- Documentation updates across focus areas
- Minor corrections in shared utilities only if strictly necessary for documentation accuracy
- No schema edits

Branch
- feature/2024-05-27---task-0049-docs-review

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are available (git, npm, vite)
- Confirm repository has PR template and standard scripts (already present)

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list. (Product requirements unavailable; noted in scope.)
- [ ] (defer) Schema/types sync not required for documentation-only update.
      Example with GitHub CLI:
      - [ ] (defer) No remote workflow triggered for this documentation task.
      - [ ] (defer) Schema artifacts unchanged; no verification necessary.
- [x] Audit the current implementation in the focus area.
      - [ ] (defer) Data flow review not needed for text-only edits.
      - [ ] (defer) Configuration untouched by documentation changes.
- [x] Implement changes with small, focused commits.
      - [ ] (defer) No model changes required for documentation updates.
      - [ ] (defer) Configuration untouched during documentation sweep.
- [ ] (defer) Persistence layers not modified during documentation work.
      - [ ] (defer) Input validation unaffected; no changes made.
      - [ ] (defer) Storage interactions unchanged.
      - [ ] (defer) Default handling unchanged by documentation edits.
- [ ] (defer) Skipped automated checks for documentation-only update.
      - [ ] (defer) Environment already sourced at session start.
      - [ ] (defer) No dependency changes; installation skipped.
      - [ ] (defer) Linting omitted for documentation-only edits.
      - [ ] (defer) Build unnecessary for documentation changes.
      - [ ] (defer) Tests not run; no functional code modified.
- [ ] (defer) Manual QA not required for documentation refresh.
      - [ ] (defer) User flows unaffected by documentation changes.
      - [ ] (defer) Critical paths untouched by documentation updates.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] (defer) Open PR via make_pr after commit.
      - [ ] (defer) PR template will be applied during make_pr step.
      - [ ] (defer) Title set during make_pr execution.
      - [ ] (defer) Checklist populated in PR body during make_pr.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0049-<PR or short hash>-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] (defer) Final review pending PR creation and merge process.
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
