/**
 * Bilingual copy for the codeindex intro site.
 * Keys mirror render call-sites; flat where possible, nested only for arrays.
 * Tool-card copy ships its bilingual entry inline so `lib/tools.ts` stays
 * language-neutral (only icons/categories/examples).
 */

export interface ToolI18n {
  one_liner: string;
  description: string;
}

export interface Dictionary {
  /* BrandHeader */
  nav_tools: string;
  nav_compare: string;
  nav_subconscious: string;
  nav_architecture: string;
  nav_graph: string;
  nav_maintenance: string;
  nav_install: string;

  /* Hero */
  hero_eyebrow: string;
  hero_title_a: string;
  hero_title_b: string;
  hero_title_c: string;
  hero_intro: (modules: string, symbols: string) => string;
  hero_cta_tools: string;
  hero_cta_install: string;
  hero_stat_modules: string;
  hero_stat_symbols: string;
  hero_stat_tools: string;
  perf_speed_value: string;
  perf_speed_label: string;
  perf_token_value: string;
  perf_token_label: string;
  perf_vs: string;

  /* Tools — code-search only */
  tools_eyebrow: string;
  tools_title: string;
  tools_intro: string;
  cat_index_label: string;
  cat_index_hint: string;
  cat_module_label: string;
  cat_module_hint: string;
  tool: Record<string, ToolI18n>;

  /* Compare — vs bash / grep */
  cmp_eyebrow: string;
  cmp_title_a: string;
  cmp_title_b: string;
  cmp_intro: string;
  cmp_col_bash: string;
  cmp_col_ci: string;
  cmp_metric_cmd: string;
  cmp_metric_time: string;
  cmp_metric_result: string;
  cmp_metric_structure: string;
  /* 3 cases */
  cmp_c1_title: string;
  cmp_c1_question: string;
  cmp_c1_bash_cmd: string;
  cmp_c1_bash_time: string;
  cmp_c1_bash_result: string;
  cmp_c1_bash_structure: string;
  cmp_c1_ci_cmd: string;
  cmp_c1_ci_time: string;
  cmp_c1_ci_result: string;
  cmp_c1_ci_structure: string;
  cmp_c2_title: string;
  cmp_c2_question: string;
  cmp_c2_bash_cmd: string;
  cmp_c2_bash_time: string;
  cmp_c2_bash_result: string;
  cmp_c2_bash_structure: string;
  cmp_c2_ci_cmd: string;
  cmp_c2_ci_time: string;
  cmp_c2_ci_result: string;
  cmp_c2_ci_structure: string;
  cmp_c3_title: string;
  cmp_c3_question: string;
  cmp_c3_bash_cmd: string;
  cmp_c3_bash_time: string;
  cmp_c3_bash_result: string;
  cmp_c3_bash_structure: string;
  cmp_c3_ci_cmd: string;
  cmp_c3_ci_time: string;
  cmp_c3_ci_result: string;
  cmp_c3_ci_structure: string;
  cmp_footer: string;

  /* Subconscious section */
  subc_eyebrow: string;
  subc_title_a: string;
  subc_title_b: string;
  subc_title_c: string;
  subc_intro: string;
  subc_layer_label: string;
  subc_l0_title: string;
  subc_l0_kind: string;
  subc_l0_desc: string;
  subc_l0_items: string[];
  subc_l0_cost: string;
  subc_l1_title: string;
  subc_l1_kind: string;
  subc_l1_desc: string;
  subc_l1_items: string[];
  subc_l1_cost: string;
  subc_l2_title: string;
  subc_l2_kind: string;
  subc_l2_desc: string;
  subc_l2_items: string[];
  subc_l2_cost: string;
  subc_l3_title: string;
  subc_l3_kind: string;
  subc_l3_desc: string;
  subc_l3_items: string[];
  subc_l3_cost: string;
  subc_footer: string;

  /* Architecture section */
  arch_eyebrow: string;
  arch_title: string;
  arch_intro_pre: string;
  arch_intro_mid: string;
  arch_intro_post: string;
  stage_label: string;
  stage1_title: string;
  stage1_desc: string;
  stage2_title: string;
  stage2_desc: string;
  stage3_title: string;
  stage3_desc: string;
  stage4_title: string;
  stage4_desc: string;
  symbols_table_title: string;
  symbols_table_caption: string;
  deps_table_title: string;
  deps_table_caption: string;
  modules_table_title: string;
  modules_table_caption: string;

  /* CodeGraph */
  graph_eyebrow: string;
  graph_title_a: string;
  graph_title_b: string;
  graph_title_c: string;
  graph_intro: string;
  graph_hint_size: string;
  graph_hint_weight: string;
  graph_hint_interact: string;

  /* Stats */
  stats_eyebrow: string;
  stats_title: string;
  stats_intro: string;
  stats_layer_distribution: string;
  stats_modules_label: string;
  stats_modules_sub: string;
  stats_symbols_label: string;
  stats_symbols_sub: string;
  stats_query_label: string;
  stats_query_sub: string;
  layer_row: Record<string, { label: string; highlight: string }>;

  /* Maintenance — headless commit/push pipeline */
  mnt_eyebrow: string;
  mnt_title_a: string;
  mnt_title_b: string;
  mnt_title_c: string;
  mnt_intro: string;
  mnt_cmd_label: string;
  mnt_cmd_value: string;
  mnt_step1_title: string;
  mnt_step1_desc: string;
  mnt_step2_title: string;
  mnt_step2_desc: string;
  mnt_step3_title: string;
  mnt_step3_desc: string;
  mnt_step4_title: string;
  mnt_step4_desc: string;
  mnt_footer: string;

  /* Install */
  install_eyebrow: string;
  install_title: string;
  install_intro: string;
  step1_title: string;
  step1_desc: string;
  step2_title: string;
  step2_desc: string;
  step3_title: string;
  step3_desc: string;
  step4_title: string;
  step4_desc: string;
  verify_title: string;
  verify_desc_a: string;
  verify_desc_b: string;
  verify_desc_c: string;

  /* Footer */
  footer_tagline: string;
}

/* ───────────────────────────── ENGLISH ───────────────────────────── */

export const en: Dictionary = {
  nav_tools: 'Tools',
  nav_compare: 'vs bash',
  nav_subconscious: 'Subconscious',
  nav_architecture: 'Architecture',
  nav_graph: 'Graph',
  nav_maintenance: 'Maintenance',
  nav_install: 'Install',

  hero_eyebrow: 'MCP-native code intelligence',
  hero_title_a: 'The codebase as a ',
  hero_title_b: 'queryable index',
  hero_title_c: ', not a folder of files',
  hero_intro: (m, s) =>
    `code_index_mcp is the MCP server that turns ${m} modules · ${s} symbols into a Postgres-backed index Claude Code can search, trace, and reason over in milliseconds. Five focused queries — find a symbol, follow its callers, see the module — replace dozens of grep + awk + open-file rounds.`,
  hero_cta_tools: 'See the 5 queries',
  hero_cta_install: 'Install in 30 seconds',
  hero_stat_modules: 'Modules indexed',
  hero_stat_symbols: 'Symbols',
  hero_stat_tools: 'Core tools',
  perf_speed_value: '+300%',
  perf_speed_label: 'search speed',
  perf_token_value: '−95%',
  perf_token_label: 'token cost',
  perf_vs: 'vs grep + LLM summarize on raw output',

  tools_eyebrow: 'Five tools, one job: locate code',
  tools_title: 'Where is it · Who calls it · What is the module',
  tools_intro:
    'Five primitives, every refactor or feature kicks off with one of these. No log triage, no prompt diff, no perf probe — those live in their own MCPs. This one stays code-only so its answers fit a single tool round-trip.',
  cat_index_label: 'Code Index',
  cat_index_hint: 'Symbol + call graph',
  cat_module_label: 'Module View',
  cat_module_hint: 'Layered architecture + per-module dossier',
  tool: {
    search: {
      one_liner: 'Symbol lookup — more precise than grep',
      description:
        'PostgreSQL ILIKE over the symbol table. Returns file_path:line_number + signature, up to 50 hits. Test files excluded by default, language-aware (Python / TypeScript / Swift).',
    },
    deps: {
      one_liner: 'Bidirectional callers + callees with boundary tags',
      description:
        'Who calls this symbol, what this symbol calls. Edges tagged [internal] / [cross-module] / [cross-layer] / [external] so refactor blast-radius is visible without reading 12 files.',
    },
    search_with_deps: {
      one_liner: 'Locate + top-3 dep trees in one round-trip',
      description:
        'When you want "where is it AND who uses it" in a single tool call. Composes search() with deps() over the top 3 hits. Cuts an MCP round-trip on the most common pattern.',
    },
    module_info: {
      one_liner: 'Per-directory dossier: layer, responsibility, public API',
      description:
        'What this module does, which layer it lives in, public exports, internal symbols, top cross-boundary deps. Partial path matching via ILIKE so "auth" finds backend/src/auth.',
    },
    architecture_overview: {
      one_liner: 'Whole-project layered architecture in one call',
      description:
        'Groups every indexed module by layer (API / Agent / Middleware / Tool / Service / Frontend / iOS …). Summary mode for orientation; detailed mode adds public API + dep lists.',
    },
  },

  cmp_eyebrow: 'vs bash',
  cmp_title_a: 'A query against ',
  cmp_title_b: '4,820 indexed symbols',
  cmp_intro:
    'Three workflows every maintainer runs daily. The bash column shows the actual command an agent would have run before — and the noise it would have to wade through. The MCP column shows what comes back: structured, layer-aware, length-bounded.',
  cmp_col_bash: 'bash + grep',
  cmp_col_ci: 'code_index_mcp',
  cmp_metric_cmd: 'Command',
  cmp_metric_time: 'Latency',
  cmp_metric_result: 'Result',
  cmp_metric_structure: 'Structure',

  cmp_c1_title: 'Case 1 — Where is this defined?',
  cmp_c1_question: 'Find the definition of `validate_token`.',
  cmp_c1_bash_cmd: 'grep -rn "def validate_token\\|validate_token =" backend/ front/ ios/ | head -20',
  cmp_c1_bash_time: '~640ms · scans every file',
  cmp_c1_bash_result: '12 raw lines — definitions, calls, comments, test stubs all mixed',
  cmp_c1_bash_structure: 'Plain text · no signature · agent must re-read each file to disambiguate',
  cmp_c1_ci_cmd: "search(query='validate_token')",
  cmp_c1_ci_time: '~35ms · indexed ILIKE',
  cmp_c1_ci_result: 'backend/src/auth/token_verifier.py:42 — def validate_token(token: str) -> User',
  cmp_c1_ci_structure: 'file_path:line_number + full signature, kind=function, tests excluded',

  cmp_c2_title: 'Case 2 — Who is calling this?',
  cmp_c2_question: 'Find every call site of `load_mcp_tools`.',
  cmp_c2_bash_cmd:
    'grep -rn "load_mcp_tools(" backend/ | grep -v "def load_mcp_tools" | awk -F: \'{print $1}\' | sort -u',
  cmp_c2_bash_time: '~1.2s · 4 piped processes',
  cmp_c2_bash_result: '7 file paths — no layer / no line number / no edge direction (caller vs callee)',
  cmp_c2_bash_structure: 'Filename list · agent must read each to confirm it is a real call',
  cmp_c2_ci_cmd: "deps(symbol='load_mcp_tools', kind='calls')",
  cmp_c2_ci_time: '~80ms · join on indexed FK',
  cmp_c2_ci_result:
    '↑ 4 callers · [internal] tool_loader.py:88 · [cross-layer] agents/factory.py:153 · …',
  cmp_c2_ci_structure: 'Direction (↑callers / ↓callees), boundary tag, line numbers, signature',

  cmp_c3_title: 'Case 3 — What does this module do?',
  cmp_c3_question: 'Get a dossier on backend/auth.',
  cmp_c3_bash_cmd:
    "find backend/auth -name '*.py' | xargs wc -l | sort -rn | head; grep -rn '^def \\|^class ' backend/auth | head -30",
  cmp_c3_bash_time: '~2.5s · two passes, still incomplete',
  cmp_c3_bash_result: 'File sizes + a raw def/class list — no layer, no public-vs-internal, no deps',
  cmp_c3_bash_structure: 'Loose text · agent must aggregate + classify itself',
  cmp_c3_ci_cmd: "module_info(module_path='backend/auth')",
  cmp_c3_ci_time: '~25ms · single SELECT',
  cmp_c3_ci_result:
    'Layer: Auth · 12 files · 34 public symbols · 8 cross-layer deps · responsibility: token verification + dependency injection',
  cmp_c3_ci_structure: 'Layer + counts + public API list + top cross-boundary deps, pre-aggregated',

  cmp_footer:
    'The point is not raw speed (though 35ms vs 640ms matters). The point is that the agent gets a structured answer it can reason about, instead of a wall of text it has to re-read every time. That is where the −95% token saving comes from.',

  subc_eyebrow: 'Agent subconscious',
  subc_title_a: 'Not a tool you call. A ',
  subc_title_b: 'context the agent lives in',
  subc_title_c: '.',
  subc_intro:
    'code_index_mcp is one layer of a four-layer subconscious system that makes Claude Code behave like a long-term maintainer, not a stranger reading the codebase for the first time. Implicit rules load automatically; the MCP is queried on demand. Both are deliberately split so the always-loaded surface stays small.',
  subc_layer_label: 'Layer',
  subc_l0_title: 'Reflex — always-loaded',
  subc_l0_kind: 'Implicit',
  subc_l0_desc:
    'Stays in the context window of every single turn, before the user types. The agent thinks against it the way a native speaker thinks against grammar — invisibly.',
  subc_l0_items: [
    'CLAUDE.md (project rules)',
    '.claude/rules/architecture-map.md',
    '.claude/rules/code-index.md',
    '.claude/rules/coding-standards.md',
    '.claude/rules/completed-features.md',
    '.claude/rules/experience.md',
    '~/.claude/memory/MEMORY.md',
  ],
  subc_l0_cost: '~25 KB · always in context',
  subc_l1_title: 'Reaction — conditional',
  subc_l1_kind: 'Implicit, gated',
  subc_l1_desc:
    'Rules with explicit applies_to clauses light up when a tool touches matching paths. Surgical: no token cost for rules unrelated to the current change.',
  subc_l1_items: [
    'coverage-invariants-policy.md on scripts/tests/** + deploy skills',
    'project-reference.md on backend/** + front/** edits',
    'architecture-map.md when reading code symbols',
  ],
  subc_l1_cost: '3K–8K tokens · only when relevant',
  subc_l2_title: 'Skill — user-invoked',
  subc_l2_kind: 'User-triggered',
  subc_l2_desc:
    'Slash-commands. Each is a self-contained sub-program: prompt + tool allowlist + decision table. Off until the user types the trigger. /install (Claude installs code_index for the user) and /git (headless commit+push) ship in this very repo.',
  subc_l2_items: [
    '/install · /git',
    '/codesearch · /research',
    '/review · /reduce',
    '70+ skills in the parent project',
  ],
  subc_l2_cost: '0 tokens at rest · loaded on /<name>',
  subc_l3_title: 'Tool — query-on-demand',
  subc_l3_kind: 'Explicit, called',
  subc_l3_desc:
    'code_index_mcp 5 tools. Zero baseline cost; pays only for what the agent asks. The "eyes" of the system — Layers 0-2 tell the agent what it cares about; this layer tells it what is actually there right now.',
  subc_l3_items: [
    'search · deps · search_with_deps',
    'module_info · architecture_overview',
  ],
  subc_l3_cost: '0 tokens at rest · pay per call',
  subc_footer:
    'The four layers stack. Rules make the agent think "what does this project care about"; skills give it muscle memory for routine ops; the MCP gives it eyes on the live code surface. code_index_mcp without rules works — but with rules it works in context, and that is the difference between an intern grep-ing and a maintainer reasoning.',

  arch_eyebrow: 'How it works',
  arch_title: 'From source tree to MCP response in 4 stages',
  arch_intro_pre: '',
  arch_intro_mid: ' walks the repo, extracts symbols + call edges with libCST, persists into PostgreSQL. ',
  arch_intro_post: ' serves the 5 MCP tools over those tables. Claude Code calls them like any other tool.',
  stage_label: 'stage',
  stage1_title: 'Walk + parse',
  stage1_desc:
    'libCST AST parse for Python / TypeScript / Swift; collects file path, line span, kind (function / class / method), signature.',
  stage2_title: 'Persist to Postgres',
  stage2_desc:
    'Three tables: code_symbols (one row per symbol), code_relations (one row per call edge), code_modules (one row per directory).',
  stage3_title: 'MCP server',
  stage3_desc:
    'Python MCP server (stdio transport). Routes 5 tool names to SQL queries + handler functions in code_index_mcp.py.',
  stage4_title: 'Claude Code consumes',
  stage4_desc:
    'Registered in .mcp.json. Each call returns a single TextContent with grep-style result. Sub-100ms latency on ILIKE lookups.',
  symbols_table_title: 'One row per symbol',
  symbols_table_caption: 'Backs search / search_with_deps.',
  deps_table_title: 'One row per call edge',
  deps_table_caption: 'Backs deps + module_info dep summaries.',
  modules_table_title: 'One row per directory',
  modules_table_caption: 'Backs module_info / architecture_overview.',

  graph_eyebrow: 'Live code-relationship graph',
  graph_title_a: 'What ',
  graph_title_b: 'deps()',
  graph_title_c: ' sees, visualized',
  graph_intro:
    'A representative slice of the parent dependency graph — 9 layers, 35 anchor modules, the heaviest cross-boundary edges that code_index_mcp exposes via deps(kind=\'calls\'). Drag nodes, hover for layer + symbol count. Node size scales with symbols per module.',
  graph_hint_size: '· Node size ∝ √(symbols in module)',
  graph_hint_weight: '· Edge weight ∝ inter-module call count',
  graph_hint_interact: '· Force layout, drag to explore, scroll to zoom',

  stats_eyebrow: 'Index footprint',
  stats_title: '300 modules, grouped by layer',
  stats_intro:
    'Pulled live from the same architecture map auto-loaded into Claude Code (.claude/rules/architecture-map.md). The indexer emits this from the Postgres index every build.',
  stats_layer_distribution: 'Layer distribution',
  stats_modules_label: 'Modules',
  stats_modules_sub: '14 layers · test files excluded',
  stats_symbols_label: 'Symbols',
  stats_symbols_sub: 'Functions · classes · methods · async generators',
  stats_query_label: 'Typical query',
  stats_query_sub: 'Postgres ILIKE on indexed name column · in-loop call',
  layer_row: {
    tool:            { label: 'Tool',                          highlight: 'McpService + bq_handlers + browser' },
    ui_component:    { label: 'UI Component (Frontend)',       highlight: 'chat / panel / VideoView / charts' },
    frontend_lib:    { label: 'Frontend Library',              highlight: 'lib/api · lib/chart · lib/sync' },
    ios:             { label: 'iOS',                            highlight: 'Views · ViewModels · Network · Charts' },
    hook:            { label: 'Hook (Frontend)',               highlight: 'useStream · useChatEngine · history' },
    page:            { label: 'Page (Frontend)',               highlight: 'app/c/[id] · app/api/* · /share' },
    middleware:      { label: 'Middleware',                    highlight: '17 ordered ops on the agent pipeline' },
    service:         { label: 'Service',                       highlight: 'gcs · bigquery · payment_orders · billing' },
    api:             { label: 'API',                            highlight: 'FastAPI /v1/* routes' },
    backend_other:   { label: 'Backend Other',                 highlight: 'tests · database · models' },
    memory:          { label: 'Memory',                        highlight: 'core · relationship · skill_store · curate' },
    agent:           { label: 'Agent',                          highlight: 'factory · pipeline · harness · post_mortem' },
    frontend_other:  { label: 'Frontend Other',                highlight: 'proxy · public assets · styles' },
    mixed:           { label: 'Auth + Prompt + Config + Utility', highlight: '40 + 1 + 21 + 9 symbols' },
  },

  mnt_eyebrow: 'Headless maintenance',
  mnt_title_a: 'One command — ',
  mnt_title_b: 'commit + push',
  mnt_title_c: ', drafted in English, no Bash prompt',
  mnt_intro:
    'Editing the codebase is half the loop; keeping it published is the other half. `git-headless.sh` calls Claude Code in headless mode against the project\'s `git` skill, drafts an English commit message from the diff, commits, pushes to `origin/main`, and prints a one-block summary. No interactive shell — fire it after a coding session and walk away.',
  mnt_cmd_label: 'Just run',
  mnt_cmd_value: 'bash scripts/git-headless.sh',
  mnt_step1_title: 'Snapshot',
  mnt_step1_desc:
    'git status / diff / log read in parallel. Classifies modified paths into UI / data / tooling / docs / chore buckets to pick the right conventional-commit prefix.',
  mnt_step2_title: 'Draft',
  mnt_step2_desc:
    'Mirrors the project\'s commit-message style (≤72-char subject + 1–4 bullet body explaining WHY). Surfaces the draft to stdout before any write — `--dry-run` exits here.',
  mnt_step3_title: 'Stage + commit',
  mnt_step3_desc:
    'git add -A with safety check: refuses to proceed if any path containing node_modules / .next / .venv / screenshot-* slipped past .gitignore. Never amends, never --no-verify.',
  mnt_step4_title: 'Push + report',
  mnt_step4_desc:
    'git push origin main with fast-forward-only fallback if the remote moved. Prints a final 5-line summary block: commit sha · file count · GitHub commit URL.',
  mnt_footer:
    'The skill body lives in .claude/skills/git/SKILL.md alongside this site. Same headless pattern (Claude CLI -p + stream-json) Mars Agent uses for its own git workflow — adapted to this repo\'s constraints (single main branch, English commits, no co-author footer).',

  install_eyebrow: 'Drop-in for Claude Code',
  install_title: 'Install in 30 seconds',
  install_intro:
    'Requires Python 3.11+, PostgreSQL 14+, and a Claude Code workspace. Installer is a single bash script; the MCP server is one stdio script — no daemon, no HTTP port. Index is rebuilt on demand. Or invoke `/install` from Claude Code in this repo and let the install skill walk you through it.',
  step1_title: 'Install Python deps',
  step1_desc: 'MCP SDK + Postgres async driver, in your venv.',
  step2_title: 'Provision PostgreSQL',
  step2_desc: 'A 14+ instance is enough; `pg_trgm` extension for ILIKE GIN.',
  step3_title: 'Build the index',
  step3_desc: 'Walks the target repo, parses AST, populates code_symbols / code_relations / code_modules.',
  step4_title: 'Wire to Claude Code',
  step4_desc: 'Append to .mcp.json. Path the POSTGRES_URI to your Postgres instance.',
  verify_title: 'Verify after install',
  verify_desc_a:
    'Inside Claude Code, ask for any symbol. If you see ',
  verify_desc_b: 'file_path:line_number',
  verify_desc_c:
    ' with a real signature, you\'re indexed. If the result is empty, the index is empty — re-run step 3.',

  footer_tagline:
    'Code intelligence for an LLM that thinks in tools, not file paths. Five queries · four-layer subconscious · one headless maintain pipeline. That\'s the whole product surface — small on purpose.',
};

/* ───────────────────────────── 中文 ───────────────────────────── */

export const zh: Dictionary = {
  nav_tools: '工具',
  nav_compare: '对比 bash',
  nav_subconscious: '潜意识',
  nav_architecture: '架构',
  nav_graph: '关系图',
  nav_maintenance: '维护',
  nav_install: '安装',

  hero_eyebrow: 'MCP 原生的代码智能',
  hero_title_a: '把代码库当成一份 ',
  hero_title_b: '可查询的索引',
  hero_title_c: '，而不是一堆文件夹',
  hero_intro: (m, s) =>
    `code_index_mcp 把 ${m} 个模块、${s} 个符号变成 Claude Code 可在毫秒级搜索、追踪、推理的 Postgres 索引。五个聚焦查询 —— 找到符号、追踪调用方、看清模块 —— 替换掉十几轮 grep + awk + 打开文件读源码。`,
  hero_cta_tools: '看 5 个查询',
  hero_cta_install: '30 秒安装',
  hero_stat_modules: '索引模块',
  hero_stat_symbols: '符号',
  hero_stat_tools: '核心工具',
  perf_speed_value: '+300%',
  perf_speed_label: '搜索速度',
  perf_token_value: '−95%',
  perf_token_label: 'Token 成本',
  perf_vs: '对比 grep 输出后 LLM 自行摘要',

  tools_eyebrow: '五个工具，一个目标：定位代码',
  tools_title: '它在哪 · 谁在调用 · 模块是什么',
  tools_intro:
    '五个原语，每次重构或新功能开局都是其中之一。不做日志归因、不做提示词对比、不做性能探测 —— 那些是另外的 MCP。这一个只管代码，所以每次回答都能塞进单轮工具调用。',
  cat_index_label: '代码索引',
  cat_index_hint: '符号 + 调用图',
  cat_module_label: '模块视图',
  cat_module_hint: '分层架构 + 单模块画像',
  tool: {
    search: {
      one_liner: '符号查找 —— 比 grep 更精准',
      description:
        '对符号表做 PostgreSQL ILIKE 匹配。返回 file_path:line_number + 签名，最多 50 条。测试文件默认排除，语言感知（Python / TypeScript / Swift）。',
    },
    deps: {
      one_liner: '双向调用方/被调用方，带边界标注',
      description:
        '谁调用了这个符号、这个符号又调用了什么。边被标注为 [internal] / [cross-module] / [cross-layer] / [external]，重构影响一眼看清，不用翻 12 个文件。',
    },
    search_with_deps: {
      one_liner: '一次拿到「位置」+「Top 3 调用关系」',
      description:
        '想知道「在哪儿 + 谁在用它」时，一次工具调用搞定。在 search() 基础上对前 3 条结果做 deps()。最常见模式上省一轮 MCP 来回。',
    },
    module_info: {
      one_liner: '单目录画像：所在层、职责、公开 API',
      description:
        '这个模块在做什么、属于哪一层、对外的导出、内部符号、最重的跨边界依赖。ILIKE 部分路径匹配，"auth" 能找到 backend/src/auth。',
    },
    architecture_overview: {
      one_liner: '一次调用查看全工程分层架构',
      description:
        '把全部索引模块按层分组（API / Agent / Middleware / Tool / Service / Frontend / iOS …）。summary 用于快速定位；detailed 加上公开 API + 依赖列表。',
    },
  },

  cmp_eyebrow: '对比 bash',
  cmp_title_a: '一次查询打在 ',
  cmp_title_b: '4,820 个已索引符号',
  cmp_intro:
    '三个每个维护者每天都要跑的工作流。bash 一列是 agent 以前会跑的实际命令 —— 以及它必须扛过的噪声。MCP 一列是回来的：结构化、知道分层、长度有界。',
  cmp_col_bash: 'bash + grep',
  cmp_col_ci: 'code_index_mcp',
  cmp_metric_cmd: '命令',
  cmp_metric_time: '延迟',
  cmp_metric_result: '结果',
  cmp_metric_structure: '结构',

  cmp_c1_title: '案例 1 —— 这个东西定义在哪？',
  cmp_c1_question: '找 `validate_token` 的定义。',
  cmp_c1_bash_cmd: 'grep -rn "def validate_token\\|validate_token =" backend/ front/ ios/ | head -20',
  cmp_c1_bash_time: '约 640ms · 全量扫文件',
  cmp_c1_bash_result: '12 条原始行 —— 定义、调用、注释、测试桩全混在一起',
  cmp_c1_bash_structure: '纯文本 · 无签名 · agent 必须重新打开每个文件去歧义',
  cmp_c1_ci_cmd: "search(query='validate_token')",
  cmp_c1_ci_time: '约 35ms · 走索引 ILIKE',
  cmp_c1_ci_result: 'backend/src/auth/token_verifier.py:42 — def validate_token(token: str) -> User',
  cmp_c1_ci_structure: 'file_path:line_number + 完整签名，kind=function，自动排除测试',

  cmp_c2_title: '案例 2 —— 谁在调用？',
  cmp_c2_question: '找 `load_mcp_tools` 的所有调用点。',
  cmp_c2_bash_cmd:
    'grep -rn "load_mcp_tools(" backend/ | grep -v "def load_mcp_tools" | awk -F: \'{print $1}\' | sort -u',
  cmp_c2_bash_time: '约 1.2s · 4 个管道进程',
  cmp_c2_bash_result: '7 个文件路径 —— 没有层、没有行号、没有边方向（调用方 vs 被调用方）',
  cmp_c2_bash_structure: '文件名列表 · agent 必须读每个文件确认是不是真调用',
  cmp_c2_ci_cmd: "deps(symbol='load_mcp_tools', kind='calls')",
  cmp_c2_ci_time: '约 80ms · 走索引外键 join',
  cmp_c2_ci_result:
    '↑ 4 callers · [internal] tool_loader.py:88 · [cross-layer] agents/factory.py:153 · …',
  cmp_c2_ci_structure: '方向（↑调用方 / ↓被调用方）、边界标签、行号、签名',

  cmp_c3_title: '案例 3 —— 这个模块是干嘛的？',
  cmp_c3_question: '拿到 backend/auth 的画像。',
  cmp_c3_bash_cmd:
    "find backend/auth -name '*.py' | xargs wc -l | sort -rn | head; grep -rn '^def \\|^class ' backend/auth | head -30",
  cmp_c3_bash_time: '约 2.5s · 两遍扫，还不完整',
  cmp_c3_bash_result: '文件大小 + 原始 def/class 列表 —— 没有层、没区分公开/内部、没有依赖',
  cmp_c3_bash_structure: '零散文本 · agent 必须自己聚合 + 分类',
  cmp_c3_ci_cmd: "module_info(module_path='backend/auth')",
  cmp_c3_ci_time: '约 25ms · 单条 SELECT',
  cmp_c3_ci_result:
    'Layer: Auth · 12 文件 · 34 个公开符号 · 8 条跨层依赖 · 职责：token 验证 + 依赖注入',
  cmp_c3_ci_structure: '层 + 计数 + 公开 API 列表 + 最重的跨边界依赖，已预聚合',

  cmp_footer:
    '重点不在于裸速度（虽然 35ms 对 640ms 也很重要）。重点在于 agent 拿到的是一个能推理的结构化答案，而不是每次都要从头读一遍的文本墙。这就是 −95% Token 节省的来源。',

  subc_eyebrow: 'Agent 的潜意识',
  subc_title_a: '不是被调用的工具，是 ',
  subc_title_b: 'Agent 自带的认知',
  subc_title_c: '。',
  subc_intro:
    'code_index_mcp 只是一套四层潜意识系统里的一层 —— 这套系统让 Claude Code 像长期维护者一样行动，而不是每次都从零熟悉代码库。Implicit rules 自动加载，MCP 工具按需查询。两者刻意分开，让常驻上下文保持精简。',
  subc_layer_label: '层',
  subc_l0_title: '反射层 —— 始终注入',
  subc_l0_kind: 'Implicit',
  subc_l0_desc:
    '每一轮对话都在场，用户还没开口就已经存在。Agent 在它之上思考，就像母语者面对语法 —— 看不见，却时刻起作用。',
  subc_l0_items: [
    'CLAUDE.md（项目规则）',
    '.claude/rules/architecture-map.md',
    '.claude/rules/code-index.md',
    '.claude/rules/coding-standards.md',
    '.claude/rules/completed-features.md',
    '.claude/rules/experience.md',
    '~/.claude/memory/MEMORY.md',
  ],
  subc_l0_cost: '约 25 KB · 始终在上下文',
  subc_l1_title: '反应层 —— 条件加载',
  subc_l1_kind: '隐式，触发',
  subc_l1_desc:
    '带 applies_to 的规则在工具触碰匹配路径时激活。外科手术式 —— 不对当前改动无关的规则付 token 成本。',
  subc_l1_items: [
    'coverage-invariants-policy.md 在 scripts/tests/** + 部署 skill 触发',
    'project-reference.md 在 backend/** + front/** 编辑时',
    'architecture-map.md 在读代码符号时',
  ],
  subc_l1_cost: '3K–8K tokens · 仅相关时出现',
  subc_l2_title: '技能层 —— 用户唤起',
  subc_l2_kind: '用户触发',
  subc_l2_desc:
    'Slash-command。每个都是自含子程序：prompt + 工具白名单 + 决策表。用户输入 trigger 才加载，平时不占位。本仓库自带 /install（让 Claude 替用户装上 code_index）和 /git（无头 commit+push）两个 skill。',
  subc_l2_items: [
    '/install · /git',
    '/codesearch · /research',
    '/review · /reduce',
    '父工程里还有 70+ 个 skill',
  ],
  subc_l2_cost: '静态 0 tokens · 输入 /<名字> 才加载',
  subc_l3_title: '工具层 —— 按需查询',
  subc_l3_kind: '显式调用',
  subc_l3_desc:
    'code_index_mcp 5 个工具。零基础消耗，只为实际查询付费。系统的「眼睛」—— 上面三层告诉 agent「这个项目在意什么」，这一层告诉它「此刻实际存在什么」。',
  subc_l3_items: [
    'search · deps · search_with_deps',
    'module_info · architecture_overview',
  ],
  subc_l3_cost: '静态 0 tokens · 按查询次数计费',
  subc_footer:
    '四层叠加。Rules 让 agent 始终知道「这个项目在意什么」；skills 给它常规操作的肌肉记忆；MCP 给它对实时代码面的眼睛。没有 rules，code_index_mcp 也能跑；加上 rules，它才在上下文里运转 —— 这就是「实习生在 grep」和「维护者在推理」的差距。',

  arch_eyebrow: '工作原理',
  arch_title: '从源码树到 MCP 响应：4 个阶段',
  arch_intro_pre: '',
  arch_intro_mid: ' 遍历仓库，用 libCST 抽取符号 + 调用边，持久化到 PostgreSQL。',
  arch_intro_post: ' 在这些表之上提供 5 个 MCP 工具。Claude Code 像调用任何工具一样调用它们。',
  stage_label: '阶段',
  stage1_title: '遍历 + 解析',
  stage1_desc:
    '对 Python / TypeScript / Swift 做 libCST AST 解析；收集文件路径、行范围、kind（函数 / 类 / 方法）、签名。',
  stage2_title: '写入 Postgres',
  stage2_desc:
    '三张表：code_symbols（每行一个符号）、code_relations（每行一条调用边）、code_modules（每行一个目录）。',
  stage3_title: 'MCP 服务器',
  stage3_desc:
    'Python MCP 服务（stdio 传输）。把 5 个工具名路由到 SQL 查询 + code_index_mcp.py 里的 handler 函数。',
  stage4_title: 'Claude Code 调用',
  stage4_desc:
    '在 .mcp.json 里注册。每次调用返回单个 TextContent，输出 grep 风格的结果。ILIKE 查找 100ms 以内。',
  symbols_table_title: '每行一个符号',
  symbols_table_caption: '支撑 search / search_with_deps。',
  deps_table_title: '每行一条调用边',
  deps_table_caption: '支撑 deps + module_info 的依赖摘要。',
  modules_table_title: '每行一个目录',
  modules_table_caption: '支撑 module_info / architecture_overview。',

  graph_eyebrow: '实时代码关系图',
  graph_title_a: '',
  graph_title_b: 'deps()',
  graph_title_c: ' 看到的，可视化呈现',
  graph_intro:
    '父依赖图的一份代表性切片 —— 9 层、35 个关键模块、code_index_mcp 通过 deps(kind=\'calls\') 暴露的最重跨边界调用边。拖拽节点，悬停可看所在层 + 符号数。节点大小与模块符号数相关。',
  graph_hint_size: '· 节点大小 ∝ √(模块内符号数)',
  graph_hint_weight: '· 边粗细 ∝ 跨模块调用次数',
  graph_hint_interact: '· 力导向布局，拖拽探索，滚轮缩放',

  stats_eyebrow: '索引规模',
  stats_title: '300 个模块按层分布',
  stats_intro:
    '数据直接来自被 Claude Code 自动加载的同一份架构图（.claude/rules/architecture-map.md）。索引器每次构建从 Postgres 重新生成。',
  stats_layer_distribution: '层分布',
  stats_modules_label: '模块',
  stats_modules_sub: '14 层 · 测试文件已排除',
  stats_symbols_label: '符号',
  stats_symbols_sub: '函数 · 类 · 方法 · 异步生成器',
  stats_query_label: '典型查询',
  stats_query_sub: 'Postgres ILIKE 走索引名字段 · 主循环可调用',
  layer_row: {
    tool:            { label: '工具层',                    highlight: 'McpService + bq_handlers + browser' },
    ui_component:    { label: 'UI 组件 (前端)',            highlight: 'chat / panel / VideoView / charts' },
    frontend_lib:    { label: '前端库',                    highlight: 'lib/api · lib/chart · lib/sync' },
    ios:             { label: 'iOS',                       highlight: 'Views · ViewModels · Network · Charts' },
    hook:            { label: 'Hook (前端)',               highlight: 'useStream · useChatEngine · history' },
    page:            { label: '页面 (前端)',               highlight: 'app/c/[id] · app/api/* · /share' },
    middleware:      { label: '中间件',                    highlight: 'agent 流水线上的 17 个有序操作' },
    service:         { label: '服务层',                    highlight: 'gcs · bigquery · payment_orders · billing' },
    api:             { label: 'API',                       highlight: 'FastAPI /v1/* 路由' },
    backend_other:   { label: '后端其他',                  highlight: 'tests · database · models' },
    memory:          { label: '记忆',                       highlight: 'core · relationship · skill_store · curate' },
    agent:           { label: 'Agent',                     highlight: 'factory · pipeline · harness · post_mortem' },
    frontend_other:  { label: '前端其他',                  highlight: 'proxy · public assets · styles' },
    mixed:           { label: 'Auth + Prompt + Config + Utility', highlight: '40 + 1 + 21 + 9 符号' },
  },

  mnt_eyebrow: '无头维护',
  mnt_title_a: '一条命令 —— ',
  mnt_title_b: 'commit + push',
  mnt_title_c: '，英文消息自动起草，不进 Bash 交互',
  mnt_intro:
    '改完代码只是一半工作，发布到远端是另一半。`git-headless.sh` 用 headless 模式调用 Claude Code，跑本仓库的 `git` skill：从 diff 起草英文 commit 消息、commit、push 到 origin/main，最后输出一段单块摘要。无需交互式 shell —— 编程会话结束时丢一条命令，走开就行。',
  mnt_cmd_label: '运行',
  mnt_cmd_value: 'bash scripts/git-headless.sh',
  mnt_step1_title: '快照',
  mnt_step1_desc:
    '并行读 git status / diff / log。把改动路径分到 UI / 数据 / 工具 / 文档 / chore 桶，选合适的 conventional-commit 前缀。',
  mnt_step2_title: '起草',
  mnt_step2_desc:
    '模仿仓库已有 commit 风格（≤72 字主题 + 1–4 条解释 WHY 的 bullet）。落盘前把草稿打到 stdout —— `--dry-run` 走到这一步停。',
  mnt_step3_title: '暂存 + 提交',
  mnt_step3_desc:
    'git add -A，带安全闸：任何含 node_modules / .next / .venv / screenshot-* 的路径漏过 .gitignore 就拒绝继续。不会 amend，不会 --no-verify。',
  mnt_step4_title: '推送 + 报告',
  mnt_step4_desc:
    'git push origin main，远端先动过就 fast-forward-only 回退。最后打一段 5 行总结：commit sha · 文件数 · GitHub commit URL。',
  mnt_footer:
    'Skill 主体在 .claude/skills/git/SKILL.md 里，跟介绍页一起 ship。和 Mars Agent 自己用的 git workflow 同一套 headless 模式（Claude CLI -p + stream-json），按本仓库情况微调（单 main 分支、英文 commit、不带 Co-Author 脚注）。',

  install_eyebrow: '为 Claude Code 即插即用',
  install_title: '30 秒装上',
  install_intro:
    '需要 Python 3.11+、PostgreSQL 14+、Claude Code 工作区。安装是一个 bash 脚本；MCP 服务器就是一个 stdio 脚本 —— 没有 daemon，没有 HTTP 端口。索引按需重建。或者在本仓库目录里输入 `/install`，让 install skill 一步步带你装。',
  step1_title: '安装 Python 依赖',
  step1_desc: '在 venv 里装 MCP SDK + Postgres 异步驱动。',
  step2_title: '准备 PostgreSQL',
  step2_desc: '14+ 实例即可；`pg_trgm` 扩展给 ILIKE GIN 用。',
  step3_title: '构建索引',
  step3_desc: '遍历目标仓库、解析 AST、写入 code_symbols / code_relations / code_modules。',
  step4_title: '接到 Claude Code',
  step4_desc: '追加到 .mcp.json。POSTGRES_URI 指向你的 Postgres 实例。',
  verify_title: '安装完验一下',
  verify_desc_a: '在 Claude Code 里查任意一个符号。如果你看到 ',
  verify_desc_b: 'file_path:line_number',
  verify_desc_c: ' + 真实签名，索引就生效了。如果结果为空，索引也是空的 —— 重新跑第 3 步。',

  footer_tagline:
    '为「思维方式是工具，不是文件路径」的 LLM 打造的代码智能。五个查询 · 四层潜意识 · 一条无头维护流水线。这就是全部产品面 —— 刻意保持小。',
};
