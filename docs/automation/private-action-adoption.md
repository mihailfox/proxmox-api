# Private GitHub Action adoption guide

Use this guide to integrate the `proxmox-openapi-artifacts` action into downstream
repositories and validate the automation pipeline in isolated environments.

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
        uses: org/private-proxmox-action/.github/actions/proxmox-openapi-artifacts@v0.2.0
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
setups where the runner lacks cached browsers.

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
| Workflow fails with `Cannot find module 'ts-node'` | Ensure `npm ci` ran successfully; check that the runner has network access to download dev dependencies. |
| Playwright browser download errors | Set `install-playwright-browsers: false` and pre-install browsers on the runner, or rerun with retries during off-peak hours. |
| Action outputs empty paths | Confirm the repository retains the default directory structure or provide explicit paths via the `raw-snapshot-path`, `ir-output-path`, and `openapi-dir` inputs. |

## 5. Versioning strategy

- Use semantic tags for stable releases created via the `private-action-release`
  workflow (for example `v0.2.0`).
- Consumers may track prerelease tags (`action-<sha>`) for rapid iteration but
  should pin to stable tags before shipping to production.
- Document the adopted tag in downstream repositories to aid audits and
  reproducibility.
