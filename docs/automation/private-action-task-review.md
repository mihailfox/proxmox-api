# Private action review for TASK-0020–TASK-0028

## Summary
- The requirements brief for TASK-0020 still references the composite implementation, but the TypeScript action is now the canonical contract and the document should be refreshed accordingly. 【F:plan/private-github-action-plan.md†L139-L158】
- The TypeScript action continues to rely on the caller running `npm ci`, so packaging production dependencies remains an open follow-up for TASK-0022, even though CI and release automation now install the workspace successfully. 【F:tasks/TASK-0022-github-action-package.md†L10-L16】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L116】
- The `private-action-release` workflow now runs `npm ci` at the repository root before packaging, resolving the missing module failures noted during TASK-0023. Remaining improvements focus on dependency bundling rather than installer coverage. 【F:.github/workflows/private-action-release.yml†L125-L200】【F:tools/automation/src/pipeline.ts†L1-L188】
- Documentation from TASK-0024 should be updated to reflect the TypeScript layout and clarify that downstream consumers must either run the install step or adopt a future bundled distribution. 【F:docs/automation/private-action-adoption.md†L17-L92】

## Findings by task
### TASK-0020 – GitHub Action requirements
The requirements plan captured the original composite action contract, but it now diverges from the committed TypeScript bundle. The interface summary still names the composite location and omits expectations about installing the action package on a clean runner, so the requirements brief should be revised to match the new layout and publish-time dependency story. 【F:plan/private-github-action-plan.md†L139-L170】

### TASK-0021 – Automation entry point
`runAutomationPipeline` exposes a typed API that the TypeScript action imports, so the core refactor from this task is in place. No additional issues surfaced while reviewing this layer. 【F:tools/automation/src/pipeline.ts†L1-L188】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L7-L128】

### TASK-0022 – TypeScript action package
The package still depends on the caller executing `npm ci`, so bundling the pipeline runtime remains outstanding. Accept that limitation is documented for now, but future work should either vendor dependencies or publish a prebuilt artifact. 【F:tasks/TASK-0022-github-action-package.md†L10-L16】【F:.github/actions/proxmox-openapi-artifacts/package.json†L1-L22】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L120】

### TASK-0023 – Release workflow
The `release_action` job now installs the root workspace (`npm ci`) before packaging, so the previously reported missing module failures are resolved. Future improvements should focus on slimming the archive or bundling dependencies, not on installer parity. 【F:.github/workflows/private-action-release.yml†L125-L200】【F:tools/automation/src/pipeline.ts†L1-L188】

### TASK-0024 – Adoption documentation
The onboarding guide still points consumers at the in-repo `.github/actions/...` path and instructs them to keep running `npm ci`, which is incompatible with the long-term goal of shipping a standalone TypeScript action. The document should be rewritten once the packaging gap above is resolved so it reflects the final usage pattern. 【F:docs/automation/private-action-adoption.md†L17-L92】

### TASK-0025 – Workflow scope
The `automation-pipeline` workflow has scoped path filters and continues to enforce lint/build/test coverage. No additional changes are required for this task beyond keeping the triggers in sync if new automation folders are added. 【F:.github/workflows/automation-pipeline.yml†L1-L46】

### TASK-0026 – Action implementation
The TypeScript action behaves as expected, but it still depends on the caller running `npm ci` and lacks template niceties such as bundled dependencies, aggregated scripts, and dedicated tests. These parity items remain follow-ups. 【F:.github/actions/proxmox-openapi-artifacts/package.json†L6-L20】【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L129】

### TASK-0027 – Template alignment plan
The migration plan lists the steps required to match the `actions/typescript-action` template, but none of the optional enhancements (workspace restructure, aggregated scripts, dedicated tests) have been implemented yet. The plan should remain open until those items are delivered. 【F:docs/automation/private-action-adoption.md†L76-L92】【F:.github/actions/proxmox-openapi-artifacts/package.json†L6-L20】

### TASK-0028 – Migration progress
Converting the action to TypeScript landed most of the structural work, but the release pipeline is still broken and the package has not been made self-contained. Closing out TASK-0028 requires resolving the dependency packaging gap, updating the documentation, and proving the release workflow succeeds end to end. 【F:.github/actions/proxmox-openapi-artifacts/src/main.ts†L45-L129】【F:.github/workflows/private-action-release.yml†L91-L101】

## Recommended next steps
- Update the private action plan and adoption docs to describe the TypeScript bundle footprint and the desired `uses: org/repo@tag` consumer contract once packaging is fixed. 【F:plan/private-github-action-plan.md†L139-L170】【F:docs/automation/private-action-adoption.md†L17-L92】
- Decide whether to vendor the automation toolchain into the action bundle or install the workspace during release, then adjust the release workflow accordingly so builds succeed on fresh runners. 【F:.github/workflows/private-action-release.yml†L91-L101】【F:tools/automation/src/pipeline.ts†L1-L188】
- Track remaining template parity items (tests, aggregate scripts, dependency slimming) as explicit follow-ups before declaring TASK-0027/TASK-0028 complete. 【F:docs/automation/private-action-adoption.md†L76-L92】【F:.github/actions/proxmox-openapi-artifacts/package.json†L6-L20】
