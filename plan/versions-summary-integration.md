# Versions changelog summary integration plan

## Overview
The automation pipeline already emits a JSON summary describing the raw snapshot, normalized
intermediate representation, OpenAPI artifacts, and cache usage whenever
`npm run automation:pipeline -- --report <path>` is invoked. Release entries under
`versions/CHANGELOG-*` currently depend on manual notes and command logs, so the summary data is not
captured consistently. This plan introduces a lightweight process that turns the JSON payload into a
structured changelog section so release managers can validate artifact provenance quickly.

## Objectives
- Capture the pipeline summary for every release refresh and archive it alongside the task-specific
  changelog entry.
- Provide an ergonomic way to convert the JSON payload into Markdown that fits the existing
  `versions/` template (Summary, Command log, Decisions).
- Document reviewer expectations so the summary snippet becomes a required asset during release QA.

## Current state
- The automation CLI accepts a `--report` flag that writes the summary JSON to an arbitrary path, but
  no guidance exists on where to store the file or how to reference it in changelogs.
- Task changelog templates highlight command logs and decisions only; downstream auditors must run
  commands locally to learn the artifact paths or cache status.
- The release workflow uploads the OpenAPI artifacts but does not surface the summary metadata in
  the `versions/` entry or release notes.

## Source of truth alignment
- docs/handover/README.md requires release engineers to record pipeline commands, validation results,
  and manual verification outcomes in `versions/` changelog files. It also calls out attaching the
  pipeline summary JSON to release assets for audit trails.
- docs/qa/regression-checklist.md reiterates that the JSON summary is useful for release notes and
  artifact uploads.
- docs/contributing/coding-standards.md mandates updating changelog entries with key decisions and
  deferred work.

## Proposed workflow
1. **Summary capture** – Standardize on `var/reports/automation-summary.json` as the default output
   when running the full pipeline for a release (`npm run automation:pipeline -- --mode=full --report var/reports/automation-summary.json`).
   The path lives under `var/` so it remains git-ignored yet predictable for tooling.
2. **Markdown transformation** – Create a helper script (Node.js or small TypeScript utility) that
   reads the JSON summary and emits a Markdown fragment containing:
   - Relative paths to the raw snapshot, normalized IR, and OpenAPI artifacts.
   - Cache indicator (`fresh scrape` vs. `cache reuse`).
   - Timestamp and command invocation if available (derive from `Command log`).
   The script can default to `tools/automation/scripts/format-summary.ts` and print to stdout for easy
   inclusion via shell redirection.
3. **Changelog template update** – Extend the existing `versions/` guidance with a "## Automation
   summary" section that references the generated Markdown fragment, either by copy/paste or fenced
   block inclusion. The section should link to the stored JSON file (committed under `var/reports/`
   or attached to the release) for future audits.
4. **Release checklist enforcement** – Update the release QA checklist and PR template to require the
   summary section. Reviewers should verify:
   - The Markdown fragment matches the latest JSON output (spot-check paths and cache flag).
   - The JSON file is included as a release asset or stored in the repository if policy allows.
   - Command log includes the `--report` invocation to prove provenance.
5. **Automation workflow hook** – Add a follow-up task to teach the `private-action-release` workflow
   to upload the JSON summary artifact and append the Markdown fragment to the GitHub release body.
   This keeps CI releases consistent with manual runs.

## Implementation phases
1. **Document the standard**
   - Draft contributor documentation outlining the required `var/reports/automation-summary.json`
     location, the Markdown section template, and reviewer checklist updates.
   - Update existing release docs (`docs/handover/README.md`, QA checklist, PR template) to reference
     the new requirement.
   - Produce examples in a template changelog file to accelerate adoption.
2. **Build the formatter utility**
   - Implement `tools/automation/scripts/format-summary.ts` that accepts an input path and optional
     output file.
   - Support relative path normalization so changelog snippets remain stable across environments.
   - Add unit coverage validating Markdown output for both cached and fresh runs.
3. **Integrate with release workflow**
   - Modify `.github/workflows/private-action-release.yml` to persist the summary JSON artifact,
     invoke the formatter, and publish the Markdown snippet in the release notes.
   - Ensure the workflow exports the artifact paths for downstream jobs (e.g., uploading to
     `versions/CHANGELOG-*`).
   - Validate the workflow by running it in dry-run mode or via a staging branch.
4. **Adopt in repository changelogs**
   - Update existing or upcoming task changelog entries to include the new "Automation summary"
     section.
   - Gather maintainer feedback and iterate on the Markdown schema if readability issues surface.

## Risks and mitigations
- **Summary drift** – If the automation pipeline adds new fields, the formatter must remain backward
  compatible. Mitigate by tolerating extra keys and documenting extension points.
- **Workflow noise** – Publishing long snippets could clutter release notes. Keep the formatter
  concise (tables or bullet lists) and provide collapse-ready formatting for GitHub releases.
- **Contributor friction** – Running the formatter should be a single command; package it as an npm
  script (`npm run automation:summary -- --input <path>`) to minimize manual steps.

## Next steps
- File implementation tasks covering the documentation, formatter utility, workflow integration, and
  adoption workstreams.
- Socialize the plan during release retrospectives to secure maintainer buy-in.
- Schedule the formatter utility as the first follow-up so the team can start embedding summaries in
  changelogs before the next release.
