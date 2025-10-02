# TASK-0039 — changelog (rev 1)

## Summary
- Added a TypeScript analysis utility (`tools/analysis/src/pvesh-comparison.ts`) that aggregates `PVE::API2::*` definitions across the upstream Perl repositories and compares them with the normalized scrape.
- Captured the comparison output in `docs/research/pvesh-comparison.json` and documented the findings in `docs/research/pvesh-vs-scrape.md`.
- Updated the task ticket with the extracted requirements and completion state for the source-of-truth review.

## Command log
- `npx ts-node --project tools/analysis/tsconfig.json tools/analysis/src/pvesh-comparison.ts --official ... --output docs/research/pvesh-comparison.json --limit 15`
- `jq` one-off queries against `docs/research/pvesh-comparison.json` to inspect counts and endpoint gaps.
- Standard git operations to stage, commit, and amend artefacts for the branch.

## Decisions & notes
- Collapsed multiple upstream repositories into the comparison to cover cluster, storage, firewall, container, and QEMU namespaces.
- Documented that 200 viewer endpoints are registered dynamically or originate from newer/proprietary builds, which explains their absence in the public Perl sources.
- Left broader automation (schema sync, tests) deferred because this task is strictly research/documentation.
