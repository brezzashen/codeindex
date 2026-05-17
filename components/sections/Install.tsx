'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

interface StepProps {
  num: string;
  title: string;
  desc: string;
  code: string;
  language?: string;
}

function CodeStep({ num, title, desc, code, language = 'bash' }: StepProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-[12px] font-bold text-glass-text">
          {num}
        </span>
        <h3 className="text-[16px] font-semibold text-glass-text">{title}</h3>
      </div>
      <p className="text-[13px] text-glass-muted mb-4 leading-relaxed">{desc}</p>
      <div className="relative">
        <div className="code-block !p-4 !pr-14 whitespace-pre overflow-x-auto">
          {language === 'bash' && <span className="text-glass-faint select-none">$ </span>}
          {code}
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] transition flex items-center justify-center"
          aria-label="Copy"
        >
          {copied ? (
            <Check size={14} strokeWidth={2} className="text-accent-pink" />
          ) : (
            <Copy size={14} strokeWidth={1.8} className="text-glass-text/80" />
          )}
        </button>
      </div>
    </div>
  );
}

export function Install() {
  const { t } = useLocale();

  const mcpConfig = `{
  "mcpServers": {
    "code_index": {
      "command": "/path/to/venv/bin/python",
      "args": [
        "/path/to/code_index_mcp.py"
      ],
      "env": {
        "POSTGRES_URI": "postgresql://user:pass@localhost:5332/code_index",
        "PYTHONPATH": "/path/to/.claude/tools"
      }
    }
  }
}`;

  return (
    <section id="install" className="relative py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 max-w-2xl">
          <div className="text-[12px] uppercase tracking-widest text-accent-pink mb-3 font-semibold">
            {t.install_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.install_title}
          </h2>
          <p className="text-[15px] text-glass-muted leading-relaxed">{t.install_intro}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CodeStep
            num="1"
            title={t.step1_title}
            desc={t.step1_desc}
            code="uv pip install 'mcp>=1.0.0' asyncpg libcst"
          />
          <CodeStep
            num="2"
            title={t.step2_title}
            desc={t.step2_desc}
            code={`createdb code_index\npsql code_index < schema.sql`}
          />
          <CodeStep
            num="3"
            title={t.step3_title}
            desc={t.step3_desc}
            code="bash .claude/tools/code-agent.sh index"
          />
          <CodeStep
            num="4"
            title={t.step4_title}
            desc={t.step4_desc}
            code={mcpConfig}
            language="json"
          />
        </div>

        <div className="glass-card rounded-2xl p-6 mt-8">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-pink/15 border border-accent-pink/30 flex items-center justify-center flex-shrink-0">
              <Terminal size={16} strokeWidth={1.8} className="text-accent-pink" />
            </div>
            <div className="flex-1">
              <h4 className="text-[15px] font-semibold mb-2">{t.verify_title}</h4>
              <p className="text-[13px] text-glass-muted mb-3">
                {t.verify_desc_a}
                <span className="font-mono text-glass-text/85">{t.verify_desc_b}</span>
                {t.verify_desc_c}
              </p>
              <div className="code-block !text-[12px] !py-3">
                <span className="text-glass-faint select-none">›</span> mcp__code_index__search(query="validate_token")
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
