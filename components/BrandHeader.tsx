'use client';

import { Github, Database } from 'lucide-react';

export function BrandHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: '64px' }}
    >
      <div className="w-full h-full flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-3 pointer-events-auto">
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noreferrer"
            className="brand-pill rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/[0.07] transition"
            aria-label="GitHub"
          >
            <Github size={16} strokeWidth={1.8} className="text-glass-text" />
          </a>
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

        <nav className="hidden md:flex items-center gap-2 pointer-events-auto">
          {[
            { href: '#tools', label: 'Tools' },
            { href: '#architecture', label: 'Architecture' },
            { href: '#graph', label: 'Graph' },
            { href: '#install', label: 'Install' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="brand-pill rounded-full px-4 h-10 flex items-center text-[13px] text-glass-text/85 hover:text-glass-text hover:bg-white/[0.07] transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
