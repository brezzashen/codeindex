---
name: git
description: |
  Single-shot commit + push pipeline for the codeindex intro site. Inspects working tree, drafts an English commit message in the project's recent commit style, commits, and pushes to `origin/main`.

  Trigger: user invokes `/git` from interactive Claude Code, OR `scripts/git-headless.sh` calls the CLI with this skill text in headless mode.

  Not for: branching, rebasing, force-push, merging — those are out-of-scope; do them manually.
allowed-tools: Bash, Read
---

# git — commit + push for codeindex

Execute the 6 steps below sequentially. Use **English only** for everything written to disk (commit message, log messages). The user converses in Chinese; you reply in Chinese for status updates but write English to git.

## Hard rules (read first, do not break)

- Branch is **`main`**. Never branch off, never force-push.
- Remote is **`origin`** = `https://github.com/brezzashen/codeindex`. Do not change remote URL.
- Never commit:
  - `node_modules/`, `.next/`, `.venv*/`, `.DS_Store`, `*.log`
  - Anything under `screenshot-*` or `*.bak.*` if it slipped through `.gitignore`
- Never amend a published commit. Always a **new commit**.
- Never use `--no-verify`. If a pre-commit hook fails, fix the underlying issue (run `npm run lint`, etc.) and create a new commit.
- Maximum 5 minutes elapsed wall-clock. If a step hangs > 60s, surface that fact instead of waiting.

## Step 1 — Snapshot state

Run these three in parallel (single Bash batch):

```bash
git status --short
git diff --stat
git diff --cached --stat
git log --oneline -10
git remote get-url origin
```

Print a one-line summary: `N files changed (M staged, K untracked, J modified), ahead origin/main by P commits`.

If status is clean AND no untracked → print `✓ nothing to commit, nothing to push`, exit success.

## Step 2 — Classify changes

For each modified path, classify into one bucket. Multiple buckets per commit is fine; pick the dominant bucket for the conventional-commit prefix:

| Path pattern | Bucket | Prefix |
|---|---|---|
| `app/`, `components/sections/`, `components/Orb/` | UI / content | `feat` (new section), `tweak` (visual polish) |
| `components/BrandHeader.tsx` | header / nav | `tweak` |
| `lib/dictionaries.ts`, `lib/i18n.tsx` | copy / translation | `docs` (text) or `feat` (new strings) |
| `lib/tools.ts`, `lib/graph-data.ts` | data | `data` |
| `lib/*.ts` (non-dict) | logic | `feat` / `fix` |
| `install/`, `scripts/`, `.claude/skills/` | tooling | `tooling` |
| `app/globals.css`, `tailwind.config.ts` | styling | `style` |
| `package.json` (deps) | deps | `deps` |
| `README.md`, `public/screenshot-*` | docs | `docs` |
| `.gitignore`, `tsconfig.json`, `next.config.js` | meta | `chore` |

If unclear, default to `chore`.

## Step 3 — Draft commit message

Format (mirror recent commits — check `git log --oneline -10`):

```
<prefix>: <one-line summary, ≤ 72 chars>

<bullet list of what changed and WHY, 1–4 bullets, English only>

<optional: links / refs / follow-up notes>
```

Rules for the body:
- One bullet per **user-visible change** (not per file).
- Mention WHY when the diff alone wouldn't make it obvious. Pure renames / dependency bumps need no body.
- No "Co-Authored-By" footer (this project is one author).
- No emoji.

Example good commits (from this repo's history):
```
feat: bilingual EN/中 + perf claim (+300% speed, −95% token cost) + intro-sized Orb (1080/630)
docs: add full-page screenshot + README preview
init: code_index_mcp intro site
```

Show the drafted message to the user (via stdout) before committing.

## Step 4 — Stage + commit

```bash
# Stage everything that's not in .gitignore.
git add -A

# Re-snapshot for safety
git status --short
```

If `git status` after `add -A` shows any path containing the literal `node_modules`, `.next`, `.venv`, or `screenshot-*` un-ignored — **abort** and tell the user `.gitignore` needs a fix.

Then:

```bash
git -c user.name="brezza" -c user.email="brezza@marsdata.ai" commit -m "$(cat <<'EOF'
<drafted message>
EOF
)"
```

If a pre-commit hook fails, surface its output verbatim, do **not** retry with `--no-verify`.

## Step 5 — Push

```bash
git push origin main
```

If rejected (non-fast-forward), the remote is ahead. Pull with `--ff-only`, then re-push. Never `--force`.

```bash
git pull --ff-only origin main && git push origin main
```

If `pull --ff-only` itself fails because local and remote diverged: stop, tell the user "local main and origin/main diverged — resolve manually".

## Step 6 — Final summary

Print exactly this block, English only:

```
─── codeindex git push complete ─────────────────────────────────
Commit  : <short-sha>  <subject>
Pushed  : origin/main  (now at <short-sha>)
Files   : <N> changed, <+ins>/<-del>
Time    : <YYYY-MM-DDTHH:MM:SSZ>
View    : https://github.com/brezzashen/codeindex/commit/<sha>
──────────────────────────────────────────────────────────────────
```

## Pitfalls

- **`.next/` tracked accidentally**: would have been caught by `.gitignore`, but if `git ls-files .next` returns anything, surface to user and add to `.gitignore` in a separate commit.
- **Large screenshot in `public/`**: `screenshot-fullpage.jpeg` is ~2.5 MB — fine for git, but warn if a new screenshot exceeds 5 MB.
- **Node lockfile drift**: if `package-lock.json` is modified without `package.json` changing, that's usually `npm install` opportunistic update — fine to commit, mention in body.
