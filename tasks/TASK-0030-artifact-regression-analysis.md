Title
- Investigate regression artifact baseline mismatch

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- Existing regression baselines defined in tools/automation/src/regression/baselines.ts

Requirements summary
- Regression safeguards must detect upstream documentation or artifact changes.
- OpenAPI artifacts (JSON and YAML) should remain consistent with generated output from the normalized IR.

Scope
- Focus areas: docs/openapi/, tools/automation/src/regression/, tests/regression/
- Out of scope: app/, tools/api-scraper/, tools/api-normalizer/, tools/openapi-generator/ implementation changes
- Data model and types: Follow generated types in tools/api-normalizer/src/types and related TypeScript interfaces.

Allowed changes
- Documentation and investigative notes within the focus area.
- Updates to regression baseline metadata if aligned with generated artifacts.
- No schema edits or upstream scraper/normalizer changes.

Branch
- work (current branch retained for analysis per task request)

Preconditions
- Run: source .env (if exists)
- Ensure required CLIs (Node.js, npm) are available.
- Confirm regression test script `npm run test:regression` is accessible.

Plan checklist
- [x] Read the Source of Truth in order. Extract requirements into a short list.
- [ ] If the project syncs schema or types from a remote system, trigger the sync on the target branch.
      Example with GitHub CLI:
      - [ ] gh workflow run "<WORKFLOW NAME>" --ref <BRANCH>
      - [ ] Verify updated schema, seed data, and generated types.
- [x] Audit the current implementation in the focus area.
      - [x] Trace data flow from settings or inputs through persistence to output.
      - [x] Identify missing mappings or dead configuration.
- [ ] Implement changes with small, focused commits.
      - [ ] Keep models aligned with generated types or schemas.
      - [ ] Remove unused config and wire only supported options end to end.
- [ ] Wire persistence and retrieval.
      - [ ] Validate input values.
      - [ ] Persist to storage or API and read back.
      - [ ] Handle undefined and default values.
- [x] Tests and checks.
      - [x] source .env
      - [ ] Install dependencies.
      - [x] Run regression tests to reproduce failure.
      - [ ] Run additional unit and integration tests as applicable.
- [ ] Functional QA.
      - [ ] Verify expected behavior on key user flows or endpoints.
      - [ ] Confirm no regressions in critical paths.
- [x] Documentation.
      - [x] Update docs only if behavior changed. Keep changes concise.
- [ ] Commits using Conventional Commits.
      - [ ] feat(...), fix(...), chore(...), docs(...), refactor(...)
- [ ] Open PR.
      - [ ] Use the repo PR template.
      - [ ] Title: feat: TASK-0030 short description
      - [ ] Body: link this task file, paste checklist, tick completed items, list deferrals.
- [x] Changelog.
      - [x] Create versions/CHANGELOG-TASK-0030-{PR or short hash}-1.md
      - [x] Include the command log, key decisions, and outcomes.
- [ ] Done.
      - [ ] Mark remaining boxes as - [ ] (defer) with reasons.

Acceptance criteria
- Regression baseline mismatch is documented with root cause analysis.
- Plan outlines steps to realign OpenAPI artifacts with expected checksums.
- Recommended verification steps ensure `npm run test:regression` passes after remediation.
- PR and changelog steps prepared for future implementation.

Investigation notes
- `npm run test:regression` currently fails because the OpenAPI JSON and YAML artifacts no longer match their recorded SHA-256 baselines, while the raw snapshot and normalized IR still pass.
- The stored baselines expect `7d1b572844bee1298fdfbccd47a36b7ce21740b908ebd93a54e4c62888e5bdf3` for the JSON document and `d1cb8459518bd2416a2ec47bc0d45ef604df0ea6fc983f01f6aa8d86b1cd0338` for the YAML document, but the current files hash to `19f286459da70f728368e782892f052002fa19481d0a886f5cf8ca275da0b1be` and `46e89c6904327fd81b813bc91f2a0bcb1bd1e7f3bf7c56fc3fc853e968f2850d` respectively.
- Downstream parity checks (operation counts and JSON/YAML equivalence) still succeed, indicating the artifacts are internally consistent and likely need refreshed baselines.

Remediation plan
1. Regenerate OpenAPI artifacts via `npm run openapi:generate` (or the broader automation pipeline) using the current normalized IR to confirm the checked-in JSON and YAML files are accurate.
2. Validate the regenerated documents with `npm run openapi:validate` to ensure schema compliance.
3. Update the checksum entries in `tools/automation/src/regression/baselines.ts` to the new SHA-256 values produced by the artifacts.
4. Re-run `npm run test:regression` to verify the artifacts align with the refreshed baselines and that parity checks remain green.
