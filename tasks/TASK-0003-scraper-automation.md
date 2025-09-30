Title
- Implement Playwright scraper to capture Proxmox API metadata.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0002-tooling-foundation.md

Scope
- Focus areas: tools/api-scraper/src/, tools/api-scraper/tests/, tools/api-scraper/playwright.config.ts, raw data storage directory.
- Out of scope: OpenAPI generation, normalization pipeline, CI workflows.
- Data model and types: Use TypeScript interfaces defined in the scraper module as canonical for raw scrape payloads.

Allowed changes
- Extend Playwright scripts to traverse the Proxmox API viewer and collect endpoint metadata.
- Add utilities for storing raw JSON payloads.
- Introduce snapshot or regression tests detecting DOM changes.

Branch
- feature/2025-09-29---task-0003-scraper-automation

Preconditions
- Run: source .env (if exists)
- Install Playwright dependencies via npm.
- Ensure network access to Proxmox API viewer for scraping.

Plan checklist
- [x] Review scaffolding from TASK-0002 and confirm directory layout.
- [x] Define raw payload schema for scraped data.
- [x] Implement navigation logic covering key sections (nodes, pools, storage, etc.).
- [x] Persist scraped payloads to versioned JSON files.
- [x] Add tests validating DOM selectors and payload shape.
- [x] Document scraping command usage and troubleshooting steps.
- [x] Commit changes using Conventional Commits.
- [x] Update changelog with commands and results.

Acceptance criteria
- Playwright automation extracts endpoint metadata across the documentation tree.
- Raw JSON payloads are saved deterministically for reuse.
- Tests exist to guard against DOM regressions.
- Documentation explains how to run the scraper and interpret outputs.
- Changelog revision records steps and validations.
