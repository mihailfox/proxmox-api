#!/usr/bin/env bash
set -euo pipefail
#set -x

BASHRC="$HOME/.bashrc"
ALIASES="$HOME/.bash_aliases"
INPUTRC="$HOME/.inputrc"

cat <<'EOF' >"$ALIASES"
alias fd=fdfind
alias ls="lsd --color auto"
alias ll="lsd -alF --color auto"
alias la="lsd -A --color auto"
alias cat="bat --color auto --style plain"
EOF

cat <<'EOF' >"$INPUTRC"
$include /etc/inputrc

set blink-matching-paren on
set colored-completion-prefix on
set completion-ignore-case on
set completion-map-case on
set show-all-if-unmodified on
set show-all-if-ambiguous on
TAB: menu-complete
"\e[Z": menu-complete-backward
EOF

cat <<'EOF' >"$BASHRC"
case $- in
    *i*) ;;
      *) return;;
esac

HISTCONTROL=ignoreboth
shopt -s histappend
HISTSIZE=-1
HISTFILESIZE=-1
HISTDUP="erase"
HISTTIMEFORMAT="%FT%T "

shopt -s checkwinsize
shopt -s globstar

[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
  debian_chroot=$(cat /etc/debian_chroot)
fi

case "$TERM" in
xterm-color | *-256color) color_prompt=yes ;;
esac

if [ -n "$force_color_prompt" ]; then
  if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
    color_prompt=yes
  else
    color_prompt=
  fi
fi

if [ "$color_prompt" = yes ]; then
  PS1='${debian_chroot:+($debian_chroot)}\[$(tput setaf 39)\]\u\[$(tput setaf 81)\]@\[$(tput setaf 77)\]\h \[$(tput setaf 226)\]\w \[$(tput sgr0)\]\n$ '
else
  PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

case "$TERM" in
xterm* | rxvt*)
  PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
  ;;
*) ;;
esac

if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
fi

if [ -f ~/.bash_aliases ]; then
  . ~/.bash_aliases
fi

if [ -f ~/.bash_env ]; then
  . ~/.bash_env
fi

if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
# bash theme - partly inspired by https://github.com/ohmyzsh/ohmyzsh/blob/master/themes/robbyrussell.zsh-theme
__bash_prompt() {
    local userpart='`export XIT=$? \
        && [ ! -z "${GITHUB_USER:-}" ] && echo -n "\[\033[0;32m\]@${GITHUB_USER:-} " || echo -n "\[\033[0;32m\]\u " \
        && [ "$XIT" -ne "0" ] && echo -n "\[\033[1;31m\]➜" || echo -n "\[\033[0m\]➜"`'
    local gitbranch='`\
        if [ "$(git config --get devcontainers-theme.hide-status 2>/dev/null)" != 1 ] && [ "$(git config --get codespaces-theme.hide-status 2>/dev/null)" != 1 ]; then \
            export BRANCH="$(git --no-optional-locks symbolic-ref --short HEAD 2>/dev/null || git --no-optional-locks rev-parse --short HEAD 2>/dev/null)"; \
            if [ "${BRANCH:-}" != "" ]; then \
                echo -n "\[\033[0;36m\](\[\033[1;31m\]${BRANCH:-}" \
                && if [ "$(git config --get devcontainers-theme.show-dirty 2>/dev/null)" = 1 ] && \
                    git --no-optional-locks ls-files --error-unmatch -m --directory --no-empty-directory -o --exclude-standard ":/*" > /dev/null 2>&1; then \
                        echo -n " \[\033[1;33m\]✗"; \
                fi \
                && echo -n "\[\033[0;36m\]) "; \
            fi; \
        fi`'
    local lightblue='\[\033[1;34m\]'
    local removecolor='\[\033[0m\]'
    PS1="${userpart} ${lightblue}\w ${gitbranch}${removecolor}\n\$ "
    unset -f __bash_prompt
}
__bash_prompt
export PROMPT_DIRTRIM=4

# Check if the terminal is xterm
if [[ "$TERM" == "xterm" ]]; then
    # Function to set the terminal title to the current command
    preexec() {
        local cmd="${BASH_COMMAND}"
        echo -ne "\033]0;${USER}@${HOSTNAME}: ${cmd}\007"
    }

    # Function to reset the terminal title to the shell type after the command is executed
    precmd() {
        echo -ne "\033]0;${USER}@${HOSTNAME}: ${SHELL}\007"
    }

    # Trap DEBUG signal to call preexec before each command
    trap 'preexec' DEBUG

    # Append to PROMPT_COMMAND to call precmd before displaying the prompt
    PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND; }precmd"
fi

eval "$(bat --completion bash)"
FZF_COMPLETION_AUTO_COMMON_PREFIX=true
FZF_COMPLETION_AUTO_COMMON_PREFIX_PART=true
eval "$(fzf --bash)"
eval "$(zoxide init --cmd cd --hook pwd bash)"

EOF

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -f "${ROOT_DIR}/../.env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ROOT_DIR}/../.env"
  set +a
fi

sudo apt update -y && \
  sudo apt upgrade -y --no-install-recommends --show-progress

curl -L --fail --show-error --progress-bar -o /tmp/ripgrep.deb \
  https://github.com/BurntSushi/ripgrep/releases/download/14.1.1/ripgrep_14.1.1-1_amd64.deb && \
  sudo dpkg -i /tmp/ripgrep.deb && \
  rm -f /tmp/ripgrep.deb

curl -L --fail --show-error --progress-bar -o /tmp/fdfind.deb \
  https://github.com/sharkdp/fd/releases/download/v10.3.0/fd-musl_10.3.0_amd64.deb && \
  sudo dpkg -i /tmp/fdfind.deb && \
  rm -f /tmp/fdfind.deb

curl -L --fail --show-error --progress-bar -o /tmp/lsd.deb \
  https://github.com/lsd-rs/lsd/releases/download/v1.1.5/lsd-musl_1.1.5_amd64.deb && \
  sudo dpkg -i /tmp/lsd.deb && \
  rm -f /tmp/lsd.deb

curl -L --fail --show-error --progress-bar -o /tmp/bat.deb \
  https://github.com/sharkdp/bat/releases/download/v0.25.0/bat_0.25.0_amd64.deb && \
  sudo dpkg -i /tmp/bat.deb && \
  rm -f /tmp/bat.deb

curl -L --fail --show-error --progress-bar -o /tmp/zoxide.deb \
  https://github.com/ajeetdsouza/zoxide/releases/download/v0.9.8/zoxide_0.9.8-1_amd64.deb && \
  sudo dpkg -i /tmp/zoxide.deb && \
  rm -f /tmp/zoxide.deb


cd "${ROOT_DIR}/.."

npm ci

npx --yes playwright install --only-shell --with-deps chromium

