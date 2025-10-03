# TASK-0054 scraper base URL support (rev 1)

## Summary
- Updated `npm run scraper:scrape` to honour `SCRAPER_BASE_URL` and a new `--base-url` flag, ensuring staging viewers are reachable without source edits. 【F:tools/api-scraper/src/cli.ts†L1-L37】【F:tools/api-scraper/src/cli-options.ts†L1-L37】
- Refreshed documentation (README, handover guide, module README) to describe the override workflow. 【F:README.md†L39-L40】【F:docs/handover/README.md†L64-L72】【F:tools/api-scraper/README.md†L8-L16】
- Added a lightweight `npm run test:scraper` check that exercises CLI argument parsing via ts-node. 【F:package.json†L24-L40】【F:tools/api-scraper/tests/cli-options.spec.ts†L1-L55】

## Command log
- `npm run lint`
- `npm run build`
- `npm run test:scraper`
