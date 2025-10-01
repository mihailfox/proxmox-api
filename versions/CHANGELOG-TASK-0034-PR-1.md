# TASK-0034 Plan to externalize OpenAPI spec artifacts (Revision 1)

## Summary
- Created task plan describing how to remove committed OpenAPI specs and rely on generated artifacts.
- Documented current pipeline, UI, and regression dependencies on `docs/openapi/` outputs.
- Outlined phased refactor covering tooling defaults, regression baselines, CI workflows, and developer documentation updates.

## Command log
```shell
find .. -name AGENTS.md -print
ls tasks
cat package.json
sed -n '1,200p' tools/openapi-generator/src/cli.ts
sed -n '1,200p' tools/automation/src/pipeline.ts
sed -n '1,200p' tests/regression/artifacts.spec.ts
sed -n '1,200p' tools/automation/src/regression/baselines.ts
sed -n '1,160p' docs/handover/README.md
sed -n '1,160p' docs/automation/README.md
```

## Notes
- No code changes were implemented; this revision captures the forward-looking refactor plan only.
