# Private action review for TASK-0020–TASK-0028

## Summary
- The planning docs describe the private action migration but still reference the composite implementation, so the requirements brief for TASK-0020 needs to be updated for the TypeScript action layout. 【F:plan/private-github-action-plan.md†L139-L158】
- TASK-0022's requirement to bundle production dependencies has not been met because the action continues to rely on `npm ci` in the caller repository, leaving Playwright and pipeline dependencies outside the published package. 【F:tasks/TASK-0022-github-action-package.md†L10-L16】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L116】
- The release workflow in TASK-0023 installs only the action workspace dependencies before bundling, so a fresh runner fails to resolve automation modules such as `playwright`, `yaml`, and `swagger-parser`. 【F:.github/workflows/private-action-release.yml†L91-L101】【F:tools/automation/src/pipeline.ts†L1-L188】
- Documentation created for TASK-0024 still guides consumers to invoke the action from the `.github/actions/...` path instead of the template-style repository root, signalling that the migration plan in TASK-0027/TASK-0028 remains unfinished. 【F:docs/automation/private-action-adoption.md†L17-L92】

## Findings by task
### TASK-0020 – GitHub Action requirements
The requirements plan captured the original composite action contract, but it now diverges from the committed TypeScript bundle. The interface summary still names the composite location and omits expectations about installing the action package on a clean runner, so the requirements brief should be revised to match the new layout and publish-time dependency story. 【F:plan/private-github-action-plan.md†L139-L170】

### TASK-0021 – Automation entry point
`runAutomationPipeline` exposes a typed API that the TypeScript action imports, so the core refactor from this task is in place. No additional issues surfaced while reviewing this layer. 【F:tools/automation/src/pipeline.ts†L1-L188】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L7-L128】

### TASK-0022 – TypeScript action package
The package installs only the GitHub Action SDK modules and continues to execute `npm ci` in the repository workspace. This contradicts the requirement to bundle production dependencies for downstream users, and it is the root cause of the release workflow failure because the action cannot compile without the root toolchain dependencies on a clean checkout. 【F:tasks/TASK-0022-github-action-package.md†L10-L16】【F:.github/actions/proxmox-openapi-artifacts/package.json†L1-L22】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L120】

### TASK-0023 – Release workflow
The publishing job never runs `npm ci` at the repository root before invoking `npm run package --prefix ...`, so TypeScript cannot resolve modules imported from `tools/automation` when the runner lacks cached dependencies. This is why the workflow currently fails with missing module errors. Updating the job to install the root workspace (or vendoring the dependencies into the action) remains outstanding work. 【F:.github/workflows/private-action-release.yml†L91-L101】【F:tools/automation/src/pipeline.ts†L1-L188】

### TASK-0024 – Adoption documentation
The onboarding guide still points consumers at the in-repo `.github/actions/...` path and instructs them to keep running `npm ci`, which is incompatible with the long-term goal of shipping a standalone TypeScript action. The document should be rewritten once the packaging gap above is resolved so it reflects the final usage pattern. 【F:docs/automation/private-action-adoption.md†L17-L92】

### TASK-0025 – Workflow scope
The `automation-pipeline` workflow has scoped path filters and continues to enforce lint/build/test coverage. No additional changes are required for this task beyond keeping the triggers in sync if new automation folders are added. 【F:.github/workflows/automation-pipeline.yml†L1-L46】

### TASK-0026 – Action implementation
Although the TypeScript action runs, it still depends on the caller running `npm ci` and lacks template parity features such as a dedicated test suite or `npm run all`. Completing those parity items and removing the runtime dependency installation should be tracked as follow-up work. 【F:.github/actions/proxmox-openapi-artifacts/package.json†L6-L20】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L129】

### TASK-0027 – Template alignment plan
The migration plan lists the steps required to match the `actions/typescript-action` template, but none of the optional enhancements (workspace restructure, aggregated scripts, dedicated tests) have been implemented yet. The plan should remain open until those items are delivered. 【F:docs/automation/private-action-adoption.md†L76-L92】【F:.github/actions/proxmox-openapi-artifacts/package.json†L6-L20】

### TASK-0028 – Migration progress
Converting the action to TypeScript landed most of the structural work, but the release pipeline is still broken and the package has not been made self-contained. Closing out TASK-0028 requires resolving the dependency packaging gap, updating the documentation, and proving the release workflow succeeds end to end. 【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L129】【F:.github/workflows/private-action-release.yml†L91-L101】

## Recommended next steps
- Update the private action plan and adoption docs to describe the TypeScript bundle footprint and the desired `uses: org/repo@tag` consumer contract once packaging is fixed. 【F:plan/private-github-action-plan.md†L139-L170】【F:docs/automation/private-action-adoption.md†L17-L92】
- Decide whether to vendor the automation toolchain into the action bundle or install the workspace during release, then adjust the release workflow accordingly so builds succeed on fresh runners. 【F:.github/workflows/private-action-release.yml†L91-L101】【F:tools/automation/src/pipeline.ts†L1-L188】
- Track remaining template parity items (tests, aggregate scripts, dependency slimming) as explicit follow-ups before declaring TASK-0027/TASK-0028 complete. 【F:docs/automation/private-action-adoption.md†L76-L92】【F:.github/actions/proxmox-openapi-artifacts/package.json†L6-L20】
