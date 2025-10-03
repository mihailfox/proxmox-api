Title
- Honour SCRAPER_BASE_URL and add a `--base-url` flag to `scraper:scrape`.

Source of truth
- README.md (Quickstart options). 
- docs/handover/README.md §4.1 (scraper guidance).
- plan/doc-code-alignment-2025-10.md (execution step 1).

Scope
- Update tools/api-scraper CLI entrypoint and supporting tests.
- Refresh relevant documentation snippets (README, docs/handover, module README as needed).
- Ensure automation pipeline continues to function after CLI adjustments (smoke only).

Allowed changes
- TypeScript sources under tools/api-scraper/.
- Associated tests and mocks for CLI behaviour.
- Documentation strictly tied to scraper usage.
- No unrelated refactors or automation pipeline changes.

Branch
- feature/2025-10-03---task-0054-scraper-base-url

Preconditions
- Install repository dependencies (`npm install`).
- Ensure Playwright browsers are provisioned if running smoke tests (`npx playwright install --with-deps`).

Plan checklist
- [x] Audit CLI usage in tooling and automation scripts to confirm expectation alignment.
- [x] Implement environment + flag support for base URL resolution (with sensible precedence).
- [x] Extend tests (unit or integration) covering CLI option parsing and propagation.
- [x] Update README.md, docs/handover/README.md, and tools/api-scraper/README.md with accurate override instructions.
- [x] Run lint, build, and affected test suites (Playwright smoke if feasible) before submission.
- [x] Prepare PR with Conventional Commit message and link back to this task; document results in versions/ changelog entry.

Acceptance criteria
- Running `npm run scraper:scrape` honours `SCRAPER_BASE_URL` without code edits.
- An optional `npm run scraper:scrape -- --base-url=<url>` override is documented and tested.
- Regression: existing automation pipeline behaviour remains unchanged when no overrides are provided.
- Documentation references up-to-date override mechanisms.

Acceptance commands template
- `npm run lint`
- `npm run build`
- `npm run test` (optional if CLI unit tests are added)
- `npm run scraper:scrape -- --base-url=https://example.test/` (dry run validating option parsing; may require mocks)
