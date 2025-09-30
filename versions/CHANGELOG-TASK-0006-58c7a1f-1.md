# TASK-0006 Automation CI

## Key decisions
- Introduced a consolidated automation pipeline script that reuses cached raw
  snapshots during CI while preserving normalized metadata to avoid spurious
  diffs.
- Added a scheduled + PR GitHub Actions workflow that runs the pipeline,
  validation, lint, build, and unit suites to surface upstream documentation
  changes.
- Documented local usage patterns, including how to run full scrapes and adjust
  output targets when regenerating artifacts.

## Command log
- `npm install`
- `npm run automation:pipeline`
- `npm run lint`
- `npm run build`
- `npm run test:normalizer`
- `npm run test:openapi`
- `npm run test:ui`

## Outcomes
- `npm run automation:pipeline` now orchestrates scrape → normalize → OpenAPI
  generation with optional fallback to cached data for constrained
  environments.
- CI workflow `automation-pipeline` enforces clean artifacts and standard
  checks on pushes, pull requests, and a weekly schedule.
- `docs/automation/README.md` provides guidance for developers to operate the
  automation stack locally and interpret CI behaviour.
