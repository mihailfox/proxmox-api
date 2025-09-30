Title
- Define coding standards and shared conventions for Proxmox API tooling.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0002-tooling-foundation.md

Scope
- Focus areas: docs/contributing/, .editorconfig, linting configuration, shared utility guidelines.
- Out of scope: Functional implementation changes to tooling modules.
- Data model and types: Align standards with TypeScript and Playwright defaults established previously.

Allowed changes
- Document naming conventions, directory structure, and testing expectations.
- Update linting/formatting configs to enforce standards (non-breaking changes only).
- Provide examples for code review checklists.

Branch
- feature/2025-09-29---task-0009-coding-standards

Preconditions
- Run: source .env (if exists)
- Review existing configuration files and determine gaps.
- Confirm alignment with organization-wide standards if applicable.

Plan checklist
- [x] Audit current linting and formatting configuration.
- [x] Draft coding standards covering TypeScript style, Playwright usage, and testing requirements.
- [x] Update configuration files to enforce the standards where feasible.
- [x] Publish guidelines in contributing documentation.
- [x] Gather feedback placeholders for future iterations.
- [x] Commit changes using Conventional Commits.
- [x] Update changelog noting standards and configuration updates.

Acceptance criteria
- Coding standards document exists and is referenced from README or contributing guide.
- Lint/format settings reflect documented expectations.
- Review checklist highlights critical considerations for tooling contributions.
- Changelog entry summarizes standards and configuration adjustments.
