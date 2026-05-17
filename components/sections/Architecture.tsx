'use client';

import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

interface StageProps {
  step: string;
  stageLabel: string;
  title: string;
  desc: string;
  color: string;
  mono?: string[];
}

function Stage({ step, stageLabel, title, desc, color, mono }: StageProps) {
  return (
    <div className="glass-card rounded-2xl p-6 w-full md:w-72 flex-shrink-0">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-[19px] font-bold"
          style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}
        >
          {step}
        </span>
        <span className="text-[19px] uppercase tracking-widest text-glass-faint">{stageLabel}</span>
      </div>
      <h4 className="text-[18px] font-semibold mb-2 text-glass-text">{title}</h4>
      <p className="text-[21px] text-glass-muted leading-relaxed mb-3">{desc}</p>
      {mono && (
        <ul className="space-y-1">
          {mono.map((m) => (
            <li key={m} className="text-[19px] font-mono text-glass-text/85">
              <span className="text-glass-faint mr-1.5">·</span>
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Architecture() {
  const { t } = useLocale();

  return (
    <section id="architecture" className="relative py-32 px-6 md:px-10 bg-ink-900/40">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 max-w-2xl">
          <div className="text-[19px] uppercase tracking-widest text-accent-orange mb-3 font-semibold">
            {t.arch_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.arch_title}
          </h2>
          <p className="text-[24px] text-glass-muted leading-relaxed">
            {t.arch_intro_pre}
            <span className="font-mono text-glass-text/85">code-agent.sh index</span>
            {t.arch_intro_mid}
            <span className="font-mono text-glass-text/85">code_index_mcp.py</span>
            {t.arch_intro_post}
          </p>
        </header>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-2 mb-14">
          <Stage
            step="1"
            stageLabel={t.stage_label}
            title={t.stage1_title}
            desc={t.stage1_desc}
            color="#f778ba"
            mono={['code_agent.py', 'libCST', '300 modules', '4,820 symbols']}
          />
          <ArrowRight size={20} className="hidden md:block text-glass-faint mx-auto flex-shrink-0" />
          <ArrowDown size={20} className="md:hidden text-glass-faint mx-auto flex-shrink-0" />
          <Stage
            step="2"
            stageLabel={t.stage_label}
            title={t.stage2_title}
            desc={t.stage2_desc}
            color="#F97316"
            mono={['code_symbols', 'code_deps', 'code_modules', 'ILIKE GIN index']}
          />
          <ArrowRight size={20} className="hidden md:block text-glass-faint mx-auto flex-shrink-0" />
          <ArrowDown size={20} className="md:hidden text-glass-faint mx-auto flex-shrink-0" />
          <Stage
            step="3"
            stageLabel={t.stage_label}
            title={t.stage3_title}
            desc={t.stage3_desc}
            color="#DA3733"
            mono={['mcp.server', 'stdio', 'asyncpg pool', 'startup guard']}
          />
          <ArrowRight size={20} className="hidden md:block text-glass-faint mx-auto flex-shrink-0" />
          <ArrowDown size={20} className="md:hidden text-glass-faint mx-auto flex-shrink-0" />
          <Stage
            step="4"
            stageLabel={t.stage_label}
            title={t.stage4_title}
            desc={t.stage4_desc}
            color="#a855f7"
            mono={['.mcp.json', 'TextContent', '< 100ms', 'progressive output']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-card rounded-2xl p-6">
            <div className="text-[18px] uppercase tracking-widest text-accent-pink mb-2 font-semibold">
              code_symbols
            </div>
            <h4 className="text-[16px] font-semibold mb-3">{t.symbols_table_title}</h4>
            <pre className="code-block !text-[19px] !p-3 !leading-relaxed text-glass-text/85">{`id, name, kind, layer,
file_path, line_start, line_end,
signature, module_path,
is_test, indexed_at`}</pre>
            <p className="text-[19px] text-glass-faint mt-3">{t.symbols_table_caption}</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="text-[18px] uppercase tracking-widest text-accent-orange mb-2 font-semibold">
              code_deps
            </div>
            <h4 className="text-[16px] font-semibold mb-3">{t.deps_table_title}</h4>
            <pre className="code-block !text-[19px] !p-3 !leading-relaxed text-glass-text/85">{`caller_id → callee_id,
kind: calls | inherits | imports,
caller_module, callee_module,
boundary_class (internal /
cross-module / cross-layer /
external)`}</pre>
            <p className="text-[19px] text-glass-faint mt-3">{t.deps_table_caption}</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="text-[18px] uppercase tracking-widest text-accent-red mb-2 font-semibold">
              code_modules
            </div>
            <h4 className="text-[16px] font-semibold mb-3">{t.modules_table_title}</h4>
            <pre className="code-block !text-[19px] !p-3 !leading-relaxed text-glass-text/85">{`module_path, layer,
responsibility, file_count,
line_total, public_api[],
cross_boundary_deps[]`}</pre>
            <p className="text-[19px] text-glass-faint mt-3">{t.modules_table_caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
