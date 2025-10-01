# TASK-0001 – Codex mock for Proxmox API viewer (revision 1)

## Summary
- Added a Codex-aware Playwright route interceptor that serves local fixtures when `CODEX_ENV` is truthy, avoiding outbound requ
ests to `https://pve.proxmox.com/pve-docs/api-viewer/`.
- Generated mock HTML content and repurposed the existing raw snapshot to emit an `apidoc.js` payload on the fly for offline scr
apes and smoke tests.
- Updated Playwright smoke tests to automatically register the mock during Codex runs and documented the workflow in the task pla
n.

## Commands
```bash
npm install
npm run lint
npm run build
CODEX_ENV=true npm run test
```

## Notes
- No schema or type synchronization was required for this change.
- Documentation updates were deferred because the behavior is transparent outside the Codex automation environment.
