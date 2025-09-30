#!/usr/bin/env bash
if [[ ! -f .devcontainer/devcontainer.json || $(command -v code >/dev/null 2>&1) -ne 0 ]]; then
  echo "[ ERROR ] devcontainer or vscode execcutable not found"
  exit 1
fi

dir="$(pwd)"
hex="$(printf ${dir} | od -A n -t x1 | tr -d '[\n\t ]')"
base="$(basename ${dir})"
code --folder-uri="vscode-remote://dev-container%2B${hex}/workspaces/${base}"
