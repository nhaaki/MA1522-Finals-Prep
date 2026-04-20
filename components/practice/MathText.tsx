'use client'

import { useMemo } from 'react'
import katex from 'katex'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderInline(text: string): string {
  // inline math: $...$ (skip escaped \$)
  const parts: string[] = []
  let i = 0
  while (i < text.length) {
    if (text[i] === '$' && text[i - 1] !== '\\') {
      const end = text.indexOf('$', i + 1)
      if (end === -1) {
        parts.push(escapeHtml(text.slice(i)))
        break
      }
      const math = text.slice(i + 1, end)
      try {
        parts.push(katex.renderToString(math, { throwOnError: false, displayMode: false }))
      } catch {
        parts.push(escapeHtml(math))
      }
      i = end + 1
    } else {
      // accumulate a run of plain text up to the next $
      let next = text.indexOf('$', i)
      if (next === -1) next = text.length
      let chunk = text.slice(i, next)
      chunk = escapeHtml(chunk)
      // **bold**
      chunk = chunk.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // `code`
      chunk = chunk.replace(/`([^`]+?)`/g, '<code class="font-mono text-[0.9em] bg-bg-soft px-1 py-px rounded border border-line-soft">$1</code>')
      parts.push(chunk)
      i = next
    }
  }
  return parts.join('')
}

function renderBlocks(text: string): string {
  // block math: $$...$$
  const blockRe = /\$\$([\s\S]+?)\$\$/g
  const out: string[] = []
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = blockRe.exec(text)) !== null) {
    if (m.index > lastIndex) out.push(renderInline(text.slice(lastIndex, m.index)))
    try {
      out.push(
        `<div class="my-2 text-center">${katex.renderToString(m[1], { throwOnError: false, displayMode: true })}</div>`
      )
    } catch {
      out.push(escapeHtml(m[1]))
    }
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < text.length) out.push(renderInline(text.slice(lastIndex)))
  return out.join('')
}

export default function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => renderBlocks(text), [text])
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
