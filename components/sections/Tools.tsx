'use client';

import { CATEGORIES, TOOLS, type ToolDef } from '@/lib/tools';
import { useLocale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';

function ToolCard({ tool, t }: { tool: ToolDef; t: Dictionary }) {
  const cat = CATEGORIES[tool.category];
  const Icon = tool.icon;
  const i18nToolEntry = t.tool[tool.name];
  const catLabel = t[`cat_${tool.category}_label` as keyof Dictionary] as string;

  return (
    <article className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4 h-full">
      <header className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${cat.color}33, ${cat.color}0d)`,
            border: `1px solid ${cat.color}40`,
          }}
        >
          <Icon size={18} strokeWidth={1.8} style={{ color: cat.color }} />
        </div>
        <span
          className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-medium"
          style={{ color: cat.color, background: `${cat.color}14` }}
        >
          {catLabel}
        </span>
      </header>

      <div>
        <h3 className="text-[18px] font-semibold font-mono mb-2 text-glass-text">{tool.name}</h3>
        <p className="text-[13px] text-glass-muted leading-relaxed mb-3">{i18nToolEntry.one_liner}</p>
        <p className="text-[12px] text-glass-faint leading-relaxed">{i18nToolEntry.description}</p>
      </div>

      <footer className="mt-auto space-y-2">
        <div className="code-block !py-2.5 !px-3 !text-[12px]">
          <span className="text-glass-faint select-none">›</span>{' '}
          <span className="text-glass-text">{tool.example}</span>
        </div>
        <div className="text-[11px] text-glass-faint font-mono px-1 truncate" title={tool.output}>
          → {tool.output}
        </div>
      </footer>
    </article>
  );
}

export function Tools() {
  const { t } = useLocale();

  return (
    <section id="tools" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 max-w-2xl">
          <div className="text-[12px] uppercase tracking-widest text-accent-pink mb-3 font-semibold">
            {t.tools_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.tools_title}
          </h2>
          <p className="text-[15px] text-glass-muted leading-relaxed">{t.tools_intro}</p>
        </header>

        <div className="flex flex-wrap gap-3 mb-10">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const label = t[`cat_${key}_label` as keyof Dictionary] as string;
            const hint = t[`cat_${key}_hint` as keyof Dictionary] as string;
            return (
              <div
                key={key}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-card text-[12px]"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <span className="text-glass-text font-medium">{label}</span>
                <span className="text-glass-faint">{hint}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.name} tool={tool} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
