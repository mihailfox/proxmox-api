# Changelog – TASK-0026

## Summary
- Refactored the automation pipeline into a reusable module and CLI with JSON summary support for GitHub Actions integration.
- Authored the private composite action, release workflow, and adoption documentation to operationalize the OpenAPI pipeline.
- Updated planning and handover documents to capture the action interface, release process, and onboarding guidance.

## Source materials consulted
- plan/private-github-action-plan.md
- plan/proxmox-openapi-extraction-plan.md
- docs/handover/README.md
- docs/automation/README.md
- tasks/TASK-0019 through TASK-0024

## Command log
- `npm install`
- `npm run lint`
- `npm run build`
- `npm run automation:pipeline -- --mode=ci --report tmp/cli-smoke.json`

## Decisions
- Exported a typed `runAutomationPipeline` helper and CLI wrapper so the GitHub Action and local scripts share identical behaviour.
- Structured the composite action to bootstrap dependencies, emit artifact paths as outputs, and support optional Playwright installation.
- Added a release workflow that packages the action directory and publishes both manual and automated prereleases using the GitHub CLI.
