# Changelog — TASK-0011 (commit 845dd2a)

## Summary
- Scaffolded a Vite-powered UI sandbox with vanilla TypeScript entry point and counter example.
- Introduced Vitest configuration with jsdom environment and coverage reporting.
- Extended root tooling scripts for Vite dev/build workflows and UI unit testing.

## Command log
- npm install
- npm run lint
- npm run build
- npm test
- npm run test:ui
- npm run ui:build

## Key decisions & outcomes
- Added jsdom as a dev dependency to satisfy Vitest's jsdom environment requirement.
- Configured Vite to emit production assets into `dist/ui` and updated `.gitignore` accordingly.
- Documented the new UI workspace and scripts in the project README.
