'use client';

import { Brain, Zap, Sparkles, Eye, Lock } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';

interface LayerProps {
  level: number;
  layerLabel: string;
  title: string;
  kind: string;
  desc: string;
  items: string[];
  callout?: string;
  cost: string;
  color: string;
  Icon: typeof Brain;
}

function Layer({ level, layerLabel, title, kind, desc, items, callout, cost, color, Icon }: LayerProps) {
  return (
    <article
      className="glass-card glass-card-hover rounded-2xl p-6 md:p-7 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, ${color}1a, transparent 55%)`,
      }}
    >
      {/* Layer index ribbon (top-right) */}
      <div className="absolute top-5 right-5 flex items-baseline gap-1.5 select-none">
        <span className="text-[10px] uppercase tracking-widest text-glass-faint">{layerLabel}</span>
        <span
          className="font-bold text-[20px] tabular-nums leading-none"
          style={{ color }}
        >
          {level}
        </span>
      </div>

      <header className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color}33, ${color}0d)`,
            border: `1px solid ${color}55`,
          }}
        >
          <Icon size={20} strokeWidth={1.7} style={{ color }} />
        </div>
        <div>
          <h3 className="text-[18px] font-semibold text-glass-text leading-tight">{title}</h3>
          <div className="text-[11px] uppercase tracking-widest mt-1" style={{ color }}>
            {kind}
          </div>
        </div>
      </header>

      <p className="text-[13px] text-glass-muted leading-relaxed mb-4">{desc}</p>

      <ul className="space-y-1.5 mb-4">
        {items.map((item) => (
          <li
            key={item}
            className="text-[12px] font-mono text-glass-text/85 flex items-start gap-2"
          >
            <span className="text-glass-faint mt-0.5 flex-shrink-0">›</span>
            <span className="break-all">{item}</span>
          </li>
        ))}
      </ul>

      {callout && (
        <div
          className="rounded-xl px-4 py-3 mb-4 text-[12.5px] leading-relaxed"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}33`,
            color: 'rgba(240,246,252,0.92)',
          }}
        >
          {callout}
        </div>
      )}

      <footer className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-glass-faint flex items-center gap-1.5">
        <Lock size={11} strokeWidth={2} className="opacity-60" />
        {cost}
      </footer>
    </article>
  );
}

export function Subconscious() {
  const { t } = useLocale();

  return (
    <section id="subconscious" className="relative py-32 px-6 md:px-10 bg-ink-900/40">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 max-w-2xl">
          <div className="text-[12px] uppercase tracking-widest text-accent-pink mb-3 font-semibold flex items-center gap-2">
            <Brain size={13} strokeWidth={2.2} className="text-accent-pink" />
            {t.subc_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.subc_title_a}
            <span className="mars-wordmark">{t.subc_title_b}</span>
            {t.subc_title_c}
          </h2>
          <p className="text-[15px] text-glass-muted leading-relaxed">{t.subc_intro}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Layer
            level={0}
            layerLabel={t.subc_layer_label}
            title={t.subc_l0_title}
            kind={t.subc_l0_kind}
            desc={t.subc_l0_desc}
            items={t.subc_l0_items}
            cost={t.subc_l0_cost}
            color="#f778ba"
            Icon={Brain}
          />
          <Layer
            level={1}
            layerLabel={t.subc_layer_label}
            title={t.subc_l1_title}
            kind={t.subc_l1_kind}
            desc={t.subc_l1_desc}
            items={t.subc_l1_items}
            cost={t.subc_l1_cost}
            color="#F97316"
            Icon={Zap}
          />
          <Layer
            level={2}
            layerLabel={t.subc_layer_label}
            title={t.subc_l2_title}
            kind={t.subc_l2_kind}
            desc={t.subc_l2_desc}
            items={t.subc_l2_items}
            callout={t.subc_l2_callout}
            cost={t.subc_l2_cost}
            color="#a855f7"
            Icon={Sparkles}
          />
          <Layer
            level={3}
            layerLabel={t.subc_layer_label}
            title={t.subc_l3_title}
            kind={t.subc_l3_kind}
            desc={t.subc_l3_desc}
            items={t.subc_l3_items}
            cost={t.subc_l3_cost}
            color="#22d3ee"
            Icon={Eye}
          />
        </div>

        <div className="mt-10 max-w-4xl">
          <div className="glass-card rounded-2xl p-6 md:p-7 border-l-4" style={{ borderLeftColor: '#f778ba' }}>
            <p className="text-[14px] text-glass-text/90 leading-relaxed">{t.subc_footer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
