# TASK-0049 – Documentation review

## Summary
- Reviewed repository documentation covering README, handover, automation, QA, and tool-specific guides.
- Updated references to automation pipeline flags (`--offline`, `--fallback-to-cache`, `--report`) and SCRAPER_BASE_URL usage.
- Documented private action inputs, regression checklist expectations, and generator CLI overrides.

## Command log
```
source .env
find .. -name AGENTS.md -print
ls tasks
cat <<'EOF' > tasks/TASK-0049-docs-review.md …
git checkout -b feature/2024-05-27---task-0049-docs-review
sed -n '1,160p' README.md
sed -n '1,200p' docs/handover/README.md
find docs -maxdepth 2 -type f -name '*.md'
sed -n '1,200p' docs/automation/README.md
cat package.json
sed -n '1,200p' docs/research/pvesh-vs-scrape.md
ls tools
sed -n '1,160p' tools/api-scraper/README.md
sed -n '1,160p' tools/api-normalizer/README.md
sed -n '1,200p' tools/openapi-generator/README.md
sed -n '1,160p' tools/automation/src/cli.ts
sed -n '1,200p' tools/automation/src/pipeline.ts
apply_patch … (multiple documentation updates)
sed -n '100,130p' docs/handover/README.md
rg "base-url" docs
python - <<'PY' … (task checklist updates)
git diff
```

## Decisions
- Treat automation pipeline documentation as the source of truth for CLI options and align all guides accordingly.
- Emphasize SCRAPER_BASE_URL for direct scraper runs since the CLI does not accept a base URL flag.
- Encourage attaching the pipeline summary JSON to QA and release assets to improve audit trails.
