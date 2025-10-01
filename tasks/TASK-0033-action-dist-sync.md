Title
- Repair private action release dist sync

Source of truth
- plan/private-github-action-plan.md
- docs/automation/README.md
- docs/automation/private-action-adoption.md
- docs/automation/private-action-task-review.md

Scope
- Focus areas. .github/actions/proxmox-openapi-artifacts (src, dist, package metadata), .github/workflows/private-action-release.yml.
- Out of scope. tools/automation/src beyond import compatibility, downstream app/ docs unrelated to private action.
- Data model and types. Canonical automation pipeline types defined in tools/automation/src and generated OpenAPI artifacts committed in docs/openapi.

Allowed changes
- Update TypeScript action source, bundled dist output, and workflow packaging steps to keep dist in sync.
- Adjust documentation strictly related to the private action release process.
- Shared utilities only if required for packaging parity (non-breaking additions).
- No schema or OpenAPI artifact edits.

Branch
- feature/2025-10-01---task-0033-action-dist-sync

Preconditions
- Run: source .env (if exists)
- Ensure Node.js/npm available via repo toolchain.
- Confirm repository includes PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) Schema sync not applicable for this packaging-only task.
      - [ ] (defer) No remote workflow trigger required.
      - [ ] (defer) No schema artifacts changed.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [x] Implement changes with small, focused commits.
      - [x] Keep models aligned with generated types or schemas.
      - [x] Remove unused config and wire only supported options end to end.
- [ ] (defer) Persistence unaffected by action bundle regeneration.
      - [ ] (defer) Input validation untouched in this task.
      - [ ] (defer) No persistence layer changes.
      - [ ] (defer) Defaults unchanged by dist sync.
- [x] Tests and checks.
      - [x] source .env
      - [x] Install dependencies.
      - [x] Run linter.
      - [x] Build project or artifacts.
      - [x] Run unit and integration tests.
- [ ] (defer) QA limited to automated tests for this backend-only change.
      - [ ] (defer) No user flow adjustments introduced.
      - [ ] (defer) Regression risk covered by existing automated suite.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] (defer) PR will be opened via make_pr using the repository template.
      - [ ] (defer) Template usage tracked in PR body.
      - [ ] (defer) Title to follow feat: TASK-0033 … format in PR.
      - [ ] (defer) Checklist and link provided in PR body.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0033-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] (defer) Final wrap-up will occur after PR review.
      - [ ] (defer) Outstanding deferrals documented above.

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
