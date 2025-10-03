# Documentation and Code Alignment Plan (October 2025)

## Summary
- Align documentation claims with the current automation and scraper implementations.
- Close the gap between README guidance and actual CLI behaviour to avoid developer confusion.
- Refresh internal reviews that still describe pre-migration limitations.

## Key findings
1. `SCRAPER_BASE_URL` overrides are documented for `npm run scraper:scrape`, but the CLI never reads the environment variable or exposes a base URL flag. Users cannot point the scraper at staging instances without modifying source. (See README.md:39 and docs/handover/README.md:71 vs. tools/api-scraper/src/cli.ts:4-23.)
2. Automation docs instruct `-- --fallback-to-cache=false`, yet the CLI only treats the flag as a boolean toggle (`true` when present) and throws when a value is supplied. This breaks the recommended workflow for surfacing scrape failures. (See README.md:34 and docs/automation/README.md:24 vs. tools/automation/src/cli.ts:10-35.)
3. README states `tools/api-scraper/tests/` holds both smoke and regression suites, but only a smoke spec exists. The documentation should either reflect reality or we should add regression coverage. (See README.md:48 vs. tools/api-scraper/tests/.)
4. `docs/automation/private-action-task-review.md:20-35` still claims the private-action release workflow skips `npm ci`, contradicting the current workflow that installs dependencies before packaging. This undermines the status of completed tasks.

## Execution steps
1. **TASK-0054 – Scraper base URL parity**
   - Allow `scraper:scrape` to honour `SCRAPER_BASE_URL` and add an explicit `--base-url` flag for manual overrides.
   - Extend Playwright smoke coverage (or add a targeted unit) to confirm the CLI propagates overrides.
   - Update README.md and docs/handover guidance to reference the supported flag/env.
2. **TASK-0055 – Automation fallback flag UX**
   - Adjust CLI argument parsing to accept `--fallback-to-cache=false` and `--no-fallback-to-cache` without crashing.
   - Add unit coverage for the parser and refresh documentation examples accordingly.
3. **TASK-0056 – Documentation refresh**
   - Decide whether to introduce a lightweight regression spec under `tools/api-scraper/tests/` or revise README wording; document the outcome and rationale.
   - Update `docs/automation/private-action-task-review.md` to reflect the release workflow’s current behaviour and mark resolved blockers.

## Deliverables
- Updated documentation and CLIs that match published guidance.
- Tests demonstrating the new behaviours where code changes are involved.
- Changelog entries per task capturing commands, decisions, and follow-up actions.

## Success criteria
- Manual runs of `npm run scraper:scrape` respect environment or flag overrides without code edits.
- `npm run automation:pipeline -- --fallback-to-cache=false` completes argument parsing without throwing and honours the intent of disabling cache fallback.
- README and task review docs describe the current test coverage and release workflow accurately.
- All new or updated docs are linked from the relevant tasks with acceptance checkboxes ticked when work lands.

## Open questions
- Should we introduce a true regression suite for the scraper or scope this cycle to documentation updates? Capture the decision under TASK-0056 before implementation.
