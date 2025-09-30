Title
- Build data normalization pipeline for scraped Proxmox API payloads.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0003-scraper-automation.md

Scope
- Focus areas: tools/api-normalizer/, shared types module, tooling scripts linking scraper outputs to IR.
- Out of scope: OpenAPI spec generation, scraping browser logic, CI scheduling.
- Data model and types: Intermediate Representation (IR) TypeScript definitions are canonical; align with generated types used downstream.

Allowed changes
- Create normalization utilities translating raw scrape data into structured IR.
- Add validation logic ensuring completeness and type safety.
- Introduce tests covering transformation correctness.

Branch
- feature/2025-09-29---task-0004-normalization-pipeline

Preconditions
- Run: source .env (if exists)
- Ensure raw payload samples from TASK-0003 are available.
- Install Node.js dependencies for normalization tooling.

Plan checklist
- [x] Review scraper outputs and identify entities to normalize.
- [x] Define IR TypeScript types with documentation.
- [x] Implement transformation pipeline from raw JSON to IR.
- [x] Add validation and error handling for missing or malformed data.
- [x] Create automated tests verifying key endpoints.
- [x] Document how to regenerate IR from fresh scrapes.
- [x] Commit changes using Conventional Commits.
- [x] Update changelog with details and verification steps.

Acceptance criteria
- IR definitions exist and cover endpoints, parameters, requests, and responses.
- Normalization script ingests raw payloads and produces deterministic IR artifacts.
- Tests confirm transformations for representative API sections.
- Documentation instructs contributors on running normalization.
- Changelog revision summarizes implementation and testing.
