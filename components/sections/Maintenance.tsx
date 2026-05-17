'use client';

import { useState } from 'react';
import { Camera, FileEdit, GitCommit, Upload, Copy, Check, GitBranch } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

interface StepProps {
  num: number;
  title: string;
  desc: string;
  color: string;
  Icon: typeof Camera;
}

function Step({ num, title, desc, color, Icon }: StepProps) {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color}33, ${color}0d)`,
            border: `1px solid ${color}55`,
          }}
        >
          <Icon size={17} strokeWidth={1.8} style={{ color }} />
        </div>
        <span
          className="text-[18px] uppercase tracking-widest font-mono tabular-nums"
          style={{ color }}
        >
          {String(num).padStart(2, '0')}
        </span>
      </header>
      <div>
        <h3 className="text-[24px] font-semibold text-glass-text mb-1.5">{title}</h3>
        <p className="text-[19px] text-glass-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export function Maintenance() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(t.mnt_cmd_value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="maintenance" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 max-w-2xl">
          <div className="text-[19px] uppercase tracking-widest text-accent-orange mb-3 font-semibold flex items-center gap-2">
            <GitBranch size={13} strokeWidth={2.2} />
            {t.mnt_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.mnt_title_a}
            <span className="mars-wordmark">{t.mnt_title_b}</span>
            {t.mnt_title_c}
          </h2>
          <p className="text-[24px] text-glass-muted leading-relaxed">{t.mnt_intro}</p>
        </header>

        {/* The command */}
        <div className="glass-card rounded-2xl p-6 md:p-7 mb-10 max-w-3xl">
          <div className="text-[18px] uppercase tracking-widest text-glass-faint mb-2">
            {t.mnt_cmd_label}
          </div>
          <div className="relative">
            <div className="code-block !text-[22px] !py-4 !pr-14">
              <span className="text-glass-faint select-none">$ </span>
              <span className="text-glass-text">{t.mnt_cmd_value}</span>
            </div>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] transition flex items-center justify-center"
              aria-label="Copy"
            >
              {copied ? (
                <Check size={15} strokeWidth={2} className="text-accent-pink" />
              ) : (
                <Copy size={15} strokeWidth={1.8} className="text-glass-text/80" />
              )}
            </button>
          </div>
        </div>

        {/* 4 steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Step
            num={1}
            title={t.mnt_step1_title}
            desc={t.mnt_step1_desc}
            color="#f778ba"
            Icon={Camera}
          />
          <Step
            num={2}
            title={t.mnt_step2_title}
            desc={t.mnt_step2_desc}
            color="#F97316"
            Icon={FileEdit}
          />
          <Step
            num={3}
            title={t.mnt_step3_title}
            desc={t.mnt_step3_desc}
            color="#DA3733"
            Icon={GitCommit}
          />
          <Step
            num={4}
            title={t.mnt_step4_title}
            desc={t.mnt_step4_desc}
            color="#a855f7"
            Icon={Upload}
          />
        </div>

        <div className="mt-10 max-w-4xl">
          <div
            className="glass-card rounded-2xl p-6 md:p-7 border-l-4"
            style={{ borderLeftColor: '#a855f7' }}
          >
            <p className="text-[22px] text-glass-text/90 leading-relaxed">{t.mnt_footer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
