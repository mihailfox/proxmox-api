# TASK-0003 Automate Proxmox API scraping

## Key decisions
- Downloaded `apidoc.js` via Playwright `fetch` calls to access the embedded `apiSchema` payload without relying on fragile DOM
  selectors.
- Normalized the raw schema into a sorted tree of endpoints and persisted a deterministic snapshot at
  `tools/api-scraper/data/raw/proxmox-api-schema.json` for downstream processing.
- Added regression coverage that exercises the new extraction utilities and asserts critical endpoints remain present in the
  Proxmox documentation.

## Command log
- `npm run scraper:scrape`
- `[ -f .env ] && source .env`
- `npm install`
- `npm run lint`
- `npm run build`
- `npm test`

## Outcomes
- Scraper CLI now emits metadata (title, counts, timestamp) alongside the Proxmox API tree snapshot.
- Tests confirm the viewer loads and the parsed schema still lists key endpoints such as `/nodes` and `/version`.
- Documentation explains how to run the scraper and troubleshoot Playwright/browser issues.
