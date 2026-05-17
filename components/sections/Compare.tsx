'use client';

import { Terminal, Database } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';

interface CaseProps {
  title: string;
  question: string;
  bashCmd: string;
  bashTime: string;
  bashResult: string;
  bashStructure: string;
  ciCmd: string;
  ciTime: string;
  ciResult: string;
  ciStructure: string;
  t: Dictionary;
}

function CaseRow({
  title,
  question,
  bashCmd,
  bashTime,
  bashResult,
  bashStructure,
  ciCmd,
  ciTime,
  ciResult,
  ciStructure,
  t,
}: CaseProps) {
  return (
    <article className="glass-card rounded-2xl p-6 md:p-7">
      <header className="mb-5">
        <h3 className="text-[18px] font-semibold text-glass-text mb-1.5">{title}</h3>
        <p className="text-[13px] text-glass-muted">{question}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* bash column */}
        <div
          className="rounded-xl p-4 md:p-5 flex flex-col gap-3"
          style={{
            background: 'rgba(218,55,51,0.06)',
            border: '1px solid rgba(218,55,51,0.22)',
          }}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-accent-red">
            <Terminal size={12} strokeWidth={2.2} />
            {t.cmp_col_bash}
          </div>
          <CmpMetric label={t.cmp_metric_cmd} value={bashCmd} mono />
          <CmpMetric label={t.cmp_metric_time} value={bashTime} />
          <CmpMetric label={t.cmp_metric_result} value={bashResult} />
          <CmpMetric label={t.cmp_metric_structure} value={bashStructure} />
        </div>

        {/* code_index column */}
        <div
          className="rounded-xl p-4 md:p-5 flex flex-col gap-3"
          style={{
            background: 'rgba(247,120,186,0.07)',
            border: '1px solid rgba(247,120,186,0.32)',
          }}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-accent-pink">
            <Database size={12} strokeWidth={2.2} />
            {t.cmp_col_ci}
          </div>
          <CmpMetric label={t.cmp_metric_cmd} value={ciCmd} mono />
          <CmpMetric label={t.cmp_metric_time} value={ciTime} />
          <CmpMetric label={t.cmp_metric_result} value={ciResult} />
          <CmpMetric label={t.cmp_metric_structure} value={ciStructure} />
        </div>
      </div>
    </article>
  );
}

function CmpMetric({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-glass-faint mb-1">{label}</div>
      <div
        className={`text-[13px] leading-relaxed text-glass-text/90 ${mono ? 'font-mono break-all' : ''}`}
      >
        {value}
      </div>
    </div>
  );
}

export function Compare() {
  const { t } = useLocale();

  return (
    <section id="compare" className="relative py-32 px-6 md:px-10 bg-ink-900/40">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 max-w-2xl">
          <div className="text-[12px] uppercase tracking-widest text-accent-red mb-3 font-semibold flex items-center gap-2">
            <Terminal size={13} strokeWidth={2.2} />
            {t.cmp_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.cmp_title_a}
            <span className="mars-wordmark">{t.cmp_title_b}</span>
          </h2>
          <p className="text-[15px] text-glass-muted leading-relaxed">{t.cmp_intro}</p>
        </header>

        <div className="space-y-5">
          <CaseRow
            title={t.cmp_c1_title}
            question={t.cmp_c1_question}
            bashCmd={t.cmp_c1_bash_cmd}
            bashTime={t.cmp_c1_bash_time}
            bashResult={t.cmp_c1_bash_result}
            bashStructure={t.cmp_c1_bash_structure}
            ciCmd={t.cmp_c1_ci_cmd}
            ciTime={t.cmp_c1_ci_time}
            ciResult={t.cmp_c1_ci_result}
            ciStructure={t.cmp_c1_ci_structure}
            t={t}
          />
          <CaseRow
            title={t.cmp_c2_title}
            question={t.cmp_c2_question}
            bashCmd={t.cmp_c2_bash_cmd}
            bashTime={t.cmp_c2_bash_time}
            bashResult={t.cmp_c2_bash_result}
            bashStructure={t.cmp_c2_bash_structure}
            ciCmd={t.cmp_c2_ci_cmd}
            ciTime={t.cmp_c2_ci_time}
            ciResult={t.cmp_c2_ci_result}
            ciStructure={t.cmp_c2_ci_structure}
            t={t}
          />
          <CaseRow
            title={t.cmp_c3_title}
            question={t.cmp_c3_question}
            bashCmd={t.cmp_c3_bash_cmd}
            bashTime={t.cmp_c3_bash_time}
            bashResult={t.cmp_c3_bash_result}
            bashStructure={t.cmp_c3_bash_structure}
            ciCmd={t.cmp_c3_ci_cmd}
            ciTime={t.cmp_c3_ci_time}
            ciResult={t.cmp_c3_ci_result}
            ciStructure={t.cmp_c3_ci_structure}
            t={t}
          />
        </div>

        <div className="mt-10 max-w-4xl">
          <div
            className="glass-card rounded-2xl p-6 md:p-7 border-l-4"
            style={{ borderLeftColor: '#F97316' }}
          >
            <p className="text-[14px] text-glass-text/90 leading-relaxed">{t.cmp_footer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
