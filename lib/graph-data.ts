/**
 * Representative slice of the Mars Agent code graph for the force-layout viz.
 * Anchored on real layer counts from `.claude/rules/architecture-map.md`
 * (300 modules / 4820 symbols), with the top inter-layer edges that the
 * code_index_mcp `deps(kind='calls')` query surfaces.
 */

export interface GraphNode {
  id: string;
  name: string;
  category: number;
  symbolValue: number;
  layer: string;
}

export interface GraphLink {
  source: string;
  target: string;
  weight: number;
}

export interface GraphCategory {
  name: string;
  itemStyle: { color: string };
}

export const GRAPH_CATEGORIES: GraphCategory[] = [
  { name: 'API', itemStyle: { color: '#f778ba' } },
  { name: 'Agent', itemStyle: { color: '#F97316' } },
  { name: 'Middleware', itemStyle: { color: '#DA3733' } },
  { name: 'Tool', itemStyle: { color: '#a855f7' } },
  { name: 'Service', itemStyle: { color: '#22d3ee' } },
  { name: 'Auth', itemStyle: { color: '#facc15' } },
  { name: 'Memory', itemStyle: { color: '#34d399' } },
  { name: 'Frontend', itemStyle: { color: '#60a5fa' } },
  { name: 'iOS', itemStyle: { color: '#fb7185' } },
];

const C_API = 0;
const C_AGENT = 1;
const C_MW = 2;
const C_TOOL = 3;
const C_SVC = 4;
const C_AUTH = 5;
const C_MEM = 6;
const C_FE = 7;
const C_IOS = 8;

export const GRAPH_NODES: GraphNode[] = [
  // ── API layer ──
  { id: 'api/routes', name: 'api/routes/v1', category: C_API, symbolValue: 107, layer: 'API' },
  { id: 'api/threads', name: 'threads', category: C_API, symbolValue: 6, layer: 'API' },
  { id: 'api/push', name: 'push', category: C_API, symbolValue: 10, layer: 'API' },
  { id: 'api/userStorage', name: 'userStorage', category: C_API, symbolValue: 12, layer: 'API' },
  { id: 'api/memory', name: 'memory', category: C_API, symbolValue: 14, layer: 'API' },

  // ── Agent layer ──
  { id: 'agents/core', name: 'agents/core', category: C_AGENT, symbolValue: 11, layer: 'Agent' },
  { id: 'agents/factory', name: 'AgentFactory', category: C_AGENT, symbolValue: 9, layer: 'Agent' },
  { id: 'agents/pipeline', name: 'PipelineBuilder', category: C_AGENT, symbolValue: 10, layer: 'Agent' },
  { id: 'agents/harness', name: 'harness', category: C_AGENT, symbolValue: 7, layer: 'Agent' },

  // ── Middleware (17 modules) ──
  { id: 'mw/auth', name: 'AuthGateway', category: C_MW, symbolValue: 16, layer: 'Middleware' },
  { id: 'mw/batch', name: 'BatchToolCapEnforcer', category: C_MW, symbolValue: 82, layer: 'Middleware' },
  { id: 'mw/streaming', name: 'StreamingDispatch', category: C_MW, symbolValue: 12, layer: 'Middleware' },
  { id: 'mw/recall', name: 'MemoryRecall', category: C_MW, symbolValue: 9, layer: 'Middleware' },
  { id: 'mw/retry', name: 'RetryMiddleware', category: C_MW, symbolValue: 5, layer: 'Middleware' },
  { id: 'mw/thinking', name: 'ThinkingStream', category: C_MW, symbolValue: 5, layer: 'Middleware' },

  // ── Tool layer (44 modules — biggest) ──
  { id: 'tools/mcp', name: 'McpService', category: C_TOOL, symbolValue: 132, layer: 'Tool' },
  { id: 'tools/registry', name: 'tool_registry', category: C_TOOL, symbolValue: 17, layer: 'Tool' },
  { id: 'tools/bq', name: 'bq_handlers', category: C_TOOL, symbolValue: 34, layer: 'Tool' },
  { id: 'tools/browser', name: 'persistent_browser', category: C_TOOL, symbolValue: 18, layer: 'Tool' },
  { id: 'tools/douyin', name: 'douyin', category: C_TOOL, symbolValue: 16, layer: 'Tool' },
  { id: 'tools/wxchannel', name: 'wxchannel', category: C_TOOL, symbolValue: 10, layer: 'Tool' },
  { id: 'tools/mermaid', name: 'mermaid_schemas', category: C_TOOL, symbolValue: 36, layer: 'Tool' },

  // ── Service layer ──
  { id: 'svc/gcs', name: 'gcs', category: C_SVC, symbolValue: 37, layer: 'Service' },
  { id: 'svc/bq', name: 'bigquery', category: C_SVC, symbolValue: 17, layer: 'Service' },
  { id: 'svc/billing', name: 'billing', category: C_SVC, symbolValue: 5, layer: 'Service' },
  { id: 'svc/payments', name: 'payment_orders', category: C_SVC, symbolValue: 7, layer: 'Service' },

  // ── Auth ──
  { id: 'auth/core', name: 'auth/core', category: C_AUTH, symbolValue: 40, layer: 'Auth' },

  // ── Memory ──
  { id: 'mem/core', name: 'memory/core', category: C_MEM, symbolValue: 32, layer: 'Memory' },
  { id: 'mem/relationship', name: 'relationship', category: C_MEM, symbolValue: 8, layer: 'Memory' },
  { id: 'mem/skills', name: 'skill_store', category: C_MEM, symbolValue: 8, layer: 'Memory' },

  // ── Frontend ──
  { id: 'fe/hooks', name: 'hooks/useStream', category: C_FE, symbolValue: 297, layer: 'Frontend' },
  { id: 'fe/lib-api', name: 'lib/api', category: C_FE, symbolValue: 151, layer: 'Frontend' },
  { id: 'fe/components-chat', name: 'components/chat', category: C_FE, symbolValue: 45, layer: 'Frontend' },
  { id: 'fe/proxy', name: 'lib/proxy', category: C_FE, symbolValue: 9, layer: 'Frontend' },

  // ── iOS ──
  { id: 'ios/views', name: 'ios/Views', category: C_IOS, symbolValue: 63, layer: 'iOS' },
  { id: 'ios/vm', name: 'ios/ViewModels', category: C_IOS, symbolValue: 56, layer: 'iOS' },
];

export const GRAPH_LINKS: GraphLink[] = [
  // API → Agent / Service
  { source: 'api/routes', target: 'agents/factory', weight: 8 },
  { source: 'api/threads', target: 'agents/core', weight: 6 },
  { source: 'api/userStorage', target: 'svc/gcs', weight: 12 },
  { source: 'api/memory', target: 'mem/core', weight: 10 },
  { source: 'api/push', target: 'svc/payments', weight: 3 },

  // Agent → Middleware (the pipeline)
  { source: 'agents/factory', target: 'agents/pipeline', weight: 7 },
  { source: 'agents/pipeline', target: 'mw/auth', weight: 5 },
  { source: 'agents/pipeline', target: 'mw/batch', weight: 6 },
  { source: 'agents/pipeline', target: 'mw/streaming', weight: 5 },
  { source: 'agents/pipeline', target: 'mw/recall', weight: 4 },
  { source: 'agents/pipeline', target: 'mw/retry', weight: 4 },
  { source: 'agents/pipeline', target: 'mw/thinking', weight: 3 },

  // Middleware → Tool / Service
  { source: 'mw/recall', target: 'mem/core', weight: 8 },
  { source: 'mw/batch', target: 'tools/registry', weight: 5 },
  { source: 'mw/auth', target: 'auth/core', weight: 9 },

  // Tool internal
  { source: 'tools/registry', target: 'tools/mcp', weight: 14 },
  { source: 'tools/mcp', target: 'tools/bq', weight: 8 },
  { source: 'tools/mcp', target: 'tools/browser', weight: 6 },
  { source: 'tools/mcp', target: 'tools/douyin', weight: 5 },
  { source: 'tools/mcp', target: 'tools/wxchannel', weight: 4 },
  { source: 'tools/mcp', target: 'tools/mermaid', weight: 3 },

  // Tool → Service
  { source: 'tools/bq', target: 'svc/bq', weight: 9 },
  { source: 'tools/mcp', target: 'svc/gcs', weight: 11 },
  { source: 'tools/browser', target: 'svc/gcs', weight: 4 },

  // Memory internal
  { source: 'mem/core', target: 'mem/relationship', weight: 5 },
  { source: 'mem/core', target: 'mem/skills', weight: 5 },
  { source: 'mem/core', target: 'svc/gcs', weight: 6 },

  // Service internal
  { source: 'svc/payments', target: 'svc/billing', weight: 4 },

  // Frontend → API (proxy)
  { source: 'fe/hooks', target: 'fe/lib-api', weight: 14 },
  { source: 'fe/lib-api', target: 'fe/proxy', weight: 8 },
  { source: 'fe/proxy', target: 'api/routes', weight: 12 },
  { source: 'fe/components-chat', target: 'fe/hooks', weight: 9 },

  // iOS → API
  { source: 'ios/views', target: 'ios/vm', weight: 11 },
  { source: 'ios/vm', target: 'api/routes', weight: 9 },

  // Auth → API
  { source: 'auth/core', target: 'api/routes', weight: 6 },
];
