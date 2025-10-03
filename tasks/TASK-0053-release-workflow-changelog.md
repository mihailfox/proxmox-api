Title
- Integrate versions changelog summaries into release workflow.

Source of truth
- README.md
- docs/handover/README.md
- .github/workflows/private-action-release.yml

Scope
- Focus: .github/workflows/private-action-release.yml, tools/scripts/**, docs/handover/README.md
- Out of scope: app/, public/
- Data model and types: Existing TypeScript utilities and workflow metadata outputs are the ground truth.

Allowed changes
- Update release workflow and helper scripts.
- Adjust supporting documentation.
- No schema edits.

Branch
- feature/2024-06-09---task-0053-release-workflow-changelog

Preconditions
- Run: source .env (if exists)
- Ensure GH CLI authenticated if required.
- Confirm PR template and scripts available.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] If the project syncs schema or types from a remote system, trigger the sync on the target branch.
- [ ] (defer) If the project syncs schema or types from a remote system, trigger the sync on the target branch. No remote schema
      sync exists for this repository slice.
      - [ ] (defer) gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] (defer) Verify updated schema, seed data, and generated types.
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
      - [x] source .env
      - [ ] (defer) Install dependencies. Node modules already present in workspace.
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
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0053 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0053-PR-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Requirements implemented.
- Types aligned.
- Acceptance commands pass.
- Behavior verified.
- PR opened with template and checklist.
- Changelog file exists and readable.
