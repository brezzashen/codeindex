'use client';

import { useLocale } from '@/lib/i18n';

interface LayerRow {
  id: string; // i18n key in t.layer_row
  modules: number;
  color: string;
}

const LAYERS: LayerRow[] = [
  { id: 'tool',            modules: 44, color: '#a855f7' },
  { id: 'ui_component',    modules: 76, color: '#60a5fa' },
  { id: 'frontend_lib',    modules: 45, color: '#3b82f6' },
  { id: 'ios',             modules: 29, color: '#fb7185' },
  { id: 'hook',            modules: 19, color: '#7dd3fc' },
  { id: 'page',            modules: 17, color: '#67e8f9' },
  { id: 'middleware',      modules: 17, color: '#DA3733' },
  { id: 'service',         modules: 14, color: '#22d3ee' },
  { id: 'api',             modules: 10, color: '#f778ba' },
  { id: 'backend_other',   modules:  8, color: '#94a3b8' },
  { id: 'memory',          modules:  6, color: '#34d399' },
  { id: 'agent',           modules:  5, color: '#F97316' },
  { id: 'frontend_other',  modules:  5, color: '#0ea5e9' },
  { id: 'mixed',           modules:  5, color: '#facc15' },
];

const TOTAL_MODULES = LAYERS.reduce((s, l) => s + l.modules, 0);
const TOTAL_SYMBOLS = 4820;

export function Stats() {
  const { t } = useLocale();

  return (
    <section id="stats" className="relative py-28 px-6 md:px-10 bg-ink-900/40">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 max-w-2xl">
          <div className="text-[19px] uppercase tracking-widest text-accent-orange mb-3 font-semibold">
            {t.stats_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.stats_title}
          </h2>
          <p className="text-[24px] text-glass-muted leading-relaxed">{t.stats_intro}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-[24px] font-semibold mb-5 text-glass-text">
              {t.stats_layer_distribution}
            </h3>
            <div className="space-y-3">
              {LAYERS.map((row) => {
                const entry = t.layer_row[row.id];
                const pct = (row.modules / TOTAL_MODULES) * 100;
                return (
                  <div key={row.id} className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-4 md:col-span-3 text-[21px] text-glass-text/90 truncate">
                      {entry?.label || row.id}
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
                    <div className="col-span-2 text-right text-[21px] font-mono text-glass-text/85 tabular-nums">
                      {row.modules}
                    </div>
                    <div className="col-span-12 md:col-span-12 text-[18px] text-glass-faint pl-0 md:pl-[25%]">
                      {entry?.highlight}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[18px] uppercase tracking-widest text-glass-faint mb-1">
                {t.stats_modules_label}
              </div>
              <div className="text-[44px] font-bold mars-wordmark leading-none">{TOTAL_MODULES}</div>
              <div className="text-[19px] text-glass-muted mt-2">{t.stats_modules_sub}</div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[18px] uppercase tracking-widest text-glass-faint mb-1">
                {t.stats_symbols_label}
              </div>
              <div className="text-[44px] font-bold mars-wordmark leading-none">
                {TOTAL_SYMBOLS.toLocaleString()}
              </div>
              <div className="text-[19px] text-glass-muted mt-2">{t.stats_symbols_sub}</div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="text-[18px] uppercase tracking-widest text-glass-faint mb-1">
                {t.stats_query_label}
              </div>
              <div className="text-[28px] font-bold text-glass-text leading-none">&lt; 100ms</div>
              <div className="text-[19px] text-glass-muted mt-2">{t.stats_query_sub}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
