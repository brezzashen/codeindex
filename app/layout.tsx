import './globals.css';
import type { Metadata, Viewport } from 'next';
import { LocaleProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'code_index_mcp — Mars Agent code intelligence',
  description:
    '14 MCP tools turning a 300-module Mars Agent monorepo into a queryable index for Claude Code: symbol search, call graphs, module boundaries, log triage, prompt analysis, TTFT benchmarks.',
  openGraph: {
    title: 'code_index_mcp',
    description:
      'MCP-native code intelligence for Mars Agent — 300 modules, 4820 symbols, sub-100ms PostgreSQL fuzzy lookups.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
