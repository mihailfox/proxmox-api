# Plan: Stop committing generated OpenAPI specs

## Objectives
- Keep the OpenAPI JSON/YAML artifacts out of Git history while preserving deterministic generation.
- Ensure local developers and CI workflows can still materialize specs on demand for the UI, regression tests, and downstream consumers.
- Preserve regression coverage and automation parity that currently depend on `docs/openapi/proxmox-ve.{json,yaml}`.

## Current state summary
- `npm run openapi:generate` writes JSON and YAML specs to `docs/openapi/` via defaults in `tools/openapi-generator/src/cli.ts` and the automation pipeline helper in `tools/automation/src/pipeline.ts`.
- The Remix route `app/routes/openapi.json.ts` and the Swagger UI in `app/routes/_index.tsx` read from the committed JSON file.
- Regression checks (`tests/regression/artifacts.spec.ts`) load SHA-256 baselines defined in `tools/automation/src/regression/baselines.ts`, which point to the committed files.
- Documentation (handover, automation README, regression checklist) instructs contributors to inspect git diffs for `docs/openapi/` artifacts, reinforcing the committed-artifact workflow.

## Desired end state
- Generated OpenAPI artifacts live under an ignored workspace directory (for example `var/openapi/`) that both CLI tools and the Remix server can read.
- CI workflows run the automation pipeline, publish the JSON/YAML outputs as build artifacts, and fail when regeneration produces unexpected differences relative to recorded checksums.
- Regression tests validate against stored checksums without requiring tracked spec files.
- Documentation and developer UX guide contributors to run the pipeline locally to refresh artifacts, instead of relying on git diffs.

## Step-by-step plan

1. **Decide on new artifact staging directories and git hygiene**
   - Create a shared `var/` (or `.artifacts/`) directory for generated files and add it to `.gitignore`.
   - Update Biome configuration (`biome.json`) and any glob-based tooling to exclude the ignored artifact paths.
   - Provide helper constants/utilities (e.g., `tools/shared/paths.ts`) to resolve the new directories consistently across packages.

2. **Refactor generator and pipeline defaults**
   - Update `tools/openapi-generator/src/cli.ts` and `tools/automation/src/pipeline.ts` so the default OpenAPI output directory points to the new ignored location.
   - Ensure CLI flags continue to accept overrides for bespoke paths.
   - Emit a JSON summary (already supported) that records artifact paths so downstream steps can discover files without hard-coding directories.

3. **Migrate regression baselines away from tracked artifacts**
   - Replace hard-coded `docs/openapi/` paths in `tools/automation/src/regression/baselines.ts` with references to the new artifact directory.
   - Store expected checksums separately (e.g., in `tools/automation/data/regression/openapi.sha256.json`) that regression tests can load without requiring the spec files to be versioned.
   - Adjust `tests/regression/artifacts.spec.ts` to invoke the automation pipeline (in CI mode) during test setup when artifacts are missing, or to read from the summary JSON emitted by the pipeline.

4. **Teach the Remix app to locate runtime artifacts**
   - Update `app/routes/openapi.json.ts` to read from the new path and surface a helpful 404 with remediation steps if the artifact is missing.
   - Update the Swagger UI hint in `app/routes/_index.tsx` to reference the new generation workflow and artifact directory.
   - Consider serving the OpenAPI spec via Remix data loader that proxies directly from the pipeline summary when available.

5. **Update documentation and onboarding**
   - Refresh `docs/handover/README.md`, `docs/automation/README.md`, and `docs/qa/regression-checklist.md` to describe the non-committed workflow, including commands to generate artifacts locally and retrieve them from CI builds.
   - Note the new gitignore policy and how to clear stale artifacts.

6. **Adjust CI and GitHub Action outputs**
   - Update the private GitHub Action (`.github/actions/proxmox-openapi-artifacts`) and any workflows invoking it to upload the generated specs as artifacts instead of expecting git diffs.
   - Ensure the automation pipeline job cleans the artifact directory before each run to prevent cross-run contamination.
   - Extend workflow steps to publish SHA-256 summaries so reviewers can compare changes without the spec committed.

7. **Remove committed artifacts and enforce policy**
   - Delete `docs/openapi/proxmox-ve.{json,yaml}` from source control.
   - Add lint/test guard (e.g., a Vitest or script under `npm run lint`) that fails if files under `docs/openapi/` are reintroduced.
   - Provide a developer migration note in `versions/` changelog when the refactor merges.

8. **Rollout & QA**
   - Validate locally by running `npm run automation:pipeline` and confirming the Remix UI loads `/openapi.json` using the generated artifact.
   - Run regression tests and ensure they still validate checksums derived from the generated files.
   - In CI, verify the workflow publishes downloadable artifacts and that downstream consumers (if any) can ingest them via the new distribution channel.

## Risks and mitigations
- **Risk**: Developers may forget to run the pipeline locally and encounter 404s in the UI.
  - *Mitigation*: Improve loader error messages, add README reminders, and optionally include a convenience script (`npm run openapi:prepare`) that runs the pipeline in CI mode.
- **Risk**: Regression suite order dependence if artifacts are missing.
  - *Mitigation*: Add explicit setup steps that ensure the automation pipeline runs (or the summary file exists) before checksum assertions execute.
- **Risk**: Downstream automation relying on committed files breaks.
  - *Mitigation*: Communicate the new artifact location, update any integration scripts, and provide a transitional branch or compatibility shim that copies generated specs into expected locations when needed.

## Follow-up considerations
- Evaluate compressing and uploading artifacts to long-term storage (e.g., GitHub Releases) if consumers require stable download URLs.
- Consider generating a minimal JSON schema diff report to help reviewers compare spec changes without the full file committed.
- Explore using git-lfs or release assets if file sizes grow and CI artifact retention becomes a concern.
