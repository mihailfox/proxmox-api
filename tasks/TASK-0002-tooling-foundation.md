Title
- Establish Proxmox API scraping tooling foundation.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- README.md

Scope
- Focus areas: tools/api-scraper/, package.json, package-lock.json, tsconfig.json, playwright.config.ts, .eslintrc.* (if created).
- Out of scope: docs/, src/, and any production runtime services.
- Data model and types: TypeScript configuration and generated Playwright types act as ground truth; do not diverge from Playwright defaults unless documented.

Allowed changes
- Introduce scaffolding for the scraper tooling under tools/api-scraper/.
- Update root configuration files necessary for the tooling (package.json, tsconfig.json, lint configs).
- Add supporting scripts that do not modify production code paths.

Branch
- feature/2025-09-29---task-0002-tooling-foundation

Preconditions
- Run: source .env (if exists)
- Ensure Node.js and Playwright CLIs are available locally.
- Confirm repository PR template exists.

Plan checklist
- [x] Read the Source of Truth in order. Capture key requirements.
- [x] Create Playwright + TypeScript project structure under tools/api-scraper/.
- [x] Configure package.json scripts for lint, test, and scrape entry points.
- [x] Add baseline linting/formatting configuration shared across tooling.
- [x] Verify Playwright can execute a sample smoke test locally.
- [x] Document setup steps in README or dedicated tooling docs if necessary.
- [x] Commit changes using Conventional Commits.
- [x] Update changelog with actions and outcomes.

Acceptance criteria
- Playwright TypeScript project scaffolding exists in tools/api-scraper/.
- npm scripts are available to run Playwright tests and linting for the tooling.
- Linting/formatting configuration aligns with repository standards.
- Baseline smoke test passes locally.
- Documentation notes how to install dependencies and execute the tooling.
- Changelog entry created with relevant details.
