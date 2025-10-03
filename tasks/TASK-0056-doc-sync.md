Title
- Sync documentation with current scraper tests and private action workflow status.

Source of truth
- README.md (Tooling layout section).
- plan/doc-code-alignment-2025-10.md (execution step 3).
- docs/automation/private-action-task-review.md.

Scope
- Decide whether to add a regression spec for tools/api-scraper/tests/ or update documentation to describe existing coverage accurately.
- Refresh docs/automation/private-action-task-review.md to reflect the present workflow and resolved blockers.
- Ensure related references (TASK summaries, README snippets) remain consistent.

Allowed changes
- Markdown documents under README.md and docs/.
- (Optional) Additional Playwright regression spec or supporting test assets if we choose to align code to documentation.
- No unrelated code or automation changes unless required to document behaviour.

Branch
- feature/2025-10-03---task-0056-doc-sync

Preconditions
- Install dependencies if adding tests.

Plan checklist
- [x] Evaluate the effort to add a minimal regression test; document the decision to defer additional Playwright coverage and describe current tests in README.md.
- [x] Update README.md Tooling layout entry to match the chosen approach.
- [ ] (defer) Additional regression tests not introduced in this iteration; documented current coverage instead.
- [x] Revise docs/automation/private-action-task-review.md to note that the release workflow now runs `npm ci` before packaging and adjust downstream recommendations.
- [x] Run lint/test suites for any new code (if applicable) and spellcheck/format docs as needed.
- [x] Produce a versions/ changelog entry summarising decisions and outcomes.

Acceptance criteria
- Documentation accurately states the current scraper test coverage and clearly indicates any follow-up work (if regression tests remain deferred).
- Private action task review reflects the validated release workflow behaviour and no longer flags resolved blockers as open issues.
- Any new regression tests (if implemented) pass and are integrated into the testing story.

Acceptance commands template
- `npm run lint`
- `npm run test` (only if new Playwright tests are introduced)
