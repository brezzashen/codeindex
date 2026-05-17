'use client';

import { Terminal, Database } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';
import { MermaidDiagram } from '@/components/MermaidDiagram';

/* Mars-style mermaid: dark surface + brand accents on result/diff nodes.
   Avoid bare {}/[]/<> in label text per Mars coding-standards.
   mermaid 11 does NOT accept rgba() in style; use 6-digit hex only. */
const TOKEN_DIAGRAM = `flowchart TD
  subgraph WO["Without code_index — 18 steps, mostly re-reading"]
    direction TB
    CC1["Claude Code"]
    G1["grep -rn 'validate_token' backend/"]
    M1["500+ raw matches across 40 files"]
    F1["read file 1"]
    F2["read file 2"]
    F3["read file 3"]
    F4["read file 4"]
    F5["... 20 more files"]
    P1["parse each by hand"]
    DD["dedupe · drop tests · drop comments"]
    REAL["realize: need callers too"]
    G2["grep 'validate_token(' again"]
    FX1["read caller 1"]
    FX2["read caller 2"]
    FX3["read caller 3"]
    CL["classify internal vs cross-layer by hand"]
    GUESS["guess which module · which layer"]
    T1["13,205 tokens · Quality 7.2 / 10"]
    CC1 --> G1 --> M1
    M1 --> F1
    M1 --> F2
    M1 --> F3
    M1 --> F4
    M1 --> F5
    F1 --> P1
    F2 --> P1
    F3 --> P1
    F4 --> P1
    F5 --> P1
    P1 --> DD --> REAL --> G2
    G2 --> FX1
    G2 --> FX2
    G2 --> FX3
    FX1 --> CL
    FX2 --> CL
    FX3 --> CL
    CL --> GUESS --> T1
  end

  subgraph WI["With code_index — 3 steps, indexed"]
    direction TB
    CC2["Claude Code"]
    Q["search_with_deps('validate_token')"]
    GR{{"Postgres call-graph"}}
    T2["1,928 tokens · Quality 8.8 / 10"]
    CC2 --> Q --> GR --> T2
  end

  WO ~~~ WI

  RES["6.8x fewer tokens · higher review quality"]
  T1 --> RES
  T2 --> RES

  style CC1 fill:#1f1f24,color:#f0f6fc,stroke:#3a3a40
  style G1 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style M1 fill:#2a1418,color:#fca5a5,stroke:#7f1d1d
  style F1 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style F2 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style F3 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style F4 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style F5 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style P1 fill:#2a1418,color:#fca5a5,stroke:#7f1d1d
  style DD fill:#2a1418,color:#fca5a5,stroke:#7f1d1d
  style REAL fill:#1A1A1A,color:#fde68a,stroke:#9a3412
  style G2 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style FX1 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style FX2 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style FX3 fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d
  style CL fill:#2a1418,color:#fca5a5,stroke:#7f1d1d
  style GUESS fill:#2a1418,color:#fca5a5,stroke:#7f1d1d
  style T1 fill:#3a1418,color:#fca5a5,stroke:#dc2626,stroke-width:2px

  style CC2 fill:#1f1f24,color:#f0f6fc,stroke:#3a3a40
  style Q fill:#0c2a1a,color:#86efac,stroke:#166534,stroke-width:2px
  style GR fill:#3a1c5b,color:#c4b5fd,stroke:#6d28d9,stroke-width:2px
  style T2 fill:#0f3c1a,color:#86efac,stroke:#16a34a,stroke-width:2px

  style RES fill:#1a3a5b,color:#7dd3fc,stroke:#f778ba,stroke-width:2px
  style WO fill:#1A1A1A,color:#fca5a5,stroke:#7f1d1d,stroke-width:2px
  style WI fill:#1A1A1A,color:#86efac,stroke:#166534,stroke-width:2px`;

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
        <p className="text-[21px] text-glass-muted">{question}</p>
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
          <div className="flex items-center gap-2 text-[18px] uppercase tracking-widest font-semibold text-accent-red">
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
          <div className="flex items-center gap-2 text-[18px] uppercase tracking-widest font-semibold text-accent-pink">
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
      <div className="text-[16px] uppercase tracking-widest text-glass-faint mb-1">{label}</div>
      <div
        className={`text-[21px] leading-relaxed text-glass-text/90 ${mono ? 'font-mono break-all' : ''}`}
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
          <div className="text-[19px] uppercase tracking-widest text-accent-red mb-3 font-semibold flex items-center gap-2">
            <Terminal size={13} strokeWidth={2.2} />
            {t.cmp_eyebrow}
          </div>
          <h2
            className="font-bold mb-3"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.cmp_title_a}
            <span className="mars-wordmark">{t.cmp_title_b}</span>
          </h2>
          <p
            className="font-semibold mb-5 text-glass-text/85"
            style={{ fontSize: 'clamp(20px, 2.6vw, 28px)', letterSpacing: '-0.005em' }}
          >
            {t.cmp_subtitle}
          </p>
          <p className="text-[24px] text-glass-muted leading-relaxed">{t.cmp_intro}</p>
        </header>

        {/* Token-compression diagram — the whole 'why' in one picture */}
        <div className="glass-card rounded-3xl p-5 md:p-8 mb-12">
          <MermaidDiagram id="token-problem" source={TOKEN_DIAGRAM} />
          <p className="text-[18px] text-glass-faint leading-relaxed mt-6 max-w-3xl mx-auto text-center">
            {t.cmp_diagram_caption}
          </p>
        </div>

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
            <p className="text-[22px] text-glass-text/90 leading-relaxed">{t.cmp_footer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
