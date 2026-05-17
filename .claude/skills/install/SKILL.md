---
name: install
description: |
  Install code_index_mcp into a Claude Code workspace — venv + Postgres + initial index + .mcp.json patch.

  Use when the user wants to add code_index_mcp to their project so Claude Code gets symbol search / call graph / log triage tools over their codebase.

  Trigger phrases: "install code_index_mcp", "set up code index for this project", "/install".

  Not for: re-indexing after edits (just re-run code_agent.py index), debugging an already-installed instance (use /log + claude logs).
allowed-tools: Bash, Read, Edit, Write, AskUserQuestion
---

# Install code_index_mcp

You are walking the user through installing `code_index_mcp` into their project. This skill collects 3 parameters, runs the install script, and verifies.

## Step 1 — Collect parameters

Ask the user 3 things using **one AskUserQuestion call** (parallel questions):

1. **Source repo location** — Where is the Mars_agent checkout that ships `code_index_mcp.py`?
   - Recommended default: `~/Mars_agent`
   - If user does not have it: ask them to `git clone <source-repo-url> ~/Mars_agent` first

2. **Target project** — Which project should be indexed (the one Claude Code will work on)?
   - Default: current working directory (`pwd`)

3. **Postgres connection** — Where should the index live?
   - Recommended default: `postgresql://localhost:5432/code_index`
   - If the user runs Mars Agent locally: `postgresql://wind@localhost:5332/code_index` (Docker compose port)

Show the defaults in the AskUserQuestion options so single-keystroke approval is possible.

## Step 2 — Pre-flight check (read-only, no mutations)

Before running install.sh, verify these with Bash:

```bash
# python ≥ 3.11
python3 -c 'import sys; assert sys.version_info >= (3,11)' && echo OK

# psql available
command -v psql

# source has the right files
ls "$SOURCE/.claude/tools/code_index_mcp.py" "$SOURCE/.claude/tools/code_agent.py"

# target directory exists + writable
test -d "$TARGET" -a -w "$TARGET" && echo OK
```

If any check fails, surface the exact remediation:
- python: `brew install python@3.11` (mac) or `apt install python3.11` (linux)
- psql: `brew install postgresql@14`
- source files missing: instruct `git clone <repo>`
- target not writable: confirm path, suggest `cd` to writable location

## Step 3 — Run install.sh

```bash
bash "$SKILL_PROJECT_ROOT/install/install.sh" \
  --source="$SOURCE" \
  --target="$TARGET" \
  --postgres-uri="$POSTGRES_URI"
```

`$SKILL_PROJECT_ROOT` is wherever the user cloned `codeindex`. If they did not clone it, instruct:

```bash
git clone https://github.com/brezzashen/codeindex.git ~/codeindex
bash ~/codeindex/install/install.sh --source=... --target=... --postgres-uri=...
```

Stream the install.sh output to the user — the script is designed to be readable, with `›/✓/⚠/✗` status markers per step.

If `install.sh` exits non-zero, the exit code maps to:
- `1` — missing prereq (script will have told the user what)
- `2` — bad argument (revisit Step 1)
- `3` — setup failure (probably postgres permission / target not writable / disk full)

## Step 4 — Verify

After install.sh exits 0, the user should restart Claude Code in `$TARGET` so the new `.mcp.json` is picked up. Then verify with:

```
mcp__code_index__search(query="<any-symbol-in-the-target-project>")
```

A successful install returns `file_path:line_number` for at least one match. An empty result means the index is empty — re-run step 5 of `install.sh` (the `code_agent.py index` step) and watch its output for parse errors.

## Step 5 — Ongoing maintenance hint

Tell the user once, at the end:

> Re-run `code_agent.py index` after large refactors so the index stays current. It is incremental — only changed files are re-parsed. Typical re-index after a single commit: 5–15 seconds.

## Common pitfalls

- **`code_agent.py` hard-codes layer detection by directory name** (`backend/`, `front/`, `ios/`) — for projects with a different layout, the `module_info` / `architecture_overview` tools will return all modules as "Other". This is a known limitation; symbol search + deps work regardless. Tell the user this if their layout is non-Mars-style.
- **POSTGRES_URI hostname `localhost` inside Docker** — if Claude Code runs on host but Postgres is in a container, use the container's host IP or `host.docker.internal`. Detect by `docker ps` if user has docker compose running.
- **`pg_trgm` extension permission** — needs `SUPERUSER` or `pg_create_extension`. If `CREATE EXTENSION` fails, instruct user to run `psql -U postgres -c "CREATE EXTENSION pg_trgm;" <dbname>` manually as superuser.

## Hard rules

- NEVER auto-run `install.sh` without showing the user the parameter summary first.
- NEVER overwrite an existing `.mcp.json` — the script already detects this and prints a patch; surface the patch to the user, do not auto-merge.
- NEVER skip the verify step (Step 4) — silent install failure is the most common feedback.
