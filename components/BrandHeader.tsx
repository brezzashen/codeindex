'use client';

import { Github, Database } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export function BrandHeader() {
  const { locale, setLocale, t } = useLocale();
  const nextLocale = locale === 'zh' ? 'en' : 'zh';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: '64px' }}
    >
      <div className="w-full h-full flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setLocale(nextLocale)}
            className="brand-pill rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/[0.07] transition"
            aria-label={`Switch to ${nextLocale === 'zh' ? '中文' : 'English'}`}
          >
            <span
              className="font-semibold select-none"
              style={{ fontSize: '13px', color: '#f0f6fc', letterSpacing: '0.02em' }}
            >
              {locale === 'zh' ? '中' : 'EN'}
            </span>
          </button>
          <div
            className="brand-pill rounded-full px-5 h-10 flex items-center"
            style={{ letterSpacing: '0.01em' }}
          >
            <h1 className="font-bold flex items-center gap-2 text-[18px]">
              <Database size={15} strokeWidth={2} className="mars-wordmark" />
              <span className="mars-wordmark">code_index</span>
              <span className="text-glass-muted font-medium text-[13px]">mcp</span>
            </h1>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {[
            { href: '#tools', label: t.nav_tools },
            { href: '#compare', label: t.nav_compare },
            { href: '#subconscious', label: t.nav_subconscious },
            { href: '#graph', label: t.nav_graph },
            { href: '#maintenance', label: t.nav_maintenance },
            { href: '#install', label: t.nav_install },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="brand-pill rounded-full px-4 h-10 flex items-center text-[13px] whitespace-nowrap text-glass-text/85 hover:text-glass-text hover:bg-white/[0.07] transition"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/brezzashen/codeindex"
            target="_blank"
            rel="noreferrer"
            className="brand-pill rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/[0.07] transition"
            aria-label="GitHub"
          >
            <Github size={15} strokeWidth={1.8} className="text-glass-text" />
          </a>
        </nav>
      </div>
    </header>
  );
}
