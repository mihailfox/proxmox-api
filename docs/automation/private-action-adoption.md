# Private GitHub Action adoption guide

Use this guide to integrate the TypeScript-based `proxmox-openapi-artifacts`
action into downstream repositories and validate the automation pipeline in
isolated environments.

## 1. Prerequisites

- Access to the private action repository (grant organization-level read
  permissions or vendor the action as a submodule).
- GitHub runner with Node.js 22 and the ability to install Playwright browsers.
- Repository permissions for the default `GITHUB_TOKEN` to download dependencies
  and upload artifacts.

## 2. Minimal workflow example

```yaml
name: generate-openapi

on:
  workflow_dispatch: {}
  push:
    branches: [main]

jobs:
  build-openapi:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: artifacts
        uses: org/private-proxmox-action/.github/actions/proxmox-openapi-artifacts@v0.3.0
        with:
          mode: ci
          install-playwright-browsers: false
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: proxmox-openapi
          path: |
            ${{ steps.artifacts.outputs.openapi-json }}
            ${{ steps.artifacts.outputs.openapi-yaml }}
```

Adjust the `uses:` reference to match the hosting strategy (internal repo tag,
branch, or commit SHA). Enable `install-playwright-browsers` for first-run
setups where the runner lacks cached browsers. The action installs its
dependencies on demand and executes the TypeScript entrypoint with `tsx`, so
downstream workflows do not need to manage a prebuilt `dist/` directory.

## 3. Sandbox validation checklist

- [ ] Run the workflow in a clean repository fork using the CI mode to confirm
      cached snapshots work end to end.
- [ ] Trigger the workflow with `mode: full` and `install-playwright-browsers:
      true` to ensure live scraping succeeds in the sandbox environment.
- [ ] Upload the generated artifacts and inspect them manually to verify parity
      with canonical outputs from this repository.

## 4. Troubleshooting

| Symptom | Mitigation |
| --- | --- |
| Workflow fails during dependency installation | Confirm the runner has permission to execute the `install-command` (defaults to `npm ci`). Override the input for environments that pre-bake dependencies. |
| Playwright browser download errors | Set `install-playwright-browsers: false` and pre-install browsers on the runner, or rerun with retries during off-peak hours. |
| Action outputs empty paths | Confirm the repository retains the default directory structure or provide explicit paths via the `raw-snapshot-path`, `ir-output-path`, and `openapi-dir` inputs. |

## 5. Versioning strategy

- Use semantic tags for stable releases created via the `private-action-release`
  workflow (for example `v0.2.0`).
- Consumers may track prerelease tags (`action-<sha>`) for rapid iteration but
  should pin to stable tags before shipping to production.
- Document the adopted tag in downstream repositories to aid audits and
  reproducibility.

## 6. Migration plan to the TypeScript action template

1. **Repository restructure** – create an `action/` workspace with `src/`,
   `dist/`, and `__tests__/` mirroring the template. Move the automation
   invoker logic into `src/main.ts` and keep shared helpers in
   `tools/automation/`.
2. **Execution workflow** – add validation scripts that lint and typecheck the
   action workspace and ensure `npm install` remains reproducible for release
   packaging.
3. **Release update** – modify `private-action-release` to publish the action
   workspace (metadata, sources, and lockfile) and, during transition, keep the
   tarball asset for downstream consumers still relying on the composite
   layout.
4. **Consumer change management** – document the required switch from
   `uses: repo/.github/actions/proxmox-openapi-artifacts@tag` to
   `uses: repo@tag`, highlight that Node 22 remains required for runtime but
   `npm ci` will become optional, and provide a dual-mode adoption window.
