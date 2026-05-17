'use client';

interface LayerRow {
  layer: string;
  modules: number;
  color: string;
  highlight?: string;
}

const LAYERS: LayerRow[] = [
  { layer: 'Tool', modules: 44, color: '#a855f7', highlight: 'McpService + bq_handlers + browser' },
  { layer: 'UI Component (Frontend)', modules: 76, color: '#60a5fa', highlight: 'chat / panel / VideoView / charts' },
  { layer: 'Frontend Library', modules: 45, color: '#3b82f6', highlight: 'lib/api · lib/chart · lib/sync' },
  { layer: 'iOS', modules: 29, color: '#fb7185', highlight: 'Views · ViewModels · Network · Charts' },
  { layer: 'Hook (Frontend)', modules: 19, color: '#7dd3fc', highlight: 'useStream · useChatEngine · history' },
  { layer: 'Page (Frontend)', modules: 17, color: '#67e8f9', highlight: 'app/c/[id] · app/api/* · /share' },
  { layer: 'Middleware', modules: 17, color: '#DA3733', highlight: '17 ordered ops on the agent pipeline' },
  { layer: 'Service', modules: 14, color: '#22d3ee', highlight: 'gcs · bigquery · payment_orders · billing' },
  { layer: 'API', modules: 10, color: '#f778ba', highlight: 'FastAPI /v1/* routes' },
  { layer: 'Backend Other', modules: 8, color: '#94a3b8', highlight: 'tests · database · models' },
  { layer: 'Memory', modules: 6, color: '#34d399', highlight: 'core · relationship · skill_store · curate' },
  { layer: 'Agent', modules: 5, color: '#F97316', highlight: 'factory · pipeline · harness · post_mortem' },
  { layer: 'Frontend Other', modules: 5, color: '#0ea5e9', highlight: 'proxy · public assets · styles' },
  { layer: 'Auth + Prompt + Config + Utility', modules: 5, color: '#facc15', highlight: '40 + 1 + 21 + 9 symbols' },
];

const TOTAL_MODULES = LAYERS.reduce((s, l) => s + l.modules, 0);
const TOTAL_SYMBOLS = 4820;

export function Stats() {
  return (
    <section id="stats" className="relative py-28 px-6 md:px-10 bg-ink-900/40">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 max-w-2xl">
          <div className="text-[12px] uppercase tracking-widest text-accent-orange mb-3 font-semibold">
            Index footprint
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            300 modules, grouped by layer — Mars Agent today
          </h2>
          <p className="text-[15px] text-glass-muted leading-relaxed">
            Pulled live from the same architecture map auto-loaded into Claude Code (
            <span className="font-mono text-glass-text/80">.claude/rules/architecture-map.md</span>).
            The orchestrator emits this from the Postgres index every build.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-[15px] font-semibold mb-5 text-glass-text">
              Layer distribution
            </h3>
            <div className="space-y-3">
              {LAYERS.map((row) => {
                const pct = (row.modules / TOTAL_MODULES) * 100;
                return (
                  <div key={row.layer} className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-4 md:col-span-3 text-[13px] text-glass-text/90 truncate">
                      {row.layer}
                    </div>
                    <div className="col-span-6 md:col-span-7 relative h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all"
                        style={{
                          width: `${pct * 4}%`,
                          background: `linear-gradient(90deg, ${row.color}cc, ${row.color}66)`,
                        }}
                      />
                    </div>
                    <div className="col-span-2 text-right text-[13px] font-mono text-glass-text/85 tabular-nums">
                      {row.modules}
                    </div>
                    <div className="col-span-12 md:col-span-12 text-[11px] text-glass-faint pl-0 md:pl-[25%]">
                      {row.highlight}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-widest text-glass-faint mb-1">Modules</div>
              <div className="text-[44px] font-bold mars-wordmark leading-none">{TOTAL_MODULES}</div>
              <div className="text-[12px] text-glass-muted mt-2">14 layers · test files excluded</div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-widest text-glass-faint mb-1">Symbols</div>
              <div className="text-[44px] font-bold mars-wordmark leading-none">
                {TOTAL_SYMBOLS.toLocaleString()}
              </div>
              <div className="text-[12px] text-glass-muted mt-2">
                Functions · classes · methods · async generators
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-widest text-glass-faint mb-1">
                Typical query
              </div>
              <div className="text-[28px] font-bold text-glass-text leading-none">&lt; 100ms</div>
              <div className="text-[12px] text-glass-muted mt-2">
                Postgres ILIKE on indexed name column · in-loop call
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
