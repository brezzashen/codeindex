import { Search, GitBranch, Layers, FolderTree, Map, type LucideIcon } from 'lucide-react';

export interface ToolDef {
  name: string;
  icon: LucideIcon;
  category: 'index' | 'module';
  example: string;
  output: string;
}

export const CATEGORIES = {
  index: { label: 'Code Index', color: '#f778ba' },
  module: { label: 'Module View', color: '#F97316' },
} as const;

export const TOOLS: ToolDef[] = [
  {
    name: 'search',
    icon: Search,
    category: 'index',
    example: "search(query='validate_token')",
    output: 'backend/src/auth/token_verifier.py:42  def validate_token(token: str) -> User',
  },
  {
    name: 'deps',
    icon: GitBranch,
    category: 'index',
    example: "deps(symbol='load_mcp_tools', kind='calls')",
    output: '↑ 4 callers  [internal] tool_loader.py:88  [cross-layer] agents/factory.py:153',
  },
  {
    name: 'search_with_deps',
    icon: Layers,
    category: 'index',
    example: "search_with_deps(query='AuthGateway')",
    output: 'middleware/__init__.py:31  AuthGateway  ↑ 2  ↓ 6',
  },
  {
    name: 'module_info',
    icon: FolderTree,
    category: 'module',
    example: "module_info(module_path='backend/auth')",
    output: 'Layer: Auth  | 12 files  | 34 public symbols  | 8 cross-layer deps',
  },
  {
    name: 'architecture_overview',
    icon: Map,
    category: 'module',
    example: "architecture_overview(detail_level='detailed')",
    output: '14 layers · 300 modules · 4820 symbols  →  API (10), Tool (44), Middleware (17) …',
  },
];
