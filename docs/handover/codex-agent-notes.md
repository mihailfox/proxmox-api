# Codex Agent Session Playbook

## Environment basics
- Repository root: `/workspaces/proxmox-api`
- Preferred Node version for local builds/tests: `22.x`
- GitHub Actions runtime target for the custom action: **Node 24** (use `runs.using: node24`).
- Keep edits ASCII-only unless existing files require otherwise.

## Branching workflow
- Create a fresh feature branch for every issue: `git checkout -b issue-<number>-<slug> dev`.
- Commit changes on the feature branch and open a PR targeting `dev`.
- After review/validation, merge the PR into `dev`. Releases are handled via follow-up PRs from `dev` to `main`.
- Avoid pushing directly to `dev` or `main`; always go through PRs.

## GitHub CLI authentication
1. Ensure `gh` is installed in the Codespace (already available).
2. Authenticate via token environment variables:
   ```bash
   if [ -n "$GH_PAT" ]; then
     printf '%s' "$GH_PAT" | gh auth login --with-token --hostname github.com
   elif [ -n "$GITHUB_TOKEN" ]; then
     printf '%s' "$GITHUB_TOKEN" | gh auth login --with-token --hostname github.com
   fi
   ```
   - Tokens need the `repo` and `project` scopes to manage issues and projects.
3. Confirm auth with `gh auth status`.

## Creating a planning project
```bash
gh project create --owner @me --title "Node24 Action Modernization"
```
- View projects: `gh project list --owner @me --limit 5`
- Project URL (current): `https://github.com/users/mihailfox/projects/3`

## Creating issues and attaching to the project
1. Draft the issue body in a temp file (prevents shell interpretation):
   ```bash
   cat <<'EOF' > /tmp/issue.md
   ## Objective
   ...

   ## Tasks
   - [ ] First task
   EOF
   ```
2. Create the issue and add it to the project board:
   ```bash
   gh issue create \
     --title "Example issue" \
     --body-file /tmp/issue.md \
     --project "Node24 Action Modernization"
   ```
3. Update an issue body later with `gh issue edit <number> --body-file /tmp/issue.md`.

## Moving issues between board columns
Identify the project item ID, then set the status field (example columns: `To Do`, `In Progress`, `Done`).
```bash
ITEM_ID=$(gh project item-list 3 --owner @me --format json | jq -r '.items[] | select(.content.number==71) | .id')
FIELD_ID=$(gh project field-list 3 --owner @me --format json | jq -r '.fields[] | select(.name=="Status") | .id')
VALUE_ID=$(gh project field-list 3 --owner @me --format json | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="In Progress") | .id')

gh project item-edit --id "$ITEM_ID" --field-id "$FIELD_ID" --single-select-option-id "$VALUE_ID"
```
(Adjust project number or column names as needed.)

## Work completed so far
- Created the **Node24 Action Modernization** project board.
- Logged six roadmap issues and added them to the board:
  1. #71 — Bundle action for Node 24 runtime
  2. #72 — Extract automation pipeline into reusable workspace package
  3. #75 — Adopt npm workspaces layout
  4. #73 — Overhaul private action release packaging
  5. #74 — Add Node 24 validation workflows
  6. #76 — Publish OpenAPI docs to GitHub Pages
- All cards currently sit in the `To Do` column; move them through `In Progress` and `Done` as work proceeds.

## Next session checklist
- Confirm `gh auth status` before creating or editing issues.
- Update board status for any issues touched during the session.
- Reference issues when committing or writing summaries to keep context linked to the roadmap.
