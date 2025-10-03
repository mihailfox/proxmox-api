Title
- Fix automation CLI fallback flag UX and documentation.

Source of truth
- README.md (Quickstart flag list).
- docs/automation/README.md (CLI options section).
- plan/doc-code-alignment-2025-10.md (execution step 2).

Scope
- Adjust tools/automation/src/cli.ts (and supporting utilities if needed) so `--fallback-to-cache=false` and `--no-fallback-to-cache` behave as documented.
- Add focused tests validating option parsing.
- Update docs that describe the flag semantics.

Allowed changes
- TypeScript sources under tools/automation/.
- Companion test files (unit tests preferred to avoid triggering the full pipeline).
- Documentation related to automation CLI usage.
- No broader pipeline refactors.

Branch
- feature/2025-10-03---task-0055-automation-fallback-flag

Preconditions
- Install dependencies (`npm install`).

Plan checklist
- [x] Review CLI consumption patterns (automation pipeline, private action) for compatibility impacts.
- [x] Update argument parsing to accept explicit false values without throwing (support both `--fallback-to-cache=false` and `--no-fallback-to-cache`).
- [x] Add regression tests covering true/false/omitted cases.
- [x] Refresh README.md and docs/automation/README.md examples with the supported syntax.
- [x] Execute lint/build/unit tests (automation-focused) before submitting changes. *(Automation tests require Vitest workers and cannot run in this sandbox; parser suite executed locally via Vitest run.)*
- [x] Record outcomes in versions/ changelog and link this task in the PR template.

Acceptance criteria
- Passing explicit false values no longer triggers parse errors.
- Pipeline respects user intent when fallback is disabled.
- Documentation mirrors the accepted CLI syntax.
- Existing automation consumers continue to function without modifications when the flag is omitted or set to true.

Acceptance commands template
- `npm run lint`
- `npm run build`
- `npm run test:automation`
- `npx tsx tools/automation/src/cli.ts --mode=full --fallback-to-cache=false --offline` (optional smoke to confirm parsing; can be run with `--offline` to avoid network)
