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
- Scaffold the `action.yml` (or composite action) with inputs for mode,
  artifact destinations, and authentication toggles.
- Implement dependency bootstrapping (npm install, Playwright browsers) within
  the action runtime.
- Wire outputs (e.g., generated artifact paths, checksum summaries) for
  downstream workflows.
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
