# Changelog — TASK-0045 Release versioning strategy

## Summary
- Automated semantic version calculation in the `private-action-release` workflow with manual override support and publish-time validation guards.
- Captured upstream Proxmox docs metadata during schema releases, attaching a JSON manifest and tagging releases with the detected version string.
- Updated the handover guide to explain the new automatic version bumping behaviour and schema release metadata.

## Command log
- source .env (repository root)
- npm install
- npm run lint
- npm run build
- npm test

## Decisions and notes
- Default releases now bump the previous `vX.Y.Z` tag's patch component; maintainers can still supply an explicit semantic version (including prereleases) via `workflow_dispatch`.
- Schema releases emit `schema-<version>-pve-<docsVersion>` tags and ship a `pve-metadata.json` asset so downstream consumers can align artifacts with the upstream documentation snapshot.
- Combining generated release notes with curated metadata via `gh release create` is achieved by attaching the metadata as a separate asset to avoid conflicting CLI flags.

## Deferred or follow-up work
- Live functional QA of the GitHub workflow remains deferred until the updated release pipeline runs in GitHub Actions.
- Schema/type synchronization is not applicable for this workflow-focused change.
