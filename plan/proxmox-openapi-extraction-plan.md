# Proxmox API to OpenAPI Conversion Plan

## Overview
This plan defines the workflow for extracting the Proxmox API documentation from [https://pve.proxmox.com/pve-docs/api-viewer/](https://pve.proxmox.com/pve-docs/api-viewer/) and converting it into an OpenAPI (Swagger) specification using a Node.js + TypeScript stack supplemented by Playwright for automated browsing. Python 3 utilities may be introduced where data transformation benefits from its ecosystem (e.g., schema validation or YAML tooling).

## Objectives
- Automate retrieval of API metadata from the Proxmox API viewer.
- Normalize the scraped data into a structured intermediate representation.
- Generate a comprehensive, versioned OpenAPI specification.
- Provide validation and regression safeguards to catch source documentation changes.

## Constraints & Assumptions
- Use Node.js + TypeScript as the primary implementation language.
- Employ Playwright for headless browser automation to navigate and extract the interactive documentation content.
- Python 3 may be used for supplemental processing if justified (e.g., leveraging `openapi-spec-validator`).
- Preserve separation of concerns to minimize merge conflicts by isolating tasks across directories/modules.

## Sub-task Breakdown
1. **Environment & Scaffolding**
   - Initialize a TypeScript Playwright project structure within a dedicated directory (e.g., `tools/api-scraper`).
   - Configure linting, formatting, and shared utilities to support consistent contributions.
   - Document environment setup in `docs/`.

2. **API Documentation Scraper**
   - Implement Playwright scripts to traverse the Proxmox API viewer, capturing endpoint metadata, parameters, and schemas.
   - Persist raw scraped payloads (JSON) for reproducibility and offline processing.
   - Add snapshot tests to detect upstream documentation changes.

3. **Data Normalization Pipeline**
   - Transform raw scrape outputs into a canonical intermediate representation (IR) that models endpoints, parameters, request/response bodies, and authentication details.
   - Validate the IR structure with TypeScript types and optional Python-based schema checks.
   - Version the IR to track documentation revisions.

4. **OpenAPI Generator**
   - Map the intermediate representation to OpenAPI 3.1 compliant documents.
   - Provide CLI commands to emit JSON/YAML specifications.
   - Integrate validators (e.g., `spectral`, `openapi-spec-validator`) to ensure conformance.

5. **Automation & CI Integration**
   - Add npm scripts (and optional Python entry points) for scraping, building IR, and generating OpenAPI.
   - Configure CI workflows to run scrapes on schedule or on demand, diffing outputs to highlight changes.
   - Publish artifacts (e.g., commit to `docs/openapi/`, push to artifact storage).

6. **Documentation & Handover**
   - Write contributor guides describing how to run the tooling locally and interpret diffs.
   - Capture troubleshooting steps for Playwright/Python dependencies.
   - Outline release/versioning strategy for generated OpenAPI specs.

## Milestones & Sequencing
1. **M1 – Tooling Foundation**: Complete Sub-task 1. Deliver scaffolding, baseline CI checks, and developer docs.
2. **M2 – Reliable Scraping**: Complete Sub-task 2 with automated data collection and raw payload storage.
3. **M3 – Normalized Data Model**: Deliver Sub-task 3 with validated IR and regression tests.
4. **M4 – OpenAPI Output**: Finish Sub-task 4 to produce spec files and validators.
5. **M5 – Automation & Documentation**: Wrap up Sub-tasks 5 and 6 for CI + documentation readiness.

## Risk Mitigation
- **Site Structure Changes**: Maintain raw scrape archives to reprocess without re-scraping; add Playwright assertions to detect DOM changes early.
- **Performance**: Cache responses and throttle scraping to avoid server overload.
- **Data Accuracy**: Cross-verify generated OpenAPI snippets with manual samples during early iterations.

## Next Actions
- [x] Socialize this plan with stakeholders for validation.
- [x] Create follow-up task tickets aligned with the sub-tasks above.
  - TASK-0002 through TASK-0009 outline scaffolding, scraping, normalization, generation, automation, QA, documentation, and coding standards.
- [ ] Establish coding standards specific to the scraping and generation toolchain.
