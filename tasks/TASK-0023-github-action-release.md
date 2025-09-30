Title
- Automate private GitHub Action release workflow.

Source of truth
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md

Requirements summary
- Create a GitHub Actions workflow that builds, tags, and publishes the private action.
- Generate GitHub releases with packaged assets and changelog entries.
- Support manual dispatch and automatic runs on main branch merges.

Scope
- Focus areas: .github/workflows/, plan/
- Out of scope: app/, tools/api-*, docs/openapi/
- Data model and types: Automation pipeline outputs remain canonical.

Allowed changes
- Add release workflow YAML and supporting scripts.
- Update documentation describing release triggers and required secrets.
- No changes to automation logic beyond packaging for release.

Branch
- feature/{date}---task-0023-github-action-release

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs are authenticated (gh, npm, etc.).
- Confirm the repository has the PR template and standard scripts.

Plan checklist
- [ ] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] If the project syncs schema or types from a remote system, trigger the sync on the target branch.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
- [ ] Audit the current implementation in the focus area.
      - [ ] Trace data flow from settings or inputs through persistence to output.
      - [ ] Identify missing mappings or dead configuration.
- [ ] Implement changes with small, focused commits.
      - [ ] Keep models aligned with generated types or schemas.
      - [ ] Remove unused config and wire only supported options end to end.
- [ ] Wire persistence and retrieval.
      - [ ] Validate input values.
      - [ ] Persist to storage or API and read back.
      - [ ] Handle undefined and default values.
- [ ] Tests and checks.
      - [ ] source .env
      - [ ] Install dependencies.
      - [ ] Run linter.
      - [ ] Build project or artifacts.
      - [ ] Run unit and integration tests.
- [ ] Functional QA.
      - [ ] Verify expected behavior on key user flows or endpoints.
      - [ ] Confirm no regressions in critical paths.
- [ ] Documentation.
      - [ ] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0023 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [ ] Changelog.
      - [ ] Create versions/CHANGELOG-TASK-0023-{PR or short hash}-1.md
      - [ ] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Release workflow can create a Git tag and GitHub release for the action.
- Release artifacts (dist bundle, metadata) are attached to the release.
- Workflow supports manual dispatch and post-merge execution.
- Documentation updated with release procedure.

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
