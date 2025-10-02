#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -f "${ROOT_DIR}/../.env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ROOT_DIR}/../.env"
  set +a
fi

sudo apt-get update -y

curl -L --fail --show-error --progress-bar -o /tmp/ripgrep.deb \
  https://github.com/BurntSushi/ripgrep/releases/download/14.1.1/ripgrep_14.1.1-1_amd64.deb && \
  sudo dpkg -i /tmp/ripgrep.deb && \
  rm -f /tmp/ripgrep.deb

cd "${ROOT_DIR}/.."

npm ci

npx --yes playwright install --only-shell --with-deps chromium 

npm install --location=global @openai/codex

uv tool install --force specify-cli --from git+https://github.com/github/spec-kit.git
