'use client';

import { useEffect, useState } from 'react';
import { Orb } from '@/components/Orb';
import { ArrowDown, Sparkles, Zap, Coins } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export function Hero() {
  const { t } = useLocale();

  // Match Mars Agent WelcomeOrbBackdrop sizing: 1080px desktop, 630px mobile.
  // Client-mount gate avoids WebGL SSR hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const orbSize = isMobile ? '630px' : '1080px';

  return (
    <section
      className="relative flex items-center justify-center hero-vignette overflow-visible"
      style={{ minHeight: '100svh', backgroundColor: '#1A1A1A' }}
    >
      {/* Orb backdrop — fixed-size square centered, allowed to overflow the viewport
          on small heights, matches Mars WelcomeOrbBackdrop (intro page) sizing. */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        {mounted && (
          <div style={{ width: orbSize, height: orbSize, position: 'relative', flexShrink: 0 }}>
            <Orb
              hue={0}
              hoverIntensity={1.99}
              rotateOnHover
              forceHoverState={false}
              backgroundColor="#1A1A1A"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-4xl px-6 md:px-10 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-8 brand-pill rounded-full px-4 h-9 text-[12px] tracking-wide uppercase text-glass-muted">
          <Sparkles size={13} strokeWidth={2} className="text-accent-pink" />
          <span>{t.hero_eyebrow}</span>
        </div>

        <h1
          className="font-bold mb-6"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {t.hero_title_a}
          <span className="mars-wordmark">{t.hero_title_b}</span>
          {t.hero_title_c}
        </h1>

        <p className="text-[16px] md:text-[18px] text-glass-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero_intro('300', '4,820')}
        </p>

        {/* Perf claim — headline metrics */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="flex flex-wrap items-stretch justify-center gap-3">
            <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[180px]">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(247,120,186,0.22), rgba(247,120,186,0.06))',
                  border: '1px solid rgba(247,120,186,0.32)',
                }}
              >
                <Zap size={16} strokeWidth={2} style={{ color: '#f778ba' }} />
              </div>
              <div className="text-left">
                <div className="font-bold text-[24px] leading-none mars-wordmark">{t.perf_speed_value}</div>
                <div className="text-[11px] uppercase tracking-widest text-glass-faint mt-1">
                  {t.perf_speed_label}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[180px]">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.22), rgba(249,115,22,0.06))',
                  border: '1px solid rgba(249,115,22,0.32)',
                }}
              >
                <Coins size={16} strokeWidth={2} style={{ color: '#F97316' }} />
              </div>
              <div className="text-left">
                <div className="font-bold text-[24px] leading-none mars-wordmark">{t.perf_token_value}</div>
                <div className="text-[11px] uppercase tracking-widest text-glass-faint mt-1">
                  {t.perf_token_label}
                </div>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-glass-faint tracking-wide">{t.perf_vs}</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#tools"
            className="brand-pill rounded-full px-6 h-11 inline-flex items-center text-[14px] font-medium hover:bg-white/[0.08] transition"
          >
            {t.hero_cta_tools}
            <ArrowDown size={14} className="ml-2 opacity-70" />
          </a>
          <a
            href="#install"
            className="rounded-full px-6 h-11 inline-flex items-center text-[14px] font-medium bg-glass-text text-ink-950 hover:bg-white transition"
          >
            {t.hero_cta_install}
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { label: t.hero_stat_modules, value: '300' },
            { label: t.hero_stat_symbols, value: '4,820' },
            { label: t.hero_stat_tools, value: '14' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-bold text-[28px] md:text-[32px] mars-wordmark">{s.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-glass-faint mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
