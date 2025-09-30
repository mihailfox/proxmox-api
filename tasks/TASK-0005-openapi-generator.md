Title
- Generate OpenAPI 3.1 specification from normalized Proxmox API data.

Source of truth
- plan/proxmox-openapi-extraction-plan.md
- tasks/TASK-0004-normalization-pipeline.md

Scope
- Focus areas: tools/openapi-generator/, shared schema definitions, docs/openapi/.
- Out of scope: Raw scraping logic, CI automation, unrelated documentation.
- Data model and types: Intermediate Representation generated in TASK-0004 is the canonical input; OpenAPI 3.1 specification schema is the output contract.

Allowed changes
- Create generator translating IR into OpenAPI JSON/YAML artifacts.
- Add validators (e.g., spectral, openapi-spec-validator) and associated npm scripts.
- Provide CLI entry points to produce specs.

Branch
- feature/2025-09-29---task-0005-openapi-generator

Preconditions
- Run: source .env (if exists)
- Ensure IR artifacts from TASK-0004 are available.
- Install necessary validator tooling.

Plan checklist
- [x] Analyze IR structure and map components to OpenAPI sections.
- [x] Implement generator producing deterministic OpenAPI outputs.
- [x] Integrate validation tooling to enforce spec quality.
- [x] Add tests comparing generated specs against fixtures.
- [x] Document generation commands and output locations.
- [x] Commit changes using Conventional Commits.
- [x] Update changelog with execution logs and decisions.

Acceptance criteria
- Generator outputs valid OpenAPI 3.1 JSON and/or YAML files.
- Validation tooling runs via npm scripts and passes.
- Tests protect against regressions in generation.
- Documentation instructs contributors on generating and validating specs.
- Changelog revision records implementation steps and verifications.
