# codeindex

> Marketing + intro site for **`code_index_mcp`** — the MCP server that turns the
> [Mars Agent](https://marsdata.ai/) monorepo (300 modules · 4,820 symbols) into a
> Postgres-backed index Claude Code can search, trace, and reason over in milliseconds.

Live: <https://code.brezza.fun:8023/>
Source MCP: `Mars_agent/.claude/tools/code_index_mcp.py`

---

## What this site documents

`code_index_mcp` exposes **14 MCP tools** across 5 categories that turn an LLM's
"go grep the codebase" reflex into a structured, sub-100ms PostgreSQL query.

| Category | Tools | What it answers |
|---|---|---|
| **Code Index** | `search` · `deps` · `search_with_deps` | Where is symbol X? Who calls it? What does it call? |
| **Module View** | `module_info` · `architecture_overview` | What does directory X do? Show me the whole layered map. |
| **Log Triage** | `log_query` · `log_errors` · `log_stats` · `log_error_rate` | What's failing right now? Group + dedupe errors. |
| **Prompt Analysis** | `prompt_analyze` · `prompt_diff` · `prompt_progressive_check` · `prompt_trace` | What's in this agent's prompt? How does it differ? |
| **Performance** | `ttft_measure` · `files_api_test` | Did the prompt-fragment change move TTFT? Is Files API reachable? |

The page itself renders these as cards with copy-pasteable examples,
plus a live ECharts force-graph showing the inter-layer call topology
(9 layers, 35 anchor modules, the heaviest cross-boundary edges).

## Stack

- **Next.js 15** + React 19 + App Router
- **TypeScript 5**
- **Tailwind 3** (custom Mars-style glass card tokens)
- **ogl** for the WebGL Orb (vendored from Mars Agent `front/components/effects/Orb/`)
- **ECharts 5** + `echarts-for-react` for the force-layout code graph
- **lucide-react** icon set

Dark-mode only — matches Mars Agent's brand. Pink → orange → red gradient
(`#f778ba` → `#F97316` → `#DA3733`) carried through the Orb, the wordmark,
and the category accents.

## Local dev

```bash
npm install
npm run dev          # → http://localhost:8028
```

Dev server binds `0.0.0.0:8028` on purpose: the prod path proxies through
**macmini nginx** at `https://code.brezza.fun:8023/` → `192.168.50.196:8028`
(same pattern as `ppt.brezza.fun:8023` → MarsPPT and `beta.brezza.fun:8023` → Mars Agent dev frontend).

## Production deployment

| Layer | Host | Port |
|---|---|---|
| DNS | `code.brezza.fun` → macmini DDNS | (Cloudflare) |
| Edge | macmini nginx (`192.168.50.223`) | `:8023` (SSL) + `:8024` → 301 |
| Upstream | this Next.js process | `:8028` |
| Cert | shared wildcard `mars.brezza.fun.crt` | TLSv1.2 + 1.3 |

nginx `upstream` and `server` blocks added to
`/opt/homebrew/etc/nginx/servers/mars.conf` — see commit history for the exact diff.

## Project layout

```
codeindex/
├── app/
│   ├── layout.tsx           # root layout + metadata
│   ├── page.tsx             # one-page composition
│   └── globals.css          # Mars glass-card + scrollbar tokens
├── components/
│   ├── BrandHeader.tsx      # fixed top pill nav
│   ├── Orb/                 # WebGL animated sphere (View / scene / shaders)
│   └── sections/
│       ├── Hero.tsx
│       ├── Tools.tsx        # 14 tool cards, grouped by category
│       ├── Architecture.tsx # 4-stage pipeline + 3 data-model tables
│       ├── CodeGraph.tsx    # ECharts force-layout graph
│       ├── Stats.tsx        # layer-distribution bars
│       ├── Install.tsx      # 4-step install + verify
│       └── Footer.tsx
├── lib/
│   ├── tools.ts             # 14 tool definitions + 5 categories
│   └── graph-data.ts        # 35 anchor nodes + 34 inter-layer edges
└── package.json
```

## License

UNLICENSED — internal / brand site.

---

Part of the Mars Agent toolchain. Designed against real production debug sessions,
refined across 60+ entries in `Mars_agent/.claude/rules/experience.md`.
