# TASK-0017 openapi viewer integration

## Summary
- Replaced the sandbox counter route with a Swagger UI embed that streams the generated Proxmox VE specification.
- Added a Remix resource route to serve `docs/openapi/proxmox-ve.json` with caching headers for the viewer.
- Bundled Swagger UI assets, type shims, and refreshed styling to support the full-width documentation experience.

## Command log
- `npm install swagger-ui-react swagger-ui`
- `if [ -f .env ]; then source .env; fi`
- `npm run lint`
- `npm run build`
- `npm run test:ui`
- `npm run ui:dev -- --host 0.0.0.0 --port 5173`

## Notes
- Functional QA relied on the local Remix dev server while capturing the UI screenshot; extended regression passes remain deferred.
