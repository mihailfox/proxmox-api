# Session Playbook

## Environment basics
- Repository root: `/workspaces/proxmox-api`.
- Use the Node version declared in `package.json` → `engines.node`; update that value before changing runtime expectations elsewhere.
- Keep edits ASCII-only unless existing files require otherwise.
- Shared tooling is published via npm workspaces (`@proxmox-api/*`). Use `npm run <script> --workspace <pkg>` when invoking package-specific commands (for example, `npm run action:package --workspace .github/actions/proxmox-openapi-artifacts`).
- Treat `.github/actions/proxmox-openapi-artifacts/action.yml` as the source of truth for the action runtime (`runs.using`). Align workflows and docs with it whenever it changes.
- Branch naming convention:
  - `feature/<feature-title>` for incremental feature work.
  - `release/<version-tag>` when preparing a release for `main`.
  - `hotfix/<hotfix-title>` for urgent fixes against `main`.
  - Keep `dev` as the integration branch promoted into `main`.
- Hotfix workflow: branch from `main`, open a PR back into `main`, and then fast-forward or cherry-pick the fix into `dev` to keep both lines synchronized.

## Working with issues & branches
- Create a high-level issue, then break work into sub-issues and link them (via the project “Parent issue” field).
- Create one development branch per main issue directly from the CLI so GitHub records the linkage in the *Development* sidebar:
  ```bash
  gh issue develop <number> \
    --base <main-issue-branch:dev-for-feature:main-for-hotfix> \
    --name issue-<number>-<slug> \
    --checkout
  ```
  The command creates `issue-<number>-<slug>` from `origin/dev`, checks out the new branch locally, pushes it to the remote, and surfaces the association in GitHub’s *Development* panel.
- To manage sub-issues with the CLI, use GraphQL: `gh api graphql -f query='mutation($issue:ID!,$sub:ID!){ addSubIssue(input:{issueId:$issue, subIssueId:$sub}){ clientMutationId } }' -f issue=<parent-id> -f sub=<child-id>`. List children with `gh api graphql -f query='query($owner:String!,$repo:String!,$number:Int!){ repository(owner:$owner,name:$repo){ issue(number:$number){ subIssues(first:50){ nodes{ number title url } } } } }'`.
- For each branch, open a PR against `dev`, leave a self-review summarizing tests run, and add the PR to the project board. Reference every linked issue in the PR body with `Closes #<number>` (or `Related to #<number>` if it should stay open) so GitHub keeps the issue ↔️ PR graph accurate.
- Standard merge strategy: `gh pr merge <url> --squash --delete-branch`. Promote `dev` → `main` via a release PR that summarizes the work and test matrix.

## Release & validation workflows
- `automation-pipeline.yml` validates the core toolchain (lint/build/tests). Extend it when new checks are required.
- `action-validation.yml` keeps the bundled action honest: it rebuilds `dist/` and smoke-tests the archive on Linux, macOS, and Windows. Update aliases if workspace paths change.
- `pages.yml` regenerates OpenAPI artifacts with the automation pipeline and publishes Swagger UI to GitHub Pages.

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

   ## Notes
   ...
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
Identify the project item ID, then set the status field (example columns: `Backlog`, `To Do`, `In Progress`, `Done`).
```bash
ITEM_ID=$(gh project item-list 3 --owner @me --format json | jq -r '.items[] | select(.content.number==71) | .id')
FIELD_ID=$(gh project field-list 3 --owner @me --format json | jq -r '.fields[] | select(.name=="Status") | .id')
VALUE_ID=$(gh project field-list 3 --owner @me --format json | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="In Progress") | .id')

gh project item-edit --id "$ITEM_ID" --field-id "$FIELD_ID" --single-select-option-id "$VALUE_ID"
```
(Adjust project number or column names as needed.)

## Project hygiene checklist
- Confirm `gh auth status` before using CLI commands.
- When opening issues/PRs, link them in the project board and move through `Backlog → Todo → In Progress → Done → Deployed` as work progresses.
- Prefer `sub-issues` to tasks and link them to the main issue.
- Capture test runs in PR self-reviews so release PRs can reference them quickly.
- Keep release notes and documentation up to date when processes change (runtime bumps, new workflows, etc.).
