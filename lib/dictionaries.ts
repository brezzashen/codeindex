/**
 * Bilingual copy for the codeindex intro site.
 * Keys mirror render call-sites; flat where possible, nested only for arrays.
 * Tool-card copy ships its full bilingual entry inline so `lib/tools.ts` only
 * holds icons/categories/examples (those stay language-neutral).
 */

export interface ToolI18n {
  one_liner: string;
  description: string;
}

export interface Dictionary {
  /* BrandHeader */
  nav_tools: string;
  nav_architecture: string;
  nav_graph: string;
  nav_install: string;

  /* Hero */
  hero_eyebrow: string;
  hero_title_a: string;
  hero_title_b: string; // colored fragment
  hero_title_c: string;
  hero_intro: (modules: string, symbols: string) => string;
  hero_cta_tools: string;
  hero_cta_install: string;
  hero_stat_modules: string;
  hero_stat_symbols: string;
  hero_stat_tools: string;
  /* Hero perf claim */
  perf_speed_value: string;
  perf_speed_label: string;
  perf_token_value: string;
  perf_token_label: string;
  perf_vs: string;

  /* Tools section */
  tools_eyebrow: string;
  tools_title: string;
  tools_intro: string;
  /* Category labels — keyed by `lib/tools.ts` category id */
  cat_index_label: string;
  cat_index_hint: string;
  cat_module_label: string;
  cat_module_hint: string;
  cat_log_label: string;
  cat_log_hint: string;
  cat_prompt_label: string;
  cat_prompt_hint: string;
  cat_perf_label: string;
  cat_perf_hint: string;
  /* Per-tool copy — keyed by tool.name */
  tool: Record<string, ToolI18n>;

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

  /* CodeGraph section */
  graph_eyebrow: string;
  graph_title_a: string;
  graph_title_b: string;
  graph_title_c: string;
  graph_intro: string;
  graph_hint_size: string;
  graph_hint_weight: string;
  graph_hint_interact: string;

  /* Stats section */
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
  /* Layer rows — keyed by layer.layer ASCII id */
  layer_row: Record<string, { label: string; highlight: string }>;

  /* Install section */
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
  nav_architecture: 'Architecture',
  nav_graph: 'Graph',
  nav_install: 'Install',

  hero_eyebrow: 'MCP-native code intelligence',
  hero_title_a: 'The codebase as a ',
  hero_title_b: 'queryable index',
  hero_title_c: ', not a folder of files',
  hero_intro: (m, s) =>
    `code_index_mcp is the MCP server that turns Mars Agent — ${m} modules · ${s} symbols — into a Postgres-backed index Claude Code can search, trace, and reason over in milliseconds. 14 tools. Symbol lookup, call graphs, module dossiers, log triage, prompt analysis, TTFT probes.`,
  hero_cta_tools: 'See the 14 tools',
  hero_cta_install: 'Install in 30 seconds',
  hero_stat_modules: 'Modules indexed',
  hero_stat_symbols: 'Symbols',
  hero_stat_tools: 'MCP tools',
  perf_speed_value: '+300%',
  perf_speed_label: 'search speed',
  perf_token_value: '−95%',
  perf_token_label: 'token cost',
  perf_vs: 'vs grep + LLM summarize on raw output',

  tools_eyebrow: '14 MCP tools · 5 categories',
  tools_title: 'Every tool a focused query, not a fuzzy chat',
  tools_intro:
    'Designed for Claude Code: each tool returns a compact, structured result that fits a single context window. No vector embeddings, no LLM-summarized indexes — just PostgreSQL fuzzy match over the symbol table, and grep-style file walks for everything else.',
  cat_index_label: 'Code Index',
  cat_index_hint: 'PostgreSQL ILIKE fuzzy lookup over 4820 symbols',
  cat_module_label: 'Module View',
  cat_module_hint: 'Layered architecture overview + per-module dossier',
  cat_log_label: 'Log Triage',
  cat_log_hint: 'Backend / MCP browser log query + error aggregation',
  cat_prompt_label: 'Prompt Analysis',
  cat_prompt_hint: 'Per-agent prompt composition + diff + trace',
  cat_perf_label: 'Performance',
  cat_perf_hint: 'Gemini TTFT + Files API benchmarks',
  tool: {
    search: {
      one_liner: 'Symbol lookup, more precise than Grep',
      description:
        'PostgreSQL ILIKE fuzzy match over the symbol table. Returns file_path:line_number + function signature, up to 50 hits. Test symbols excluded by default.',
    },
    deps: {
      one_liner: 'Bidirectional callers + callees, with boundary annotations',
      description:
        'Who calls this symbol, what this symbol calls. Edges tagged [internal] / [cross-module] / [cross-layer] / [external] so refactor impact is visible without reading 12 files.',
    },
    search_with_deps: {
      one_liner: 'Search + top-3 dep trees in one round-trip',
      description:
        'For when you want "where is it AND who uses it" without two MCP calls. Composes search() with deps() over the top 3 hits.',
    },
    module_info: {
      one_liner: 'Per-directory dossier: layer, responsibility, public API',
      description:
        'Tells you what a module does, which layer it lives in, its public exports, internal symbols, and top cross-boundary dependencies. Partial path matching via ILIKE.',
    },
    architecture_overview: {
      one_liner: 'Project-wide layered architecture in one call',
      description:
        'Groups all 300 indexed modules by layer (API / Agent / Middleware / Tool / Auth / Service / Frontend / iOS). Summary mode for orientation; detailed mode adds public API + dep lists.',
    },
    log_query: {
      one_liner: 'Multi-dimensional backend log query',
      description:
        'AND-combine level / module / trace_id / run_id / request_id / keyword / time-window filters. Compact format: time | level | module | event. Sources: mars backend or MCP browser.',
    },
    log_errors: {
      one_liner: 'Group + dedupe errors by module+event pattern',
      description:
        'Scans all log files (main + rotated), normalizes dynamic tokens (UUID, numeric IDs), groups by signature, returns occurrence count + time range + sample message.',
    },
    log_stats: {
      one_liner: 'Level distribution + module Top-10 + last 5 errors',
      description:
        'A 60-second health pulse without piping logs by hand. Default 60-min window. Use mid-debug to know whether the noise is broadly elevated or localized to one module.',
    },
    log_error_rate: {
      one_liner: 'Run-lifecycle success/error rate report',
      description:
        'Based on Background run lifecycle markers (started / succeeded / failed). Classifies failures (429, Embedding, ValidationError, …). Hourly trend with low-success-rate flags.',
    },
    prompt_analyze: {
      one_liner: 'Per-agent prompt composition + token budget',
      description:
        'Breaks down mars_agent / mars_deep / mars_image (or all) into fragment list + char/token count + source modules. Knows which fragments come from which sub-prompt file.',
    },
    prompt_diff: {
      one_liner: 'Compare two agents’ prompts: shared / unique / delta',
      description:
        'Default mars_agent vs mars_deep. Useful when adjusting a fragment in one agent and you want to confirm whether the other still gets it.',
    },
    prompt_progressive_check: {
      one_liner: 'Validate tool-group keyword coverage + dep chains',
      description:
        'Confirms `tool_registry.py` group definitions are internally consistent: keyword coverage, dependency chain integrity, core-group correctness. Run before shipping a new tool group.',
    },
    prompt_trace: {
      one_liner: 'Per-conversation prompt effectiveness report',
      description:
        'Queries thread state via LangGraph API. Breaks down char/token distribution (System / Human / AI thinking / AI output / Tools), thinking conversion rate, tool effectiveness, turn ratio.',
    },
    ttft_measure: {
      one_liner: 'Gemini TTFT benchmark (per-round + summary)',
      description:
        'Streaming requests against the chosen model + thinking level. Returns per-round time-to-first-token + min/max/avg + spike stats. Use after a prompt fragment change or model swap.',
    },
    files_api_test: {
      one_liner: 'Gemini Files API (register_files) connectivity probe',
      description:
        'Pulls a small file from GCS, times AI Studio `files.register_files()` round-trip. Diagnoses the "media never reaches LLM" class of failures (timeout / 503 / empty reply).',
    },
  },

  arch_eyebrow: 'How it works',
  arch_title: 'From source tree to MCP response in 4 stages',
  arch_intro_pre: '',
  arch_intro_mid: ' walks the repo, extracts symbols + call edges with libCST, persists into PostgreSQL. ',
  arch_intro_post: ' serves 14 MCP tools over those tables. Claude Code calls them like any other tool.',
  stage_label: 'stage',
  stage1_title: 'Walk + parse',
  stage1_desc:
    'libCST AST parse for Python / TypeScript / Swift; collects file path, line span, kind (function / class / method), signature.',
  stage2_title: 'Persist to Postgres',
  stage2_desc:
    'Three tables: code_symbols (one row per symbol), code_deps (one row per edge), code_modules (one row per directory).',
  stage3_title: 'MCP server',
  stage3_desc:
    'Python MCP server (stdio transport). Routes 14 tool names to SQL queries + handler functions in code_index_mcp.py.',
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
    'A representative slice of the Mars Agent dependency graph — 9 layers, 35 anchor modules, the heaviest cross-boundary edges that code_index_mcp exposes via deps(kind=\'calls\'). Drag nodes, hover for layer + symbol count. Node size scales with symbols per module.',
  graph_hint_size: '· Node size ∝ √(symbols in module)',
  graph_hint_weight: '· Edge weight ∝ inter-module call count',
  graph_hint_interact: '· Force layout, drag to explore, scroll to zoom',

  stats_eyebrow: 'Index footprint',
  stats_title: '300 modules, grouped by layer — Mars Agent today',
  stats_intro:
    'Pulled live from the same architecture map auto-loaded into Claude Code (.claude/rules/architecture-map.md). The orchestrator emits this from the Postgres index every build.',
  stats_layer_distribution: 'Layer distribution',
  stats_modules_label: 'Modules',
  stats_modules_sub: '14 layers · test files excluded',
  stats_symbols_label: 'Symbols',
  stats_symbols_sub: 'Functions · classes · methods · async generators',
  stats_query_label: 'Typical query',
  stats_query_sub: 'Postgres ILIKE on indexed name column · in-loop call',
  layer_row: {
    tool: { label: 'Tool', highlight: 'McpService + bq_handlers + browser' },
    ui_component: { label: 'UI Component (Frontend)', highlight: 'chat / panel / VideoView / charts' },
    frontend_lib: { label: 'Frontend Library', highlight: 'lib/api · lib/chart · lib/sync' },
    ios: { label: 'iOS', highlight: 'Views · ViewModels · Network · Charts' },
    hook: { label: 'Hook (Frontend)', highlight: 'useStream · useChatEngine · history' },
    page: { label: 'Page (Frontend)', highlight: 'app/c/[id] · app/api/* · /share' },
    middleware: { label: 'Middleware', highlight: '17 ordered ops on the agent pipeline' },
    service: { label: 'Service', highlight: 'gcs · bigquery · payment_orders · billing' },
    api: { label: 'API', highlight: 'FastAPI /v1/* routes' },
    backend_other: { label: 'Backend Other', highlight: 'tests · database · models' },
    memory: { label: 'Memory', highlight: 'core · relationship · skill_store · curate' },
    agent: { label: 'Agent', highlight: 'factory · pipeline · harness · post_mortem' },
    frontend_other: { label: 'Frontend Other', highlight: 'proxy · public assets · styles' },
    mixed: { label: 'Auth + Prompt + Config + Utility', highlight: '40 + 1 + 21 + 9 symbols' },
  },

  install_eyebrow: 'Drop-in for Claude Code',
  install_title: 'Install in 30 seconds',
  install_intro:
    'Requires Python 3.11+, PostgreSQL 14+, and a Claude Code workspace. The MCP server is one stdio script — no daemon, no HTTP port. Index is rebuilt on demand.',
  step1_title: 'Install Python deps',
  step1_desc: 'MCP SDK + Postgres async driver, in your venv.',
  step2_title: 'Provision PostgreSQL',
  step2_desc: 'A 14+ instance is enough; defaults to localhost:5332 in Mars Agent.',
  step3_title: 'Build the index',
  step3_desc: 'Walks the repo, parses AST, populates code_symbols / code_deps / code_modules.',
  step4_title: 'Wire to Claude Code',
  step4_desc: 'Append to .mcp.json. Path the POSTGRES_URI to your Postgres instance.',
  verify_title: 'Verify after install',
  verify_desc_a:
    'Inside Claude Code, ask for any symbol. If you see ',
  verify_desc_b: 'file_path:line_number',
  verify_desc_c:
    ' with a real function signature, you\'re indexed. If the result is empty, the index is empty — re-run step 3.',

  footer_tagline:
    'Ship-grade code intelligence for an LLM that thinks in tools, not file paths. Part of the Mars Agent toolchain — designed against real production debug sessions, refined across 60+ entries in experience.md.',
};

/* ───────────────────────────── 中文 ───────────────────────────── */

export const zh: Dictionary = {
  nav_tools: '工具',
  nav_architecture: '架构',
  nav_graph: '关系图',
  nav_install: '安装',

  hero_eyebrow: 'MCP 原生的代码智能',
  hero_title_a: '把代码库当成一份 ',
  hero_title_b: '可查询的索引',
  hero_title_c: '，而不是一堆文件夹',
  hero_intro: (m, s) =>
    `code_index_mcp 是把 Mars Agent —— ${m} 个模块、${s} 个符号 —— 变成 Claude Code 可在毫秒级搜索、追踪、推理的 Postgres 索引的 MCP 服务器。14 个工具，涵盖符号查找、调用图谱、模块画像、日志归因、提示词分析、TTFT 探测。`,
  hero_cta_tools: '查看 14 个工具',
  hero_cta_install: '30 秒安装',
  hero_stat_modules: '索引模块',
  hero_stat_symbols: '符号',
  hero_stat_tools: 'MCP 工具',
  perf_speed_value: '+300%',
  perf_speed_label: '搜索速度',
  perf_token_value: '−95%',
  perf_token_label: 'Token 成本',
  perf_vs: '对比 grep 输出后 LLM 自行摘要',

  tools_eyebrow: '14 个 MCP 工具 · 5 个分类',
  tools_title: '每个工具都是一次精准查询，不是模糊对话',
  tools_intro:
    '为 Claude Code 而设计：每个工具返回紧凑、结构化的结果，单个上下文窗口就能装下。没有向量嵌入，没有 LLM 摘要索引 —— 只是对符号表做 PostgreSQL 模糊匹配，剩下的走 grep 风格的文件遍历。',
  cat_index_label: '代码索引',
  cat_index_hint: '对 4820 个符号做 PostgreSQL ILIKE 模糊查找',
  cat_module_label: '模块视图',
  cat_module_hint: '分层架构总览 + 单模块画像',
  cat_log_label: '日志归因',
  cat_log_hint: '后端 / MCP browser 日志查询 + 错误聚合',
  cat_prompt_label: '提示词分析',
  cat_prompt_hint: '每个 Agent 的提示词构成 + 对比 + 追踪',
  cat_perf_label: '性能',
  cat_perf_hint: 'Gemini TTFT + Files API 基准测试',
  tool: {
    search: {
      one_liner: '比 Grep 更精准的符号查找',
      description:
        '对符号表做 PostgreSQL ILIKE 模糊匹配。返回 file_path:line_number + 函数签名，最多 50 条。测试符号默认排除。',
    },
    deps: {
      one_liner: '双向调用方/被调用方，带边界标注',
      description:
        '谁调用了这个符号、这个符号又调用了什么。边被标注为 [internal] / [cross-module] / [cross-layer] / [external]，重构影响一眼看清，不用挨个翻 12 个文件。',
    },
    search_with_deps: {
      one_liner: '一次拿到「位置」+「Top 3 调用关系」',
      description:
        '当你既想知道 "它在哪儿" 又想知道 "谁在用它" 时，用这个，不必跑两次 MCP。在 search() 基础上对前 3 条结果做 deps() 组合。',
    },
    module_info: {
      one_liner: '单目录画像：所在层、职责、公开 API',
      description:
        '告诉你一个模块在做什么、属于哪一层、对外的导出、内部符号、最重的跨边界依赖。支持 ILIKE 部分路径匹配。',
    },
    architecture_overview: {
      one_liner: '一次调用查看全工程分层架构',
      description:
        '把全部 300 个索引模块按层分组（API / Agent / Middleware / Tool / Auth / Service / Frontend / iOS）。summary 模式用于快速定位；detailed 模式补充公开 API 和依赖列表。',
    },
    log_query: {
      one_liner: '多维度后端日志查询',
      description:
        '把 level / module / trace_id / run_id / request_id / keyword / 时间窗 等过滤条件 AND 组合。紧凑输出：time | level | module | event。日志源：mars 主后端 或 MCP browser。',
    },
    log_errors: {
      one_liner: '按 module+event 模式聚合并去重错误',
      description:
        '扫描全部日志文件（主 + rotate），归一化动态片段（UUID、数字 ID 等），按签名分组，返回出现次数、时间范围、样例消息。',
    },
    log_stats: {
      one_liner: '级别分布 + 模块 Top-10 + 最近 5 条错误',
      description:
        '60 秒内拿到健康脉冲，不用手动 pipe 日志。默认 60 分钟窗口。调试中段用，判断噪声是普遍升高还是集中在某一个模块。',
    },
    log_error_rate: {
      one_liner: 'Run 生命周期成功/失败率报告',
      description:
        '基于 Background run 生命周期标记（started / succeeded / failed）。失败分类（429 / Embedding / ValidationError / …）。小时维度趋势，自动标记低成功率时段。',
    },
    prompt_analyze: {
      one_liner: '每个 Agent 的提示词构成 + Token 预算',
      description:
        '把 mars_agent / mars_deep / mars_image（或全部）拆成 fragment 列表 + 字符/token 计数 + 来源模块。能告诉你每段 fragment 来自哪个子 prompt 文件。',
    },
    prompt_diff: {
      one_liner: '对比两个 Agent 的提示词：共享 / 独有 / 差值',
      description:
        '默认 mars_agent vs mars_deep。当你在一个 Agent 上调整某段 fragment 时，这个工具帮你确认另一个 Agent 是否还在用。',
    },
    prompt_progressive_check: {
      one_liner: '校验工具组关键词覆盖 + 依赖链',
      description:
        '确认 `tool_registry.py` 的组定义自洽：关键词覆盖、依赖链完整、core 组配置正确。新增工具组前先跑一遍。',
    },
    prompt_trace: {
      one_liner: '单次会话的提示词效果报告',
      description:
        '通过 LangGraph API 查询 thread 状态。拆解字符/token 分布（System / Human / AI thinking / AI output / Tools）、thinking 转化率、工具有效性、轮次比。',
    },
    ttft_measure: {
      one_liner: 'Gemini TTFT 基准（按轮 + 汇总）',
      description:
        '对指定 model + thinking_level 发流式请求。返回每轮 time-to-first-token + min/max/avg + 抖动统计。改完 prompt fragment 或切完模型后跑一次。',
    },
    files_api_test: {
      one_liner: 'Gemini Files API (register_files) 连通性探测',
      description:
        '从 GCS 拿一个小文件，测 AI Studio `files.register_files()` 往返耗时。诊断 "媒体没送到 LLM" 这一类故障（超时 / 503 / 空回复）。',
    },
  },

  arch_eyebrow: '工作原理',
  arch_title: '从源码树到 MCP 响应：4 个阶段',
  arch_intro_pre: '',
  arch_intro_mid: ' 遍历仓库，用 libCST 抽取符号 + 调用边，持久化到 PostgreSQL。',
  arch_intro_post: ' 在这些表之上提供 14 个 MCP 工具。Claude Code 像调用任何工具一样调用它们。',
  stage_label: '阶段',
  stage1_title: '遍历 + 解析',
  stage1_desc:
    '对 Python / TypeScript / Swift 做 libCST AST 解析；收集文件路径、行范围、kind（函数 / 类 / 方法）、签名。',
  stage2_title: '写入 Postgres',
  stage2_desc:
    '三张表：code_symbols（每行一个符号）、code_deps（每行一条调用边）、code_modules（每行一个目录）。',
  stage3_title: 'MCP 服务器',
  stage3_desc:
    'Python MCP 服务（stdio 传输）。把 14 个工具名路由到 SQL 查询 + code_index_mcp.py 里的 handler 函数。',
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
    '这是 Mars Agent 依赖图的一份代表性切片 —— 9 层、35 个关键模块、code_index_mcp 通过 deps(kind=\'calls\') 暴露的最重跨边界调用边。拖拽节点，悬停可看所在层 + 符号数。节点大小与模块符号数相关。',
  graph_hint_size: '· 节点大小 ∝ √(模块内符号数)',
  graph_hint_weight: '· 边粗细 ∝ 跨模块调用次数',
  graph_hint_interact: '· 力导向布局，拖拽探索，滚轮缩放',

  stats_eyebrow: '索引规模',
  stats_title: '300 个模块按层分布 —— Mars Agent 当下',
  stats_intro:
    '数据直接来自被 Claude Code 自动加载的同一份架构图（.claude/rules/architecture-map.md）。编排器每次构建从 Postgres 索引重新生成。',
  stats_layer_distribution: '层分布',
  stats_modules_label: '模块',
  stats_modules_sub: '14 层 · 测试文件已排除',
  stats_symbols_label: '符号',
  stats_symbols_sub: '函数 · 类 · 方法 · 异步生成器',
  stats_query_label: '典型查询',
  stats_query_sub: 'Postgres ILIKE 走索引名字段 · 主循环可调用',
  layer_row: {
    tool: { label: '工具层', highlight: 'McpService + bq_handlers + browser' },
    ui_component: { label: 'UI 组件 (前端)', highlight: 'chat / panel / VideoView / charts' },
    frontend_lib: { label: '前端库', highlight: 'lib/api · lib/chart · lib/sync' },
    ios: { label: 'iOS', highlight: 'Views · ViewModels · Network · Charts' },
    hook: { label: 'Hook (前端)', highlight: 'useStream · useChatEngine · history' },
    page: { label: '页面 (前端)', highlight: 'app/c/[id] · app/api/* · /share' },
    middleware: { label: '中间件', highlight: 'agent 流水线上的 17 个有序操作' },
    service: { label: '服务层', highlight: 'gcs · bigquery · payment_orders · billing' },
    api: { label: 'API', highlight: 'FastAPI /v1/* 路由' },
    backend_other: { label: '后端其他', highlight: 'tests · database · models' },
    memory: { label: '记忆', highlight: 'core · relationship · skill_store · curate' },
    agent: { label: 'Agent', highlight: 'factory · pipeline · harness · post_mortem' },
    frontend_other: { label: '前端其他', highlight: 'proxy · public assets · styles' },
    mixed: { label: 'Auth + Prompt + Config + Utility', highlight: '40 + 1 + 21 + 9 符号' },
  },

  install_eyebrow: '为 Claude Code 即插即用',
  install_title: '30 秒装上',
  install_intro:
    '需要 Python 3.11+、PostgreSQL 14+、以及一个 Claude Code 工作区。MCP 服务器就是一个 stdio 脚本 —— 没有 daemon，没有 HTTP 端口。索引按需重建。',
  step1_title: '安装 Python 依赖',
  step1_desc: '在 venv 里装 MCP SDK + Postgres 异步驱动。',
  step2_title: '准备 PostgreSQL',
  step2_desc: '14+ 实例即可；Mars Agent 默认 localhost:5332。',
  step3_title: '构建索引',
  step3_desc: '遍历仓库、解析 AST、写入 code_symbols / code_deps / code_modules。',
  step4_title: '接到 Claude Code',
  step4_desc: '追加到 .mcp.json。把 POSTGRES_URI 指向你的 Postgres 实例。',
  verify_title: '安装完验一下',
  verify_desc_a: '在 Claude Code 里查任意一个符号。如果你看到 ',
  verify_desc_b: 'file_path:line_number',
  verify_desc_c: ' + 真实的函数签名，索引就生效了。如果结果为空，说明索引也是空的 —— 重新跑第 3 步。',

  footer_tagline:
    '为「思维方式是工具，不是文件路径」的 LLM 打造的产线级代码智能。Mars Agent 工具链的一部分 —— 在真实生产 debug 战场上磨出来的，沉淀在 experience.md 的 60+ 条记录里。',
};
