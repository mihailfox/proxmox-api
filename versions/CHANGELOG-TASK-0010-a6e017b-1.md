# TASK-0010 Node.js upgrade tooling

## Decisions
- Require Node.js 22 across the tooling stack and align TypeScript type definitions accordingly.
- Replace the ESLint/Prettier toolchain with Biome v2 for linting and formatting.
- Document the new commands in the README and add Biome project configuration files.

## Command log
- npm install
- npm run lint
- npm run build
- npm test

## Outcomes
- Biome configuration (`biome.json` and `.biomeignore`) controls linting scope without legacy ESLint settings.
- Project scripts now provide `lint`, `format`, and `check` targets backed by Biome.
- Tooling README communicates the Node.js 22 prerequisite and formatting workflow.
- Automated tests continue to pass under the updated toolchain.
