import {
  Search,
  GitBranch,
  Layers,
  FolderTree,
  Map,
  Activity,
  Bug,
  TrendingDown,
  FileText,
  GitCompare,
  CheckCircle,
  Gauge,
  Timer,
  Server,
  type LucideIcon,
} from 'lucide-react';

export interface ToolDef {
  name: string;
  icon: LucideIcon;
  category: 'index' | 'log' | 'prompt' | 'module' | 'perf';
  one_liner: string;
  description: string;
  example: string;
  output: string;
}

export const CATEGORIES = {
  index: { label: 'Code Index', color: '#f778ba', hint: 'PostgreSQL ILIKE fuzzy lookup over 4820 symbols' },
  module: { label: 'Module View', color: '#F97316', hint: 'Layered architecture overview + per-module dossier' },
  log: { label: 'Log Triage', color: '#DA3733', hint: 'Backend / MCP browser log query + error aggregation' },
  prompt: { label: 'Prompt Analysis', color: '#a855f7', hint: 'Per-agent prompt composition + diff + trace' },
  perf: { label: 'Performance', color: '#22d3ee', hint: 'Gemini TTFT + Files API benchmarks' },
} as const;

export const TOOLS: ToolDef[] = [
  {
    name: 'search',
    icon: Search,
    category: 'index',
    one_liner: 'Symbol lookup, more precise than Grep',
    description:
      'PostgreSQL ILIKE fuzzy match over the symbol table. Returns file_path:line_number + function signature, up to 50 hits. Test symbols excluded by default.',
    example: "search(query='validate_token')",
    output: 'backend/src/auth/token_verifier.py:42  def validate_token(token: str) -> User',
  },
  {
    name: 'deps',
    icon: GitBranch,
    category: 'index',
    one_liner: 'Bidirectional callers + callees, with boundary annotations',
    description:
      'Who calls this symbol, what this symbol calls. Edges tagged [internal] / [cross-module] / [cross-layer] / [external] so refactor impact is visible without reading 12 files.',
    example: "deps(symbol='load_mcp_tools', kind='calls')",
    output: '↑ 4 callers  [internal] tool_loader.py:88  [cross-layer] agents/factory.py:153',
  },
  {
    name: 'search_with_deps',
    icon: Layers,
    category: 'index',
    one_liner: 'Search + top-3 dep trees in one round-trip',
    description:
      'For when you want "where is it AND who uses it" without two MCP calls. Composes search() with deps() over the top 3 hits.',
    example: "search_with_deps(query='AuthGateway')",
    output: 'middleware/__init__.py:31  AuthGateway  ↑ 2  ↓ 6',
  },
  {
    name: 'module_info',
    icon: FolderTree,
    category: 'module',
    one_liner: 'Per-directory dossier: layer, responsibility, public API',
    description:
      'Tells you what a module does, which layer it lives in, its public exports, internal symbols, and top cross-boundary dependencies. Partial path matching via ILIKE.',
    example: "module_info(module_path='backend/auth')",
    output: 'Layer: Auth  | 12 files  | 34 public symbols  | 8 cross-layer deps',
  },
  {
    name: 'architecture_overview',
    icon: Map,
    category: 'module',
    one_liner: 'Project-wide layered architecture in one call',
    description:
      'Groups all 300 indexed modules by layer (API / Agent / Middleware / Tool / Auth / Service / Frontend / iOS). Summary mode for orientation; detailed mode adds public API + dep lists.',
    example: "architecture_overview(detail_level='detailed')",
    output: '14 layers · 300 modules · 4820 symbols  →  API (10), Tool (44), Middleware (17) …',
  },
  {
    name: 'log_query',
    icon: Activity,
    category: 'log',
    one_liner: 'Multi-dimensional backend log query',
    description:
      'AND-combine level / module / trace_id / run_id / request_id / keyword / time-window filters. Compact format: time | level | module | event. Sources: mars backend or MCP browser.',
    example: "log_query(level='error', last_minutes=30)",
    output: '14:32:18  ERROR  agents.factory  retry_storm  trace=8ef3b1f1 …',
  },
  {
    name: 'log_errors',
    icon: Bug,
    category: 'log',
    one_liner: 'Group + dedupe errors by module+event pattern',
    description:
      'Scans all log files (main + rotated), normalizes dynamic tokens (UUID, numeric IDs), groups by signature, returns occurrence count + time range + sample message.',
    example: 'log_errors(last_hours=6)',
    output: '× 42  retry_middleware.py  rate_limit_429 (last seen 3 min ago)',
  },
  {
    name: 'log_stats',
    icon: Gauge,
    category: 'log',
    one_liner: 'Level distribution + module Top-10 + last 5 errors',
    description:
      'A 60-second health pulse without piping logs by hand. Default 60-min window. Use mid-debug to know whether the noise is broadly elevated or localized to one module.',
    example: 'log_stats(last_minutes=30)',
    output: 'INFO 1,243  WARN 18  ERROR 4  | Top: agents.factory (412)',
  },
  {
    name: 'log_error_rate',
    icon: TrendingDown,
    category: 'log',
    one_liner: 'Run-lifecycle success/error rate report',
    description:
      'Based on Background run lifecycle markers (started / succeeded / failed). Classifies failures (429, Embedding, ValidationError, …). Hourly trend with low-success-rate flags.',
    example: 'log_error_rate(last_hours=72)',
    output: 'success 97.4%  · 429: 11  · ValidationError: 4  · low-rate windows: 1',
  },
  {
    name: 'prompt_analyze',
    icon: FileText,
    category: 'prompt',
    one_liner: 'Per-agent prompt composition + token budget',
    description:
      'Breaks down mars_agent / mars_deep / mars_image (or all) into fragment list + char/token count + source modules. Knows which fragments come from which sub-prompt file.',
    example: "prompt_analyze(agent='mars_deep')",
    output: 'mars_deep · 7,842 chars · ~2,114 tokens · 14 fragments',
  },
  {
    name: 'prompt_diff',
    icon: GitCompare,
    category: 'prompt',
    one_liner: 'Compare two agents’ prompts: shared / unique / delta',
    description:
      'Default mars_agent vs mars_deep. Useful when adjusting a fragment in one agent and you want to confirm whether the other still gets it.',
    example: "prompt_diff(agent_a='mars_agent', agent_b='mars_image')",
    output: 'shared: 8 fragments · only A: 12 · only B: 5 · Δ tokens: +1,247',
  },
  {
    name: 'prompt_progressive_check',
    icon: CheckCircle,
    category: 'prompt',
    one_liner: 'Validate tool-group keyword coverage + dep chains',
    description:
      'Confirms `tool_registry.py` group definitions are internally consistent: keyword coverage, dependency chain integrity, core-group correctness. Run before shipping a new tool group.',
    example: 'prompt_progressive_check()',
    output: '✓ 23 groups · ✓ 47 deps · ✓ core ↔ progressive coherent',
  },
  {
    name: 'prompt_trace',
    icon: Activity,
    category: 'prompt',
    one_liner: 'Per-conversation prompt effectiveness report',
    description:
      'Queries thread state via LangGraph API. Breaks down char/token distribution (System / Human / AI thinking / AI output / Tools), thinking conversion rate, tool effectiveness, turn ratio.',
    example: "prompt_trace(run_id='019c7fbe-…')",
    output: 'tokens: sys 18% · human 6% · thinking 41% · output 29% · tools 6%',
  },
  {
    name: 'ttft_measure',
    icon: Timer,
    category: 'perf',
    one_liner: 'Gemini TTFT benchmark (per-round + summary)',
    description:
      'Streaming requests against the chosen model + thinking level. Returns per-round time-to-first-token + min/max/avg + spike stats. Use after a prompt fragment change or model swap.',
    example: "ttft_measure(model='gemini-3.1-pro-preview', rounds=3)",
    output: 'gemini-3.1-pro · avg 1.84s · p95 2.31s · spikes: 0',
  },
  {
    name: 'files_api_test',
    icon: Server,
    category: 'perf',
    one_liner: 'Gemini Files API (register_files) connectivity probe',
    description:
      'Pulls a small file from GCS, times AI Studio `files.register_files()` round-trip. Diagnoses the "media never reaches LLM" class of failures (timeout / 503 / empty reply).',
    example: 'files_api_test(rounds=3)',
    output: 'round 1: 412ms · round 2: 389ms · round 3: 401ms · all 200',
  },
];
