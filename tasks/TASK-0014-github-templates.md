Title
- Create GitHub templates for commits and PRs.

Source of truth
- README.md

Scope
- Focus areas. .github directory.
- Out of scope. All application source directories (app, public, tools, etc.).
- Data model and types. Not applicable; follow existing documentation.

Allowed changes
- Add configuration or templates under .github.
- No application code changes.

Branch
- feature/2025-09-29---task-0014-github-templates

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated. Example: gh, test runners, deployment tools.
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] (defer) No remote schema or type sync required for documentation-only changes.
      Example with GitHub CLI:
-      - [ ] (defer) No workflows triggered for this task.
-      - [ ] (defer) No schema artifacts to verify.
- [x] Audit the current implementation in the focus area.
      - [ ] (defer) No runtime data flow for template configuration.
      - [ ] (defer) No existing mappings applicable.
- [x] Implement changes with small, focused commits.
      - [ ] (defer) No models or generated types involved.
      - [ ] (defer) No runtime configuration touched.
- [ ] (defer) Persistence wiring not applicable to template files.
      - [ ] (defer) No inputs to validate.
      - [ ] (defer) No storage interactions involved.
      - [ ] (defer) No default handling required.
- [ ] (defer) Tests and automated checks not run for documentation-only changes.
      - [ ] (defer) Environment sourcing not needed beyond initial run.
      - [ ] (defer) Dependencies unchanged.
      - [ ] (defer) Linting not applicable to Markdown-only updates.
      - [ ] (defer) No build artifacts generated.
      - [ ] (defer) No code paths exercised by tests.
- [ ] (defer) Functional QA not required for template additions.
      - [ ] (defer) No user flows affected.
      - [ ] (defer) No critical paths impacted.
- [x] Documentation.
      - [ ] (defer) No additional docs beyond templates required.
- [x] Commits using Conventional Commits.
      - [x] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0014 {short description}
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0014-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

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
