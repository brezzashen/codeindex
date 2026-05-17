'use client';

import { useLocale } from '@/lib/i18n';

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6 md:px-10 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="text-[20px] font-bold mb-3">
          <span className="mars-wordmark">code_index</span>
          <span className="text-glass-muted font-medium ml-1.5">mcp</span>
        </div>
        <p className="text-[21px] text-glass-faint leading-relaxed mb-6">{t.footer_tagline}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[19px] text-glass-faint">
          <span>Mars Agent · code intelligence MCP</span>
          <span className="opacity-30">·</span>
          <span>MCP SDK 1.x</span>
          <span className="opacity-30">·</span>
          <span>Python 3.11+</span>
          <span className="opacity-30">·</span>
          <span>PostgreSQL 14+</span>
        </div>
      </div>
    </footer>
  );
}
