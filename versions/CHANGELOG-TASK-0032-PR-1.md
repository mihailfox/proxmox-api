# TASK-0032 – Restore OpenAPI artifact regression baselines

## Summary
- Regenerated the OpenAPI JSON and YAML specifications from the normalized IR so the metadata matches the authoritative dataset.
- Updated the regression baseline hashes to track the refreshed OpenAPI artifacts and unblock checksum assertions.

## Command log
```bash
if [ -f .env ]; then source .env; fi
npm run openapi:generate
npm run test:regression
```

## Decisions and notes
- Previous OpenAPI artifacts encoded outdated scrape and normalization timestamps that no longer matched the IR baseline, causing checksum drift when regenerating.
- Documentation changes were unnecessary because no user-facing behavior changed; only regression assets were refreshed.
- Schema/type sync was not triggered because the canonical references already live in-repo and were validated through the regression suite.
