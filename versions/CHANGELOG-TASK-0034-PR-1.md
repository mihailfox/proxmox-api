# TASK-0034 Begin decoupling OpenAPI spec artifacts (Revision 1)

## Summary
- Introduced shared path helpers and redirected generators, pipeline defaults, and Remix route logic to the new `var/openapi/` staging area while adding release-asset fallbacks.
- Reworked regression tooling to hydrate artifacts on demand, externalized OpenAPI checksum metadata, and prevented reintroducing committed specs.
- Updated developer documentation and CI workflows to publish specs via artifacts and release assets instead of relying on tracked files.

## Command log
```shell
npm install
npm run lint
npm run build
npm run test:normalizer
npm run test:openapi
npm run test:ui
npm run test:regression
# Updated baselines after initial failure
npm run test:regression
```

## Key decisions & outcomes
- Added `OPENAPI_SPEC_RELEASE_URL` support in the Remix loader so local and deployed environments can fetch specs from GitHub release assets when the local cache is absent.
- Configured the automation pipeline workflow to upload generated specs and summaries as CI artifacts and taught the release workflow to package JSON/YAML specs as release assets.
- Ensured regression tests run the automation pipeline in CI mode when artifacts are missing and enforced repository hygiene by asserting `docs/openapi/` stays empty.
