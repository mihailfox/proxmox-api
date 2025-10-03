# TASK-0054 Documentation/code alignment planning (rev 1)

## Summary
- Captured the October 2025 alignment plan covering scraper overrides, automation fallback semantics, and documentation refresh needs. 【F:plan/doc-code-alignment-2025-10.md†L1-L60】
- Spawned follow-up tasks for scraper base URL support (TASK-0054), automation fallback flag UX (TASK-0055), and documentation sync work (TASK-0056). 【F:tasks/TASK-0054-scraper-base-url.md†L1-L54】【F:tasks/TASK-0055-automation-fallback-flag.md†L1-L53】【F:tasks/TASK-0056-doc-sync.md†L1-L49】

## Command log
- `ls -R` to establish repository layout and locate documentation/tooling surfaces.
- `nl -ba README.md | sed -n '30,90p'` to confirm published CLI guidance conflicting with current behaviour.
- `nl -ba docs/handover/README.md | sed -n '60,90p'` to verify scraper environment variable instructions.
- `nl -ba tools/api-scraper/src/cli.ts` and `nl -ba tools/api-scraper/src/scraper.ts | sed -n '1,80p'` to inspect override handling.
- `nl -ba tools/automation/src/cli.ts | sed -n '1,80p'` to review boolean flag parsing.
- `ls -1 tools/api-scraper/tests` to evaluate actual Playwright coverage.
- `nl -ba docs/automation/private-action-task-review.md | sed -n '20,80p'` alongside `nl -ba .github/workflows/private-action-release.yml | sed -n '120,220p'` to confirm documentation drift around the release workflow.
