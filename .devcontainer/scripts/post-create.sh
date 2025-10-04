#!/usr/bin/env bash
echo "This script is run after update-content.sh"

curl -L --fail --show-error --progress-bar -o ~/.local/bin/codex \
  https://github.com/openai/codex/releases/latest/download/codex && \
  chmod +x ~/.local/bin/codex

uv tool install --force specify-cli --from git+https://github.com/github/spec-kit.git
