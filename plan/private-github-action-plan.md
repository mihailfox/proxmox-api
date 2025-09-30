# Private GitHub Action Plan for OpenAPI Artifact Generation

## Overview
This document outlines the steps required to package the existing Proxmox API
automation pipeline into a reusable, private GitHub Action. The action must
run the established scrape → normalize → OpenAPI generation workflow and emit
portable artifacts that downstream repositories can consume.

## Objectives
- Encapsulate the automation pipeline into a GitHub Action with clearly defined
  inputs, outputs, and caching behaviour.
- Ensure the action can operate in private repositories without exposing
  sensitive credentials.
- Provide release automation so new action versions can be published via
  GitHub Actions workflows.
- Document usage patterns for other projects to adopt the action quickly.

## Constraints and assumptions
- Reuse the existing Node.js + Playwright tooling; avoid rewriting the
  pipeline.
- Action consumers may not have Playwright dependencies preinstalled; the
  action must bootstrap its environment.
- The action should support both CI-mode (cached artifacts) and full-mode
  (fresh scrape) executions similar to the local pipeline.
- Artifact outputs must remain OpenAPI 3.1 compatible JSON/YAML files aligned
  with the canonical specs committed in this repository.

## Deliverables
1. Task tickets describing the implementation phases required to deliver the
   private action.
2. Updated documentation detailing the action design, inputs/outputs, and
   release process.

## Implementation phases and task mapping

### 1. Define action requirements and interface
- Audit existing automation commands and identify the minimum inputs/outputs
  the action must expose.
- Document runtime expectations (Node version, cache directories, secrets) and
  portability requirements.
- Produce a design brief covering composite vs. JavaScript action trade-offs
  and CI integration guidelines.
- **Task**: [TASK-0020](../tasks/TASK-0020-github-action-requirements.md)

### 2. Extract reusable automation entry point
- Refactor or wrap the current `automation:pipeline` command into a dedicated
  script that the GitHub Action can call with parameter overrides.
- Ensure the script supports configurable output directories for downstream
  repositories.
- Add smoke tests validating the script executes in both CI-mode and full-mode
  without repository-specific assumptions.
- **Task**: [TASK-0021](../tasks/TASK-0021-github-action-entrypoint.md)

### 3. Author the private GitHub Action package
- Implement the TypeScript action under
  `.github/actions/proxmox-openapi-artifacts`, replacing the composite wrapper.
- Use `esbuild` to bundle the automation entry point and shared helpers into
  `dist/index.js`, mirroring the expectations of `actions/typescript-action`.
- Keep dependency bootstrapping (npm install, optional Playwright browsers)
  inside the action runtime until Playwright binaries are pre-provisioned.
- Wire outputs (e.g., generated artifact paths, checksum summaries) for
  downstream workflows, including the JSON summary path.
- **Task**: [TASK-0022](../tasks/TASK-0022-github-action-package.md)

### 4. Release automation workflow
- Create a dedicated GitHub Actions workflow that versions the private action,
  bundles required artifacts, and publishes a GitHub release tagged for the
  action.
- Automate changelog generation and attach built assets (if any) to the
  release.
- Ensure the workflow can be triggered manually and from the main branch after
  action updates merge.
- **Task**: [TASK-0023](../tasks/TASK-0023-github-action-release.md)

### 5. Consumer onboarding and validation
- Provide documentation for integrating the action into downstream
  repositories, including sample workflow snippets.
- Establish integration tests or a sandbox repository to validate the action
  in a clean environment.
- Capture troubleshooting guidance and versioning strategy for private usage.
- **Task**: [TASK-0024](../tasks/TASK-0024-github-action-adoption.md)

### 6. Align with the `actions/typescript-action` template
- The action now mirrors the template layout with `src/main.ts` bundled into
  `dist/index.js` via `esbuild`. Shared automation helpers remain under
  `tools/automation/` and are imported directly during bundling.
- Release automation builds the TypeScript bundle and verifies that the
  committed `dist/` and `package-lock.json` are in sync before publishing.
- Follow-up iterations can adopt additional template niceties (unit tests,
  `npm run all`, linting scoped to the action workspace) and evaluate slimming
  the runtime dependency installation once Playwright provisioning is solved.
- **Follow-up tasks**: update TASK-0020 through TASK-0024 acceptance criteria to
  reflect the bundled layout and plan the remaining template parity checks (QA,
  test harness, repository root relocation if desired).

#### Template gap analysis
- **Entrypoint strategy**: the template executes compiled TypeScript from
  `dist/index.js`, whereas the current composite action shells into the shared
  CLI. We need a thin TypeScript wrapper that imports the pipeline module and
  exposes inputs/outputs via `@actions/core`.
- **Dependency management**: template actions vendor production dependencies via
  the bundled `dist/` artifact, removing the need for `npm ci` at runtime. Our
  composite action currently installs dependencies on every run and requires the
  full `tools/automation` tree. Migration will involve bundling the CLI and
  Playwright bootstrap logic or publishing a separate npm package for reuse.
- **Testing and validation**: the template expects Jest-based unit tests and a
  `npm run all` aggregate script. We should port existing smoke tests into
  TypeScript-targeted tests or wrap the automation pipeline to keep equivalent
  coverage.
- **Release workflow**: template repositories commit the compiled `dist/` output
  and verify it with `check-dist`. Our release workflow packages source files
  into a tarball. We'll need to update the workflow to build, verify, and tag
  the bundled action while optionally still emitting the tarball for
  compatibility during the transition.

## Success criteria
- Each implementation task references the canonical automation docs and keeps
  generated artifacts compatible with the existing OpenAPI specs.
- The release workflow can create tagged versions of the action without manual
  steps.
- Documentation enables downstream teams to onboard within a single sprint.

## Risks and mitigations
- **Dependency drift**: Pin Node.js and Playwright versions within the action
  runtime to match repository expectations.
- **Credential exposure**: Store secrets in organization-level environments and
  document usage of GitHub Action secrets and encrypted variables.
- **Artifact size**: Monitor output size and consider compressing artifacts or
  uploading to release assets to stay within GitHub's limits.

## Next steps
- Socialize the plan with maintainers for feedback.
- Prioritize and schedule tasks TASK-0020 through TASK-0024.
- Begin work with requirement/interface definition to minimize rework in later
phases.

## Action interface summary (TASK-0020)

- **Action name**: `proxmox-openapi-artifacts` (composite action under
  `.github/actions/`).
- **Required runtime**: Node.js 22.x, npm 10+, Playwright browser binaries (the
  action optionally installs them on-demand).
- **Inputs**:
  - `mode` (`ci` default) toggles cached vs. full scrape execution.
  - `base-url`, `raw-snapshot-path`, `ir-output-path`, `openapi-dir`, and
    `openapi-basename` mirror the CLI flags exposed by the automation pipeline.
  - `offline` and `fallback-to-cache` control scrape behaviour for air-gapped
    or flaky networks.
  - `install-command`, `node-version`, `working-directory`, and
    `install-playwright-browsers` support environment bootstrapping.
  - `report-path` and `extra-cli-args` allow additional customization and
    summary capture.
- **Outputs**: The action emits absolute paths for the raw snapshot, normalized
  IR, generated OpenAPI JSON/YAML, and a cache indicator so downstream steps can
  upload artifacts or branch logic.
- **Portability**: The automation entry point now exposes a JSON summary file to
  decouple GitHub output wiring from the core pipeline logic. Consumers can run
  the action inside private repositories without exposing secrets beyond the
  standard GitHub token used for dependency installation or release uploads.

## Release automation overview (TASK-0023)

- **Workflow**: `.github/workflows/private-action-release.yml` validates the
  pipeline, packages the action directory, and creates a GitHub release.
- **Triggers**: Manual `workflow_dispatch` (with optional semantic version
  input) and post-merge pushes to `main` touching action-related files.
- **Validation steps**: `npm ci`, lint, TypeScript build, and a CI-mode pipeline
  smoke run writing a JSON summary.
  - **Packaging**: Bundles the TypeScript action manifest, committed `dist/`
    output, and action-specific lockfiles into `proxmox-openapi-action.tgz` for
    release assets.
- **Release tagging**: Manual runs honour the provided tag and mark releases as
  stable; automatic pushes generate prerelease tags using the short commit SHA
  while still publishing assets for internal adoption.
