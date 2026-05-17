'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { GRAPH_CATEGORIES, GRAPH_LINKS, GRAPH_NODES } from '@/lib/graph-data';
import { useLocale } from '@/lib/i18n';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

export function CodeGraph() {
  const { t, locale } = useLocale();

  const option = useMemo<EChartsOption>(() => {
    const layerLabel = locale === 'zh' ? '所在层' : 'Layer';
    const symbolsLabel = locale === 'zh' ? '符号数' : 'Symbols';
    const weightLabel = locale === 'zh' ? '权重' : 'weight';
    return {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(10,12,18,0.92)',
        borderColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1,
        textStyle: { color: '#f0f6fc', fontSize: 12 },
        padding: [8, 12],
        extraCssText: 'backdrop-filter: blur(12px); border-radius: 10px;',
        formatter: (params: any) => {
          if (params.dataType === 'edge') {
            return `<div style="font-family:ui-monospace,SF Mono,Menlo,monospace;font-size:11px;">${params.data.source} → ${params.data.target}<br/><span style="opacity:.6">${weightLabel}: ${params.data.weight ?? '·'}</span></div>`;
          }
          const n = params.data;
          return `<div style="min-width:180px;">
            <div style="font-weight:600;font-size:13px;margin-bottom:4px;">${n.name}</div>
            <div style="font-size:11px;opacity:.7;">${layerLabel}: <span style="color:${params.color};">${n.layer}</span></div>
            <div style="font-size:11px;opacity:.7;">${symbolsLabel}: ${n.symbolValue}</div>
            <div style="font-size:10px;opacity:.5;font-family:ui-monospace,SF Mono,monospace;margin-top:4px;">${n.id}</div>
          </div>`;
        },
      },
      legend: [
        {
          data: GRAPH_CATEGORIES.map((c) => c.name),
          textStyle: { color: 'rgba(240,246,252,0.75)', fontSize: 11 },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 12,
          icon: 'circle',
          top: 10,
          left: 'center',
        },
      ],
      animationDurationUpdate: 800,
      animationEasingUpdate: 'cubicOut',
      series: [
        {
          name: 'Mars Agent layered code graph',
          type: 'graph',
          layout: 'force',
          data: GRAPH_NODES.map((n) => ({
            ...n,
            value: n.symbolValue,
            symbolSize: Math.max(14, Math.min(48, 12 + Math.sqrt(n.symbolValue) * 4)),
          })),
          links: GRAPH_LINKS.map((l) => ({
            source: l.source,
            target: l.target,
            weight: l.weight,
            value: l.weight,
            lineStyle: { width: 0.6 + Math.min(l.weight, 14) * 0.18 },
          })),
          categories: GRAPH_CATEGORIES,
          roam: true,
          draggable: true,
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [0, 5],
          label: {
            show: true,
            position: 'right',
            fontSize: 11,
            color: 'rgba(240,246,252,0.85)',
            textBorderColor: 'rgba(5,6,8,0.85)',
            textBorderWidth: 2,
            formatter: '{b}',
          },
          force: {
            repulsion: 240,
            edgeLength: [60, 130],
            gravity: 0.06,
            friction: 0.18,
          },
          lineStyle: {
            color: 'source',
            opacity: 0.42,
            curveness: 0.18,
          },
          emphasis: {
            focus: 'adjacency',
            scale: 1.12,
            lineStyle: { opacity: 0.95, width: 1.6 },
            label: { fontSize: 12 },
          },
          itemStyle: {
            opacity: 0.95,
            borderColor: 'rgba(5,6,8,0.85)',
            borderWidth: 1.2,
            shadowBlur: 12,
            shadowColor: 'rgba(247,120,186,0.18)',
          },
        },
      ],
    };
  }, [locale]);

  return (
    <section id="graph" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 max-w-2xl">
          <div className="text-[19px] uppercase tracking-widest text-accent-red mb-3 font-semibold">
            {t.graph_eyebrow}
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            {t.graph_title_a}
            <span className="font-mono text-accent-pink">{t.graph_title_b}</span>
            {t.graph_title_c}
          </h2>
          <p className="text-[24px] text-glass-muted leading-relaxed">{t.graph_intro}</p>
        </header>

        <div className="glass-card rounded-3xl p-3 md:p-5">
          <ReactECharts
            option={option}
            style={{ height: 'min(72vh, 680px)', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[19px] text-glass-faint">
          <span>{t.graph_hint_size}</span>
          <span>{t.graph_hint_weight}</span>
          <span>{t.graph_hint_interact}</span>
        </div>
      </div>
    </section>
  );
}
