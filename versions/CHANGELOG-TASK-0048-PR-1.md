# TASK-0048 Release workflow python formatting

## Summary
- replaced the inline heredoc used for patch version bumps with a reusable helper script
- updated the release workflow to call the helper, resolving YAML formatting breakage
- executed repository lint, build, and Playwright smoke tests to verify no regressions

## Command log
- source .env
- npm install
- npm run lint
- npm run build
- npm test

## Decisions & follow-ups
- Deferred GitHub-hosted workflow QA because guarded jobs only run within Actions.
- No documentation updates required for internal workflow tooling adjustments.
