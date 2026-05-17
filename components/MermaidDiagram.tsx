'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  source: string;
  id: string;
  className?: string;
}

/**
 * Client-side Mermaid 11 renderer.
 * Mars-style dark theme (matches the parent project's mermaid style):
 *   - #1A1A1A page bg, glass-card surface, neutral white text
 *   - Brand accents pink/orange/red for emphasis nodes
 *   - Each `style N fill:..,color:..` pair specified inline in the source
 */
export function MermaidDiagram({ source, id, className = '' }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          background: '#1A1A1A',
          primaryColor: '#1f1f24',
          primaryTextColor: '#f0f6fc',
          primaryBorderColor: 'rgba(255,255,255,0.18)',
          secondaryColor: '#2a1f1f',
          secondaryTextColor: '#f0f6fc',
          tertiaryColor: '#11141b',
          tertiaryTextColor: '#f0f6fc',
          lineColor: 'rgba(247,120,186,0.55)',
          textColor: '#f0f6fc',
          mainBkg: '#1f1f24',
          nodeBorder: 'rgba(255,255,255,0.18)',
          clusterBkg: 'rgba(255,255,255,0.03)',
          clusterBorder: 'rgba(255,255,255,0.12)',
          edgeLabelBackground: '#1A1A1A',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
          fontSize: '15px',
        },
        flowchart: {
          curve: 'basis',
          padding: 16,
          nodeSpacing: 36,
          rankSpacing: 48,
          htmlLabels: true,
        },
        securityLevel: 'loose',
      });

      try {
        const { svg: rendered } = await mermaid.render(`mmd-${id}`, source);
        if (!cancelled) setSvg(rendered);
      } catch (err) {
        if (!cancelled) {
          // Surface the source so it's debuggable rather than vanishing into a void.
          setSvg(
            `<pre style="color:#fca5a5;font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap;">Mermaid render failed:\n${String(err)}\n\nSource:\n${source}</pre>`,
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [source, id]);

  return (
    <div
      ref={ref}
      className={`mermaid-canvas w-full overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-label="Diagram"
    />
  );
}
