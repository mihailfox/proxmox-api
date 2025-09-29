Title
- Automate scraping, normalization, and OpenAPI generation workflows with CI integration.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0005-openapi-generator.md

Scope
- Focus areas: .github/workflows/, package.json scripts, automation tooling directories, docs/automation/.
- Out of scope: Core scraper and generator implementation logic except for integration hooks.
- Data model and types: CI pipelines must consume outputs exactly as produced in prior tasks without altering schemas.

Allowed changes
- Add GitHub Actions workflows or equivalent automation scripts.
- Configure npm or CLI commands orchestrating scrape -> normalize -> generate pipelines.
- Implement diffing or regression checks on generated artifacts.

Branch
- feature/2025-09-29---task-0006-automation-ci

Preconditions
- Run: source .env (if exists)
- Ensure necessary secrets or tokens for CI are documented or mocked.
- Verify tooling commands from previous tasks function locally.

Plan checklist
- [ ] Review existing scripts and outputs from TASK-0002 through TASK-0005.
- [ ] Define automation entry points covering scrape, normalize, generate, and validate steps.
- [ ] Implement CI workflow executing the pipeline and surfacing diffs.
- [ ] Add documentation for triggering workflows manually or on schedule.
- [ ] Ensure local developers can run equivalent commands.
- [ ] Commit changes using Conventional Commits.
- [ ] Update changelog with pipeline run logs or dry-run outputs.

Acceptance criteria
- Automated workflow executes scrape -> normalize -> generate -> validate sequence.
- CI provides visibility into changes of generated artifacts.
- Documentation outlines how to run automation locally and via CI.
- Changelog entry captures configuration details and verification steps.
