# TASK-0046 — Prevent duplicate releases based on Proxmox docs version

## Summary
- Added a `release_guard` job that records Proxmox docs metadata and blocks automatic push-triggered releases when a matching schema tag already exists.
- Reused captured metadata in the schema publishing job to avoid redundant network calls while keeping manual overrides functional.

## Command log
- `npm ci`
- `npm run lint`
- `npm run build`
- `npm test`

## Decisions & notes
- Deferred functional QA to GitHub-hosted environments because the release workflow cannot be executed locally.
- Documentation updates were not required; behaviour changes are confined to the workflow implementation.
