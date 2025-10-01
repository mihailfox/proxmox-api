# TASK-0031 – Refresh OpenAPI artifact baselines

## Summary
- Updated regression baseline hashes for the committed OpenAPI JSON and YAML documents to match the current artifacts.
- Verified lint, TypeScript builds, and regression QA to ensure refreshed baselines pass.

## Command log
```bash
if [ -f .env ]; then source .env; fi
npm install
npm run lint
npm run build
npm run test:regression
```

## Decisions and notes
- No upstream scrape or normalization changes were necessary; existing raw snapshot and IR baselines already matched recorded hashes.
- Documentation updates were deferred because behavior and user-facing instructions remained unchanged.
- Remote schema/type sync was deferred; all authoritative artifacts reside in-repo and were validated locally.
