# TASK-0047 Workflow formatting fix

## Summary
- moved embedded Python for the release guard into `tools/scripts/fetch_pve_docs_metadata.py` to stabilise GitHub workflow execution
- reused the helper script inside the schema release job when fallback metadata is required
- recorded task progress and remaining deferrals in `tasks/TASK-0047-workflow-formatting.md`

## Command Log
- `npm ci`
- `npm run lint`
- `npm run build`
- `npm test`

## Outcomes
- release workflow formatting now relies on a dedicated helper script instead of inline Python heredocs
- automated checks for the repository passed locally

## Deferrals
- Functional QA of the GitHub Actions workflow is deferred to CI because the release path cannot be executed locally.
- Documentation updates are not required because runtime behavior is unchanged.
