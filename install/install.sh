#!/usr/bin/env bash
# code_index_mcp installer — venv + Postgres + initial index + .mcp.json patch
#
# Usage:
#   bash install/install.sh \
#     --source=/path/to/Mars_agent \
#     --target=/path/to/your-project \
#     --postgres-uri="postgresql://user:pass@localhost:5332/code_index" \
#     [--venv=/path/to/venv] [--dry-run]
#
# What it does (idempotent — re-running is safe):
#   1) Check prerequisites (python ≥ 3.11, postgres ≥ 14, psql, uv)
#   2) Create venv (if absent) + install mcp + asyncpg + psycopg2-binary + libcst
#   3) createdb + CREATE EXTENSION pg_trgm (if absent)
#   4) Copy core MCP files from <source>/.claude/tools/ → <target>/.claude/tools/
#   5) Run code-agent.sh index against <target>
#   6) Emit / patch <target>/.mcp.json with the code_index server stanza
#   7) Print verification command
#
# Exit codes:
#   0 success · 1 missing prereq · 2 bad arg · 3 setup failure

set -euo pipefail

# ── arg parsing ──────────────────────────────────────────────────────────
SOURCE=""
TARGET=""
POSTGRES_URI="${POSTGRES_URI:-postgresql://localhost:5332/code_index}"
VENV=""
DRY_RUN=false

for arg in "$@"; do
  case $arg in
    --source=*)        SOURCE="${arg#*=}" ;;
    --target=*)        TARGET="${arg#*=}" ;;
    --postgres-uri=*)  POSTGRES_URI="${arg#*=}" ;;
    --venv=*)          VENV="${arg#*=}" ;;
    --dry-run)         DRY_RUN=true ;;
    -h|--help)
      sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "unknown arg: $arg"; exit 2 ;;
  esac
done

[ -z "$SOURCE" ] && { echo "❌ --source=<path-to-Mars_agent> required"; exit 2; }
[ -z "$TARGET" ] && { echo "❌ --target=<your-project-path> required"; exit 2; }
[ ! -d "$SOURCE/.claude/tools" ] && { echo "❌ $SOURCE is not a Mars_agent checkout (missing .claude/tools/)"; exit 2; }
[ ! -d "$TARGET" ] && { echo "❌ target dir does not exist: $TARGET"; exit 2; }

VENV="${VENV:-$TARGET/.venv-codeindex}"

say() { printf "\033[36m›\033[0m %s\n" "$*"; }
ok()  { printf "\033[32m✓\033[0m %s\n" "$*"; }
warn() { printf "\033[33m⚠\033[0m %s\n" "$*"; }
fail() { printf "\033[31m✗\033[0m %s\n" "$*"; exit 3; }
run() { if $DRY_RUN; then echo "  [dry-run] $*"; else eval "$@"; fi; }

# ── Step 1: prereq check ─────────────────────────────────────────────────
say "Step 1/6 — prerequisite check"
command -v python3 >/dev/null || fail "python3 not found"
PY_VER=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
[[ "$(printf '%s\n' "$PY_VER" "3.11" | sort -V | head -1)" == "3.11" ]] || fail "python ≥ 3.11 required (found $PY_VER)"
ok "python $PY_VER"

command -v psql >/dev/null || fail "psql client not found"
PG_HOST=$(echo "$POSTGRES_URI" | sed -E 's|.*@([^:/]+).*|\1|; s|^postgresql://([^:/]+).*|\1|')
PG_HOST=${PG_HOST:-localhost}
psql "$POSTGRES_URI" -c "SELECT version();" >/dev/null 2>&1 || \
  psql "${POSTGRES_URI%/*}/postgres" -c "SELECT version();" >/dev/null 2>&1 || \
  fail "cannot connect to postgres at $POSTGRES_URI (db may not exist yet — that's fine if we can connect to /postgres)"
ok "postgres reachable"

command -v uv >/dev/null && PIP="uv pip" || PIP="python3 -m pip"
ok "package installer: $PIP"

# ── Step 2: venv + deps ──────────────────────────────────────────────────
say "Step 2/6 — venv at $VENV"
if [ ! -d "$VENV" ]; then
  run "python3 -m venv \"$VENV\""
  ok "created venv"
else
  ok "venv already exists"
fi

run "source \"$VENV/bin/activate\" && $PIP install --quiet 'mcp>=1.0.0' psycopg2-binary asyncpg libcst"
ok "installed mcp + psycopg2 + asyncpg + libcst"

# ── Step 3: postgres db + pg_trgm ────────────────────────────────────────
say "Step 3/6 — postgres db + pg_trgm"
DB_NAME=$(echo "$POSTGRES_URI" | sed -E 's|.*/([^/?]+).*|\1|')
ADMIN_URI="${POSTGRES_URI%/*}/postgres"

if ! psql "$POSTGRES_URI" -c "SELECT 1;" >/dev/null 2>&1; then
  say "  creating database '$DB_NAME'"
  run "psql \"$ADMIN_URI\" -c \"CREATE DATABASE $DB_NAME;\""
else
  ok "database '$DB_NAME' exists"
fi

run "psql \"$POSTGRES_URI\" -c 'CREATE EXTENSION IF NOT EXISTS pg_trgm;' >/dev/null"
ok "pg_trgm extension ready"

# ── Step 4: copy MCP files into target ──────────────────────────────────
say "Step 4/6 — copy MCP files into $TARGET/.claude/tools/"
run "mkdir -p \"$TARGET/.claude/tools\""
for f in code_index_mcp.py code_agent.py code-agent.sh prompt_analyzer.py ttft_handler.py log_query_handler.py; do
  if [ -f "$SOURCE/.claude/tools/$f" ]; then
    run "cp -p \"$SOURCE/.claude/tools/$f\" \"$TARGET/.claude/tools/$f\""
  else
    warn "  skipped (not in source): $f"
  fi
done
run "chmod +x \"$TARGET/.claude/tools/code-agent.sh\""
ok "MCP files copied"

# ── Step 5: initial index ────────────────────────────────────────────────
say "Step 5/6 — build initial index against $TARGET"
warn "  this may take 30s–3min depending on project size"
run "cd \"$TARGET\" && POSTGRES_URI=\"$POSTGRES_URI\" PYTHONPATH=\"$TARGET/.claude/tools\" \"$VENV/bin/python\" \"$TARGET/.claude/tools/code_agent.py\" index || true"
SYM_COUNT=$(psql "$POSTGRES_URI" -tAc "SELECT count(*) FROM code_symbols WHERE NOT is_test;" 2>/dev/null || echo "0")
ok "indexed $SYM_COUNT non-test symbols"

# ── Step 6: .mcp.json patch ──────────────────────────────────────────────
say "Step 6/6 — write .mcp.json stanza"
MCP_FILE="$TARGET/.mcp.json"
STANZA_FILE=$(mktemp)
cat >"$STANZA_FILE" <<JSON
{
  "mcpServers": {
    "code_index": {
      "command": "$VENV/bin/python",
      "args": ["$TARGET/.claude/tools/code_index_mcp.py"],
      "env": {
        "POSTGRES_URI": "$POSTGRES_URI",
        "PYTHONPATH": "$TARGET/.claude/tools"
      }
    }
  }
}
JSON

if [ ! -f "$MCP_FILE" ]; then
  run "cp \"$STANZA_FILE\" \"$MCP_FILE\""
  ok "created $MCP_FILE"
else
  warn "$MCP_FILE exists — patch suggested below (not auto-merging):"
  echo "──── add this to mcpServers ────"
  sed -n '3,11p' "$STANZA_FILE"
  echo "─────────────────────────────────"
fi
rm -f "$STANZA_FILE"

# ── done ─────────────────────────────────────────────────────────────────
echo
ok "install complete"
echo
cat <<EOF
Next:
  1) Restart Claude Code in $TARGET
  2) Verify with: mcp__code_index__search(query="<some-symbol-in-your-project>")
  3) Re-index after large changes:
       POSTGRES_URI="$POSTGRES_URI" "$VENV/bin/python" "$TARGET/.claude/tools/code_agent.py" index

Indexed symbols : $SYM_COUNT
Postgres URI    : $POSTGRES_URI
Venv            : $VENV
MCP config      : $MCP_FILE
EOF
