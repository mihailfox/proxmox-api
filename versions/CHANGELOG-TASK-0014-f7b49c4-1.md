# TASK-0014 GitHub Templates

## Summary
- Added standardized pull request and commit message templates under `.github/`.
- Recorded task tracking updates highlighting deferred steps for configuration-only work.

## Command log
- ls -a
- find .. -name AGENTS.md -print
- git status -sb
- git checkout -b feature/20250929---task-0014-github-templates
- sed -n '1,160p' README.md
- cat <<'EOF' > tasks/TASK-0014-github-templates.md
- mkdir -p .github
- cat <<'EOF' > .github/pull_request_template.md
- cat <<'EOF' > .github/commit_template.txt
- apply_patch (multiple updates to plan checklist)
- git add .github
- git commit -m "chore(github): add contribution templates"
- apply_patch (update task checklist for deferrals and completion)

## Notes
- Tests, builds, and QA steps deferred because template additions do not affect runtime behavior.
