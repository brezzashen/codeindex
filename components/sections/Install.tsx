'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

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
            Drop-in for Claude Code
          </div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          >
            Install in 30 seconds
          </h2>
          <p className="text-[15px] text-glass-muted leading-relaxed">
            Requires Python 3.11+, PostgreSQL 14+, and a Claude Code workspace. The MCP server is one
            stdio script — no daemon, no HTTP port. Index is rebuilt on demand.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CodeStep
            num="1"
            title="Install Python deps"
            desc="MCP SDK + Postgres async driver, in your venv."
            code="uv pip install 'mcp>=1.0.0' asyncpg libcst"
          />
          <CodeStep
            num="2"
            title="Provision PostgreSQL"
            desc="A 14+ instance is enough; defaults to localhost:5332 in Mars Agent."
            code={`createdb code_index\npsql code_index < schema.sql`}
          />
          <CodeStep
            num="3"
            title="Build the index"
            desc="Walks the repo, parses AST, populates code_symbols / code_deps / code_modules."
            code="bash .claude/tools/code-agent.sh index"
          />
          <CodeStep
            num="4"
            title="Wire to Claude Code"
            desc="Append to .mcp.json. Path the POSTGRES_URI to your Postgres instance."
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
              <h4 className="text-[15px] font-semibold mb-2">Verify after install</h4>
              <p className="text-[13px] text-glass-muted mb-3">
                Inside Claude Code, ask for any symbol. If you see <span className="font-mono text-glass-text/85">file_path:line_number</span> with
                a real function signature, you're indexed. If the result is empty, the index is empty —
                re-run step 3. <span className="text-glass-faint">(See <span className="font-mono">experience.md §71</span> for why "empty" is distinguishable.)</span>
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
