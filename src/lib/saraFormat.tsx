import React from 'react';

/**
 * Tiny renderer for SARA's replies: **bold**, `inline code` and
 * ``` fenced code blocks. Anything else stays plain text.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={`${keyPrefix}-b${i++}`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <code
          key={`${keyPrefix}-c${i++}`}
          className="px-1 py-0.5 rounded bg-neutral-500/15 text-[0.9em] font-mono"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function renderSaraText(text: string): React.ReactNode {
  const blocks = text.split(/```/);
  const linesOf = (s: string) => s.replace(/^\w+\r?\n/, '').replace(/\r?\n$/, '');

  return blocks.map((block, idx) => {
    if (idx % 2 === 1) {
      return (
        <pre
          key={`code-${idx}`}
          className="my-2 overflow-x-auto rounded-xl bg-neutral-950 p-3 text-xs text-neutral-100 font-mono leading-5 scrollbar-thin"
        >
          <code>{linesOf(block)}</code>
        </pre>
      );
    }
    const lines = block.split(/\n/);
    return (
      <span key={`txt-${idx}`}>
        {lines.map((line, li) => (
          <React.Fragment key={`l-${idx}-${li}`}>
            {renderInline(line, `${idx}-${li}`)}
            {li < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    );
  });
}
