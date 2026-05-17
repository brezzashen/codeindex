#!/usr/bin/env bash
# Headless commit + push pipeline for the codeindex intro site.
#
# Mirrors ~/Mars_agent/scripts/utils/git-headless.sh in spirit but simpler —
# no stream-json processor, just streams Claude Code's plain output to terminal.
#
# Usage:
#   scripts/git-headless.sh             # commit + push
#   scripts/git-headless.sh --dry-run   # draft message, no commit / push
#   scripts/git-headless.sh --verbose   # also save raw transcript to /tmp
#
# Prereqs: `claude` CLI installed and authenticated. Run from anywhere — the
# script `cd`s to the project root via its own location.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

DRY_RUN=""
VERBOSE=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN="(DRY RUN: stop after Step 3 draft. Do NOT commit, do NOT push. Print the drafted message and exit.)" ;;
    --verbose) VERBOSE=true ;;
    -h|--help)
      sed -n '2,15p' "$0"; exit 0 ;;
    *) echo "unknown arg: $arg"; exit 2 ;;
  esac
done

command -v claude >/dev/null || {
  echo "❌ \`claude\` CLI not in PATH. Install: https://claude.com/claude-code"
  exit 1
}

SKILL_FILE="$PROJECT_ROOT/.claude/skills/git/SKILL.md"
[ -f "$SKILL_FILE" ] || { echo "❌ $SKILL_FILE not found"; exit 1; }

TODAY=$(date +%Y-%m-%dT%H:%M:%SZ)
SKILL_BODY=$(cat "$SKILL_FILE")

PROMPT="Execute the codeindex git commit + push workflow. You are Sonnet — run all steps directly in this process, do not spawn subagents (Agent tool is forbidden).

Today: ${TODAY}
${DRY_RUN}

IMPORTANT — write English to git (commit messages, log lines). You may reply to the user in Chinese for status updates.
IMPORTANT — after Step 6 print the final summary block exactly as specified.

Follow this skill end-to-end:

${SKILL_BODY}"

CLAUDE_ARGS=(
  -p "$PROMPT"
  --model sonnet
  --allowedTools "Bash,Read"
  --max-turns 18
)

if $VERBOSE; then
  TMP=$(mktemp /tmp/codeindex-git-headless.XXXXXX)
  echo "Verbose mode → transcript: $TMP"
  claude "${CLAUDE_ARGS[@]}" 2>&1 | tee "$TMP"
else
  claude "${CLAUDE_ARGS[@]}"
fi
