#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -f "${ROOT_DIR}/../.env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ROOT_DIR}/../.env"
  set +a
fi

cd "${ROOT_DIR}/.."

npm ci

npx --yes playwright install --with-deps chromium

npm install --location=global @openai/codex

uv tool install --force specify-cli --from git+https://github.com/github/spec-kit.git
