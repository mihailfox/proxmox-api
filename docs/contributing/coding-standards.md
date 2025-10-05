# Proxmox API Tooling Coding Standards

These standards codify the shared conventions for the scraping, normalization, and OpenAPI
generation toolchain. They align with the [Proxmox API to OpenAPI Conversion Plan](../../plan/proxmox-openapi-extraction-plan.md)
and the scaffolding delivered in [TASK-0002](../../tasks/TASK-0002-tooling-foundation.md).

## Core principles

1. **TypeScript first** – Author new automation and utilities in modern TypeScript targeting ES2022.
2. **Deterministic tooling** – Keep Playwright runs, scrapers, and generators idempotent across
   environments. Persist reproducible fixtures when practical.
3. **Composable modules** – Organize code by responsibility (`scraper`, `normalizer`,
   `openapi-generator`, `automation`). Share code only through exported utilities in
   `tools/shared/` or package-level helpers.
4. **Quality gates** – Treat Biome linting, formatting, and TypeScript builds as non-negotiable
   pre-commit checks. Fix violations before review.
5. **Document everything** – Update `docs/` when behavior changes or when new workflows are
   introduced.

## Language and formatting

- Prefer `async`/`await` to chained promises. Use `try`/`catch` around awaited sections that can
  throw (but never around imports).
- Leverage discriminated unions or branded types to model API structures. Avoid `any` and
  `unknown` unless narrowing occurs immediately.
- Export the minimal public surface needed for other modules. Keep helpers `internal` to a module
  unless reuse is expected.
- Apply the repository Biome profile via `npm run lint` and `npm run format`. The configuration
  enforces:
  - 2-space indentation and a 100-character line width for source files.
  - Double quotes, required semicolons, and ES5 trailing commas in JavaScript/TypeScript.
  - Markdown files exempt from hard wrapping and trailing whitespace removal.
- Use named functions for Playwright test steps (`test('scrapes nodes', async ({ page }) => { ... })`).
- Store constants in SCREAMING_SNAKE_CASE when they are environment-dependent or reused across
  modules.

## Project layout and naming

- Place browser automation inside `tools/api-scraper/`. Keep fixtures in `tests/fixtures/` and raw
  payloads in `artifacts/` subdirectories.
- House intermediate representation logic in `tools/api-normalizer/` and OpenAPI emitters in
  `tools/openapi-generator/`.
- Add cross-cutting helpers to `tools/shared/` using descriptive file names (e.g.,
  `parse-parameter.ts`).
- Name TypeScript files with kebab-case (e.g., `endpoint-builder.ts`) and exported types with
  PascalCase (e.g., `ScrapeJob`).
- When adding scripts to `package.json`, prefix them by domain (`scraper:*`, `normalizer:*`,
  `openapi:*`, `automation:*`).

## Playwright automation guidelines

- Extend the shared Playwright test config in `tools/api-scraper/playwright.config.ts` when adding
  projects or settings.
- Scope selectors to semantic identifiers or `data-testid` attributes. Avoid brittle CSS chains.
- Use [`test.step`](https://playwright.dev/docs/api/class-test#test-step) blocks to document
  navigation when a scenario performs multiple actions.
- Capture HTTP traces only when diagnosing failures. Remove stray `page.tracing` calls from merged
  code.
- Place mock servers or interceptors under `tests/mocks/` and clean up network listeners with
  `page.unroute` in `afterEach` hooks.

## Testing expectations

- Add Vitest suites for pure utilities and transformation logic. Group by module under
  `tools/<module>/tests/`.
- Keep Playwright smoke and regression suites under `tools/api-scraper/tests/`. Add descriptive
  `@tags` in test titles when coverage matrices are relevant.
- Maintain snapshot baselines for generated OpenAPI artifacts in `tests/regression/` and update them
  intentionally with clear commit messages.
- Execute the following checks before requesting review:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - Module-specific test commands (`npm run normalizer:test`, `npm run openapi:test`, etc.) when the
    change touches that surface.

## Git and review workflow

- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`) scoped to the module.
- Reference the relevant task ID in commit bodies when additional context is needed.
- Update the task checklist and changelog per the contributor instructions in `tasks/`.

### Review checklist

Copy this list into the pull request description and confirm each item during review:

- [ ] Requirements traced back to the relevant task and plan documents.
- [ ] Linting and formatting run locally (`npm run lint`, `npm run format`).
- [ ] TypeScript builds succeed for affected packages (`npm run build`).
- [ ] Playwright or Vitest suites covering the change executed successfully.
- [ ] New or modified docs reviewed for accuracy and linked from entry points (README, module docs).
- [ ] Changelog updated with key decisions, commands, and outcomes.
- [ ] Deferred work captured with `- [ ] (defer)` entries explaining scope and rationale.

## Feedback backlog

Create an issue or append to the "Feedback" section in `versions/CHANGELOG-*` files when standards
need refinement. Note the context (module, test suite, or documentation) and the desired
adjustment. This backlog will be triaged during weekly maintenance.
