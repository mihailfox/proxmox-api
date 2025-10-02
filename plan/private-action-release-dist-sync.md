# Plan: Fix private-action-release dist out-of-date failure

## Context
Historical failures of the `Validate action tooling` job stemmed from drift between the compiled distribution under `.github/actions/proxmox-openapi-artifacts/dist` and the TypeScript sources. The workspace now executes its TypeScript entrypoint directly with `tsx`, removing the prebuilt `dist/` directory from version control. The job instead verifies that the workspace installs cleanly and passes lint/typecheck checks.

## Objectives
1. Ensure the action workspace dependencies install without mutation so CI passes.
2. Prevent future drift by keeping lint and typecheck scripts green.
3. Document the process for validating the action workspace when sources change.

## Step-by-step plan
1. **Audit current differences**
   - Run `git status --short .github/actions/proxmox-openapi-artifacts` to confirm which files are dirty.
   - Inspect diffs in `src/**` and `package-lock.json` to understand pending changes.

2. **Validate the action workspace**
   - Execute `npm install --prefix .github/actions/proxmox-openapi-artifacts` to ensure dependencies match the lockfile.
   - Run `npm run lint --prefix .github/actions/proxmox-openapi-artifacts` and `npm run typecheck --prefix .github/actions/proxmox-openapi-artifacts`.
   - Confirm both commands complete without errors.

3. **Validate generated artifacts**
   - If TypeScript configs changed, check `tsconfig.json` and scripts for necessary adjustments.
   - Re-run `git status` to make sure only intended files changed.

4. **Update project documentation**
   - If instructions for rebuilding the action are missing or outdated, update relevant docs (e.g., README, action-specific docs) with the regeneration command.

5. **Add CI safeguard (optional)**
   - Evaluate adding a dedicated script or pre-commit hook that runs the packaging command when `src` changes.
   - Alternatively, document the expectation in contributor guidelines.

6. **Commit and verify**
   - Stage updated source files and `package-lock.json` if modified.
   - Commit with a Conventional Commit message summarising the validation work.
   - Run the workflow or pertinent tests locally if feasible, then push and ensure CI passes.

## Risks and mitigations
- **Outdated dependencies**: Running `npm install` may update the lockfile unintentionally. Mitigate by ensuring the install is deterministic and matches the repository's Node version.
- **Missing build prerequisites**: If the packaging script depends on environment variables, document them and provide defaults.
- **Future drift**: Reinforce contributor guidelines and consider automation to detect and regenerate bundles before merging.

## Acceptance validation
- `git status` should be clean after running the validation steps.
- The CI job `Validate action tooling` succeeds, confirming lint/typecheck remain green.
- Documentation clearly states how to validate the workspace.

## Execution log
- 2025-02-14: Ran `npm install --prefix .github/actions/proxmox-openapi-artifacts` and `npm run package --prefix .github/actions/proxmox-openapi-artifacts` to refresh the bundled `dist/` output.
- 2025-10-02: Migrated the plan to the on-demand `tsx` execution model; validation now focuses on lint/typecheck instead of rebuilding `dist/`.
