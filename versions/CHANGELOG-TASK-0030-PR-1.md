# TASK-0030 Investigate regression artifact baseline mismatch (Revision 1)

## Summary
- Documented failing regression checksums for OpenAPI JSON and YAML artifacts.
- Reproduced `npm run test:regression` failure to capture current mismatch details.
- Calculated actual SHA-256 hashes for generated OpenAPI documents to compare with stored baselines.

## Command log
```shell
if [ -f .env ]; then source .env; fi
npm run test:regression
sha256sum docs/openapi/proxmox-ve.json docs/openapi/proxmox-ve.yaml
```

## Key observations
- Regression suite reports checksum mismatches for `docs/openapi/proxmox-ve.json` and `docs/openapi/proxmox-ve.yaml`.
- Actual hashes differ from the recorded baselines in `tools/automation/src/regression/baselines.ts`, indicating the artifacts were updated without refreshing baseline metadata.

## Next steps
- Regenerate OpenAPI artifacts from the normalized IR to verify the current files are up to date.
- Update `ARTIFACT_BASELINES` with the new SHA-256 values once artifacts are validated.
- Rerun `npm run test:regression` to ensure checksum parity across formats.
