# Plan: Fix private-action-release dist out-of-date failure

## Context
The `Validate action tooling` job in the private-action-release workflow fails because the compiled distribution at `.github/actions/proxmox-openapi-artifacts/dist` diverges from the TypeScript sources. The job checks that `dist` and `package-lock.json` match the repository state; when they do not, it asks maintainers to run `npm run package --prefix .github/actions/proxmox-openapi-artifacts`.

## Objectives
1. Align the `dist` bundle with the current sources so CI passes.
2. Prevent future drift between the TypeScript source and compiled output.
3. Document the process for regenerating the action bundle when sources change.

## Step-by-step plan
1. **Audit current differences**
   - Run `git status --short .github/actions/proxmox-openapi-artifacts` to confirm which files are dirty.
   - Inspect diffs in `dist/index.js` and related outputs to understand the drift from `src`.
   - Verify whether `package-lock.json` also differs.

2. **Rebuild the action dist**
   - Execute `npm install --prefix .github/actions/proxmox-openapi-artifacts` to ensure dependencies match the lockfile.
   - Run `npm run package --prefix .github/actions/proxmox-openapi-artifacts` to regenerate the compiled JavaScript in `dist`.
   - Confirm the command completes without errors.

3. **Validate generated artifacts**
   - Compare the regenerated `dist` files with source expectations; ensure no unexpected files appear or disappear.
   - If TypeScript configs changed, check `tsconfig.json` and build scripts for necessary adjustments.
   - Re-run `git status` to make sure only intended files changed.

4. **Update project documentation**
   - If instructions for rebuilding the action are missing or outdated, update relevant docs (e.g., README, action-specific docs) with the regeneration command.

5. **Add CI safeguard (optional)**
   - Evaluate adding a dedicated script or pre-commit hook that runs the packaging command when `src` changes.
   - Alternatively, document the expectation in contributor guidelines.

6. **Commit and verify**
   - Stage updated `dist` files (and `package-lock.json` if modified).
   - Commit with a Conventional Commit message, e.g., `chore(action): rebuild proxmox openapi artifacts dist`.
   - Run the workflow or pertinent tests locally if feasible, then push and ensure CI passes.

## Risks and mitigations
- **Outdated dependencies**: Running `npm install` may update the lockfile unintentionally. Mitigate by ensuring the install is deterministic and matches the repository's Node version.
- **Missing build prerequisites**: If the packaging script depends on environment variables, document them and provide defaults.
- **Future drift**: Reinforce contributor guidelines and consider automation to detect and regenerate bundles before merging.

## Acceptance validation
- `git status` should be clean after running the rebuild steps.
- The CI job `Validate action tooling` succeeds, confirming `dist` is up to date.
- Documentation clearly states how to regenerate the bundle.

## Execution log
- 2025-02-14: Ran `npm install --prefix .github/actions/proxmox-openapi-artifacts` and `npm run package --prefix .github/actions/proxmox-openapi-artifacts` to refresh the bundled `dist/` output.
