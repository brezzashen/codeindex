'use client';

import { Orb } from '@/components/Orb';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center hero-vignette"
      style={{ minHeight: '100svh' }}
    >
      <div className="absolute inset-0 z-0">
        <Orb hue={0} hoverIntensity={0.35} rotateOnHover />
      </div>

      <div className="relative z-10 max-w-4xl px-6 md:px-10 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-8 brand-pill rounded-full px-4 h-9 text-[12px] tracking-wide uppercase text-glass-muted">
          <Sparkles size={13} strokeWidth={2} className="text-accent-pink" />
          <span>MCP-native code intelligence</span>
        </div>

        <h1
          className="font-bold mb-6"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          The codebase as a{' '}
          <span className="mars-wordmark">queryable index</span>,<br />
          not a folder of files
        </h1>

        <p className="text-[16px] md:text-[18px] text-glass-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          <span className="font-mono text-glass-text/85">code_index_mcp</span> is the MCP server
          that turns Mars Agent — <span className="text-glass-text">300 modules · 4,820 symbols</span> —
          into a Postgres-backed index Claude Code can search, trace, and reason over in milliseconds.
          14 tools. Symbol lookup, call graphs, module dossiers, log triage, prompt analysis, TTFT probes.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#tools"
            className="brand-pill rounded-full px-6 h-11 inline-flex items-center text-[14px] font-medium hover:bg-white/[0.08] transition"
          >
            See the 14 tools
            <ArrowDown size={14} className="ml-2 opacity-70" />
          </a>
          <a
            href="#install"
            className="rounded-full px-6 h-11 inline-flex items-center text-[14px] font-medium bg-glass-text text-ink-950 hover:bg-white transition"
          >
            Install in 30 seconds
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Modules indexed', value: '300' },
            { label: 'Symbols', value: '4,820' },
            { label: 'MCP tools', value: '14' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-bold text-[28px] md:text-[32px] mars-wordmark">{s.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-glass-faint mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
