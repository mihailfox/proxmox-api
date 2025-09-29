# TASK-0001 OpenAPI Extraction Planning

## Objectives
- Produce an actionable roadmap for converting the Proxmox API viewer content (https://pve.proxmox.com/pve-docs/api-viewer/) into an OpenAPI (Swagger) specification.
- Define sub tasks that can be executed independently to minimize merge conflicts.
- Align implementation with a Node.js + TypeScript + Playwright tooling stack, optionally complementing the pipeline with Python 3 utilities when advantageous.

## Assumptions & Constraints
- Web scraping must respect Proxmox rate limits and terms of service; requests should be throttled and cached locally.
- Output must conform to OpenAPI 3.0+ and leverage canonical schema/type generators when available.
- Repository currently contains mostly placeholder content; we will introduce new automation in dedicated directories.

## Proposed Workstreams & Sub Tasks

### 1. TASK-0002 Bootstrap tooling and repository structure
- [ ] Verify Node.js, TypeScript, and Playwright versions; add or update project configuration (tsconfig, playwright.config, lint rules).
- [ ] Establish directory structure for scrapers (`src/scraper`), parsers (`src/parser`), OpenAPI emitters (`src/openapi`), and data fixtures (`data/raw`, `data/processed`).
- [ ] Add npm scripts for scraping, transforming, and validating outputs.
- [ ] Document local setup steps in README.

### 2. TASK-0003 Automate API viewer data acquisition
- [ ] Implement a Playwright crawler that enumerates all API nodes/endpoints from the Proxmox API viewer, saving normalized JSON snapshots.
- [ ] Handle authentication-less browsing with retries, request throttling, and local caching to prevent repeated downloads.
- [ ] Serialize raw endpoint metadata (methods, paths, parameters, descriptions, responses) to `data/raw` with deterministic filenames.
- [ ] Capture supplemental reference docs (enums, schemas) when available.

### 3. TASK-0004 Normalize and enrich scraped metadata
- [ ] Parse raw snapshots into structured TypeScript models that reflect canonical Proxmox API schema.
- [ ] Resolve nested navigation (e.g., child endpoints, parameter inheritance) and flatten into discrete endpoint records.
- [ ] Create mapping tables for data types, enums, and special cases (e.g., permission requirements).
- [ ] Store enriched artifacts in `data/processed` for downstream consumption.

### 4. TASK-0005 Generate OpenAPI specification
- [ ] Implement transformers that convert processed metadata into OpenAPI components (paths, schemas, parameters, responses).
- [ ] Ensure output meets OpenAPI 3.0 compliance using a validator (e.g., `swagger-cli` or `spectral`).
- [ ] Support incremental regeneration to keep specs up to date when upstream docs change.
- [ ] Emit versioned specs under `openapi/proxmox-{date}.yaml`.

### 5. TASK-0006 Quality assurance & CI integration
- [ ] Create automated tests for scraper (structure assertions) and transformers (snapshot or schema-based tests).
- [ ] Add CI workflow to run scraping (mocked or cached), transformation, validation, and linting.
- [ ] Provide manual QA checklist covering spot-checks of critical endpoints and comparison against original docs.

### 6. TASK-0007 Documentation & developer experience
- [ ] Update README with end-to-end usage instructions, architecture diagram, and maintenance guidelines.
- [ ] Publish contribution guidelines clarifying task ownership to minimize merge conflicts.
- [ ] Document release process for publishing updated OpenAPI specs.

## Cross-cutting Considerations
- Establish shared TypeScript interfaces in a dedicated `@types` folder to prevent drift between modules.
- Consider optional Python utilities (e.g., for complex YAML transformations) but ensure primary workflow remains Node.js/TypeScript-based.
- Implement caching layers (filesystem or simple database) to decouple scraping from transformation stages.
- Track command outputs and troubleshooting notes in `versions/` changelog entries per task.

## Dependencies & Open Questions
- Determine if the API viewer exposes rate limiting or requires authentication for private endpoints.
- Investigate how Proxmox documents data types (e.g., `integer`, `string`, custom enums) to map them accurately to OpenAPI schemas.
- Decide whether to include example payloads or auto-generate them based on type metadata.

## Milestones & Deliverables
1. **Initial tooling bootstrap (TASK-0002)** — CI-ready scaffold with empty pipelines.
2. **Scraping MVP (TASK-0003)** — Raw JSON dump representing the full API surface.
3. **Normalized dataset (TASK-0004)** — Type-safe intermediate representation.
4. **OpenAPI v1 release (TASK-0005)** — Validated OpenAPI YAML checked into repo.
5. **Automation & docs complete (TASK-0006 & TASK-0007)** — Tests, CI, and contributor guidance finalized.

## Risk Management
- Mitigate scraping failures with robust retry/backoff strategies and snapshot-based development.
- Guard against API viewer layout changes by isolating selectors and adding monitoring tests.
- Keep subtasks small and decoupled to enable parallel development and reduce merge conflicts.

## Next Steps
- Review and approve the plan with stakeholders.
- Spin up TASK-0002 to begin implementing the tooling scaffold.
- Establish regular sync to update progress across subtasks.
