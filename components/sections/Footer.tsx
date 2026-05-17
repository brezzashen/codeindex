'use client';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6 md:px-10 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="text-[20px] font-bold mb-3">
          <span className="mars-wordmark">code_index</span>
          <span className="text-glass-muted font-medium ml-1.5">mcp</span>
        </div>
        <p className="text-[13px] text-glass-faint leading-relaxed mb-6">
          Ship-grade code intelligence for an LLM that thinks in tools, not file paths.
          Part of the Mars Agent toolchain — designed against real production debug sessions, refined
          across 60+ entries in <span className="font-mono text-glass-text/70">experience.md</span>.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-glass-faint">
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
